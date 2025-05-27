import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.BACKEND_PORT || 3001; // Port for the backend server

// --- CORS Configuration ---
// ###################################################################################
// # IMPORTANT FOR PRODUCTION DEPLOYMENT (e.g., Google Cloud Run):                   #
// # The `FRONTEND_URL` environment variable MUST be set in your Cloud Run service   #
// # configuration (for this backend service) to the public URL of your DEPLOYED     #
// # FRONTEND application. Otherwise, CORS will block requests from your live        #
// # frontend.                                                                       #
// # Example: If frontend is at https://my-carconnect-app.com, set FRONTEND_URL      #
// # to https://my-carconnect-app.com in Cloud Run environment variables.            #
// ###################################################################################
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'https://carconnect-mvp-1012514681910.us-west1.run.app', 
  optionsSuccessStatus: 200 
};
app.use(cors(corsOptions));

// Middleware to parse JSON request bodies
app.use(express.json());

// --- Gemini API Configuration ---
const GEMINI_API_KEY = process.env.API_KEY;
const MODEL_NAME = 'gemini-2.5-flash-preview-04-17';

if (!GEMINI_API_KEY) {
  console.error("CRITICAL: Gemini API key (API_KEY) not found in server environment variables.");
}

let ai;
try {
  ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY || "MISSING_IN_SERVER_ENV" });
} catch (e) {
  console.error("Failed to initialize GoogleGenAI, likely due to missing API key or invalid key format:", e.message);
  ai = null;
}


// --- API Proxy Endpoint ---
app.post('/api/fetch-car-details', async (req, res) => {
  if (!ai) {
    console.error("Gemini AI client not initialized. Check API_KEY.");
    return res.status(500).json({ error: 'AI service configuration error on server.' });
  }

  const { carModel, userLanguage } = req.body;

  if (!carModel) {
    return res.status(400).json({ error: 'carModel is required in the request body' });
  }

  const languageInstruction = userLanguage
    ? `Please provide the response in ${userLanguage} if possible. If not, please use English.`
    : "Provide general information in English.";

  const prompt = `
  For the car model "${carModel}", ${languageInstruction} Provide detailed information for the following aspects.
  If a piece of information is not available or applicable, clearly state "Not available" or omit the field for lists/objects.
  Focus on models typically sold in a region that primarily uses ${userLanguage || 'English'}, if regional variations exist.

  1.  **YouTube Videos**: Find up to 3 real, existing YouTube videos about this car model. Include only videos that you are confident exist on YouTube. Include the exact title and full URL. Focus on recent reviews, official manufacturer videos, or professional walkarounds. If you're not confident about a video's existence, return an empty list [].
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

    res.setHeader('Content-Type', 'application/json');
    res.send(result.text);

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    let errorMessage = 'Failed to fetch car details from AI service.';
    if (error.message) {
        errorMessage += ` Details: ${error.message}`;
    }
    // The @google/genai library might not use error.response.data like axios.
    // Check the structure of errors from @google/genai if more specific details are needed.
    // For now, error.message should contain the primary error info.
    res.status(500).json({ error: errorMessage });
  }
});

app.listen(port, () => {
  console.log(`CarConnect backend proxy server listening on port ${port}`);
  console.log(`CORS enabled for origin: ${corsOptions.origin}`);
  if (!GEMINI_API_KEY) {
    console.warn("Warning: API_KEY environment variable is not set. AI features will not work.");
  }
});
