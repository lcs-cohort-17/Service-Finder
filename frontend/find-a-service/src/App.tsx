import React, { useState } from "react";
import Map from "./components/Map/Map";
import { useServiceMarkers } from "./hooks/useServiceMarkers";
import FilterButtons from "./components/FilterButtons";
import type { CategoryId } from "./types/categories";

function App() {
  const projectLocation: [number, number] = [-33.9249, 18.4241];

  const [selectedCategories, setSelectedCategories] = useState<CategoryId[]>([
    "hospital",
    "clinic",
    "library",
    "shelter",
    "police",
    "taxi",
    "bus",
    "train",
  ]);

  const { markers, loading, error, offline } = useServiceMarkers(
    selectedCategories
  );

  if (loading && markers.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h2 className="text-xl font-semibold text-gray-700">
          Loading services...
        </h2>
      </div>
    );
  }

  if (error && markers.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h2 className="text-xl font-semibold text-red-600">{error}</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen h-screen overflow-hidden bg-gray-100 flex flex-col">
      <header className="bg-white shadow-sm px-4 py-3 flex-shrink-0">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-xl font-semibold text-gray-800">
            Service Finder
          </h1>
        </div>
      </header>

      {offline && (
        <div className="bg-yellow-300 px-4 py-2 text-center text-sm font-medium text-gray-800">
          Offline Mode • Showing cached services
        </div>
      )}

      <main className="flex-1 min-h-0 p-3 sm:p-4 md:p-5">
        <div className="mx-auto flex h-full max-w-7xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          <aside className="w-full sm:w-96 flex-shrink-0 border-r border-gray-200 p-4 overflow-auto">
            <FilterButtons
              selectedCategories={selectedCategories}
              onSelectionChange={(categories) =>
                setSelectedCategories(categories as CategoryId[])
              }
            />
          </aside>

          <div className="flex-1 min-h-0 w-full relative">
            <Map center={projectLocation} zoom={13} markers={markers} />

            {loading && markers.length > 0 && (
              <div className="absolute top-4 right-4 rounded-md bg-white px-3 py-2 shadow">
                Refreshing services...
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;


