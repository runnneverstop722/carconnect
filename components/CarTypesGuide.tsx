import React, { useState } from 'react';
import { CAR_TYPES_DATA } from '../constants';
import { CarTypeInfo, ExampleModel } from '../types';
import { 
  XCircleIcon, ChevronRightIcon, CarKeyIcon,
  SedanIcon, SuvIcon, HatchbackIcon, TruckIcon, // Main type icons
  VolumeOffIcon, UserGroupIcon, FuelIcon, RoadIcon, ArchiveBoxXMarkIcon, ArchiveBoxIcon, ArchiveBoxArrowDownIcon, ArrowDownCircleIcon, EyeIcon, CogIcon, MapIcon, ArrowsPointingOutIcon, ArrowsPointingInIcon, VolumeUpIcon, QuestionMarkCircleIcon, CubeTransparentIcon, LinkIcon, WrenchScrewdriverIcon // Benefit/con icons
} from './icons';

interface CarTypesGuideProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectModelAndSearch: (modelName: string) => void;
}

type ModelExampleType = 'new' | 'recent';

// Helper to map icon names from constants to actual icon component
const iconMap: { [key: string]: React.FC<{ className?: string }> } = {
  SedanIcon, SuvIcon, HatchbackIcon, TruckIcon, CarKeyIcon,
  VolumeOffIcon, UserGroupIcon, FuelIcon, RoadIcon, ArchiveBoxXMarkIcon, ArrowDownCircleIcon,
  ArchiveBoxIcon, EyeIcon, CogIcon, MapIcon, ArrowsPointingOutIcon,
  ArchiveBoxArrowDownIcon, ArrowsPointingInIcon, VolumeUpIcon, QuestionMarkCircleIcon,
  CubeTransparentIcon, LinkIcon, WrenchScrewdriverIcon,
};

const CarTypeBenefitItem: React.FC<{ item: { text: string; iconName?: string } }> = ({ item }) => {
  const BenefitIcon = item.iconName ? iconMap[item.iconName] : null;
  return (
    <li className="flex items-start text-sm text-gray-300">
      {BenefitIcon && <BenefitIcon className="h-4 w-4 mr-2 mt-0.5 text-blue-400 flex-shrink-0" />}
      <span>{item.text}</span>
    </li>
  );
};


const CarTypesGuide: React.FC<CarTypesGuideProps> = ({ isOpen, onClose, onSelectModelAndSearch }) => {
  const [selectedCarType, setSelectedCarType] = useState<CarTypeInfo | null>(null);
  const [exampleTypeToShow, setExampleTypeToShow] = useState<ModelExampleType>('new');

  if (!isOpen) return null;

  const handleSelectCarType = (carType: CarTypeInfo) => {
    setSelectedCarType(carType);
    setExampleTypeToShow('new'); // Default to new examples when a type is selected
  };

  const handleModelClick = (modelName: string) => {
    onSelectModelAndSearch(modelName);
    // onClose(); // App.tsx will handle closing the modal via onSelectModelAndSearch
  };

  const handleBackToList = () => {
    setSelectedCarType(null);
  };

  const MainIconForType = selectedCarType ? iconMap[selectedCarType.iconName] : null;
  
  const modelsToList: ExampleModel[] = selectedCarType 
    ? (exampleTypeToShow === 'new' ? selectedCarType.exampleNewModels : selectedCarType.exampleRecentModels) 
    : [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-2 sm:p-4 z-[100] backdrop-blur-sm">
      <div className="bg-gray-800 shadow-2xl rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col transform transition-all duration-300 ease-out">
        <div className="flex justify-between items-center p-4 sm:p-5 border-b border-gray-700 flex-shrink-0">
          <h2 className="text-lg sm:text-xl font-semibold text-white truncate pr-2">
            {selectedCarType ? selectedCarType.name : 'Explore Car Types'}
          </h2>
          <button onClick={selectedCarType ? handleBackToList : onClose} className="text-gray-400 hover:text-gray-200 p-1 rounded-full hover:bg-gray-700 transition-colors">
            {selectedCarType ? (
              <span className="text-sm font-medium flex items-center">
                <ChevronRightIcon className="h-5 w-5 transform rotate-180 mr-1" /> Back
              </span>
            ) : (
              <XCircleIcon className="h-7 w-7" />
            )}
          </button>
        </div>

        <div className="overflow-y-auto p-4 sm:p-5 space-y-4">
          {!selectedCarType ? (
            CAR_TYPES_DATA.map((carType) => {
              const TypeIcon = iconMap[carType.iconName];
              return (
                <button
                  key={carType.id}
                  onClick={() => handleSelectCarType(carType)}
                  className="w-full flex items-center p-3 sm:p-4 bg-gray-700 hover:bg-gray-600 rounded-lg shadow-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label={`Learn more about ${carType.name}`}
                >
                  {TypeIcon && <TypeIcon className="h-8 w-8 sm:h-10 sm:w-10 mr-3 sm:mr-4 text-blue-400 flex-shrink-0" />}
                  <div className="text-left">
                    <h3 className="text-md sm:text-lg font-semibold text-gray-100">{carType.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-400">{carType.tagline}</p>
                  </div>
                  <ChevronRightIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500 ml-auto flex-shrink-0" />
                </button>
              );
            })
          ) : (
            <div className="space-y-5">
              <div className="flex items-center mb-3">
                 {MainIconForType && <MainIconForType className="h-10 w-10 sm:h-12 sm:w-12 mr-3 sm:mr-4 text-blue-300 flex-shrink-0" />}
                 <h3 className="text-xl sm:text-2xl font-bold text-blue-300">{selectedCarType.name}</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{selectedCarType.description}</p>
              
              <div>
                <h4 className="text-md font-semibold text-green-400 mb-2">Key Advantages:</h4>
                <ul className="space-y-1 sm:space-y-1.5 pl-1">
                  {selectedCarType.advantages.map((item, index) => (
                    <CarTypeBenefitItem key={`adv-${index}`} item={item} />
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-md font-semibold text-purple-400 mb-2">Ideal For:</h4>
                <ul className="space-y-1 sm:space-y-1.5 pl-1">
                  {selectedCarType.idealFor.map((item, index) => (
                     <CarTypeBenefitItem key={`ideal-${index}`} item={item} />
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-md font-semibold text-yellow-400 mb-2">Considerations:</h4>
                <ul className="space-y-1 sm:space-y-1.5 pl-1">
                  {selectedCarType.considerations.map((item, index) => (
                     <CarTypeBenefitItem key={`con-${index}`} item={item} />
                  ))}
                </ul>
              </div>
              
              {/* Example Models Section */}
              <div className="mt-5 pt-4 border-t border-gray-700">
                <h4 className="text-md font-semibold text-sky-400 mb-3">Example Models:</h4>
                <div className="flex space-x-2 mb-3">
                  <button 
                    onClick={() => setExampleTypeToShow('new')}
                    className={`px-3 py-1.5 text-xs sm:text-sm rounded-md font-medium transition-colors ${exampleTypeToShow === 'new' ? 'bg-sky-600 text-white' : 'bg-gray-600 text-gray-300 hover:bg-gray-500'}`}
                  >
                    New Examples
                  </button>
                  <button 
                    onClick={() => setExampleTypeToShow('recent')}
                    className={`px-3 py-1.5 text-xs sm:text-sm rounded-md font-medium transition-colors ${exampleTypeToShow === 'recent' ? 'bg-sky-600 text-white' : 'bg-gray-600 text-gray-300 hover:bg-gray-500'}`}
                  >
                    Recent Examples
                  </button>
                </div>
                
                {modelsToList.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {modelsToList.map((model, index) => (
                      <button
                        key={`${exampleTypeToShow}-${index}`}
                        onClick={() => handleModelClick(model.name)}
                        className="flex items-center w-full text-left p-2 bg-gray-700 hover:bg-sky-700 rounded-md transition-colors focus:outline-none focus:ring-1 focus:ring-sky-500"
                        title={`Search for ${model.name}`}
                      >
                        <CarKeyIcon className="h-4 w-4 mr-2 text-sky-400 flex-shrink-0" />
                        <span className="text-sm text-gray-100 flex-grow">{model.name}</span>
                        {model.note && <span className="text-xs text-gray-400 ml-2 italic truncate">({model.note})</span>}
                        <ChevronRightIcon className="h-4 w-4 text-gray-500 ml-1 flex-shrink-0" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 italic">No specific {exampleTypeToShow} examples listed for this type yet.</p>
                )}
                <p className="text-xs text-gray-500 mt-3">Examples shown are for illustrative purposes. Click a model to search for more details.</p>
              </div>

               <button
                onClick={handleBackToList}
                className="mt-5 w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
              >
                <ChevronRightIcon className="h-5 w-5 transform rotate-180 mr-1" /> Back to All Car Types
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarTypesGuide;