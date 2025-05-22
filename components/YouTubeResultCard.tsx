
import React from 'react';
import { YouTubeVideo } from '../types';
import { YouTubeIcon } from './icons';

interface YouTubeResultCardProps {
  video: YouTubeVideo;
}

const YouTubeResultCard: React.FC<YouTubeResultCardProps> = ({ video }) => {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 bg-gray-800 hover:bg-gray-700 rounded-lg shadow-md transition-all duration-200 ease-in-out transform hover:scale-[1.02]"
    >
      <div className="flex items-center space-x-3">
        <YouTubeIcon className="h-8 w-8 text-red-500 flex-shrink-0" />
        <div>
          <h4 className="text-md font-semibold text-gray-100 truncate" title={video.title}>{video.title}</h4>
          <p className="text-xs text-gray-400 truncate" title={video.url}>{video.url}</p>
        </div>
      </div>
    </a>
  );
};

export default YouTubeResultCard;
