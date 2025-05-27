import React from 'react';
import { LikedCar } from '../types.ts';
import { TrashIcon } from './icons.tsx';

interface LikedCarsListProps {
  likedCars: LikedCar[];
  onUnlikeCar: (modelName: string) => void;
}

const LikedCarsList: React.FC<LikedCarsListProps> = ({ likedCars, onUnlikeCar }) => {
  if (likedCars.length === 0) {
    return (
      <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg text-center">
        <h3 className="text-xl font-semibold text-white mb-2">My Liked Cars</h3>
        <p className="text-gray-400">You haven't liked any cars yet. Start searching and tap the heart icon!</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
      <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4">My Liked Cars ({likedCars.length})</h3>
      <ul className="space-y-3">
        {likedCars.map((carModel) => (
          <li
            key={carModel}
            className="flex flex-col sm:flex-row items-center justify-between p-3 bg-gray-700 rounded-md shadow hover:bg-gray-600/70 transition-colors duration-150"
            aria-label={`Liked car: ${carModel}`}
          >
            <span className="text-lg text-gray-100 font-medium mb-2 sm:mb-0 sm:mr-4 flex-grow">{carModel}</span>
            <div className="flex space-x-2 flex-shrink-0">
              <button
                onClick={() => onUnlikeCar(carModel)}
                className="flex items-center px-3 py-1.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-700 focus:ring-red-500 transition-colors"
                title="Remove from liked"
                aria-label={`Unlike ${carModel}`}
              >
                <TrashIcon className="h-4 w-4 mr-1.5" />
                Unlike
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LikedCarsList;