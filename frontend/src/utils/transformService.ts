import { Service } from '../types/service.types';

export function normalizeService(raw: any): Service | null {
  const lat = typeof raw.coordinates?.latitude === 'string'
    ? parseFloat(raw.coordinates.latitude)
    : raw.coordinates?.latitude;
  const lng = typeof raw.coordinates?.longitude === 'string'
    ? parseFloat(raw.coordinates.longitude)
    : raw.coordinates?.longitude;

  if (!raw.id || !raw.name || isNaN(lat) || isNaN(lng)) return null;

  return {
    id: raw.id,
    name: raw.name,
    category: raw.category ?? 'unknown',
    address: raw.address ?? 'Unknown address',
    latitude: lat,
    longitude: lng,
    status: raw.status,
  };
}