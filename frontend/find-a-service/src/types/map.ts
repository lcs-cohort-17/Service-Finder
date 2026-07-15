import { ReactNode } from 'react';

/**
 * Represents a service marker on the map
 * Used by MARKER-001, MARKER-002, MARKER-003
 */
export interface ServiceMarker {
  id: string;
  name: string;
  category: string;
  lat: number;
  lng: number;
  description?: string; // Optional for future use
  rating?: number;      // Optional for future use
}

/**
 * Props for the MapContainer component
 */
export interface MapContainerProps {
  center: [number, number]; // [latitude, longitude]
  zoom: number;
  markers?: ServiceMarker[];
  onMarkerClick?: (marker: ServiceMarker) => void;
  className?: string;
  children?: ReactNode; // 👈 Add this line
}

/**
 * Props for the MapControls component
 */
export interface MapControlsProps {
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onReset?: () => void;
  className?: string;
}

/**
 * Props for the MapMarkers component
 */
export interface MapMarkersProps {
  markers: ServiceMarker[];
  onMarkerClick?: (marker: ServiceMarker) => void;
}