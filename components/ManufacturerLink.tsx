
import React from 'react';
import { ManufacturerInfo } from '../types';
import { GlobeIcon } from './icons';

interface ManufacturerLinkProps {
  manufacturer: ManufacturerInfo;
}

const ManufacturerLink: React.FC<ManufacturerLinkProps> = ({ manufacturer }) => {
  return (
    <a
      href={manufacturer.homepage}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 bg-gray-800 hover:bg-gray-700 rounded-lg shadow-md transition-all duration-200 ease-in-out transform hover:scale-[1.02]"
    >
      <div className="flex items-center space-x-3">
        <GlobeIcon className="h-8 w-8 text-blue-400 flex-shrink-0" />
        <div>
          <h4 className="text-md font-semibold text-gray-100">
            {manufacturer.name || 'Manufacturer Homepage'}
          </h4>
          <p className="text-xs text-gray-400 truncate" title={manufacturer.homepage}>{manufacturer.homepage}</p>
        </div>
      </div>
    </a>
  );
};

export default ManufacturerLink;
