import React from 'react';
import { IncidentCategory } from '../hooks/useFilters';

interface FilterButtonsProps {
  selectedCategories: IncidentCategory[];
  onToggleCategory: (category: IncidentCategory) => void;
  // Mock counts object to fulfill ticket requirements - pass down real data later
  reportCounts?: Record<IncidentCategory, number>;
}

export const FilterButtons: React.FC<FilterButtonsProps> = ({
  selectedCategories,
  onToggleCategory,
  reportCounts = {
    All: 12,
    Accidents: 4,
    Roadworks: 2,
    Traffic: 3,
    Hijackings: 1,
    Flooding: 2,
    Other: 0,
  },
}) => {
  const categories: IncidentCategory[] = [
    'All',
    'Accidents',
    'Roadworks',
    'Traffic',
    'Hijackings',
    'Flooding',
    'Other',
  ];

  return (
    <div className="w-full px-4 py-2">
      {/* Scrollable container on mobile, wraps cleanly on larger displays */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((category) => {
          const isActive = selectedCategories.includes(category);

          return (
            <button
              key={category}
              onClick={() => onToggleCategory(category)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border transition-all duration-200 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isActive
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <span>{category}</span>
              
              {/* Count badge indicator */}
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-blue-700 text-blue-100' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {reportCounts[category]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

