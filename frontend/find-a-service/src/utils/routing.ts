import type { LatLngExpression } from 'leaflet';

export interface Coordinate {
  lat: number;
  lng: number;
}

export interface RouteResult {
  /** Ordered [lat, lng] points describing the route path, ready for a Leaflet Polyline. */
  coordinates: LatLngExpression[];
  distanceMeters: number;
  durationSeconds: number;
}

export type TravelProfile = 'driving' | 'walking' | 'cycling';

// Public OSRM demo server. Good for prototyping without an API key; for
// production traffic, point this at a self-hosted or paid OSRM/Valhalla
// instance instead, since the public demo has no uptime/rate guarantees.
const OSRM_BASE_URL = 'https://router.project-osrm.org/route/v1';

const PROFILE_PATH: Record<TravelProfile, string> = {
  driving: 'driving',
  walking: 'foot',
  cycling: 'bike',
};

/**
 * Fetches a real route (road/path geometry, distance, duration) between two
 * coordinates from OSRM and returns it in a shape ready to draw directly on
 * our own Leaflet map via a <Polyline>.
 */
export async function fetchRoute(
  origin: Coordinate,
  destination: Coordinate,
  profile: TravelProfile = 'driving'
): Promise<RouteResult> {
  const coordsParam = `${origin.lng},${origin.lat};${destination.lng},${destination.lat}`;
  const url = `${OSRM_BASE_URL}/${PROFILE_PATH[profile]}/${coordsParam}?overview=full&geometries=geojson`;

  let response: Response;
  try {
    response = await fetch(url);
  } catch {
    throw new Error('Could not reach the routing service. Check your connection and try again.');
  }

  if (!response.ok) {
    throw new Error('The routing service could not calculate a route right now.');
  }

  const data = await response.json();
  const route = data?.routes?.[0];

  if (!route?.geometry?.coordinates?.length) {
    throw new Error('No route could be found between these two points.');
  }

  const coordinates: LatLngExpression[] = route.geometry.coordinates.map(
    ([lng, lat]: [number, number]) => [lat, lng] as LatLngExpression
  );

  return {
    coordinates,
    distanceMeters: route.distance,
    durationSeconds: route.duration,
  };
}
