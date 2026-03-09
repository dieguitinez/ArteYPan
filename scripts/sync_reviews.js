import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GEMINI_API_KEY = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
const PLACE_ID = process.env.GOOGLE_PLACE_ID; // Optional: for automation
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY; // Optional: for automation

if (!GEMINI_API_KEY) {
    console.error("❌ Se requiere GEMINI_API_KEY en el .env");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

async function getReviewsFromGoogle() {
    if (!GOOGLE_MAPS_API_KEY || !PLACE_ID) {
        console.warn("⚠️ No se proporcionó GOOGLE_MAPS_API_KEY o PLACE_ID. Usando datos de prueba o manuales.");
        return null;
    }

    try {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&key=${GOOGLE_MAPS_API_KEY}&language=es`;
        const response = await fetch(url);
        const data = await response.json();
        return data.result?.reviews || [];
    } catch (error) {
        console.error("❌ Error al obtener reseñas de Google:", error);
        return null;
    }
}

async function syncReviews() {
    console.log("🔄 Iniciando sincronización de reseñas...");

    const rawReviews = await getReviewsFromGoogle();

    const prompt = `
    Eres un experto en marketing para panaderías. 
    A continuación tienes una lista de reseñas de Google Maps. 
    Tu tarea es:
    1. Seleccionar las 4 mejores reseñas recientes (que hablen bien del producto y el servicio).
    2. Formatearlas exactamente como este JSON:
       [
         { "id": 1, "author": "Nombre", "rating": 5, "text": "Texto resumido y potente", "date": "Hace X tiempo" }
       ]
    3. Asegúrate de que el texto sea conciso y atractivo.
    
    RESEÑAS REALES:
    ${JSON.stringify(rawReviews || "Por favor, mantén las actuales pero optimiza el texto si es necesario.")}
    
    Responde ÚNICAMENTE con el bloque de código JSON.
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

        // Limpiar el JSON si Gemini lo pone en bloques de código
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
            const formattedJson = jsonMatch[0];
            const targetPath = path.join(__dirname, "../src/data/reviews.json");
            fs.writeFileSync(targetPath, formattedJson);
            console.log("✅ Reseñas actualizadas correctamente en src/data/reviews.json");
        } else {
            console.error("❌ No se pudo extraer JSON de la respuesta de Gemini.");
        }
    } catch (error) {
        console.error("❌ Error con Gemini:", error);
    }
}

syncReviews();
