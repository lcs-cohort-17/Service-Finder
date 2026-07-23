// ===========================
// Lutfeeya - MAP-001 //
// ===========================

// src/utils/mapHelpers.ts
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { MapMarker } from '../types/map.types';

// Fix Leaflet default icon issue
export const fixLeafletIcons = (): void => {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
  });
};

// Create custom marker icon
export const createCustomIcon = (
  iconUrl: string = markerIcon,
  iconSize: [number, number] = [25, 41],
  iconAnchor: [number, number] = [12, 41]
): L.Icon => {
  return L.icon({
    iconUrl,
    iconSize,
    iconAnchor,
    popupAnchor: [0, -41],
  });
};

export const createLocationPinIcon = (): L.DivIcon => {
  return L.divIcon({
    html: '<div class="text-red-600 text-3xl">📍</div>',
    iconSize: [28, 28],
    className: 'border-none bg-transparent',
  });
};

// Convert marker data to Leaflet marker format
export const prepareMarkers = (markers: MapMarker[]): any[] => {
  return markers.map((marker) => ({
    position: marker.position,
    options: {
      title: marker.title || '',
    },
    popup: marker.description || '',
  }));
};

// Calculate distance between two coordinates (Haversine formula)
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Get user's current location
export const getUserLocation = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    });
  });
};
// ===========================
// Lutfeeya - MAP-001 //
// ===========================
