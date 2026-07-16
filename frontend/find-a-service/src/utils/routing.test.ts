import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchRoute } from './routing';

const origin = { lat: -33.9249, lng: 18.4241 };
const destination = { lat: -33.9255, lng: 18.428 };

describe('fetchRoute', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('converts OSRM geojson coordinates ([lng, lat]) into Leaflet [lat, lng] pairs', async () => {
    const mockResponse = {
      routes: [
        {
          distance: 1234.5,
          duration: 321,
          geometry: {
            coordinates: [
              [18.4241, -33.9249],
              [18.428, -33.9255],
            ],
          },
        },
      ],
    };

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })
    );

    const result = await fetchRoute(origin, destination);

    expect(result.coordinates).toEqual([
      [-33.9249, 18.4241],
      [-33.9255, 18.428],
    ]);
    expect(result.distanceMeters).toBe(1234.5);
    expect(result.durationSeconds).toBe(321);
  });

  it('throws a friendly error when the routing service responds with an error status', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500 }));

    await expect(fetchRoute(origin, destination)).rejects.toThrow(
      'The routing service could not calculate a route right now.'
    );
  });

  it('throws a friendly error when no route is found', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ routes: [] }),
      })
    );

    await expect(fetchRoute(origin, destination)).rejects.toThrow(
      'No route could be found between these two points.'
    );
  });

  it('throws a friendly error when the network request itself fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new Error('network down'))
    );

    await expect(fetchRoute(origin, destination)).rejects.toThrow(
      'Could not reach the routing service. Check your connection and try again.'
    );
  });
});
