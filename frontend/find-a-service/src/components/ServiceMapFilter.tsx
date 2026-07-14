import React, { useState, useEffect } from 'react';

// 1. Strict Type Definitions (No 'any' used)
export interface Service {
  id: string;
  name: string;
  category: string;
  lat: number;
  lng: number;
}

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
  'Home Affairs',
  'Malls',
  'Bus Stations',
  'Taxi Ranks',
  'Train Stations',
  'Schools/Universities',
];

const CATEGORY_COLOR_MAP: Record<string, string> = {
  'Hospitals': '#ef4444',
  'Clinics': '#14b8a6',
  'Libraries': '#6366f1',
  'Shelters': '#a855f7',
  'Police Stations': '#1e3a8a',
  'Taxi Ranks': '#f59e0b',
  'Bus Stations': '#2563eb',
  'Train Stations': '#ec4899',
  'Pharmacies': '#10b981',
  'Dentists': '#06b6d4',
  'Fire Stations': '#f97316',
  'Community Centers': '#f43f5e',
  'Malls': '#8b5cf6',
  'Home Affairs': '#64748b',
  'Schools/Universities': '#0ea5e9',
};

export const ServiceMapFilter: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  // Start with all categories selected by default
  const [selectedCategories, setSelectedCategories] = useState<string[]>([...AVAILABLE_CATEGORIES]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        // Mock data loading
        const mockData: Service[] = [
          { id: '1', name: 'Community Clinic', category: 'Clinics', lat: -33.9249, lng: 18.4241 },
          { id: '2', name: 'Central Library', category: 'Libraries', lat: -33.9255, lng: 18.4280 },
          { id: '3', name: 'City Hospital', category: 'Hospitals', lat: -33.9310, lng: 18.4500 },
          { id: '4', name: 'Main Fire Station', category: 'Fire Stations', lat: -33.9220, lng: 18.4210 },
          { id: '5', name: 'Community Center', category: 'Community Centers', lat: -33.9280, lng: 18.4320 },
          { id: '6', name: 'Clicks Pharmacy', category: 'Pharmacies', lat: -33.9240, lng: 18.4230 },
          { id: '7', name: 'Cape Town Dental Care', category: 'Dentists', lat: -33.9260, lng: 18.4270 },
          { id: '8', name: 'Epping Street Fire Station', category: 'Fire Stations', lat: -33.9295, lng: 18.4310 },
          { id: '9', name: 'Langa Community Center', category: 'Community Centers', lat: -33.9445, lng: 18.5320 },
          { id: '10', name: 'Cape Town Home Affairs Office', category: 'Home Affairs', lat: -33.9250, lng: 18.4225 },
          { id: '11', name: 'V&A Waterfront Mall', category: 'Malls', lat: -33.9062, lng: 18.4181 },
          { id: '12', name: 'Cape Town Bus Station', category: 'Bus Stations', lat: -33.9180, lng: 18.4215 },
          { id: '13', name: 'Cape Town Taxi Rank', category: 'Taxi Ranks', lat: -33.9285, lng: 18.4170 },
          { id: '14', name: 'Cape Town Train Station', category: 'Train Stations', lat: -33.9240, lng: 18.4185 },
          { id: '15', name: 'University of Cape Town', category: 'Schools/Universities', lat: -33.9580, lng: 18.4600 }
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

  // 2. Toggle Handler (Handles multiple selections/deselections)
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((c) => c !== category)
        : [...prevSelected, category]
    );
  };

  // 3. Strict Filter Logic (Empty selection = empty map)
  const filteredServices = services.filter((service: Service) => 
    selectedCategories.includes(service.category)
  );

  if (loading) return <div style={{ color: 'white', padding: '10px' }}>Loading services...</div>;

  return (
    <div style={{ padding: '20px', backgroundColor: '#1e1e1e', color: 'white', borderRadius: '8px' }}>
      <div style={{ marginBottom: '15px' }}>
        <span style={{ display: 'inline-block', fontSize: '12px', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.12em' }}>
          SHOW ON MAP
        </span>
      </div>

      {/* 4. Responsive Pill Container (flexWrap enables grid wrapping on mobile and desktop) */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '25px' }}>
        {AVAILABLE_CATEGORIES.map((category) => {
          const isActive = selectedCategories.includes(category);
          const accentColor = CATEGORY_COLOR_MAP[category] ?? '#9ca3af';
          
          const buttonStyle: React.CSSProperties = {
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
          };

          return (
            <button
              key={category}
              type="button"
              onClick={() => handleCategoryChange(category)}
              style={buttonStyle}
            >
              {/* Colored Status Circle */}
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

      {/* 5. Output List */}
      <div>
        <h4 style={{ borderBottom: '1px solid #444', paddingBottom: '5px' }}>
          Active Service Markers ({filteredServices.length})
        </h4>
        <ul style={{ listStyleType: 'none', paddingLeft: 0, marginTop: '12px' }}>
          {filteredServices.length === 0 ? (
            <li style={{ padding: '10px 0', color: '#aaa', fontSize: '14px' }}>
              No services match the active filters. Try selecting a category above.
            </li>
          ) : (
            filteredServices.map((service) => (
              <li key={service.id} style={{ padding: '10px 0', borderBottom: '1px solid #333' }}>
                <strong>{service.name}</strong> — <span style={{ color: '#ffcc00' }}>{service.category}</span>
                <div style={{ fontSize: '12px', color: '#aaa' }}>GPS: {service.lat}, {service.lng}</div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};