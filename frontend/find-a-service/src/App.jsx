import React, { useState, useEffect } from 'react';
import { Map } from './components/Map';
import { AVAILABLE_CATEGORIES } from './components/ServiceMapFilter';
import './App.css';

// Define the shape of our data locally for JavaScript state matching
function App() {
  // 1. Core data state for all public service records
  const [services, setServices] = useState([]);
  
  // 2. State for tracking multiple selected filter checkboxes
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulation: Fetching from Firestore collection / external API endpoints
  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        setLoading(true);
        // Mocking localized public service infrastructure data for testing
        const incomingData = [
          { id: '1', name: 'Cape Town Central Clinic', category: 'Clinics', lat: -33.9249, lng: 18.4241 },
          { id: '2', name: 'Central Library', category: 'Libraries', lat: -33.9255, lng: 18.4280 },
          { id: '3', name: 'Groote Schuur Hospital', category: 'Hospitals', lat: -33.9310, lng: 18.4500 },
          { id: '4', name: 'SAPS Station', category: 'Police Stations', lat: -33.9220, lng: 18.4210 },
          { id: '5', name: 'Night Haven Shelter', category: 'Shelters', lat: -33.9335, lng: 18.4250 },
        ];
        setServices(incomingData);
      } catch (err) {
        console.error("Failed to sync service data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceData();
  }, []);

  // Handle toggling checkbox selections in array state
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category) // If checked, uncheck it
        : [...prev, category]               // If unchecked, check it
    );
  };

  // 3. Filter services array based on selected checkboxes before rendering
  const filteredServices = services.filter((service) => {
    if (selectedCategories.length === 0) return true; // Show everything if none checked
    return selectedCategories.includes(service.category);
  });

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
        {/* Left Side: Category filtering layout checkboxes */}
        <section>
          <div style={{ backgroundColor: '#1e1e1e', padding: '20px', borderRadius: '8px', border: '1px solid #333' }}>
            <h3 style={{ marginBottom: '15px' }}>Filter Categories</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {AVAILABLE_CATEGORIES.map((category) => (
                <label key={category} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    style={{ width: '16px', height: '16px' }}
                  />
                  {category}
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* Right Side: Map view section receiving the filtered array data */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* We pass the array down to our typed Map component */}
          <Map services={filteredServices} />
          
          {/* Text Summary list underneath map view */}
          <div style={{ backgroundColor: '#1e1e1e', padding: '20px', borderRadius: '8px', border: '1px solid #333' }}>
            <h4>Results Found ({filteredServices.length})</h4>
            <small style={{ color: '#aaa' }}>Matching selected filters</small>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;