import type { Service } from "../types/map.types";

// Strict raw payload interface for SEARCH-003.
// All fields are optional because backend/live payload may vary.
export interface RawServiceData {
  id?: unknown;
  _id?: unknown;
  service_id?: unknown;
  serviceId?: unknown;

  name?: unknown;
  title?: unknown;
  service_name?: unknown;

  category?: unknown;
  type?: unknown;
  service_category?: unknown;

  address?: unknown;
  location?: unknown;
  street?: unknown;

  latitude?: unknown;
  lat?: unknown;

  longitude?: unknown;
  lng?: unknown;
  lon?: unknown;
}

const toNumber = (value: unknown): number => {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : 0;
};

const toStringValue = (value: unknown): string => {
  if (value === null || value === undefined) return "";
  return String(value);
};

/**
 * Converts backend/raw payload into a standardized Service.
 * Defensive conversions avoid runtime/type errors.
 */
export const transformServiceData = (rawData: RawServiceData): Service => {
  const safe: RawServiceData = rawData ?? {};

  const id =
    toStringValue(safe.id ?? safe._id ?? safe.service_id ?? safe.serviceId) || "";

  const name = toStringValue(safe.name ?? safe.title ?? safe.service_name);
  const category = toStringValue(
    safe.category ?? safe.type ?? safe.service_category
  );
  const address = toStringValue(safe.address ?? safe.location ?? safe.street);

  const latitude = toNumber(safe.latitude ?? safe.lat);
  const longitude = toNumber(safe.longitude ?? safe.lng ?? safe.lon);

  return {
    id,
    name,
    category,
    address,
    latitude,
    longitude,
  };
};


