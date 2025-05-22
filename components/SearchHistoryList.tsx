import React from 'react';
import { HistoricCarSearch } from '../types';
import { TrashIcon, CheckSquareIcon, SquareIcon, ClipboardListIcon, EyeIcon } from './icons'; // Assuming CheckSquareIcon and SquareIcon exist

interface SearchHistoryListProps {
  historicSearches: HistoricCarSearch[];
  activeSearchModelName?: string | null;
  onSelectSearch: (search: HistoricCarSearch) => void;
  onClearHistory: () => void;
  comparisonList: HistoricCarSearch[];
  onToggleCompare: (searchItem: HistoricCarSearch) => void;
  onStartComparison: () => void;
  canCompare: boolean;
}

const SearchHistoryList: React.FC<SearchHistoryListProps> = ({
  historicSearches,
  activeSearchModelName,
  onSelectSearch,
  onClearHistory,
  comparisonList,
  onToggleCompare,
  onStartComparison,
  canCompare
}) => {
  if (historicSearches.length === 0) {
    return null; // Don't render anything if no history
  }

  const isSelectedForComparison = (modelName: string) => {
    return comparisonList.some(item => item.modelName === modelName);
  };

  return (
    <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
        <h3 className="text-xl sm:text-2xl font-semibold text-white">Search History</h3>
        <div className="flex gap-2">
          {historicSearches.length > 0 && (
             <button
                onClick={onStartComparison}
                disabled={!canCompare}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors
                            ${canCompare 
                                ? 'bg-green-600 hover:bg-green-700 text-white' 
                                : 'bg-gray-600 text-gray-400 cursor-not-allowed'}`}
                title={canCompare ? "Compare selected cars" : "Select at least 2 cars to compare"}
              >
                <ClipboardListIcon className="h-5 w-5 mr-2" />
                Compare ({comparisonList.length})
              </button>
          )}
          <button
            onClick={onClearHistory}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-red-500 transition-colors"
            title="Clear all search history"
          >
            <TrashIcon className="h-5 w-5 mr-1.5" />
            Clear History
          </button>
        </div>
      </div>
      <ul className="space-y-2 max-h-72 overflow-y-auto pr-2">
        {historicSearches.map((search) => (
          <li
            key={search.modelName + search.timestamp} // Ensure key is unique if model name can repeat with different timestamps
            className={`flex flex-col sm:flex-row items-center justify-between p-3 rounded-md transition-all duration-150 ease-in-out
                        ${activeSearchModelName === search.modelName ? 'bg-blue-700/50 ring-2 ring-blue-500' : 'bg-gray-700 hover:bg-gray-600/70'}`}
          >
            <div 
              className="flex-grow text-gray-100 font-medium mb-2 sm:mb-0 sm:mr-4 cursor-pointer"
              onClick={() => onSelectSearch(search)}
              onKeyPress={(e) => e.key === 'Enter' && onSelectSearch(search)}
              role="button"
              tabIndex={0}
              title={`View details for ${search.modelName}`}
            >
              {search.modelName}
              <span className="text-xs text-gray-400 ml-2">({new Date(search.timestamp).toLocaleDateString()})</span>
            </div>
            <div className="flex space-x-2 flex-shrink-0">
              <button
                onClick={() => onSelectSearch(search)}
                className="flex items-center px-3 py-1 text-xs font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-md focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-gray-700 focus:ring-sky-500 transition-colors"
                title={`View details for ${search.modelName}`}
              >
                <EyeIcon className="h-4 w-4 mr-1" /> View
              </button>
              <button
                onClick={() => onToggleCompare(search)}
                className={`flex items-center px-3 py-1 text-xs font-medium rounded-md transition-colors
                            ${isSelectedForComparison(search.modelName) 
                                ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                                : 'bg-gray-600 hover:bg-gray-500 text-gray-200'}`}
                title={isSelectedForComparison(search.modelName) ? `Remove ${search.modelName} from comparison` : `Add ${search.modelName} to comparison`}
              >
                {isSelectedForComparison(search.modelName) ? 
                  <CheckSquareIcon className="h-4 w-4 mr-1" /> : 
                  <SquareIcon className="h-4 w-4 mr-1" />
                }
                Compare
              </button>
            </div>
          </li>
        ))}
      </ul>
       {historicSearches.length > 0 && comparisonList.length < 2 && (
        <p className="text-xs text-yellow-400 mt-3 text-center">Select at least two cars from history to enable comparison.</p>
      )}
    </div>
  );
};

export default SearchHistoryList;