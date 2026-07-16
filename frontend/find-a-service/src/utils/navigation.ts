/**
 * Builds a Google Maps "Directions" URL to the given coordinates.
 * Uses the documented Maps URLs API so it works without an API key.
 */
export function getDirectionsUrl(lat: number, lng: number): string {
  const destination = `${lat},${lng}`;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
}

/**
 * Builds a Google Maps Street View URL centered on the given coordinates.
 */
export function getStreetViewUrl(lat: number, lng: number): string {
  const viewpoint = `${lat},${lng}`;
  return `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${encodeURIComponent(viewpoint)}`;
}
