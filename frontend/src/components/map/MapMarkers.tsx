import React, { useState } from 'react';
import type { MapMarkersProps, ServiceMarker } from '../../types/map.types';
import MarkerPreview from './MarkerPreview';

const MapMarkers: React.FC<MapMarkersProps> = ({
  markers,
  onMarkerClick,
}) => {
  const [selectedMarker, setSelectedMarker] = useState<ServiceMarker | null>(null);

  const handleMarkerClick = (marker: ServiceMarker) => {
    // Update/replace preview (not stacking)
    setSelectedMarker(marker);

    // Still call the parent handler if provided
    if (onMarkerClick) {
      onMarkerClick(marker);
    }
  };

  const handleClosePreview = () => {
    setSelectedMarker(null);
  };

  return (
    <div className="map-markers">
      {markers.map((marker) => (
        <div
          key={marker.id}
          onClick={() => handleMarkerClick(marker)}
          style={{
            position: 'absolute',
            cursor: 'pointer',
            transform: 'translate(-50%, -100%)',
          }}
        >
          {/* Marker pin */}
          <div style={{
            width: '24px',
            height: '24px',
            backgroundColor: '#ff4757',
            borderRadius: '50% 50% 50% 0',
            transform: 'rotate(-45deg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.2s',
          }}>
            <span style={{
              transform: 'rotate(45deg)',
              color: 'white',
              fontSize: '12px',
              fontWeight: 'bold',
            }}>
              {marker.name.charAt(0)}
            </span>
          </div>
        </div>
      ))}

      {/* Show preview for selected marker */}
      {selectedMarker && (
        <MarkerPreview
          marker={selectedMarker}
          onClose={handleClosePreview}
        />
      )}
    </div>
  );
};

export default MapMarkers;
