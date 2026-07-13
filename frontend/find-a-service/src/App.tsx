import React, { useState, useMemo } from 'react';
import { SearchBar } from './components/SearchBar/SearchBar';
import { FilterButtons } from './components/FilterButtons/FilterButtons';
import { ServiceMap } from './components/ServiceMap/ServiceMap';
import { SERVICES_DATA, SERVICE_CATEGORIES } from './data/services';
import { useDebounce } from './hooks/useDebounce';
import styles from './App.module.css';

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const debouncedSearch = useDebounce(searchInput, 300);

  const filteredServices = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();
    const hasQuery = query.length > 0;
    const hasCategories = selectedCategories.length > 0;

    return SERVICES_DATA.filter((svc) => {
      if (hasCategories && !selectedCategories.includes(svc.category)) {
        return false;
      }
      if (hasQuery) {
        return svc.name.toLowerCase().includes(query);
      }
      return true;
    });
  }, [debouncedSearch, selectedCategories]);

  const handleSearchChange = (value: string) => setSearchInput(value);
  const handleClearSearch = () => {
    setSearchInput('');
    setSelectedCategories([]);
  };

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleClearCategories = () => setSelectedCategories([]);

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>
          📍 Public Service Finder <span>NYC</span>
        </h1>
        <span className={styles.resultCount}>
          {filteredServices.length}{' '}
          {filteredServices.length === 1 ? 'service' : 'services'} found
        </span>
      </header>

      <div className={styles.controls}>
        <div className={styles.searchWrapper}>
          <SearchBar
            value={searchInput}
            onChange={handleSearchChange}
            onClear={handleClearSearch}
            placeholder="Type a service name…"
          />
        </div>
        <div className={styles.filterWrapper}>
          <FilterButtons
            categories={SERVICE_CATEGORIES}
            selected={selectedCategories}
            onToggle={handleCategoryToggle}
            onClearAll={handleClearCategories}
          />
        </div>
      </div>

      <ServiceMap services={filteredServices} />
    </div>
  );
}

export default App;