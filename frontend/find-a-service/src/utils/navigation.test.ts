import { describe, expect, it } from 'vitest';
import { getDirectionsUrl, getStreetViewUrl } from './navigation';

describe('getDirectionsUrl', () => {
  it('builds a Google Maps directions URL from lat/lng', () => {
    expect(getDirectionsUrl(-33.9249, 18.4241)).toBe(
      'https://www.google.com/maps/dir/?api=1&destination=-33.9249%2C18.4241'
    );
  });
});

describe('getStreetViewUrl', () => {
  it('builds a Google Maps Street View URL from lat/lng', () => {
    expect(getStreetViewUrl(-33.9249, 18.4241)).toBe(
      'https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=-33.9249%2C18.4241'
    );
  });
});
