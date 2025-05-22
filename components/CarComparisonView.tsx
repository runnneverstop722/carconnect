import React from 'react';
import { HistoricCarSearch, CarDetails } from '../types';
import { XCircleIcon, CheckIcon, MinusIcon } from './icons'; // Assuming CheckIcon and MinusIcon exist for pros/cons

interface CarComparisonViewProps {
  carsToCompare: HistoricCarSearch[];
  onExit: () => void;
}

const CarComparisonView: React.FC<CarComparisonViewProps> = ({ carsToCompare, onExit }) => {
  if (carsToCompare.length < 2) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-semibold text-white mb-4">Car Comparison</h2>
        <p className="text-gray-400">Please select at least two cars from your search history to compare.</p>
        <button
          onClick={onExit}
          className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
        >
          Back to Search
        </button>
      </div>
    );
  }

  const renderDetail = (detail: string | string[] | undefined, isList: boolean = false, itemIcon?: React.ReactNode) => {
    if (!detail) return <span className="text-gray-500 italic text-xs">N/A</span>;
    if (isList && Array.isArray(detail)) {
      if (detail.length === 0) return <span className="text-gray-500 italic text-xs">None listed</span>;
      return (
        <ul className="list-none space-y-1 text-xs">
          {detail.map((item, idx) => (
            <li key={idx} className="flex items-start">
              {itemIcon && <span className="mr-1.5 mt-0.5 flex-shrink-0">{itemIcon}</span>}
              {item}
            </li>
          ))}
        </ul>
      );
    }
    return <p className="text-gray-300 text-xs whitespace-pre-line">{String(detail)}</p>;
  };

  const features = [
    { title: "Manufacturer", render: (cd: CarDetails) => renderDetail(cd.manufacturerInfo?.name) },
    { title: "Homepage", render: (cd: CarDetails) => cd.manufacturerInfo?.homepage ? <a href={cd.manufacturerInfo.homepage} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-xs truncate block">{cd.manufacturerInfo.homepage}</a> : renderDetail(undefined) },
    { title: "Market Snapshot", render: (cd: CarDetails) => renderDetail(cd.marketPresence) },
    { title: "Basic Specifications", render: (cd: CarDetails) => renderDetail(cd.basicSpecs) },
    { title: "Unique Features", render: (cd: CarDetails) => renderDetail(cd.uniqueFeatures, true) },
    { title: "Pros", render: (cd: CarDetails) => renderDetail(cd.pros, true, <CheckIcon className="h-3 w-3 text-green-400" />) },
    { title: "Cons", render: (cd: CarDetails) => renderDetail(cd.cons, true, <MinusIcon className="h-3 w-3 text-red-400" />) },
    { title: "Rival Models", render: (cd: CarDetails) => renderDetail(cd.rivalModels, true) },
  ];

  return (
    <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-white">Car Comparison</h2>
        <button
          onClick={onExit}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
        >
          <XCircleIcon className="h-5 w-5 mr-1.5 d-inline sm:hidden" />
          <span className="hidden sm:inline">Exit Comparison</span>
          <span className="sm:hidden">Exit</span>
        </button>
      </div>

      <div className="overflow-x-auto pb-4">
        <table className="min-w-full divide-y divide-gray-700 border border-gray-700">
          <thead className="bg-gray-700/50">
            <tr>
              <th className="px-3 py-2.5 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-semibold text-blue-300 tracking-wider w-1/4 sm:w-1/5 sticky left-0 bg-gray-700/50 z-10">Feature</th>
              {carsToCompare.map(car => (
                <th key={car.modelName} className="px-3 py-2.5 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-100 tracking-wider w-1/2 sm:w-2/5">
                  {car.modelName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {features.map(feature => (
              <tr key={feature.title}>
                <td className="px-3 py-2.5 sm:px-4 sm:py-3 align-top text-xs sm:text-sm font-medium text-gray-300 sticky left-0 bg-gray-800 z-10 border-r border-gray-700">{feature.title}</td>
                {carsToCompare.map(car => (
                  <td key={car.modelName} className="px-3 py-2.5 sm:px-4 sm:py-3 align-top">
                    {feature.render(car.details)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CarComparisonView;