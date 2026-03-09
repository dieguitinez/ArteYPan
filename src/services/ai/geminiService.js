import { GoogleGenerativeAI } from "@google/generative-ai";
import { salesToolsDeclaration } from './salesTools';

// La Cascada 3.0: Modelos de última generación (Marzo 2026)
const MODEL_ROTATION = [
    "gemini-3.1-flash-lite",
    "gemini-2.5-flash-lite",
    "gemini-2.5-flash",
    "gemini-2.5-pro"
];

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
        console.warn("Gemini API Key missing. Bot will operate in fallback/simulation mode.");
        return;
    }
    genAI = new GoogleGenerativeAI(apiKey);
};

export const generateChatResponse = async (chatHistory, message, apiKey) => {
    console.log("[Gemini Service] Iniciando petición. API Key detectada:", apiKey ? "SÍ (empieza por " + apiKey.substring(0, 6) + ")" : "NO");

    if (!genAI) {
        if (!apiKey) {
            return {
                role: 'assistant',
                content: "🛠️ [Modo Simulación]: No detecto tu API Key. \n\n**IMPORTANTE**: Por seguridad de Vite, la variable en Vercel DEBE llamarse exactamente `VITE_GEMINI_API_KEY`. \n\nSi la llamaste `GEMINI_API_KEY` (sin el VITE_), la web no podrá leerla. Por favor, cámbiale el nombre en los ajustes de Vercel y vuelve a desplegar."
            };
        }
        initializeGemini(apiKey);
    }

    let lastError = null;

    // Ejecución de la Cascada de Modelos
    for (const modelName of MODEL_ROTATION) {
        // Intento 1: Con herramientas y sistema
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

            // Bucle para manejar herramientas
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

            return { role: 'assistant', content: response.text() };

        } catch (error) {
            console.warn(`[Gemini Fallback] Falló ${modelName} con herramientas:`, error.message);

            // Intento 2: Mismo modelo pero SIN herramientas (modo de emergencia)
            try {
                const simpleModel = genAI.getGenerativeModel({
                    model: modelName,
                    systemInstruction: SYSTEM_PROMPT
                });
                const result = await simpleModel.generateContent(message);
                return { role: 'assistant', content: result.response.text() };
            } catch (innerError) {
                console.error(`[Gemini Fallback] Fallo total de ${modelName}:`, innerError.message);
                lastError = innerError;
            }
        }
    }

    // Si llegamos aquí, todo ha fallado
    let debugMsg = "Lo siento, nuestro horno de IA está saturado.";
    if (lastError) {
        debugMsg += `\n\n[ERROR TÉCNICO]: ${lastError.message}\n(Por favor, revisa que tu API Key sea correcta y tengas internet).`;
    }

    return {
        role: 'assistant',
        content: debugMsg
    };
};
