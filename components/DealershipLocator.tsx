
import React, { useState, useMemo } from 'react';
import { MOCK_DEALERSHIPS } from '../constants';
import { Dealership } from '../types';
import { MapPinIcon, MailIcon, SearchIcon, XCircleIcon } from './icons';

interface DealershipLocatorProps {
  carModel: string;
  onClose: () => void;
}

const DealershipLocator: React.FC<DealershipLocatorProps> = ({ carModel, onClose }) => {
  const [userLocation, setUserLocation] = useState('');
  const [searchAttempted, setSearchAttempted] = useState(false);

  // Basic brand extraction (e.g., "Toyota Camry" -> "Toyota")
  const carBrand = useMemo(() => carModel.split(" ")[0].toLowerCase(), [carModel]);

  const foundDealerships = useMemo(() => {
    if (!userLocation.trim() || !searchAttempted) {
      return [];
    }
    return MOCK_DEALERSHIPS.filter(dealer => 
      dealer.brandAffiliations.some(brand => brand.toLowerCase() === carBrand)
      // In a real app, we'd also filter by proximity to userLocation
      // For MVP, we're showing all dealers of the brand and letting user check map
    );
  }, [userLocation, carBrand, searchAttempted]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (userLocation.trim()) {
        setSearchAttempted(true);
    }
  };
  
  const getMailtoLink = (dealer: Dealership) => {
    const subject = `Inquiry about ${carModel} (via CarConnect)`;
    const body = `Hello ${dealer.name},\n\nI'm interested in the ${carModel} and found your dealership through CarConnect. I'm located near ${userLocation || '[my area]'}.\n\nCould you please provide more information or availability?\n\nThank you,\n[Your Name]`;
    return `mailto:${dealer.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg mt-6 relative">
      <button 
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
        aria-label="Close dealership locator"
      >
        <XCircleIcon className="h-7 w-7" />
      </button>

      <h3 className="text-xl sm:text-2xl font-semibold text-white mb-1">Find Dealerships for <span className="text-blue-400">{carModel}</span></h3>
      <p className="text-sm text-gray-400 mb-4">Enter your city or zip code to find affiliated dealers.</p>
      
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          value={userLocation}
          onChange={(e) => {
            setUserLocation(e.target.value);
            if (searchAttempted) setSearchAttempted(false); // Reset search if location changes
          }}
          placeholder="Enter your City or Zip Code"
          className="flex-grow px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          aria-label="Your location for dealership search"
        />
        <button
          type="submit"
          disabled={!userLocation.trim()}
          className="flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500 disabled:opacity-60 transition duration-150 ease-in-out"
        >
          <SearchIcon className="h-5 w-5 mr-2" />
          Search Dealers
        </button>
      </form>

      {searchAttempted && foundDealerships.length === 0 && (
        <p className="text-center text-yellow-400 bg-yellow-900/30 p-3 rounded-md">
          No dealerships found for "{carBrand}" brand based on our current mock data. Try another model or brand.
        </p>
      )}

      {foundDealerships.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-gray-200 mb-3">
            Dealerships for "{carBrand}" near {userLocation ? `"${userLocation}"` : 'your area'}:
          </h4>
          <ul className="space-y-3">
            {foundDealerships.map(dealer => (
              <li key={dealer.id} className="bg-gray-700 p-4 rounded-md shadow">
                <h5 className="text-md font-semibold text-blue-300">{dealer.name}</h5>
                <p className="text-sm text-gray-300">{dealer.address}</p>
                <p className="text-xs text-gray-400">General Location: {dealer.location}</p>
                <div className="mt-3 flex flex-col sm:flex-row gap-2">
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(dealer.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-700 focus:ring-blue-400 transition-colors"
                  >
                    <MapPinIcon className="h-4 w-4 mr-1.5" />
                    View on Map
                  </a>
                  <a
                    href={getMailtoLink(dealer)}
                    className="flex-1 inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium text-white bg-teal-500 hover:bg-teal-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-700 focus:ring-teal-400 transition-colors"
                  >
                    <MailIcon className="h-4 w-4 mr-1.5" />
                    Email Dealer
                  </a>
                </div>
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-500 mt-4 text-center">
            Note: "Near" functionality is illustrative in this MVP. Map links open Google Maps.
          </p>
        </div>
      )}
    </div>
  );
};

export default DealershipLocator;
