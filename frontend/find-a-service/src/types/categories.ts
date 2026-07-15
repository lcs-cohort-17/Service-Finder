export type CategoryId =
  | "hospital"
  | "clinic"
  | "library"
  | "shelter"
  | "police"
  | "taxi"
  | "bus"
  | "train";

export const CATEGORY_ID_TO_LABEL: Record<CategoryId, string> = {
  hospital: "Hospitals",
  clinic: "Clinics",
  library: "Libraries",
  shelter: "Shelters",
  police: "Police",
  taxi: "Taxi Ranks",
  bus: "Bus Stops",
  train: "Train Stations",
};

export const CATEGORY_ID_TO_COLOR: Record<CategoryId, string> = {
  hospital: "#ef4444",
  clinic: "#14b8a6",
  library: "#6366f1",
  shelter: "#8b5cf6",
  police: "#0346cb",
  taxi: "#f59e0b",
  bus: "#fb923c",
  train: "#ec4899",
};

export const AVAILABLE_CATEGORY_IDS: CategoryId[] = [
  "hospital",
  "clinic",
  "library",
  "shelter",
  "police",
  "taxi",
  "bus",
  "train",
];

