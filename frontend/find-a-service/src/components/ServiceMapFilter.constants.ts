import {
  AVAILABLE_CATEGORY_IDS,
  CATEGORY_ID_TO_COLOR,
  CATEGORY_ID_TO_LABEL,
  type CategoryId,
} from "../types/categories";

export const AVAILABLE_CATEGORIES: CategoryId[] = [...AVAILABLE_CATEGORY_IDS];

export const CATEGORY_COLOR_MAP: Record<CategoryId, string> =
  CATEGORY_ID_TO_COLOR;

export const CATEGORY_LABEL_MAP: Record<CategoryId, string> =
  CATEGORY_ID_TO_LABEL;


