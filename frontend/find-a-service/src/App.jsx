import React, { useState } from 'react';
import { ServiceMapFilter, AVAILABLE_CATEGORIES } from './components/ServiceMapFilter';
import { Map } from './components/Map'; // Or your map import

// 1. Mock services or data pulled from your Store/Firestore API
const mockServices = [
  { id: '1', name: 'Community Clinic', category: 'Clinics', lat: -33.9249, lng: 18.4241 },
  { id: '2', name: 'Central Library', category: 'Libraries', lat: -33.9255, lng: 18.4280 },
  { id: '3', name: 'City Hospital', category: 'Hospitals', lat: -33.9310, lng: 18.4500 },
  { id: '4', name: 'Downtown Pharmacy', category: 'Pharmacies', lat: -33.9200, lng: 18.4300 },
  { id: '5', name: 'Eastside Clinic', category: 'Clinics', lat: -33.9100, lng: 18.4400 },
  { id: '6', name: 'Westside Library', category: 'Libraries', lat: -33.9150, lng: 18.4350 },
  { id: '7', name: 'North Hospital', category: 'Hospitals', lat: -33.9300, lng: 18.4550 },
  { id: '8', name: 'South Pharmacy', category: 'Pharmacies', lat: -33.9250, lng: 18.4250 },
  { id: '9', name: 'Greenwood Clinic', category: 'Clinics', lat: -33.9180, lng: 18.4320 },
  { id: '10', name: 'Riverside Library', category: 'Libraries', lat: -33.9220, lng: 18.4270 },
  { id: '11', name: 'Lakeside Hospital', category: 'Hospitals', lat: -33.9280, lng: 18.4480 },
  { id: '12', name: 'Hilltop Pharmacy', category: 'Pharmacies', lat: -33.9190, lng: 18.4290 },
  { id: '13', name: 'Sunset Clinic', category: 'Clinics', lat: -33.9170, lng: 18.4310 },
  { id: '14', name: 'Mountainview Library', category: 'Libraries', lat: -33.9230, lng: 18.4260 },
  { id: '15', name: 'Valley Hospital', category: 'Hospitals', lat: -33.9290, lng: 18.4490 },
  { id: '16', name: 'Seaside Pharmacy', category: 'Pharmacies', lat: -33.9260, lng: 18.4240 },
  { id: '17', name: 'Harbor Clinic', category: 'Clinics', lat: -33.9160, lng: 18.4330 },
  { id: '18', name: 'Forest Library', category: 'Libraries', lat: -33.9210, lng: 18.4250 },
  { id: '19', name: 'Canyon Hospital', category: 'Hospitals', lat: -33.9270, lng: 18.4470 },
  { id: '20', name: 'Prairie Pharmacy', category: 'Pharmacies', lat: -33.9240, lng: 18.4230 },
  { id: '21', name: 'Downtown Clinic', category: 'Clinics', lat: -33.9155, lng: 18.4305 },
  { id: '22', name: 'Uptown Library', category: 'Libraries', lat: -33.9225, lng: 18.4275 },
  { id: '23', name: 'Suburban Hospital', category: 'Hospitals', lat: -33.9305, lng: 18.4510 },
  { id: '24', name: 'City Center Pharmacy', category: 'Pharmacies', lat: -33.9205, lng: 18.4295 },
  { id: '25', name: 'Lakeside Clinic', category: 'Clinics', lat: -33.9185, lng: 18.4325 },
  { id: '26', name: 'Riverside Library', category: 'Libraries', lat: -33.9235, lng: 18.4265 },
  { id: '27', name: 'Hilltop Hospital', category: 'Hospitals', lat: -33.9285, lng: 18.4485 },
  { id: '28', name: 'Seaside Pharmacy', category: 'Pharmacies', lat: -33.9265, lng: 18.4245 },
  { id: '29', name: 'Harbor Clinic', category: 'Clinics', lat: -33.9165, lng: 18.4335 },
  { id: '30', name: 'Forest Library', category: 'Libraries', lat: -33.9215, lng: 18.4255 },
  // ... rest of your mock data
];

function App() {
  // 2. State to track selected categories
  const [selectedCategories, setSelectedCategories] = useState([...AVAILABLE_CATEGORIES]);

  // 3. Toggle handler function
  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // 4. Filter the services dynamically
  const filteredServices = mockServices.filter((service) =>
    selectedCategories.includes(service.category)
  );

  return (
    <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
      {/* SEARCH-001 UI Sidebar Controls */}
      <ServiceMapFilter 
        selectedCategories={selectedCategories} 
        onCategoryToggle={handleCategoryToggle} 
      />

      {/* SEARCH-002 Interactive Map View */}
      <div style={{ backgroundColor: '#1e1e1e', borderRadius: '8px', padding: '20px' }}>
        <h3 style={{ color: 'white' }}>
          Interactive Map View (Pins visible: {filteredServices.length})
        </h3>
        {/* Pass the dynamic filtered array down to your Map component */}
        <Map services={filteredServices} /> 
      </div>
    </div>
  );
}

export default App;