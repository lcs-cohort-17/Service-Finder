import { useState, useEffect, useRef } from "react";
import type { MapService, RawService } from "../types/service.types";

const API_URL = "/api/services";

interface UseApprovedServicesResult {
  services: MapService[];
  loading: boolean;
  error: Error | null;
}

/**
 * Fetches approved services once per mount and exposes loading/error state.
 *
 * KNOWN LIMITATION (flag to team / MARKER-001 owner):
 * GET /api/services currently returns the entire approved dataset with no
 * bounding-box or pagination params. That means we cannot truly avoid the
 * "unbounded fetch" the ticket calls out at the network level without a
 * backend change. This hook fetches once (not on every pan/zoom) and hands
 * off to ServiceMarkerCluster to absorb the *render* cost via chunked
 * loading. If the dataset grows into the tens of thousands, a bbox or
 * cursor-paginated endpoint becomes a hard requirement, not a nice-to-have.
 */
export default function useApprovedServices(): UseApprovedServicesResult {
  const [services, setServices] = useState<MapService[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    abortRef.current = controller;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(API_URL, { signal: controller.signal });
        if (!res.ok) {
          throw new Error(`Failed to fetch services: ${res.status}`);
        }
        const data = await res.json();
        const raw: RawService[] = Array.isArray(data)
          ? data
          : data.services || [];

        // Strip each Service down to only what the map layer needs.
        // At a few thousand markers, shaving unused fields (phone,
        // website, openingHours, wheelchair, source, timestamps...)
        // measurably reduces memory and GC pressure.
        const lean: MapService[] = raw
          .filter(
            (s): s is RawService & { latitude: number; longitude: number } =>
              typeof s?.latitude === "number" &&
              typeof s?.longitude === "number" &&
              !Number.isNaN(s.latitude) &&
              !Number.isNaN(s.longitude)
          )
          .map((s) => ({
            id: s.id,
            name: s.name ?? "",
            category: s.category ?? "",
            address: s.address ?? "",
            lat: s.latitude,
            lng: s.longitude,
          }));

        setServices(lean);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    load();
    return () => controller.abort();
  }, []);

  return { services, loading, error };
}