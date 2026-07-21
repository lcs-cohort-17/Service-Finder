import { useState, useEffect } from "react";
import FilterButtons from "./components/FilterButtons/FilterButtons";
import { useFilteredServices } from "./features/filters/hooks/usefilters";
import type { Service } from "./types/service.types";
import { useAuthStore } from "./store/useAuthStore";
import "./index.css";

function App() {
  const { user, loading, initAuthListener } = useAuthStore();

  useEffect(() => {
    const unsubscribe = initAuthListener();
    return () => unsubscribe?.();
  }, [initAuthListener]);

  // The actual service list is populated elsewhere (Firestore + external
  // API integration). This component only needs to know its shape so it
  // can filter whatever list it is given.
  const [services] = useState<Service[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Recomputes automatically whenever `services` or `selectedCategories`
  // change, so the map re-renders with the correct markers without a
  // page refresh.
  const filteredServices = useFilteredServices(services, selectedCategories);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <FilterButtons
          selectedCategories={selectedCategories}
          onSelectionChange={setSelectedCategories}
        />
      </aside>

      <main className="map-area">
        <div className="map-placeholder">
          Map goes here ({filteredServices.length} of {services.length}{" "}
          services shown)
        </div>
      </main>
    </div>
  );
}

export default App;