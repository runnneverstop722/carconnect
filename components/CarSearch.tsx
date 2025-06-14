import React, { useState, FormEvent } from 'react';
import { CarDetails, LikedCar, HistoricCarSearch } from '../types.ts';
import LoadingSpinner from './LoadingSpinner.tsx';
import YouTubeResultCard from './YouTubeResultCard.tsx';
import ManufacturerLink from './ManufacturerLink.tsx';
import ShareContentButton from './ShareContentButton.tsx';
import { 
  SearchIcon, XCircleIcon, HeartIcon, HeartOutlineIcon, GlobeAsiaAustraliaIcon, 
  SparklesIcon, CameraIcon, WrenchScrewdriverIcon, ExclamationTriangleIcon,
  ChatBubbleLeftEllipsisIcon, CurrencyDollarIcon, BookOpenIcon 
} from './icons.tsx'; 

interface CarSearchProps {
  activeSearch: HistoricCarSearch | null; 
  isLoading: boolean; 
  error: string | null; 
  onInitiateSearch: (modelName: string) => void; 
  likedCars: LikedCar[];
  onToggleLike: (modelName: string) => void;
}

const CarSearch: React.FC<CarSearchProps> = ({ 
  activeSearch, 
  isLoading, 
  error, 
  onInitiateSearch, 
  likedCars, 
  onToggleLike 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const carDetails = activeSearch?.details;
  const currentSearchedModelForLike = activeSearch?.modelName;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    onInitiateSearch(searchTerm.trim());
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!searchTerm.trim()) return;
      onInitiateSearch(searchTerm.trim());
    }
  };

  const handleRivalClick = (rivalModelName: string) => {
    setSearchTerm(rivalModelName); 
    onInitiateSearch(rivalModelName);
    const searchResultsElement = document.getElementById('car-search-results-area');
    if (searchResultsElement) {
        searchResultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const isCarLiked = (modelName: string | undefined) => {
    if (!modelName) return false;
    return likedCars.some(car => car === modelName);
  };

  const shareableContent = carDetails && currentSearchedModelForLike && carDetails.manufacturerInfo
    ? `Check out info for ${currentSearchedModelForLike} on CarConnect:\nManufacturer: ${carDetails.manufacturerInfo.name} (${carDetails.manufacturerInfo.homepage})\nSpecs: ${typeof carDetails.basicSpecs === 'string' ? carDetails.basicSpecs : 'See details'} \nMarket Presence: ${carDetails.marketPresence || 'N/A'}\nSentiment: ${carDetails.userReviewSentiment || 'N/A'}\nYouTube: ${carDetails.youtubeVideos && Array.isArray(carDetails.youtubeVideos) && carDetails.youtubeVideos.length > 0 ? carDetails.youtubeVideos[0].url : 'N/A'}`
    : `Search for cars on CarConnect!`;

  const DetailSection: React.FC<{ title: string; children: React.ReactNode; className?: string; icon?: React.ReactNode }> = ({ title, children, className, icon }) => (
    <div className={`mb-6 ${className}`}>
      <h4 className="text-md sm:text-lg font-semibold text-blue-300 mb-2 border-b border-gray-700 pb-1 flex items-center">
        {icon && <span className="mr-2">{icon}</span>}
        {title}
      </h4>
      {children}
    </div>
  );

  const ListDisplay: React.FC<{ items?: any; emptyText?: string; itemClassName?: string; itemIcon?: React.ReactNode, interactive?: boolean, onItemClick?: (item: string) => void }> = 
  ({ items, emptyText = "Not available.", itemClassName = "bg-gray-700 p-2 rounded-md text-sm", itemIcon, interactive = false, onItemClick }) => {
    if (!items || !Array.isArray(items) || items.length === 0) { 
      return <p className="text-gray-400 text-sm italic">{emptyText}</p>;
    }

    return (
      <ul className="space-y-1 text-gray-300">
        {items.map((item, index) => (
          <li 
            key={index} 
            className={`${itemClassName} flex items-start ${interactive ? 'cursor-pointer hover:bg-gray-600 transition-colors' : ''} ${itemIcon ? '' : 'pl-1'}`}
            onClick={interactive && onItemClick && typeof item === 'string' ? () => onItemClick(item) : undefined} 
            role={interactive ? 'button' : undefined}
            tabIndex={interactive ? 0 : undefined}
            onKeyPress={interactive && onItemClick && typeof item === 'string' ? (e) => e.key === 'Enter' && onItemClick(item) : undefined} 
            title={interactive && typeof item === 'string' ? `Search for ${item}` : undefined} 
          >
            {itemIcon && <span className="mr-2 mt-1 flex-shrink-0">{itemIcon}</span>}
            <span className="whitespace-pre-line">{String(item)}</span> 
            {interactive && <SparklesIcon className="h-4 w-4 ml-auto text-yellow-400 self-center flex-shrink-0" />}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
        <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Find Your Ride</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter a car model (e.g., Toyota Camry 2024)"
              className="flex-grow px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isLoading}
            />
          </div>
          <p className="text-xs text-gray-400">Your browser's language setting will be used to help find relevant regional information and display results.</p>
          <button
            type="submit"
            disabled={isLoading || !searchTerm.trim()}
            className={`w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 disabled:opacity-60 transition duration-150 ease-in-out ${
              isLoading || !searchTerm.trim() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <SearchIcon className="h-5 w-5 mr-2" />
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      {isLoading && <LoadingSpinner />}
      
      {error && !isLoading && (
        <div className="bg-red-800/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg relative shadow-md" role="alert">
          <div className="flex items-center">
            <XCircleIcon className="h-6 w-6 mr-3 text-red-300" />
            <div>
              <strong className="font-bold">Oops! Something went wrong.</strong>
              <span className="block sm:inline ml-1">{error}</span>
            </div>
          </div>
        </div>
      )}

      {activeSearch && carDetails && !isLoading && !error && (
        <div id="car-search-results-area" className="space-y-6 p-4 sm:p-6 bg-gray-800 rounded-lg shadow-lg">
          <div>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-3">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-100">
                  Results for "{activeSearch.modelName}"
                </h3>
                <p className="text-xs text-gray-400">
                  {activeSearch.searchLanguage && `Language Context: ${activeSearch.searchLanguage}`}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {currentSearchedModelForLike && (
                  <button
                    onClick={() => onToggleLike(currentSearchedModelForLike)}
                    className={`p-2 rounded-full transition-colors duration-150 ease-in-out 
                                ${isCarLiked(currentSearchedModelForLike) ? 'text-red-500 hover:text-red-400 bg-gray-700' : 'text-gray-400 hover:text-red-500 bg-gray-700 hover:bg-gray-600'}`}
                    aria-label={isCarLiked(currentSearchedModelForLike) ? 'Unlike this car' : 'Like this car'}
                    title={isCarLiked(currentSearchedModelForLike) ? 'Unlike' : 'Like'}
                  >
                    {isCarLiked(currentSearchedModelForLike) ? <HeartIcon className="h-6 w-6" /> : <HeartOutlineIcon className="h-6 w-6" />}
                  </button>
                )}
                <ShareContentButton textToShare={shareableContent} />
              </div>
            </div>
          
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {carDetails.manufacturerInfo && (
                <ManufacturerLink manufacturer={carDetails.manufacturerInfo} />
              )}
            </div>

            {carDetails.marketPresence && (
              <DetailSection title="Market Snapshot" icon={<GlobeAsiaAustraliaIcon className="h-5 w-5 text-blue-300" />}>
                <p className="text-gray-300 italic">{carDetails.marketPresence}</p>
              </DetailSection>
            )}
            
            {carDetails.userReviewSentiment && (
              <DetailSection title="Community Voice (Sentiment)" icon={<ChatBubbleLeftEllipsisIcon className="h-5 w-5 text-blue-300" />}>
                <p className="text-gray-300 italic">{carDetails.userReviewSentiment}</p>
              </DetailSection>
            )}

            {carDetails.basicSpecs && (
              <DetailSection title="Basic Specifications">
                {typeof carDetails.basicSpecs === 'object' && carDetails.basicSpecs !== null ? (
                  <ul className="space-y-1 text-gray-300">
                    {Object.entries(carDetails.basicSpecs).map(([key, value]) => ( 
                      <li key={key} className="text-sm">
                        <span className="font-semibold text-blue-200 capitalize">{key.replace(/([A-Z]+(?=[A-Z][a-z])|[A-Z](?=[a-z]))/g, ' $1').trim()}:</span>{' '}
                        <span className="whitespace-pre-line">{String(value)}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-300 whitespace-pre-line">{String(carDetails.basicSpecs || '')}</p>
                )}
              </DetailSection>
            )}

            {carDetails.tireInfo && (carDetails.tireInfo.size || carDetails.tireInfo.model || carDetails.tireInfo.type) && (
              <DetailSection title="Tire Information" icon={<WrenchScrewdriverIcon className="h-5 w-5 text-blue-300" />}>
                {carDetails.tireInfo.size && (
                  <p className="text-gray-300 text-sm mb-1">
                    <span className="font-semibold text-blue-200">Size:</span> {carDetails.tireInfo.size}
                  </p>
                )}
                {carDetails.tireInfo.model && (
                  <p className="text-gray-300 text-sm mb-1">
                    <span className="font-semibold text-blue-200">Model:</span> {carDetails.tireInfo.model}
                  </p>
                )}
                {carDetails.tireInfo.type && (
                  <p className="text-gray-300 text-sm">
                    <span className="font-semibold text-blue-200">Type:</span> {carDetails.tireInfo.type}
                  </p>
                )}
                {!(carDetails.tireInfo.size || carDetails.tireInfo.model || carDetails.tireInfo.type) && (
                    <p className="text-gray-400 text-sm italic">Tire information not available.</p>
                )}
              </DetailSection>
            )}
            
            {/* Updated Image Gallery Section */}
            {carDetails.imageUrls && carDetails.imageUrls.length > 0 && (
              <DetailSection title="Image Gallery" icon={<CameraIcon className="h-5 w-5 text-blue-300" />}>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {carDetails.imageUrls.map((url, index) => (
                    <div key={index} className="aspect-video bg-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                      <img 
                        src={url} 
                        alt={`${activeSearch.modelName} image ${index + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
                 <p className="text-xs text-gray-500 mt-2 text-center">Images provided by Google Custom Search.</p>
              </DetailSection>
            )}

            {carDetails.uniqueFeatures && carDetails.uniqueFeatures.length > 0 && (
              <DetailSection title="Unique Features">
                <ListDisplay items={carDetails.uniqueFeatures} emptyText="No unique features listed." itemClassName="bg-gray-700/70 p-2 rounded text-sm"/>
              </DetailSection>
            )}
            
            {carDetails.maintenanceSummary && (
              <DetailSection title="Maintenance Highlights" icon={<WrenchScrewdriverIcon className="h-5 w-5 text-blue-300" />}>
                <p className="text-gray-300 whitespace-pre-line">{carDetails.maintenanceSummary}</p>
              </DetailSection>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {carDetails.pros && carDetails.pros.length > 0 && (
                <DetailSection title="Pros (Common Impressions)" className="bg-gray-750 p-3 rounded-md">
                  <ListDisplay items={carDetails.pros} emptyText="No pros listed." itemClassName="text-green-300" />
                </DetailSection>
              )}
              {carDetails.cons && carDetails.cons.length > 0 && (
                <DetailSection title="Cons (Common Impressions)" className="bg-gray-750 p-3 rounded-md">
                  <ListDisplay items={carDetails.cons} emptyText="No cons listed." itemClassName="text-red-300"/>
                </DetailSection>
              )}
            </div>
            
            {carDetails.rivalModels && carDetails.rivalModels.length > 0 && (
               <DetailSection title="Rival Models (Click to Explore)">
                <ListDisplay 
                  items={carDetails.rivalModels} 
                  emptyText="No rival models listed." 
                  interactive={true}
                  onItemClick={handleRivalClick}
                  itemClassName="bg-gray-700 p-2 rounded-md text-sm hover:bg-indigo-700"
                />
              </DetailSection>
            )}

            {carDetails.youtubeVideos && Array.isArray(carDetails.youtubeVideos) && carDetails.youtubeVideos.length > 0 && (
              <DetailSection title="Related YouTube Videos">
                <div className="space-y-3">
                  {Array.isArray(carDetails.youtubeVideos) && carDetails.youtubeVideos.map((video, index) => (
                    <YouTubeResultCard key={index} video={video} />
                  ))}
                </div>
              </DetailSection>
            )}

            {carDetails && (!carDetails.youtubeVideos || !Array.isArray(carDetails.youtubeVideos) || carDetails.youtubeVideos.length === 0) && carDetails.manufacturerInfo && ( 
                <DetailSection title="Related YouTube Videos">
                    <p className="text-gray-400">No YouTube videos found for this model.</p>
                </DetailSection>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CarSearch;