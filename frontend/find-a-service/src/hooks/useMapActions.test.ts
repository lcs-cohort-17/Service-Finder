import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useMapActions } from './useMapActions';
import * as routing from '../utils/routing';
import * as mapHelpers from '../utils/mapHelpers';
import type { Service } from '../types/service';

const service: Service = {
  id: '1',
  name: 'Community Clinic',
  category: 'Clinics',
  lat: -33.9249,
  lng: 18.4241,
};

const fakeMap = {
  fitBounds: vi.fn(),
  setView: vi.fn(),
  getZoom: vi.fn().mockReturnValue(13),
};

describe('useMapActions', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    fakeMap.fitBounds.mockClear();
    fakeMap.setView.mockClear();
  });

  it('locateService centers the map on the service and opens its popup without leaving the app', () => {
    const { result } = renderHook(() => useMapActions());

    act(() => {
      result.current.handleMapReady(fakeMap as any);
    });

    act(() => {
      result.current.locateService(service);
    });

    expect(fakeMap.setView).toHaveBeenCalledWith([service.lat, service.lng], 16, { animate: true });
    expect(result.current.focusedServiceId).toBe('1');
  });

  it('showDirectionsTo fetches a real route and draws it on our own map instead of opening Google Maps', async () => {
    vi.spyOn(mapHelpers, 'getUserLocation').mockResolvedValue({
      coords: { latitude: -33.93, longitude: 18.42 },
    } as GeolocationPosition);

    vi.spyOn(routing, 'fetchRoute').mockResolvedValue({
      coordinates: [
        [-33.93, 18.42],
        [-33.9249, 18.4241],
      ],
      distanceMeters: 2000,
      durationSeconds: 600,
    });

    const { result } = renderHook(() => useMapActions());

    act(() => {
      result.current.handleMapReady(fakeMap as any);
    });

    await act(async () => {
      await result.current.showDirectionsTo(service);
    });

    await waitFor(() => {
      expect(result.current.route).toEqual([
        [-33.93, 18.42],
        [-33.9249, 18.4241],
      ]);
    });

    expect(result.current.routeSummary).toEqual({ distanceKm: 2, durationMin: 10 });
    expect(result.current.userLocation).toEqual([-33.93, 18.42]);
    expect(fakeMap.fitBounds).toHaveBeenCalled();
    expect(result.current.routeError).toBeNull();
  });

  it('showDirectionsTo surfaces a friendly error and clears any previous route when routing fails', async () => {
    vi.spyOn(mapHelpers, 'getUserLocation').mockRejectedValue(new Error('Permission denied'));

    const { result } = renderHook(() => useMapActions());

    await act(async () => {
      await result.current.showDirectionsTo(service);
    });

    expect(result.current.route).toBeNull();
    expect(result.current.routeError).toBe('Permission denied');
  });

  it('clearRoute resets route, summary, and error state', async () => {
    vi.spyOn(mapHelpers, 'getUserLocation').mockRejectedValue(new Error('nope'));
    const { result } = renderHook(() => useMapActions());

    await act(async () => {
      await result.current.showDirectionsTo(service);
    });
    expect(result.current.routeError).not.toBeNull();

    act(() => {
      result.current.clearRoute();
    });

    expect(result.current.route).toBeNull();
    expect(result.current.routeSummary).toBeNull();
    expect(result.current.routeError).toBeNull();
  });
});
