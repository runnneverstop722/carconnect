import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import cors from 'cors';
// Import onRequest from the V2 SDK
import { onRequest } from 'firebase-functions/v2/https';
// Import fetch for making HTTP requests
import fetch from 'node-fetch';
import { config } from 'firebase-functions';

// Load environment variables from .env file for local development (Firebase Emulator)
dotenv.config();

// Get config values
const functionConfig = config();
const GOOGLE_SEARCH_API_KEY = functionConfig?.env?.custom_search_api_key || process.env.CUSTOM_SEARCH_API_KEY;
const GOOGLE_SEARCH_CX_ID = functionConfig?.env?.imagesearch_cs_id || process.env.IMAGESEARCH_CS_ID;
const GEMINI_API_KEY = functionConfig?.env?.gemini_api_key || process.env.GEMINI_API_KEY;

const app = express();

// --- CORS Configuration ---
const corsOptions = {
  origin: functionConfig?.env?.frontend_url || 'http://localhost:3000',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
console.log(`CORS configured for origin: ${functionConfig?.env?.frontend_url || 'http://localhost:3000 (fallback for local)'}`);

// Add health check endpoint
app.get('/', (req, res) => {
  res.status(200).send('OK');
});

// Middleware to parse JSON request bodies
app.use(express.json());

// --- Gemini API Configuration ---
const MODEL_NAME = 'gemini-2.5-flash-preview-04-17';

if (!GEMINI_API_KEY) {
  console.error("CRITICAL: Gemini API key not found in server environment variables. AI features will not work.");
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
  console.warn("Gemini AI client not initialized because API key is missing.");
}

// --- Google Custom Search API Configuration ---
if (!GOOGLE_SEARCH_API_KEY || !GOOGLE_SEARCH_CX_ID) {
  console.warn("Warning: Google Custom Search API configuration not found. Image search will not work.");
}

// --- API Proxy Endpoint ---
app.post('/api/fetch-car-details', async (req, res) => {
  const { carModel, userLanguage } = req.body;

  if (!carModel) {
    return res.status(400).json({ error: 'carModel is required in the request body' });
  }

  // --- Part 1: Call Gemini for Text Details ---
  let parsedGeminiData = {};
  let rawGeminiText = ''; 
  
  if (ai) {
    const languageInstruction = userLanguage
      ? `Please provide the response in ${userLanguage} if possible. If not, please use English.`
      : "Provide general information in English.";

    const prompt = `
    For the car model "${carModel}", ${languageInstruction} Provide detailed information for the following aspects.
    If a piece of information is not available or applicable, clearly state "Not available" or omit the field for lists/objects.
    Focus on models typically sold in a region that primarily uses ${userLanguage || 'English'}, if regional variations exist.

    1.  **YouTube Videos**: List up to 3 relevant YouTube video titles and their full URLs (reviews, official ads, walkarounds).
    2.  **Manufacturer Info**: Provide the manufacturer's name and official homepage URL.
    3.  **Basic Specifications**: Provide key general specifications as a JSON object. Include keys for: "Engine Type", "Power (hp or kW)", "Torque (lb-ft or Nm)", "Transmission", "Drivetrain", "Fuel Economy (combined, MPG or L/100km)", "Length", "Width (specify if with/without mirrors)", "Height", "Wheelbase", "Curb Weight", "Cargo Volume". If a specific detail is not available, set its value to "Not available".
    4.  **Tire Information**: Provide tire specifications as a JSON object. Include keys for: "size" (e.g., "235/45R18" - note if front/rear sizes differ), "model" (the specific tire model name, if commonly known), and "type" (e.g., "All-season", "Performance"). If any detail is not available, set its value to "Not available" or omit the key if the entire object is empty.
    5.  **Unique Features**: Bullet list of 3-5 standout or unique features of this model.
    6.  **Pros**: Bullet list of 3-5 common praises or advantages.
    7.  **Cons**: Bullet list of 3-5 common criticisms or disadvantages.
    8.  **Rival Models**: List 2-4 primary rival models.
    9.  **Image Descriptions**: Provide 3-4 vivid textual descriptions of key visual aspects of the car (e.g., "Detailed description of the front grille and headlight assembly," "Description of the dashboard layout and infotainment screen," "Profile view highlighting its distinct body lines").
    10. **Market Presence/Popularity**: A brief qualitative description of its market presence or general public perception (e.g., "a widely adopted family SUV," "a niche sports coupe," "common for city commuting").
    11. **Maintenance Summary**: A brief summary of common maintenance points or typical service intervals owners should be aware of.
    12. **Recall Notices**: List any major or widely known safety recall campaign titles or brief descriptions (if any). If none, state "No major recalls found in general search."
    13. **User Review Sentiment**: A brief summary of overall public sentiment from user reviews (e.g., "Generally positive with praise for reliability," "Mixed reviews citing great performance but higher maintenance costs").
    14. **Build & Price URL**: If available, the direct URL to the manufacturer's official "Build & Price" or "Configurator" page for this model.
    15. **Owner's Manual Link**: If available, a direct link to the official digital owner's manual or the manufacturer's primary vehicle support/manuals page for this model.

    Please provide this information in a valid JSON format like this example:
    {
      "youtube_videos": [{ "title": "Example Review", "url": "https://youtube.com/example" }],
      "manufacturer_name": "ExampleCarCorp",
      "manufacturer_homepage": "https://examplecarcorp.com",
      "basic_specs": {
        "Engine Type": "2.0L Turbo",
        "Power (hp or kW)": "250hp",
        "Torque (lb-ft or Nm)": "270 lb-ft",
        "Transmission": "8-speed Automatic",
        "Drivetrain": "FWD",
        "Fuel Economy (combined, MPG or L/100km)": "28 MPG",
        "Length": "4700 mm",
        "Width (specify if with/without mirrors)": "1850mm (excluding mirrors)",
        "Height": "1450 mm",
        "Wheelbase": "2700 mm",
        "Curb Weight": "1500 kg",
        "Cargo Volume": "450 L"
      },
      "tire_info": {
        "size": "225/50R17",
        "model": "Goodyear Assurance",
        "type": "All-season"
      },
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
    For lists like 'recall_notices', if none are found, return an empty list [] or omit the key. If an object like 'tire_info' has no available details, omit the key or return an empty object {}.
  `;

    try {
        const result = await ai.models.generateContent({
            model: MODEL_NAME,
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            config: {
              responseMimeType: "application/json",
            },
          });

        rawGeminiText = result.text;
        let jsonStr = rawGeminiText.trim();
        const fenceRegex = /^```json\s*\n?(.*?)\n?\s*```$/s;
        const match = jsonStr.match(fenceRegex);
        if (match && match[1]) {
          jsonStr = match[1].trim();
        }
        parsedGeminiData = JSON.parse(jsonStr);
        
    } catch (error) {
      console.error('Error calling Gemini API or parsing its response:', error);
      if (error instanceof Error) {
        console.error("Gemini Error Message:", error.message);
      }
      console.error("Raw Gemini response text (if available and led to parse error):", rawGeminiText);
      // parsedGeminiData remains {}
    }
  } else {
      console.warn("Gemini AI client not initialized. Skipping Gemini API call.");
  }

  // --- Part 2: Call Image Search API ---
  let imageUrls = [];
  if (GOOGLE_SEARCH_API_KEY && GOOGLE_SEARCH_CX_ID) {
    try {
      const searchQuery = `${carModel} car exterior official photo`; 
      const numImages = 5; 
      const searchUrl = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_SEARCH_API_KEY}&cx=${GOOGLE_SEARCH_CX_ID}&q=${encodeURIComponent(searchQuery)}&searchType=image&num=${numImages}&safe=active&imgSize=large`;

      const searchResponse = await fetch(searchUrl);
      if (!searchResponse.ok) {
        const errorBody = await searchResponse.text();
        console.error(`Image search API error: ${searchResponse.status} ${searchResponse.statusText}`, errorBody);
      } else {
         const searchData = await searchResponse.json();
        if (searchData.items && Array.isArray(searchData.items)) {
          imageUrls = searchData.items.map(item => item.link).filter(link => typeof link === 'string');
          console.log(`Successfully found ${imageUrls.length} image URLs.`);
        } else {
            console.warn("Image search response items not found or not an array.");
        }
      }
    } catch (error) {
      console.error('Error calling Google Custom Search API:', error);
    }
  } else {
      console.warn("Image search skipped because API keys (VITE_IMAGE_SEARCH_API_KEY, VITE_IMAGE_SEARCH_CS_ID) are not configured.");
  }


  // --- Part 3: Combine Results and Send to Frontend ---
  const finalCarDetailsResponse = {
      youtube_videos: Array.isArray(parsedGeminiData?.youtube_videos) ? parsedGeminiData.youtube_videos : [],
      manufacturer_name: parsedGeminiData?.manufacturer_name || carModel.split(" ")[0] || "Unknown Manufacturer",
      manufacturer_homepage: parsedGeminiData?.manufacturer_homepage || "#",
      basic_specs: parsedGeminiData?.basic_specs && typeof parsedGeminiData.basic_specs === 'object' ? parsedGeminiData.basic_specs : null,
      tire_info: parsedGeminiData?.tire_info && typeof parsedGeminiData.tire_info === 'object' ? parsedGeminiData.tire_info : null,
      unique_features: Array.isArray(parsedGeminiData?.unique_features) ? parsedGeminiData.unique_features : [],
      pros: Array.isArray(parsedGeminiData?.pros) ? parsedGeminiData.pros : [],
      cons: Array.isArray(parsedGeminiData?.cons) ? parsedGeminiData.cons : [],
      rival_models: Array.isArray(parsedGeminiData?.rival_models) ? parsedGeminiData.rival_models : [],
      image_descriptions: Array.isArray(parsedGeminiData?.image_descriptions) ? parsedGeminiData.image_descriptions : [],
      market_presence: parsedGeminiData?.market_presence || null,
      maintenance_summary: parsedGeminiData?.maintenance_summary || null,
      recall_notices: Array.isArray(parsedGeminiData?.recall_notices) ? parsedGeminiData.recall_notices : [],
      user_review_sentiment: parsedGeminiData?.user_review_sentiment || null,
      build_and_price_url: parsedGeminiData?.build_and_price_url || null,
      owners_manual_link: parsedGeminiData?.owners_manual_link || null,
      image_urls: imageUrls, // imageUrls defaults to [] if image search fails or is skipped
  };

  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(finalCarDetailsResponse);
});

// Export for Cloud Functions
export const api = onRequest(
  {
    region: 'us-central1',
    memory: '256MiB',
    timeoutSeconds: 60,
    minInstances: 0,
    maxInstances: 100,
  },
  app
);

// For local development and Cloud Run
const port = process.env.PORT || 8080;
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}
