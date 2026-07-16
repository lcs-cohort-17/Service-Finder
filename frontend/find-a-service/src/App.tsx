import { useState } from 'react';
import { SearchBar } from './components/SearchBar/SearchBar';
// @ts-ignore
import './App.css';

interface SuggestionItem {
  id: string;
  name: string;
}

// Comprehensive professional local mock data
const MOCK_SUGGESTIONS: SuggestionItem[] = [
  // --- Clinics ---
  { id: 'c1', name: 'Sea Point Civic Clinic' },
  { id: 'c2', name: 'Woodstock Community Health Clinic' },
  { id: 'c3', name: 'Albertina Sisulu Executive Clinic' },

  // --- Hospitals ---
  { id: 'h1', name: 'Groote Schuur Hospital' },
  { id: 'h2', name: 'Tygerberg Hospital' },
  { id: 'h3', name: 'Netcare Christiaan Barnard Memorial Hospital' },

  // --- Police Stations ---
  { id: 'p1', name: 'Cape Town Central SAPS' },
  { id: 'p2', name: 'Woodstock Police Station' },
  { id: 'p3', name: 'Sea Point Police Station' },

  // --- Pharmacies ---
  { id: 'ph1', name: 'Clicks Pharmacy - Golden Acre' },
  { id: 'ph2', name: 'Dis-Chem Pharmacy - V&A Waterfront' },

  // --- Dentistry ---
  { id: 'd1', name: 'Cape Town Dental Clinic' },
  { id: 'd2', name: 'Premier Dental Care Studio' },

  // --- SPCA ---
  { id: 's1', name: 'Cape of Good Hope SPCA (Grassy Park)' },

  // --- Fire Stations ---
  { id: 'f1', name: 'Roeland Street Fire Station' },
  { id: 'f2', name: 'Sea Point Fire Station' },

  // --- Home Affairs ---
  { id: 'ha1', name: 'Cape Town Home Affairs Office (Barrack St)' },

  // --- Libraries ---
  { id: 'l1', name: 'Central Library Cape Town' },
  { id: 'l2', name: 'Sea Point Public Library' },

  // --- Shelters ---
  { id: 'sh1', name: 'The Haven Night Shelter (District Six)' },
  { id: 'sh2', name: 'Culemborg Safe Space' },

  // --- Malls ---
  { id: 'm1', name: 'V&A Waterfront Mall' },
  { id: 'm2', name: 'Canal Walk Shopping Centre' },
  { id: 'm3', name: 'Cavendish Square' },

  // --- Transport Hubs: Bus Stations ---
  { id: 'tb1', name: 'Civic Centre MyCiTi Bus Station' },
  { id: 'tb2', name: 'Greyhound Intercity Bus Terminus' },

  // --- Transport Hubs: Taxi Ranks ---
  { id: 'tt1', name: 'Cape Town Station Deck Taxi Rank' },
  { id: 'tt2', name: 'Mowbray Taxi Rank' },

  // --- Transport Hubs: Train Stations ---
  { id: 'tr1', name: 'Cape Town Railway Station' },
  { id: 'tr2', name: 'Salt River Train Station' },

  // --- Schools & Universities ---
  { id: 'u1', name: 'University of Cape Town (UCT)' },
  { id: 'u2', name: 'Cape Peninsula University of Technology (CPUT)' },
  { id: 'u3', name: 'Harold Cressy High School' },
];

// Single professional Location Icon used for all suggestions
const LocationIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="svg-icon">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  
  // Starts completely empty for a first-time user experience
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const addToHistory = (query: string) => {
    if (!query.trim()) return;
    setSearchHistory((prev) => {
      // Remove duplicate if it already exists in history to bring it to the top
      const filtered = prev.filter((item) => item.toLowerCase() !== query.toLowerCase());
      return [query, ...filtered].slice(0, 5); // Store up to last 5 unique searches
    });
  };

  const handleSuggestionClick = (name: string) => {
    setSearchQuery(name);
    addToHistory(name);
    setIsFocused(false);
  };

  const getDropdownItems = (): SuggestionItem[] => {
    // 1. If search bar is empty, show user history or fallback recommendations
    if (!searchQuery.trim()) {
      // If the user has searched items before, show their history
      if (searchHistory.length > 0) {
        return searchHistory.map((item, index) => ({
          id: `history-${index}`,
          name: item,
        }));
      }

      // First-time fallback defaults when history is completely empty
      return MOCK_SUGGESTIONS.filter(
        (item) => item.id.startsWith('h') || item.id.startsWith('tt') || item.id.startsWith('u')
      ).slice(0, 5);
    }

    // 2. If user types, filter mock data matches
    return MOCK_SUGGESTIONS.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const dropdownItems = getDropdownItems();

  return (
    <div id="root">
      <div id="center">
        
        <div 
          className="search-wrapper"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        >
          <SearchBar 
            value={searchQuery}
            onSearchChange={(val) => setSearchQuery(val)}
            onClear={() => setSearchQuery('')}
          />

          {isFocused && dropdownItems.length > 0 && (
            <ul className="suggestions-dropdown">
              {dropdownItems.map((item) => (
                <li 
                  key={item.id} 
                  className="suggestion-item"
                  onMouseDown={() => handleSuggestionClick(item.name)}
                >
                  <span className="suggestion-icon-container">
                    <LocationIcon />
                  </span>
                  
                  <span className="suggestion-text">
                    {item.name}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
}

export default App;