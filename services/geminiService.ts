
import { CarDetails, YouTubeVideo, ManufacturerInfo } from '../types';

interface GeminiCarResponse {
  youtube_videos: { title: string; url: string }[];
  manufacturer_homepage: string;
  manufacturer_name?: string;
  basic_specs?: string;
  unique_features?: string[];
  pros?: string[];
  cons?: string[];
  rival_models?: string[];
  image_descriptions?: string[];
  market_presence?: string;
  maintenance_summary?: string;
  recall_notices?: string[];
  user_review_sentiment?: string;
  build_and_price_url?: string;
  owners_manual_link?: string;
}

// This function now calls our backend proxy, which will be a Firebase Function
export const fetchCarDetailsFromGemini = async (carModel: string, userLanguage?: string): Promise<CarDetails> => {
  // Use a relative path that Firebase Hosting will rewrite to our 'api' function
  const PROXY_ENDPOINT = '/api/fetch-car-details'; 
  
  let rawProxyResponseText: string = '';

  try {
    const response = await fetch(PROXY_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ carModel, userLanguage }),
    });

    rawProxyResponseText = await response.text();

    if (!response.ok) {
      let errorMsg = `Error from backend service: ${response.status} ${response.statusText}`;
      try {
        const errorJson = JSON.parse(rawProxyResponseText);
        errorMsg += ` - ${errorJson.error || 'No specific error message.'}`;
      } catch (e) {
        // If parsing error JSON fails, use the raw text
        errorMsg += ` - Could not parse error response. Raw: ${rawProxyResponseText}`;
      }
      throw new Error(errorMsg);
    }
    
    let jsonStr = rawProxyResponseText.trim();
    
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }

    const parsedData = JSON.parse(jsonStr) as GeminiCarResponse;

    const youtubeVideos: YouTubeVideo[] = parsedData.youtube_videos?.map(video => ({
      title: video.title,
      url: video.url,
    })) || [];

    const manufacturerInfo: ManufacturerInfo = {
      name: parsedData.manufacturer_name || carModel.split(" ")[0],
      homepage: parsedData.manufacturer_homepage || "#",
    };

    return {
      youtubeVideos,
      manufacturerInfo,
      basicSpecs: parsedData.basic_specs,
      uniqueFeatures: parsedData.unique_features || [],
      pros: parsedData.pros || [],
      cons: parsedData.cons || [],
      rivalModels: parsedData.rival_models || [],
      imageDescriptions: parsedData.image_descriptions || [],
      marketPresence: parsedData.market_presence,
      maintenanceSummary: parsedData.maintenance_summary,
      recallNotices: parsedData.recall_notices || [],
      userReviewSentiment: parsedData.user_review_sentiment,
      buildAndPriceUrl: parsedData.build_and_price_url,
      ownersManualLink: parsedData.owners_manual_link,
    };

  } catch (error) {
    console.error("Error fetching car details via proxy:", error);
    let errorMessage = "Failed to fetch car details. The backend service might be unavailable or the request failed.";
    if (error instanceof Error) {
        errorMessage += \` Details: ${error.message}\`;
    }
    if (error instanceof SyntaxError) { 
        errorMessage = "Failed to parse response from backend service. The data format might be incorrect. Raw response from proxy: " + rawProxyResponseText;
        console.error("Raw proxy response leading to parse error:", rawProxyResponseText);
    }
    throw new Error(errorMessage);
  }
};
