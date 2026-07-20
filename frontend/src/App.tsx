import { useState } from "react";
import FilterButtons from "./components/FilterButtons/FilterButtons";
import "./index.css";

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

      <main className="map-area">
        <div className="map-placeholder">
          Map goes here
        </div>
      </main>
    </div>
  );
}

export default App;