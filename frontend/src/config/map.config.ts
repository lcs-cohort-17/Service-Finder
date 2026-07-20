// ===========================
// Lutfeeya - MAP-001 //
// ===========================

// src/config/map.config.ts
import { MapConfig } from '../types/map.types';

const envCenterLat = Number(import.meta.env.VITE_MAP_CENTER_LAT ?? '-33.9249')
const envCenterLng = Number(import.meta.env.VITE_MAP_CENTER_LNG ?? '18.4241')
const envDefaultZoom = Number(import.meta.env.VITE_MAP_DEFAULT_ZOOM ?? '13')

export const MAP_CONFIG: MapConfig = {
  defaultCenter: [envCenterLat, envCenterLng] as [number, number],
  defaultZoom: Number.isFinite(envDefaultZoom) ? envDefaultZoom : 13,
  minZoom: 3,
  maxZoom: 18,
  tileLayer: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors',
  },
};

// Pre-defined locations for your project
export const LOCATIONS = {
  LONDON: [51.505, -0.09] as [number, number],
  NEW_YORK: [40.7128, -74.0060] as [number, number],
  TOKYO: [35.6762, 139.6503] as [number, number],
  // Add your project's primary location
  PROJECT_CENTER: [51.505, -0.09] as [number, number],
};

// Available tile layers (for future use)
export const TILE_LAYERS = {
  OPEN_STREET_MAP: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors',
  },
  SATELLITE: {
    url: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team',
  },
};
// ===========================
// Lutfeeya - MAP-001 //
// ===========================