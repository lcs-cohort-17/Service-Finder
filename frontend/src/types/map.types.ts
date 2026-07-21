// ===========================
// Lutfeeya - MAP-001 //
// ===========================

// src/types/map.types.ts
import { LatLngBounds, LatLngExpression, Map as LeafletMap } from 'leaflet';
import type { ReactNode } from 'react';

export interface MapConfig {
  defaultCenter: LatLngExpression;
  defaultZoom: number;
  minZoom: number;
  maxZoom: number;
  tileLayer: {
    url: string;
    attribution: string;
  };
}

export interface MapMarker {
  id: string;
  position: LatLngExpression;
  title?: string;
  description?: string;
  icon?: string;
  onClick?: () => void;
  popupContent?: ReactNode;
  isSelected?: boolean;
}

export interface MapState {
  center: LatLngExpression;
  zoom: number;
  bounds?: LatLngBounds;
}

export interface MapEvents {
  onMove?: (center: LatLngExpression) => void;
  onZoom?: (zoom: number) => void;
  onReady?: (map: LeafletMap) => void;
  onClick?: (latlng: LatLngExpression) => void;
}

export interface MapComponentProps extends MapEvents {
  center?: LatLngExpression;
  zoom?: number;
  className?: string;
  markers?: MapMarker[];
  showZoomControl?: boolean;
  showAttribution?: boolean;
  interactive?: boolean;
}
// ===========================
// Lutfeeya - MAP-001 //
// ===========================
