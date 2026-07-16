// ===========================
// Lutfeeya - MAP-001 //
// ===========================

// src/types/map.types.ts
import { LatLngBounds, LatLngExpression, Map as LeafletMap } from 'leaflet';

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
  /** Called with a marker's id when its pin is clicked. */
  onMarkerClick?: (id: string) => void;
  /** Id of the marker to visually highlight and auto-open the popup for. */
  focusedMarkerId?: string | null;
  /** Route path (e.g. from OSRM) drawn as a line on the map. */
  route?: LatLngExpression[] | null;
  /** The user's current position, shown as a distinct dot marker. */
  userLocation?: LatLngExpression | null;
}
// ===========================
// Lutfeeya - MAP-001 //
// ===========================
