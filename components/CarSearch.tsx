import React, { useState, useCallback } from 'react';
import { CarDetails, LikedCar, HistoricCarSearch } from '../types';
import LoadingSpinner from './LoadingSpinner';
import YouTubeResultCard from './YouTubeResultCard';
import ManufacturerLink from './ManufacturerLink';
import ShareContentButton from './ShareContentButton';
import { 
  SearchIcon, XCircleIcon, HeartIcon, HeartOutlineIcon, GlobeAsiaAustraliaIcon, 
  SparklesIcon, CameraIcon, WrenchScrewdriverIcon, ExclamationTriangleIcon,
  ChatBubbleLeftEllipsisIcon, CurrencyDollarIcon, BookOpenIcon // Added BookOpenIcon
} from './icons'; 

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

  const handleSearchClick = useCallback(() => {
    if (!searchTerm.trim()) {
      alert('Please enter a car model to search.');
      return;
    }
    onInitiateSearch(searchTerm.trim());
  }, [searchTerm, onInitiateSearch]);

  const handleRivalClick = (rivalModelName: string) => {
    setSearchTerm(rivalModelName); 
    onInitiateSearch(rivalModelName);
    const searchResultsElement = document.getElementById('car-search-results-area');
    if (searchResultsElement) {
        searchResultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const isCarLiked = (modelName: string | undefined) => modelName ? likedCars.includes(modelName) : false;

  const shareableContent = carDetails && currentSearchedModelForLike && carDetails.manufacturerInfo
    ? `Check out info for ${currentSearchedModelForLike} on CarConnect:\nManufacturer: ${carDetails.manufacturerInfo.name} (${carDetails.manufacturerInfo.homepage})\nSpecs: ${carDetails.basicSpecs || 'N/A'}\nMarket Presence: ${carDetails.marketPresence || 'N/A'}\nSentiment: ${carDetails.userReviewSentiment || 'N/A'}\nYouTube: ${carDetails.youtubeVideos && carDetails.youtubeVideos.length > 0 ? carDetails.youtubeVideos[0].url : 'N/A'}`
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

  const ListDisplay: React.FC<{ items?: string[]; emptyText?: string; itemClassName?: string; itemIcon?: React.ReactNode, interactive?: boolean, onItemClick?: (item: string) => void }> = 
  ({ items, emptyText = "Not available.", itemClassName = "bg-gray-700 p-2 rounded-md text-sm", itemIcon, interactive = false, onItemClick }) => {
    if (!items || items.length === 0) {
      return <p className="text-gray-400 text-sm italic">{emptyText}</p>;
    }
    return (
      <ul className="space-y-1 text-gray-300">
        {items.map((item, index) => (
          <li 
            key={index} 
            className={`${itemClassName} flex items-start ${interactive ? 'cursor-pointer hover:bg-gray-600 transition-colors' : ''} ${itemIcon ? '' : 'pl-1'}`}
            onClick={interactive && onItemClick ? () => onItemClick(item) : undefined}
            role={interactive ? 'button' : undefined}
            tabIndex={interactive ? 0 : undefined}
            onKeyPress={interactive && onItemClick ? (e) => e.key === 'Enter' && onItemClick(item) : undefined}
            title={interactive ? `Search for ${item}` : undefined}
          >
            {itemIcon && <span className="mr-2 mt-1 flex-shrink-0">{itemIcon}</span>}
            <span className="whitespace-pre-line">{item}</span>
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
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="e.g., Toyota Camry, Ford Mustang Mach-E"
              className="flex-grow px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && handleSearchClick()}
              aria-label="Car model search input"
            />
          </div>
          <p className="text-xs text-gray-400">Your browser's language setting will be used to help find relevant regional information and display results.</p>
          <button
            onClick={handleSearchClick}
            disabled={isLoading}
            className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 disabled:opacity-60 transition duration-150 ease-in-out"
          >
            <SearchIcon className="h-5 w-5 mr-2" />
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
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
              {carDetails.buildAndPriceUrl && (
                 <a
                  href={carDetails.buildAndPriceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-green-700 hover:bg-green-600 rounded-lg shadow-md transition-all duration-200 ease-in-out transform hover:scale-[1.02]"
                >
                  <div className="flex items-center space-x-3">
                    <CurrencyDollarIcon className="h-8 w-8 text-green-200 flex-shrink-0" />
                    <div>
                      <h4 className="text-md font-semibold text-white">
                        Build & Price Online
                      </h4>
                      <p className="text-xs text-green-100 truncate" title={carDetails.buildAndPriceUrl}>Configure this model</p>
                    </div>
                  </div>
                </a>
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
                <p className="text-gray-300 whitespace-pre-line">{carDetails.basicSpecs}</p>
              </DetailSection>
            )}
            
            {carDetails.imageDescriptions && carDetails.imageDescriptions.length > 0 && (
              <DetailSection title="Visual Highlights (Descriptions)" icon={<CameraIcon className="h-5 w-5 text-blue-300" />}>
                <ListDisplay 
                  items={carDetails.imageDescriptions} 
                  itemClassName="bg-gray-700 p-3 rounded-md text-sm text-gray-300 shadow" 
                  emptyText="No visual descriptions available."
                  itemIcon={<CameraIcon className="h-4 w-4 text-gray-400" />}
                />
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
                {carDetails.ownersManualLink && (
                  <div className="mt-3">
                    <a
                      href={carDetails.ownersManualLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-teal-500 transition-colors"
                    >
                      <BookOpenIcon className="h-4 w-4 mr-2" />
                      View Owner's Manual / Support (External Link)
                    </a>
                  </div>
                )}
              </DetailSection>
            )}

            {carDetails.recallNotices && carDetails.recallNotices.length > 0 && (
              <DetailSection title="Recall Information" icon={<ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" />}>
                 <ListDisplay 
                  items={carDetails.recallNotices} 
                  emptyText="No specific recall notices found by the AI." 
                  itemClassName="bg-yellow-800/30 p-2 rounded text-sm text-yellow-200"
                  itemIcon={<ExclamationTriangleIcon className="h-4 w-4 text-yellow-400"/>}
                />
                 <p className="text-xs text-gray-500 mt-2">Note: Always verify recall information with official manufacturer or government safety agency websites.</p>
              </DetailSection>
            )}
             {carDetails.recallNotices && carDetails.recallNotices.length === 0 && carDetails.manufacturerInfo && ( // Show if no recalls but other info is present
                <DetailSection title="Recall Information" icon={<ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" />}>
                     <p className="text-gray-400 text-sm italic">No specific recall notices found by the AI for this model at this time.</p>
                     <p className="text-xs text-gray-500 mt-2">Note: Always verify recall information with official manufacturer or government safety agency websites.</p>
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

            {carDetails.youtubeVideos && carDetails.youtubeVideos.length > 0 && (
              <DetailSection title="Related YouTube Videos">
                <div className="space-y-3">
                  {carDetails.youtubeVideos.map((video, index) => (
                    <YouTubeResultCard key={index} video={video} />
                  ))}
                </div>
              </DetailSection>
            )}
            {(carDetails.youtubeVideos?.length === 0 && carDetails.manufacturerInfo) && ( 
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