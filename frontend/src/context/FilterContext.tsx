import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { CATEGORY_CONFIG } from "../components/markers/categoryConfig";
import type { ServiceCategoryId } from "../types/service.types";

interface FilterContextValue {
  /** Categories currently toggled "on" and shown on the map. */
  activeCategories: Set<ServiceCategoryId>;
  /** Toggle a single category on/off. */
  toggleCategory: (categoryId: ServiceCategoryId) => void;
  /** Whether a given category is currently active. */
  isCategoryActive: (categoryId: ServiceCategoryId) => boolean;
}

const FilterContext = createContext<FilterContextValue | undefined>(
  undefined,
);

const ALL_CATEGORY_IDS = CATEGORY_CONFIG.map((category) => category.id);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [activeCategories, setActiveCategories] = useState<
    Set<ServiceCategoryId>
  >(() => new Set(ALL_CATEGORY_IDS));

  const toggleCategory = useCallback((categoryId: ServiceCategoryId) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  }, []);

  const isCategoryActive = useCallback(
    (categoryId: ServiceCategoryId) => activeCategories.has(categoryId),
    [activeCategories],
  );

  const value = useMemo<FilterContextValue>(
    () => ({ activeCategories, toggleCategory, isCategoryActive }),
    [activeCategories, toggleCategory, isCategoryActive],
  );

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}

export function useFilterContext(): FilterContextValue {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilterContext must be used within a FilterProvider");
  }
  return context;
}
