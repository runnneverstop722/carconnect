export interface User {
  id: string;
  name: string;
  email?: string; // Optional email
}

export interface YouTubeVideo {
  title: string;
  url:string;
  thumbnail?: string; // Optional: if we decide to fetch/generate thumbnails later
}

export interface ManufacturerInfo {
  name?: string; // Optional: Gemini might not always provide name if only URL is requested
  homepage: string;
}

export interface CarDetails {
  youtubeVideos?: YouTubeVideo[];
  manufacturerInfo?: ManufacturerInfo;
  basicSpecs?: { [key: string]: string | null | undefined } | null; 
  marketPresence?: string | null;
  userReviewSentiment?: string | null;
  imageDescriptions?: string[]; // Textual descriptions from Gemini
  imageUrls?: string[]; // URLs for actual images from Google Search
  uniqueFeatures?: string[];
  maintenanceSummary?: string | null;
  recallNotices?: string[];
  pros?: string[];
  cons?: string[];
  rivalModels?: string[];
  buildAndPriceUrl?: string | null;
  ownersManualLink?: string | null;
  tireInfo?: {
    size?: string | null | undefined; 
    model?: string | null | undefined; 
    type?: string | null | undefined; 
  } | null;
}

// Represents a car search result stored in history
export interface HistoricCarSearch {
  modelName: string; // Acts as a unique ID for the search
  details: CarDetails;
  timestamp: number; // To sort history or for other chronological purposes
  searchLanguage: string; // Language used for this specific search
}

export enum AuthProvider {
  EMAIL = "email",
  GOOGLE = "google",
  APPLE = "apple",
}

export type LikedCar = string; // For now, just the model name

export interface ExampleModel {
  name: string;
  note?: string; // e.g., "Popular recent model", "Often found as used"
}

export interface CarTypeInfo {
  id: string;
  name: string;
  iconName: string; // Key for an icon component
  tagline: string;
  description: string;
  advantages: { text: string; iconName?: string }[];
  idealFor: { text: string; iconName?: string }[];
  considerations: { text: string; iconName?: string }[];
  exampleNewModels: ExampleModel[];
  exampleRecentModels: ExampleModel[]; // "Recent" implies good availability in used market
}
