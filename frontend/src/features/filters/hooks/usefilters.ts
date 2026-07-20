import { CATEGORY_CONFIG } from "../../../components/markers/categoryConfig";
import { useFilterContext } from "../../../context/FilterContext";

/**
 * Convenience hook for the filter UI: exposes the full category list
 * alongside active state + toggle handler from FilterContext.
 */
export function useFilters() {
  const { activeCategories, toggleCategory, isCategoryActive } =
    useFilterContext();

  return {
    categories: CATEGORY_CONFIG,
    activeCategories,
    toggleCategory,
    isCategoryActive,
  };
}
