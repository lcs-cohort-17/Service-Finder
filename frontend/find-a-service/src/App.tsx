import { useState } from "react";
import "./App.css";
import FilterButtons from "./components/FilterButtons";

function App() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="app">
      <aside className="sidebar">
        <FilterButtons
          selectedCategories={selectedCategories}
          onSelectionChange={setSelectedCategories}
        />
      </aside>

      <main className="map-container">
        <div className="map-placeholder">
          <h2>Leaflet Map</h2>

          <p>Selected Categories:</p>

          <p>{selectedCategories.join(", ") || "None"}</p>
        </div>
      </main>
    </div>
  );
}

export default App;