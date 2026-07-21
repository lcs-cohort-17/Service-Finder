import React, { useEffect, useRef } from 'react';
import { ServiceDetailsData } from '../types';
import ServiceDetailsContent from './ServiceDetailsContent';
import ServiceDetailsActions from './ServiceDetailsActions';

interface DesktopPopupProps {
  data: ServiceDetailsData;
  onDirections: (data: ServiceDetailsData) => void;
  onStreetView: (data: ServiceDetailsData) => void;
  onClose: () => void;
  onSave?: (data: ServiceDetailsData) => void;
  onShare?: (data: ServiceDetailsData) => void;
  isOpen: boolean;
}

const DesktopPopup: React.FC<DesktopPopupProps> = ({
  data,
  onDirections,
  onStreetView,
  onClose,
  onSave,
  onShare,
  isOpen,
}) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !data) return null;

  return (
    <div
      ref={popupRef}
      className="absolute z-[1000] w-80 md:w-96 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 transition-all duration-200 animate-in fade-in-0 zoom-in-95"
      style={{
        transform: 'translate(-50%, -100%)',
        marginTop: '-12px',
      }}
    >
      <ServiceDetailsContent data={data} onClose={onClose} />
      <ServiceDetailsActions
        data={data}
        onDirections={onDirections}
        onStreetView={onStreetView}
        onSave={onSave}
        onShare={onShare}
      />
    </div>
  );
};

export default DesktopPopup;