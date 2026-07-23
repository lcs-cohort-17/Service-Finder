import type { Services } from './service.types.js';
import OpeningHours from 'opening_hours'


export function getCurrentTimeInMinutes() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

// This is now handled by the library, but keeping it as a convenience
export function isServiceOpen(service: Services): boolean {
  if (!service?.openingHours) return false;
  try {
    const oh = new OpeningHours(service.openingHours);
    return oh.getState(new Date());
  } catch {
    return false;
  }
}