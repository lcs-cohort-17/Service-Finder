import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useSelectedService } from './useSelectedService';
import type { Service } from '../types/service';

const services: Service[] = [
  {
    id: '1',
    name: 'Community Clinic',
    category: 'Clinics',
    address: '101 Main Road, Cape Town',
    phone: '021 555 0110',
    website: 'https://example.co.za',
    hours: 'Mon-Fri 07:00-17:00',
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

describe('useSelectedService', () => {
  it('starts with no service selected', () => {
    const { result } = renderHook(() => useSelectedService());

    expect(result.current.selectedService).toBeNull();
    expect(result.current.isServiceSelected).toBe(false);
  });

  it('retrieves the full service record from the dataset on marker click', () => {
    const { result } = renderHook(() => useSelectedService());

    act(() => {
      result.current.selectServiceFromDataset('1', services);
    });

    expect(result.current.selectedService).toMatchObject({
      id: '1',
      name: 'Community Clinic',
      address: '101 Main Road, Cape Town',
      phone: '021 555 0110',
    });
    expect(result.current.isServiceSelected).toBe(true);
  });

  it('clears the selected service when dismissed', () => {
    const { result } = renderHook(() => useSelectedService());

    act(() => {
      result.current.selectServiceFromDataset('1', services);
    });
    expect(result.current.isServiceSelected).toBe(true);

    act(() => {
      result.current.clearSelectedService();
    });

    expect(result.current.selectedService).toBeNull();
    expect(result.current.isServiceSelected).toBe(false);
  });

  it('does not select a service when the marker id has no dataset match', () => {
    const { result } = renderHook(() => useSelectedService());

    act(() => {
      result.current.selectServiceFromDataset('missing-id', services);
    });

    expect(result.current.selectedService).toBeNull();
  });

  it('selectService stores a full service object directly, normalizing its type', () => {
    const { result } = renderHook(() => useSelectedService());

    act(() => {
      result.current.selectService(services[1]);
    });

    expect(result.current.selectedService).toMatchObject({ id: '2', type: 'Libraries' });
  });
});
