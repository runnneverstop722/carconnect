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
  basicSpecs?: string | object | null; // Keep this as it is, but backend should aim for object structure
  marketPresence?: string | null;
  userReviewSentiment?: string | null;
  imageDescriptions?: string[];
  uniqueFeatures?: string[];
  maintenanceSummary?: string | null;
  recallNotices?: string[];
  pros?: string[];
  cons?: string[];
  rivalModels?: string[];
  youtubeVideos?: { title: string; url: string; thumbnailUrl?: string; }[];
  manufacturerInfo?: { name: string; homepage?: string; };
  buildAndPriceUrl?: string | null;
  // Add this new property:
  tireInfo?: {
    size?: string; // e.g., "235/45R18"
    model?: string; // e.g., "Michelin Pilot Sport 4" (optional, might be hard to get consistently)
    type?: string; // e.g., "All-season", "Performance" (optional)
  } | null; // Make the whole tireInfo object optional and potentially null
  ownersManualLink?: string | null;
}

// Represents a car search result stored in history
export interface HistoricCarSearch {
  modelName: string; // Acts as a unique ID for the search
  details: CarDetails;
  timestamp: number; // To sort history or for other chronological purposes
  searchLanguage: string; // Language used for this specific search
}

export interface Dealership {
  id: string;
  name: string;
  email: string;
  location: string; // General location, e.g., "City, State"
  address: string; // Specific address for map linking, e.g., "123 Main St, Anytown, USA"
  brandAffiliations: string[]; // e.g., ["Toyota", "Honda"]
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