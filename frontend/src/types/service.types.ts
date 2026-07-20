// Minimal shape the map layer needs. Intentionally narrower than the
// full Service model (no phone/website/openingHours/etc) to keep
// marker payloads light at scale.
export interface MapService {
  id: string | number;n
  name: string;
  category: string;
  address: string;
  lat: number;
  lng: number;
}

// Shape of the raw approved-service objects coming back from
// GET /api/services (mirrors Service.toFirestore() on the backend).
export interface RawService {
  id: string | number;
  name?: string;
  category?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  [key: string]: unknown;
}