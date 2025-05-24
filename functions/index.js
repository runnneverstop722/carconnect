
import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import cors from 'cors';
import functions from 'firebase-functions';

// Load environment variables from .env file for local development (Firebase Emulator)
// For deployed functions, set these variables via `firebase functions:config:set` or in GCP console.
dotenv.config();

const app = express();

// --- CORS Configuration ---
// For deployed function, set FRONTEND_URL in Firebase environment configuration
// e.g., firebase functions:config:set env.frontend_url="https://your-project-id.web.app"
const corsOptions = {
  origin: process.env.FRONTEND_URL || functions.config().env?.frontend_url || 'https://carconnect-mvp-1012514681910.us-west1.run.app', // Fallback for safety
  optionsSuccessStatus: 200 
};
app.use(cors(corsOptions));

// Middleware to parse JSON request bodies
app.use(express.json());

// --- Gemini API Configuration ---
// For deployed function, set API_KEY in Firebase environment configuration
// e.g., firebase functions:config:set env.api_key="YOUR_GEMINI_API_KEY"
const GEMINI_API_KEY = process.env.API_KEY || functions.config().env?.api_key;
const MODEL_NAME = 'gemini-2.5-flash-preview-04-17';

if (!GEMINI_API_KEY) {
  console.error("CRITICAL: Gemini API key (API_KEY or functions.config().env.api_key) not found in server environment variables.");
}

let ai;
if (GEMINI_API_KEY) {
  try {
    ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  } catch (e) {
    console.error("Failed to initialize GoogleGenAI:", e.message);
    ai = null;
  }
} else {
  ai = null;
}

// --- API Proxy Endpoint ---
// The path '/fetch-car-details' is relative to the '/api/' rewrite in firebase.json
app.post('/fetch-car-details', async (req, res) => {
  if (!ai) {
    console.error("Gemini AI client not initialized. Check API_KEY configuration.");
    return res.status(500).json({ error: 'AI service configuration error on server.' });
  }

  const { carModel, userLanguage } = req.body;

  if (!carModel) {
    return res.status(400).json({ error: 'carModel is required in the request body' });
  }

  const languageInstruction = userLanguage
    ? \`Please provide the response in ${userLanguage} if possible. If not, please use English.\`
    : "Provide general information in English.";

  const prompt = \`
    For the car model "${carModel}", ${languageInstruction} Provide detailed information for the following aspects.
    If a piece of information is not available or applicable, clearly state "Not available" or omit the field for lists.
    Focus on models typically sold in a region that primarily uses ${userLanguage || 'English'}, if regional variations exist.

    1.  **YouTube Videos**: List up to 3 relevant YouTube video titles and their full URLs (reviews, official ads, walkarounds).
    2.  **Manufacturer Info**: Provide the manufacturer's name and official homepage URL.
    3.  **Basic Specifications**: Key general specifications like engine type, power (hp or kW), torque (lb-ft or Nm), transmission, drivetrain, fuel economy (MPG or L/100km - specify city/highway if common), and notable dimensions including car width (overall width, specify if it includes mirrors or not).
    4.  **Unique Features**: Bullet list of 3-5 standout or unique features of this model.
    5.  **Pros**: Bullet list of 3-5 common praises or advantages.
    6.  **Cons**: Bullet list of 3-5 common criticisms or disadvantages.
    7.  **Rival Models**: List 2-4 primary rival models.
    8.  **Image Descriptions**: Provide 3-4 vivid textual descriptions of key visual aspects of the car (e.g., "Detailed description of the front grille and headlight assembly," "Description of the dashboard layout and infotainment screen," "Profile view highlighting its distinct body lines").
    9.  **Market Presence/Popularity**: A brief qualitative description of its market presence or general public perception (e.g., "a widely adopted family SUV," "a niche sports coupe," "common for city commuting").
    10. **Maintenance Summary**: A brief summary of common maintenance points or typical service intervals owners should be aware of.
    11. **Recall Notices**: List any major or widely known safety recall campaign titles or brief descriptions (if any). If none, state "No major recalls found in general search."
    12. **User Review Sentiment**: A brief summary of overall public sentiment from user reviews (e.g., "Generally positive with praise for reliability," "Mixed reviews citing great performance but higher maintenance costs").
    13. **Build & Price URL**: If available, the direct URL to the manufacturer's official "Build & Price" or "Configurator" page for this model.
    14. **Owner's Manual Link**: If available, a direct link to the official digital owner's manual or the manufacturer's primary vehicle support/manuals page for this model.

    Please provide this information in a valid JSON format like this example:
    {
      "youtube_videos": [{ "title": "Example Review", "url": "https://youtube.com/example" }],
      "manufacturer_name": "ExampleCarCorp",
      "manufacturer_homepage": "https://examplecarcorp.com",
      "basic_specs": "Engine: 2.0L Turbo, Power: 250hp, Width: 1850mm (excluding mirrors)...",
      "unique_features": ["Feature A", "Feature B"],
      "pros": ["Comfortable ride", "Good fuel economy"],
      "cons": ["Small trunk space", "Basic infotainment"],
      "rival_models": ["Rival X", "Rival Y"],
      "image_descriptions": ["Aggressive front fascia with LED headlights.", "Spacious interior with leather seats."],
      "market_presence": "A popular choice for young professionals.",
      "maintenance_summary": "Oil changes every 10,000 miles. Timing belt at 60,000 miles.",
      "recall_notices": ["Recall for Takata airbags (if applicable).", "Software update for infotainment system."],
      "user_review_sentiment": "Mostly positive, highlighting fuel efficiency and comfort.",
      "build_and_price_url": "https://examplecarcorp.com/models/model-name/build",
      "owners_manual_link": "https://examplecarcorp.com/owners/manuals/model-name"
    }
    Ensure the JSON is well-formed and contains only the requested data. If a specific field like 'build_and_price_url' is not found, it can be omitted from the JSON or have a null value.
    For lists like 'recall_notices', if none are found, return an empty list [] or omit the key.
  \`;

  try {
    const result = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        config: {
          responseMimeType: "application/json",
        },
      });

    res.setHeader('Content-Type', 'application/json');
    res.send(result.text); // Send the text part which should be the JSON string

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    let errorMessage = 'Failed to fetch car details from AI service.';
    // Check if error.message exists and append
    if (error && error.message) {
        errorMessage += \` Details: ${error.message}\`;
    }
    // The structure of Gemini API errors might vary; log the whole error for detailed debugging
    console.error("Full Gemini error object:", JSON.stringify(error, null, 2));
    res.status(500).json({ error: errorMessage });
  }
});

// Expose Express API as a single Cloud Function:
// The name 'api' here must match the function name in firebase.json rewrites.
export const api = functions.https.onRequest(app);
