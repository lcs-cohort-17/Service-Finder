import type { ServiceCategoryId } from "../../types/service.types";

export interface CategoryConfig {
  id: ServiceCategoryId;
  label: string;
  /** Hex colour used for both the marker pin and the sidebar dot. */
  color: string;
}

/**
 * Single source of truth for every filterable service category.
 * Order here controls the order the buttons render in the sidebar.
 */
export const CATEGORY_CONFIG: CategoryConfig[] = [
  { id: "hospitals", label: "Hospitals", color: "#ef4444" },
  { id: "clinics", label: "Clinics", color: "#14b8a6" },
  { id: "libraries", label: "Libraries", color: "#8b5cf6" },
  { id: "shelters", label: "Shelters", color: "#6366f1" },
  { id: "police", label: "Police", color: "#3b82f6" },
  { id: "taxi_ranks", label: "Taxi Ranks", color: "#f59e0b" },
  { id: "bus_stops", label: "Bus Stops", color: "#f97316" },
  { id: "train_stations", label: "Train Stations", color: "#ec4899" },
];

const CATEGORY_MAP: Record<ServiceCategoryId, CategoryConfig> =
  CATEGORY_CONFIG.reduce(
    (map, category) => {
      map[category.id] = category;
      return map;
    },
    {} as Record<ServiceCategoryId, CategoryConfig>,
  );

export function getCategoryConfig(id: ServiceCategoryId): CategoryConfig {
  return CATEGORY_MAP[id];
}
