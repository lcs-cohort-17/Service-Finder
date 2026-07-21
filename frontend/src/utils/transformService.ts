import { Service } from '../types/service.types';

const CATEGORY_NAMES: Record<string, string> = {
  clinic: 'Clinics', clinics: 'Clinics', hospital: 'Hospitals', hospitals: 'Hospitals',
  library: 'Libraries', libraries: 'Libraries', shelter: 'Shelters', shelters: 'Shelters',
  police: 'Police Stations', 'police station': 'Police Stations', pharmacy: 'Pharmacies',
  dentist: 'Dentists', spca: 'SPCA', 'fire station': 'Fire Stations',
  'home affairs': 'Home Affairs', mall: 'Malls', transport: 'Transport', taxi: 'Transport',
  bus_stop: 'Transport', train_station: 'Transport', school: 'Education', education: 'Education',
  university: 'Education', college: 'Education',
};

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
    category: CATEGORY_NAMES[String(raw.category ?? '').toLowerCase()] ?? raw.category ?? 'Unknown',
    address: raw.address ?? 'Unknown address',
    latitude: lat,
    longitude: lng,
    status: raw.status,
    phone: raw.phone,
    website: raw.website,
    hours: raw.hours,
    source: raw.source,
  };
}
