// src/types/map.ts
export interface ServiceMarker {
  id: string;
  name: string;
  category: string;
  lat: number;
  lng: number;
  description?: string;
}

export interface MapContainerProps {
  center: [number, number];
  zoom: number;
  markers?: ServiceMarker[];
  onMarkerClick?: (marker: ServiceMarker) => void;
  className?: string;
  children?: React.ReactNode;
}

export interface MapControlsProps {
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onReset?: () => void;
  className?: string;
}

export interface MapMarkersProps {
  markers: ServiceMarker[];
  onMarkerClick?: (marker: ServiceMarker) => void;
}