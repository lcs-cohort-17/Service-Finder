/**
 * Builds a Google Maps "Directions" deep link from a destination
 * coordinate pair. Leaving the origin out lets Google Maps use the
 * visitor's current location as the starting point.
 */
export function generateDirectionsUrl(lat: number, lng: number): string {
  const destination = `${lat},${lng}`;
  return `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=driving`;
}

/**
 * Builds a Google Maps Street View deep link centred on a coordinate
 * pair.
 */
export function generateStreetViewUrl(lat: number, lng: number): string {
  const viewpoint = `${lat},${lng}`;
  return `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${viewpoint}`;
}
