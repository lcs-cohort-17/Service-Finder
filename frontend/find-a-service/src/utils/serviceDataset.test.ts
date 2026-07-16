import { describe, expect, it } from 'vitest';
import { getServiceById, normalizeService } from './serviceDataset';
import type { Service } from '../types/service';

const services: Service[] = [
  {
    id: '1',
    name: 'Community Clinic',
    category: 'Clinics',
    phone: '021 555 0110',
    website: 'https://example.co.za',
    hours: 'Mon-Fri 07:00-17:00',
    address: '101 Main Road, Cape Town',
    lat: -33.9249,
    lng: 18.4241,
  },
  {
    id: '2',
    name: 'Central Library',
    category: 'Libraries',
    lat: -33.9255,
    lng: 18.428,
  },
];

describe('normalizeService', () => {
  it('defaults type to category when type is not provided', () => {
    expect(normalizeService(services[1]).type).toBe('Libraries');
  });

  it('preserves an explicit type field when present', () => {
    const withType = { ...services[0], type: 'Custom Type' };
    expect(normalizeService(withType).type).toBe('Custom Type');
  });
});

describe('getServiceById', () => {
  it('retrieves the full service record for a matching id', () => {
    const result = getServiceById(services, '1');
    expect(result).toMatchObject({
      id: '1',
      name: 'Community Clinic',
      address: '101 Main Road, Cape Town',
      phone: '021 555 0110',
      website: 'https://example.co.za',
      hours: 'Mon-Fri 07:00-17:00',
      lat: -33.9249,
      lng: 18.4241,
    });
  });

  it('returns null when no service matches the id', () => {
    expect(getServiceById(services, 'not-a-real-id')).toBeNull();
  });

  it('returns null when id is null or undefined', () => {
    expect(getServiceById(services, null)).toBeNull();
    expect(getServiceById(services, undefined)).toBeNull();
  });
});
