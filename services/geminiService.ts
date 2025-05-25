
import { CarDetails, YouTubeVideo, ManufacturerInfo } from '../types';

// Define the expected structure of the JSON response from the backend proxy (which comes from Gemini)
interface GeminiCarResponse {
  youtube_videos?: { title: string; url: string }[]; // Made optional as per prompt instruction
  manufacturer_homepage?: string; // Made optional
  manufacturer_name?: string;
  basic_specs?: { // <-- CHANGED: Now an object!
    [key: string]: string | null | undefined; // Expecting key-value pairs, values can be string or null/undefined
  } | null | undefined; // The basic_specs object itself can be optional or null/undefined

  tire_info?: { // <-- ADDED: New object type for tire details
    size?: string | null | undefined;
    model?: string | null | undefined;
    type?: string | null | undefined;
  } | null | undefined; // The tire_info object can be optional or null/undefined

  unique_features?: string[];
  pros?: string[];
  cons?: string[];
  rival_models?: string[];
  image_descriptions?: string[];
  market_presence?: string | null | undefined; // Added null/undefined possibility
  maintenance_summary?: string | null | undefined; // Added null/undefined possibility
  recall_notices?: string[];
  user_review_sentiment?: string | null | undefined; // Added null/undefined possibility
  build_and_price_url?: string | null | undefined; // Added null/undefined possibility
  owners_manual_link?: string | null | undefined; // Added null/undefined possibility
}

// This function calls our backend proxy (Firebase Function) to fetch car details
export const fetchCarDetailsFromGemini = async (carModel: string, userLanguage?: string): Promise<CarDetails> => {
  // Use a relative path that Firebase Hosting will rewrite to our 'api' function
  const PROXY_ENDPOINT = '/api/fetch-car-details';

  let rawProxyResponseText: string = ''; // To store the raw response for debugging JSON parse errors

  try {
    const response = await fetch(PROXY_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ carModel, userLanguage }),
    });

    rawProxyResponseText = await response.text(); // Read response as text first

    if (!response.ok) {
      // If the HTTP response is not OK (e.g., 400, 500), throw an error
      let errorMsg = `Error from backend service: ${response.status} ${response.statusText}`;
      try {
        // Attempt to parse potential error JSON from the backend
        const errorJson = JSON.parse(rawProxyResponseText);
        errorMsg += ` - ${errorJson.error || 'No specific error message.'}`;
      } catch (e) {
        // If parsing error JSON fails, use the raw text
        errorMsg += ` - Could not parse error response body. Raw: "${rawProxyResponseText.substring(0, 200)}..."`; // Log first 200 chars
      }
      throw new Error(errorMsg);
    }

    // Attempt to clean potential Markdown code fences (```json) from the AI response
    let jsonStr = rawProxyResponseText.trim();
    const fenceRegex = /^```json\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[1]) {
      jsonStr = match[1].trim(); // Extract content within ```json```
    } else {
        // If no fence found, assume the whole response might be JSON,
        // but log a warning as it's unexpected based on the prompt structure.
        console.warn("Gemini response did not contain expected ```json``` fence.");
        // jsonStr remains the rawProxyResponseText.trim()
    }


    // Attempt to parse the (cleaned) string as JSON
    const parsedData = JSON.parse(jsonStr) as GeminiCarResponse;

    // --- Mapping the parsed data to the CarDetails type expected by the frontend components ---

    // Map youtube_videos
    const youtubeVideos: YouTubeVideo[] = parsedData.youtube_videos?.map(video => ({
      title: video.title,
      url: video.url,
      // Ensure thumbnailUrl is added if your types.ts CarDetails expects it
      // thumbnailUrl: video.thumbnailUrl // Add if Gemini provides and your type expects
    })) || []; // Default to empty array if youtube_videos is missing or null

    // Map manufacturer_info - Simple default if missing
    const manufacturerInfo: ManufacturerInfo = {
      name: parsedData.manufacturer_name || carModel.split(" ")[0], // Default name to first word of model
      homepage: parsedData.manufacturer_homepage || "#", // Default homepage to "#" (or a placeholder URL)
    };

    // Construct and return the CarDetails object
    return {
      youtubeVideos,
      manufacturerInfo,
      // Assign the objects directly from the parsed data!
      basicSpecs: parsedData.basic_specs, // <-- Assigning the object directly
      tireInfo: parsedData.tire_info, // <-- Assigning the new object directly

      // Map other fields, defaulting to empty array for lists and null for optional strings if undefined/null
      uniqueFeatures: parsedData.unique_features || [],
      pros: parsedData.pros || [],
      cons: parsedData.cons || [],
      rivalModels: parsedData.rival_models || [],
      imageDescriptions: parsedData.image_descriptions || [],
      marketPresence: parsedData.market_presence ?? null, // Use ?? null for potentially undefined or null strings
      maintenanceSummary: parsedData.maintenance_summary ?? null,
      recallNotices: parsedData.recall_notices || [],
      userReviewSentiment: parsedData.user_review_sentiment ?? null,
      buildAndPriceUrl: parsedData.build_and_price_url ?? null,
      ownersManualLink: parsedData.owners_manual_link ?? null,
    };

  } catch (error) {
    console.error("Error fetching car details via proxy:", error);
    let errorMessage = "Failed to fetch car details. The backend service might be unavailable or the request failed.";

    if (error instanceof Error) {
        errorMessage += ` Details: ${error.message}`;
    }

    // Provide raw response if parsing failed
    if (error instanceof SyntaxError) {
        errorMessage = "Failed to parse response from backend service. The data format might be incorrect or not valid JSON.";
        console.error("Raw proxy response leading to parse error:", rawProxyResponseText); // Log the raw text
    }

    throw new Error(errorMessage);
  }
};
