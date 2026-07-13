import React, { useState, useEffect } from 'react';
import { Map } from './components/Map';
import { AVAILABLE_CATEGORIES } from './components/ServiceMapFilter';
import { filterServicesByCategories } from './utils/serviceFilters';
import './App.css';

const CATEGORY_COLOR_MAP = {
  Hospitals: '#ef4444',
  Clinics: '#14b8a6',
  Libraries: '#6366f1',
  Shelters: '#a855f7',
  'Police Stations': '#1e3a8a',
  'Taxi Ranks': '#f59e0b',
  'Bus Stations': '#2563eb',
  'Train Stations': '#ec4899',
  Pharmacies: '#10b981',
  Dentists: '#06b6d4',
  'Fire Stations': '#f97316',
  'Community Centers': '#f43f5e',
  Malls: '#8b5cf6',
  'Home Affairs': '#64748b',
  'Schools/Universities': '#0ea5e9',
};

function App() {
  const [services, setServices] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(AVAILABLE_CATEGORIES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        setLoading(true);
        const incomingData = [
          { id: '1', name: 'Cape Town Central Clinic', category: 'Clinics', lat: -33.9249, lng: 18.4241 },
          { id: '2', name: 'Central Library', category: 'Libraries', lat: -33.9255, lng: 18.4280 },
          { id: '3', name: 'Groote Schuur Hospital', category: 'Hospitals', lat: -33.9310, lng: 18.4500 },
          { id: '4', name: 'SAPS Station', category: 'Police Stations', lat: -33.9220, lng: 18.4210 },
          { id: '5', name: 'Night Haven Shelter', category: 'Shelters', lat: -33.9335, lng: 18.4250 },
          { id: '6', name: 'Clicks Pharmacy', category: 'Pharmacies', lat: -33.9240, lng: 18.4230 },
          { id: '7', name: 'Cape Town Dental Care', category: 'Dentists', lat: -33.9260, lng: 18.4270 },
          { id: '8', name: 'Epping Street Fire Station', category: 'Fire Stations', lat: -33.9295, lng: 18.4310 },
          { id: '9', name: 'Langa Community Center', category: 'Community Centers', lat: -33.9445, lng: 18.5320 },
          { id: '10', name: 'Cape Town Home Affairs Office', category: 'Home Affairs', lat: -33.9250, lng: 18.4225 },
          { id: '11', name: 'V&A Waterfront Mall', category: 'Malls', lat: -33.9062, lng: 18.4181 },
          { id: '12', name: 'Cape Town Bus Station', category: 'Bus Stations', lat: -33.9180, lng: 18.4215 },
          { id: '13', name: 'Cape Town Taxi Rank', category: 'Taxi Ranks', lat: -33.9285, lng: 18.4170 },
          { id: '14', name: 'Cape Town Train Station', category: 'Train Stations', lat: -33.9240, lng: 18.4185 },
          { id: '15', name: 'University of Cape Town', category: 'Schools/Universities', lat: -33.9580, lng: 18.4600 },
        ];

        setServices(incomingData);
      } catch (err) {
        console.error('Failed to sync service data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceData();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const filteredServices = filterServicesByCategories(services, selectedCategories);

  if (loading) {
    return <div style={{ color: 'white', padding: '20px' }}>Syncing layout services...</div>;
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif', color: 'white' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1>Public Service Finder</h1>
        <p style={{ color: '#aaa' }}>Find emergency and community infrastructure near you</p>
      </header>

      <main style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
        <section>
          <div style={{ backgroundColor: '#1e1e1e', padding: '20px', borderRadius: '8px', border: '1px solid #333' }}>
            <h3 style={{ fontSize: '12px', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.12em', marginBottom: '15px' }}>
              SHOW ON MAP
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {AVAILABLE_CATEGORIES.map((category) => {
                const isActive = selectedCategories.includes(category);
                const accentColor = CATEGORY_COLOR_MAP[category] || '#9ca3af';

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategoryChange(category)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 14px',
                      borderRadius: '20px',
                      border: `1px solid ${isActive ? '#0f172a' : '#4b5563'}`,
                      backgroundColor: isActive ? '#0f172a' : 'transparent',
                      color: isActive ? '#f8fafc' : '#d1d5db',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease, border-color 0.2s ease',
                      minWidth: 'fit-content',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: accentColor,
                        display: 'inline-block',
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ fontSize: '13px', fontWeight: 600 }}>{category}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Map services={filteredServices} />

          <div style={{ backgroundColor: '#1e1e1e', padding: '20px', borderRadius: '8px', border: '1px solid #333' }}>
            <h4>Results Found ({filteredServices.length})</h4>
            <small style={{ color: '#aaa' }}>
              {filteredServices.length === 0
                ? 'No services match the active filters. Try selecting a different category.'
                : 'Matching selected filters'}
            </small>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;