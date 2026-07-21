import { useState } from 'react';
import FilterButtons from './components/FilterButtons/FilterButtons';
import { serviceCategories } from './components/FilterButtons/categoryStyles';
import MapPage from './views/MapPage';
import './index.css';

function App() {
  // Show all supported categories initially; filters can then narrow the map.
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => serviceCategories.map(({ id }) => id));

  return (
    <div className="app">
      <aside className="sidebar"><FilterButtons selectedCategories={selectedCategories} onSelectionChange={setSelectedCategories} /></aside>
      <MapPage selectedCategories={selectedCategories} />
    </div>
  );
}

export default App;
