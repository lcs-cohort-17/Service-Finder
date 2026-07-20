import { useFilters } from "../hooks/usefilters";

/**
 * The "SHOW ON MAP" category toggle grid rendered in the sidebar.
 * Active categories render as solid dark pills (matching the design),
 * inactive categories fade to an outlined style.
 */
export function FilterButtons() {
  const { categories, isCategoryActive, toggleCategory } = useFilters();

  return (
    <div className="grid grid-cols-2 gap-3">
      {categories.map((category) => {
        const active = isCategoryActive(category.id);
        return (
          <button
            key={category.id}
            type="button"
            onClick={() => toggleCategory(category.id)}
            aria-pressed={active}
            className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
              active
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-white text-slate-400 ring-1 ring-inset ring-slate-200 hover:text-slate-600"
            }`}
          >
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: category.color }}
              aria-hidden="true"
            />
            <span className="truncate">{category.label}</span>
          </button>
        );
      })}
    </div>
  );
}
