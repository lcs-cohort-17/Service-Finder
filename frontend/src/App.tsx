import { useState } from "react";
import FilterButtons from "./components/FilterButtons/FilterButtons";
import { useFilteredServices } from "./features/filters/hooks/usefilters";
import type { Service } from "./types/service.types";
import "./index.css";

function App() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // The actual service list is populated elsewhere (Firestore + external
  // API integration). This component only needs to know its shape so it
  // can filter whatever list it is given.
  const [services] = useState<Service[]>([]);

  // Recomputes automatically whenever `services` or `selectedCategories`
  // change, so the map re-renders with the correct markers without a
  // page refresh.
  const filteredServices = useFilteredServices(services, selectedCategories);

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