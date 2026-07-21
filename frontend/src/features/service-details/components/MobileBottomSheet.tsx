import React, { useEffect } from 'react';
import { ServiceDetailsData } from '../types';
import ServiceDetailsContent from './ServiceDetailsContent';
import ServiceDetailsActions from './ServiceDetailsActions';

interface MobileBottomSheetProps {
  data: ServiceDetailsData;
  onDirections: (data: ServiceDetailsData) => void;
  onStreetView: (data: ServiceDetailsData) => void;
  onClose: () => void;
  onSave?: (data: ServiceDetailsData) => void;
  onShare?: (data: ServiceDetailsData) => void;
  isOpen: boolean;
}

const MobileBottomSheet: React.FC<MobileBottomSheetProps> = ({
  data,
  onDirections,
  onStreetView,
  onClose,
  onSave,
  onShare,
  isOpen,
}) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !data) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-[999] transition-opacity duration-300"
        onClick={onClose}
        style={{
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
      />

      {/* Bottom Sheet */}
      <div
        className="fixed bottom-0 left-0 right-0 z-[1000] bg-white dark:bg-gray-800 rounded-t-2xl shadow-2xl transition-transform duration-300 ease-out"
        style={{
          transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
          maxHeight: '85vh',
        }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(85vh - 20px)' }}>
          <ServiceDetailsContent data={data} onClose={onClose} />
          <ServiceDetailsActions
            data={data}
            onDirections={onDirections}
            onStreetView={onStreetView}
            onSave={onSave}
            onShare={onShare}
          />
          {/* Safe area for iPhone notch */}
          <div className="h-4" />
        </div>
      </div>
    </>
  );
};

export default MobileBottomSheet;