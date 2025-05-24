
import React, { useState } from 'react';
import { MOCK_DEALERSHIPS } from '../constants.ts';
import { Dealership } from '../types.ts';
import { MailIcon, ChevronDownIcon } from './icons.tsx';

interface DealershipEmailerProps {
  currentCarModel?: string; // Optional: To prefill email subject
}

const DealershipEmailer: React.FC<DealershipEmailerProps> = ({ currentCarModel }) => {
  const [selectedDealer, setSelectedDealer] = useState<Dealership | null>(MOCK_DEALERSHIPS[0] || null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (MOCK_DEALERSHIPS.length === 0) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-white mb-2">Contact Dealerships</h3>
        <p className="text-gray-400">No dealerships available at the moment.</p>
      </div>
    );
  }
  
  const handleDealerSelect = (dealer: Dealership) => {
    setSelectedDealer(dealer);
    setIsDropdownOpen(false);
  };

  const subject = currentCarModel 
    ? `Inquiry about ${currentCarModel}` 
    : 'Car Inquiry';
  
  const body = currentCarModel
    ? `Hello ${selectedDealer?.name},\n\nI'm interested in learning more about the ${currentCarModel}. Please provide me with more information.\n\nThank you,\n[Your Name]`
    : `Hello ${selectedDealer?.name},\n\nI'm interested in learning more about your cars. Please provide me with more information.\n\nThank you,\n[Your Name]`;

  const mailtoLink = selectedDealer 
    ? `mailto:${selectedDealer.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    : '#';

  return (
    <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
      <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4">Connect with a Dealership</h3>
      
      <div className="mb-4 relative">
        <label htmlFor="dealerSelect" className="block text-sm font-medium text-gray-300 mb-1">Select a Dealership:</label>
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white flex justify-between items-center"
          aria-haspopup="listbox"
          aria-expanded={isDropdownOpen}
        >
          {selectedDealer ? `${selectedDealer.name} (${selectedDealer.location})` : "Select a dealer"}
          <ChevronDownIcon className={`h-5 w-5 text-gray-400 transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {isDropdownOpen && (
          <ul
            className="absolute z-10 mt-1 w-full bg-gray-700 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
            role="listbox"
          >
            {MOCK_DEALERSHIPS.map((dealer) => (
              <li
                key={dealer.id}
                onClick={() => handleDealerSelect(dealer)}
                className="text-gray-200 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-gray-600"
                role="option"
                aria-selected={selectedDealer?.id === dealer.id}
              >
                <span className={`block truncate ${selectedDealer?.id === dealer.id ? 'font-semibold' : 'font-normal'}`}>
                  {dealer.name}
                </span>
                <span className="text-gray-400 ml-2 text-xs">
                  {dealer.location}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {selectedDealer && (
        <a
          href={mailtoLink}
          className="w-full flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500 transition duration-150 ease-in-out"
        >
          <MailIcon className="h-5 w-5 mr-2" />
          Compose Email to {selectedDealer.name}
        </a>
      )}
       <p className="mt-3 text-xs text-gray-500 text-center">
          This will open your default email client.
        </p>
    </div>
  );
};

export default DealershipEmailer;