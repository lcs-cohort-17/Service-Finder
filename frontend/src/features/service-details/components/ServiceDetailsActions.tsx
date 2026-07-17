import React from 'react';
import { Navigation, Map, Share2, Bookmark } from 'lucide-react';
import { ServiceDetailsData } from '../types';

interface ServiceDetailsActionsProps {
  data: ServiceDetailsData;
  onDirections: (data: ServiceDetailsData) => void;
  onStreetView: (data: ServiceDetailsData) => void;
  onSave?: (data: ServiceDetailsData) => void;
  onShare?: (data: ServiceDetailsData) => void;
}

const ServiceDetailsActions: React.FC<ServiceDetailsActionsProps> = ({
  data,
  onDirections,
  onStreetView,
  onSave,
  onShare,
}) => {
  return (
    <div className="flex flex-col gap-2 mt-4">
      <div className="flex gap-2">
        <button
          onClick={() => onDirections(data)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
        >
          <Navigation className="w-4 h-4" />
          Directions
        </button>
        <button
          onClick={() => onStreetView(data)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 text-sm font-medium rounded-lg transition-colors"
        >
          <Map className="w-4 h-4" />
          Street View
        </button>
      </div>
      {(onSave || onShare) && (
        <div className="flex gap-2">
          {onSave && (
            <button
              onClick={() => onSave(data)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-medium rounded-lg transition-colors border border-gray-200 dark:border-gray-700"
            >
              <Bookmark className="w-4 h-4" />
              Save
            </button>
          )}
          {onShare && (
            <button
              onClick={() => onShare(data)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-medium rounded-lg transition-colors border border-gray-200 dark:border-gray-700"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ServiceDetailsActions;