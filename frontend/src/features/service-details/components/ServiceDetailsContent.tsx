import React from 'react';
import { X, Phone, Globe, Clock, MapPin, Star } from 'lucide-react';
import { ServiceDetailsData } from '../types';

interface ServiceDetailsContentProps {
  data: ServiceDetailsData;
  onClose: () => void;
}

const ServiceDetailsContent: React.FC<ServiceDetailsContentProps> = ({ data, onClose }) => {
  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
            {data.name}
          </h3>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            {data.type && (
              <span className="inline-block px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                {data.type}
              </span>
            )}
            {data.rating && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full">
                <Star className="w-3 h-3 fill-current" />
                {data.rating}
              </span>
            )}
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex-shrink-0 ml-2"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>
      </div>

      {/* Content */}
      <div className="space-y-3">
        {/* Address */}
        <div className="flex items-start space-x-3">
          <MapPin className="w-4 h-4 text-gray-400 dark:text-gray-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-300">{data.address}</p>
          </div>
        </div>

        {/* Hours */}
        <div className="flex items-start space-x-3">
          <Clock className="w-4 h-4 text-gray-400 dark:text-gray-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-300">{data.hours}</p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start space-x-3">
          <Phone className="w-4 h-4 text-gray-400 dark:text-gray-500 mt-0.5 flex-shrink-0" />
          <div>
            <a
              href={`tel:${data.phone.replace(/\s/g, '')}`}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              {data.phone}
            </a>
          </div>
        </div>

        {/* Website */}
        <div className="flex items-start space-x-3">
          <Globe className="w-4 h-4 text-gray-400 dark:text-gray-500 mt-0.5 flex-shrink-0" />
          <div>
            <a
              href={data.website.startsWith('http') ? data.website : `https://${data.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline break-all"
            >
              {data.website.replace(/^https?:\/\//, '').replace(/^www\./, '')}
            </a>
          </div>
        </div>

        {/* Description (if available) */}
        {data.description && (
          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-300">{data.description}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ServiceDetailsContent;