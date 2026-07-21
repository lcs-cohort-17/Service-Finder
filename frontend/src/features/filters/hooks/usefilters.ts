import { useMemo } from "react";

import type { Service } from "../../../types/service.types";

/**
 * Filters a list of services down to only those whose category is
 * included in `selectedCategories`.
 *
 * - Works with services from any source (Firestore, Overpass, etc.)
 *   since it only ever reads `service.category`.
 * - Supports multiple selected categories.
 * - When `selectedCategories` is empty, no services are shown, matching
 *   the "SHOW ON MAP" filter UI where nothing is selected by default.
 */
export function filterServicesByCategory(
  services: Service[],
  selectedCategories: string[]
): Service[] {
  return services.filter((service: Service) =>
    selectedCategories.includes(service.category)
  );
}

/**
 * React hook that memoizes the filtered service list so it is only
 * recomputed when the underlying services or the selected categories
 * change. This is what should feed the map markers so the map updates
 * immediately whenever the user toggles a category, without a page
 * refresh.
 */
export function useFilteredServices(
  services: Service[],
  selectedCategories: string[]
): Service[] {
  return useMemo(
    () => filterServicesByCategory(services, selectedCategories),
    [services, selectedCategories]
  );
}
