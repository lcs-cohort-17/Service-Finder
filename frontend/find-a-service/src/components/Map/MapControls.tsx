import React from 'react';
import type { MapControlsProps } from '../../types/map.ts';

/**
 * Map controls component
 * Provides zoom controls and other map utilities
 */
const MapControls: React.FC<MapControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onReset,
  className = '',
}) => {
  return (
    <div className={`map-controls ${className}`}>
      <div style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        zIndex: 1000,
      }}>
        <button
          onClick={onZoomIn}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            background: 'white',
            cursor: 'pointer',
            fontSize: '20px',
          }}
          aria-label="Zoom in"
        >
          +
        </button>
        <button
          onClick={onZoomOut}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            background: 'white',
            cursor: 'pointer',
            fontSize: '20px',
          }}
          aria-label="Zoom out"
        >
          −
        </button>
        {onReset && (
          <button
            onClick={onReset}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              background: 'white',
              cursor: 'pointer',
              fontSize: '14px',
            }}
            aria-label="Reset view"
          >
            ⌖
          </button>
        )}
      </div>
    </div>
  );
};

export default MapControls;