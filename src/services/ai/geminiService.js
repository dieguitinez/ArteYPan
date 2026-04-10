import { GoogleGenerativeAI } from "@google/generative-ai";
import { salesToolsDeclaration } from './salesTools';

// ============================================================
// CASCADA DE FAILOVER MÁXIMA — Actualizado: Abril 2026
// Fuente: https://ai.google.dev/gemini-api/docs/models
//
// Estrategia: Modelos STABLE primero (mayor cuota gratuita),
// modelos PREVIEW al final como último recurso.
//
// La cascada solo hace failover en errores 429 (cuota agotada).
// Errores de red u otros se propagan sin cambiar de modelo.
// ============================================================
const MODEL_ROTATION = [
    // --- TIER 1: Modelos Stable (mayor cuota RPD, más fiables) ---
    "gemini-2.5-flash-lite",         // 1º: Fastest, highest daily quota (~1,500 RPD est.)
    "gemini-2.5-flash",              // 2º: Best price-performance, 1M context
    "gemini-2.5-pro",                // 3º: Best quality, lower daily quota

    // --- TIER 2: Modelos Preview (límites más restrictivos, última línea de defensa) ---
    "gemini-3.1-flash-lite-preview", // 4º: New gen, efficient
    "gemini-3-flash-preview",        // 5º: Frontier performance
    "gemini-3.1-pro-preview",        // 6º: Premium quality, minimal free quota
];

// ============================================================
// Detección inteligente de errores de cuota (429)
// Solo hacemos failover cuando la cuota se agota, NO en
// errores de red, de configuración u otros problemas.
// ============================================================
const isQuotaError = (error) => {
    const msg = (error?.message || '').toLowerCase();
    const status = error?.status || error?.code || 0;
    return (
        msg.includes('429') ||
        msg.includes('quota') ||
        msg.includes('resource exhausted') ||
        msg.includes('too many requests') ||
        status === 429
    );
};

const SYSTEM_PROMPT = `Eres 'Arti', el asistente experto de 'Arte & Pan'.
Tu UNICA misión es asesorar y dirigir al cliente al formulario de pedido.

REGLAS CRÍTICAS:
1. NO TOMES PEDIDOS EN EL CHAT: Si te dicen un pedido, di: "¡Excelente elección! Por favor, rellena nuestro formulario oficial para que podamos prepararlo."
2. ENLACE OBLIGATORIO: Debes incluir SIEMPRE este enlace completo cuando el cliente quiera comprar: ${window.location.origin}/#pedido
3. MENSAJE TIPO: "Haz clic aquí para finalizar tu pedido: ${window.location.origin}/#pedido"
4. USA LA HERRAMIENTA: Llama a 'open_order_form' siempre que el cliente decida comprar.
5. IDENTIDAD: Empleado humano amable.`;

// Instancia global
let genAI = null;

export const initializeGemini = (apiKey) => {
    if (!apiKey) {
        console.warn("[Arti] Gemini API Key no encontrada. Modo simulación activado.");
        return;
    }
    genAI = new GoogleGenerativeAI(apiKey);
};

export const generateChatResponse = async (chatHistory, message, apiKey) => {
    console.log("[Arti] Iniciando petición. API Key detectada:", apiKey ? `SÍ (${apiKey.substring(0, 8)}...)` : "NO");

    if (!genAI) {
        if (!apiKey) {
            return {
                role: 'assistant',
                content: "🛠️ [Modo Simulación]: No detecto tu API Key. \n\n**IMPORTANTE**: Por seguridad, la variable en Vercel DEBE llamarse exactamente `artypan_GEMINI_API_KEY`. \n\nPor favor, cámbiale el nombre en los ajustes de Vercel y vuelve a desplegar."
            };
        }
        initializeGemini(apiKey);
    }

    let lastError = null;

    // ============================================================
    // BUCLE PRINCIPAL: Cascada de 6 modelos con failover inteligente
    // ============================================================
    for (const modelName of MODEL_ROTATION) {
        console.log(`[Arti] Intentando con modelo: ${modelName}`);

        // --- INTENTO 1: Con herramientas de venta y system prompt ---
        try {
            const model = genAI.getGenerativeModel({
                model: modelName,
                systemInstruction: SYSTEM_PROMPT,
                tools: salesToolsDeclaration,
            });

            const chat = model.startChat({
                history: chatHistory.map(m => ({
                    role: m.role === 'assistant' ? 'model' : 'user',
                    parts: [{ text: m.content }]
                }))
            });

            let result = await chat.sendMessage(message);
            let response = result.response;

            // Bucle para manejar llamadas a herramientas (Function Calling)
            while (response.functionCalls()?.length > 0) {
                const functionCalls = response.functionCalls();
                const toolResults = [];
                const { executeTool } = await import('./salesTools');

                for (const call of functionCalls) {
                    const toolResult = await executeTool(call);
                    toolResults.push({ functionResponse: { name: call.name, response: toolResult } });
                }
                result = await chat.sendMessage(toolResults);
                response = result.response;
            }

            console.log(`[Arti] ✅ Respuesta exitosa con: ${modelName}`);
            return { role: 'assistant', content: response.text() };

        } catch (error) {
            if (isQuotaError(error)) {
                // Error de cuota: intentar modo de emergencia (sin herramientas) antes de saltar al siguiente modelo
                console.warn(`[Arti] ⚠️ Cuota agotada en ${modelName} (con herramientas). Probando modo de emergencia...`);

                try {
                    const simpleModel = genAI.getGenerativeModel({
                        model: modelName,
                        systemInstruction: SYSTEM_PROMPT
                    });
                    const result = await simpleModel.generateContent(message);
                    console.log(`[Arti] ✅ Respuesta en modo emergencia con: ${modelName}`);
                    return { role: 'assistant', content: result.response.text() };
                } catch (innerError) {
                    if (isQuotaError(innerError)) {
                        console.warn(`[Arti] 🔄 Cuota agotada en ${modelName} (emergencia). Pasando al siguiente modelo...`);
                        lastError = innerError;
                        continue; // Saltar al siguiente modelo en MODEL_ROTATION
                    } else {
                        // Error no relacionado con cuota en modo emergencia — propagar
                        console.error(`[Arti] ❌ Error técnico en ${modelName}:`, innerError.message);
                        lastError = innerError;
                        break;
                    }
                }
            } else {
                // Error que NO es de cuota (red, config, etc.) — no saltar de modelo
                console.error(`[Arti] ❌ Error técnico (no cuota) en ${modelName}:`, error.message);
                lastError = error;
                break;
            }
        }
    }

    // ============================================================
    // Si llegamos aquí, todos los modelos y modos han fallado
    // ============================================================
    console.error("[Arti] 🔴 Cascada completa agotada. Último error:", lastError?.message);

    const wasQuotaIssue = isQuotaError(lastError);
    const errorMsg = wasQuotaIssue
        ? "Lo siento, nuestro horno de IA está al límite por hoy. 🥖 Por favor, llámenos directamente o inténtalo de nuevo mañana."
        : `Lo siento, hay un problema técnico de conexión. Por favor, inténtalo de nuevo en unos momentos.\n\n[Error: ${lastError?.message || 'desconocido'}]`;

    return {
        role: 'assistant',
        content: errorMsg
    };
};
