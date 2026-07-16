import type { Service } from '../types/service';

/**
 * Ensures a service record has a `type` field, falling back to `category`
 * when the dataset only provides the latter. Keeps the two fields in sync
 * without requiring every caller to duplicate the value.
 */
export function normalizeService(service: Service): Service {
  return {
    ...service,
    type: service.type ?? service.category,
  };
}

/**
 * Retrieves the full service record for a given id from the dataset.
 * Returns null when the id can't be found (e.g. stale marker reference),
 * so callers can safely clear/ignore selection instead of throwing.
 */
export function getServiceById(services: Service[], id: string | null | undefined): Service | null {
  if (!id) return null;

  const found = services.find((service) => service.id === id);
  return found ? normalizeService(found) : null;
}
