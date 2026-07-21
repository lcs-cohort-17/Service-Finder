import { useState } from 'react';
import FilterButtons from './components/FilterButtons/FilterButtons';
import SerachBar from './features/search/components/SerachBar';
import MapPage from './views/MapPage';
import { useServiceStore } from './store/useServiceStore';
import { filterServicesBySearch } from './features/search/hooks/useSearch';
import './index.css';

function App() {
  // Start with an empty map; categories and search explicitly reveal services.
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const services = useServiceStore((state) => state.services);
  const selectService = useServiceStore((state) => state.selectService);
  // Search is independent of category toggles: a matching service should always
  // be discoverable, even when its category is currently hidden on the map.
  const searchResults = filterServicesBySearch(services, searchQuery);

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-search"><SerachBar value={searchQuery} onChange={setSearchQuery} results={searchResults} onSelect={(service) => { setSearchQuery(service.name); selectService(service.id); }} /></div>
        <FilterButtons selectedCategories={selectedCategories} onSelectionChange={setSelectedCategories} />
      </aside>
      <MapPage selectedCategories={selectedCategories} searchQuery={searchQuery} />
    </div>
  );
}

export default App;
