// src/components/map/ApiUsageIndicator.tsx
import React, { useEffect } from 'react';
import { useApiUsage } from '../../hooks/useApiUsage';

interface ApiUsageIndicatorProps {
  className?: string;
}

const ApiUsageIndicator: React.FC<ApiUsageIndicatorProps> = ({ className = '' }) => {
  const { count, limit, percentage, isWarning, isExceeded, load } = useApiUsage();

  // Load data on mount
  useEffect(() => {
    load();
  }, [load]);

  // Determine bar colour
  let barColor = 'bg-green-500';
  if (isExceeded) barColor = 'bg-red-600';
  else if (isWarning) barColor = 'bg-yellow-500';

  // Build status text
  let statusText = `${count} / ${limit} requests`;
  let detailText = `${Math.round(percentage)}% of daily limit used`;

  if (isExceeded) {
    statusText = '⚠️ Limit Exceeded';
    detailText = 'Using cached data. New requests blocked.';
  } else if (isWarning) {
    statusText = `⚠️ Approaching Limit`;
    detailText = `${Math.round(percentage)}% used. Reduce calls.`;
  }

  return (
    <div className={`bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-3 w-64 ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-700">API Usage</span>
        <span className={`text-xs font-semibold ${
          isExceeded ? 'text-red-600' : isWarning ? 'text-yellow-600' : 'text-gray-600'
        }`}>
          {statusText}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full transition-all duration-300 ${barColor}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>

      {/* Detail & Fallback Actions */}
      <p className={`text-xs mt-1 ${
        isExceeded ? 'text-red-600' : isWarning ? 'text-yellow-600' : 'text-gray-500'
      }`}>
        {detailText}
      </p>

      {isExceeded && (
        <div className="mt-2 text-xs bg-red-50 border border-red-200 rounded p-2 text-red-700">
          <p className="font-medium">What to do:</p>
          <ul className="list-disc ml-4">
            <li>Data is now served from cache.</li>
            <li>Try again tomorrow after reset.</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ApiUsageIndicator;