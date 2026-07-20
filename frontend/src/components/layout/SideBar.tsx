import { FilterButtons } from "../../features/filters/components/FilterButtons";

/**
 * Left-hand panel matching the "SHOW ON MAP" filter list in the design.
 */
export function SideBar() {
  return (
    <aside className="w-full shrink-0 overflow-y-auto bg-white p-6 md:w-[340px]">
      <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">
        Show on map
      </h2>
      <div className="mt-4">
        <FilterButtons />
      </div>
    </aside>
  );
}
