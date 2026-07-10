import React, { useState, useEffect } from 'react';

// 1. Define the TypeScript interface for a service
export interface Service {
  id: string;
  name: string;
  category: string;
  lat: number;
  lng: number;
}

// 2. Define your public service categories list
export const AVAILABLE_CATEGORIES: string[] = [
  'Clinics',
  'Libraries',
  'Shelters',
  'Hospitals',
  'Police Stations',
  'Pharmacies',
  'Dentists',
  'Fire Stations',
  'Community Centers',
];

export const ServiceMapFilter: React.FC = () => {
  // State to hold data retrieved from Firestore / API
  const [services, setServices] = useState<Service[]>([]);
  
  // State to support multiple selected categories
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Simulation: Fetching data from Firestore / External API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        
        // This is a placeholder structure. You will replace this with your 
        // real Firestore getDocs() or fetch() data array later.
        const mockData: Service[] = [
          { id: '1', name: 'Community Clinic', category: 'Clinics', lat: -33.9249, lng: 18.4241 },
          { id: '2', name: 'Central Library', category: 'Libraries', lat: -33.9255, lng: 18.4280 },
          { id: '3', name: 'City Hospital', category: 'Hospitals', lat: -33.9310, lng: 18.4500 },
          { id: '4', name: 'Main Fire Station', category: 'Fire Stations', lat: -33.9220, lng: 18.4210 },
          { id: '5', name: 'Community Center', category: 'Community Centers', lat: -33.9280, lng: 18.4320 },
        ];
        
        setServices(mockData);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Handle toggling multiple categories in state
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((c) => c !== category) // Uncheck: remove from state
        : [...prevSelected, category]               // Check: add to state
    );
  };

  // 3. Filter service data before rendering markers
  const filteredServices = services.filter((service: Service) => {
    // If no categories are ticked, show all markers by default
    if (selectedCategories.length === 0) return true;
    // Otherwise, check if the service's category is included in the selection
    return selectedCategories.includes(service.category);
  });

  if (loading) return <div style={{ color: 'white', padding: '10px' }}>Loading services...</div>;

  return (
    <div style={{ padding: '20px', backgroundColor: '#1e1e1e', color: 'white', borderRadius: '8px' }}>
      <h3 style={{ marginBottom: '15px' }}>Filter Public Services</h3>
      
      {/* Category Checkboxes Layout */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginBottom: '25px' }}>
        {AVAILABLE_CATEGORIES.map((category) => (
          <label key={category} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
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

      {/* Active Results Display */}
      <div>
        <h4 style={{ borderBottom: '1px solid #444', paddingBottom: '5px' }}>
          Active Service Markers ({filteredServices.length})
        </h4>
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          {filteredServices.map((service) => (
            <li key={service.id} style={{ padding: '8px 0', borderBottom: '1px solid #333' }}>
              <strong>{service.name}</strong> — <span style={{ color: '#ffcc00' }}>{service.category}</span>
              <div style={{ fontSize: '12px', color: '#aaa' }}>GPS: {service.lat}, {service.lng}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};