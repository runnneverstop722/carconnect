/// <reference types="vite/client" />

import { YouTubeVideo } from '../types';

// Update to use Vite's import.meta.env instead of process.env
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

// Add debug logging
console.log('YouTube API Key status:', {
  isDefined: !!YOUTUBE_API_KEY,
  keyLength: YOUTUBE_API_KEY?.length || 0,
  // Don't log the actual key for security
});

interface YouTubeSearchItem {
  id?: {
    videoId?: string;
  };
  snippet?: {
    title?: string;
    thumbnails?: {
      default?: {
        url?: string;
      };
    };
  };
}

export async function searchYouTubeVideos(carModel: string): Promise<YouTubeVideo[]> {
  if (!YOUTUBE_API_KEY) {
    console.warn("YouTube API key not found. Skipping YouTube video search.");
    return [];
  }

  try {
    const searchQuery = encodeURIComponent(`${carModel} review`);
    const maxResults = 3;
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&maxResults=${maxResults}&type=video&key=${YOUTUBE_API_KEY}&relevanceLanguage=en&videoEmbeddable=true&safeSearch=moderate`;
    
    // Add request debugging
    console.log('Making YouTube API request for:', carModel);
    
    const response = await fetch(url);
    const data = await response.json();

    // Add response debugging
    console.log('YouTube API response status:', response.status);
    if (!response.ok) {
      console.error('YouTube API detailed error:', data);
    }

    if (!response.ok) {
      console.error('YouTube API error:', {
        status: response.status,
        statusText: response.statusText,
        error: data.error
      });
      
      if (response.status === 403) {
        console.error('YouTube API quota exceeded or API key invalid');
      }
      return [];
    }

    if (data.error) {
      console.error('YouTube API error:', data.error);
      return [];
    }

    if (!data.items || !Array.isArray(data.items)) {
      console.warn('YouTube API returned no items or invalid response:', data);
      return [];
    }

    const videos = data.items
      .filter((item: YouTubeSearchItem) => item?.id?.videoId && item?.snippet?.title)
      .map((item: YouTubeSearchItem) => ({
        title: item.snippet!.title!,
        url: `https://www.youtube.com/watch?v=${item.id!.videoId}`,
        thumbnailUrl: item.snippet?.thumbnails?.default?.url || null
      }))
      .slice(0, 3);

    // Add results debugging
    console.log(`Found ${videos.length} videos for "${carModel}"`);
    
    return videos;

  } catch (error) {
    console.error('Error searching YouTube videos:', error);
    return [];
  }
} 