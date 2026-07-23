export const getDirectionsUrl = (
  latitude: number,
  longitude: number,
  origin?: { latitude: number; longitude: number },
): string => {
  const destination = `${latitude},${longitude}`;
  const originQuery = origin ? `&origin=${origin.latitude},${origin.longitude}` : '';
  return `https://www.google.com/maps/dir/?api=1&destination=${destination}${originQuery}`;
};

export const getStreetViewUrl = (latitude: number, longitude: number): string =>
  `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${latitude},${longitude}`;
