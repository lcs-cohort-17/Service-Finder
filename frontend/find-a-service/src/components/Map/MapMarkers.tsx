import React from 'react';
import { MapMarkersProps, ServiceMarker } from '../../types/map';

/**
 * Map markers component
 * Renders a list of markers on the map
 */
const MapMarkers: React.FC<MapMarkersProps> = ({
  markers,
  onMarkerClick,
}) => {
  const handleMarkerClick = (marker: ServiceMarker) => {
    if (onMarkerClick) {
      onMarkerClick(marker);
    } else {
      console.log('Marker clicked:', marker.name);
    }
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
            // Note: In a real map, these would be positioned using lat/lng
            // This is just a placeholder
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
          
          {/* Tooltip with name and category (required by MARKER-001/MARKER-003) */}
          <div style={{
            position: 'absolute',
            top: '-30px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            fontSize: '12px',
            whiteSpace: 'nowrap',
            display: 'none', // Hidden by default, shown on hover
          }}>
            {marker.name} - {marker.category}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MapMarkers;