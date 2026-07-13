import { useState } from 'react';
import { SearchBar } from './components/SearchBar/SearchBar';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div id="root">
      <div id="center">
        {/* Render your new SearchBar right here */}
        <SearchBar 
          value={searchQuery}
          onSearchChange={(val) => setSearchQuery(val)}
          onClear={() => setSearchQuery('')}
        />

        {searchQuery && (
          <p style={{ fontSize: '14px', marginTop: '16px' }}>
            Searching for: <code>{searchQuery}</code>
          </p>
        )}
      </div>
    </div>
  );
}

export default App;