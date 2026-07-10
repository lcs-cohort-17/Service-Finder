// ===========================
// Lutfeeya - MAP-001 //
// ===========================

// src/components/MapWrapper/MapWrapper.tsx
import React from 'react';
import Map from '../Map/Map';
import { MapComponentProps } from '../../types/map.types';

interface MapWrapperProps extends MapComponentProps {
  height?: string | number;
  width?: string | number;
  containerClassName?: string;
}

const MapWrapper: React.FC<MapWrapperProps> = ({
  height = '100%',
  width = '100%',
  containerClassName = '',
  ...mapProps
}) => {
  return (
    <div
      className={`map-wrapper ${containerClassName}`}
      style={{ height, width }}
    >
      <Map {...mapProps} />
    </div>
  );
};

export default MapWrapper;
// ===========================
// Lutfeeya - MAP-001 //
// ===========================
