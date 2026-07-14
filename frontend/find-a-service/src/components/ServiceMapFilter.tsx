import React from 'react';

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

export const CATEGORY_COLOR_MAP: Record<string, string> = {
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

interface ServiceMapFilterProps {
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
}

export const ServiceMapFilter: React.FC<ServiceMapFilterProps> = ({
  selectedCategories,
  onCategoryToggle,
}) => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#1e1e1e', color: 'white', borderRadius: '8px' }}>
      <div style={{ marginBottom: '15px' }}>
        <span style={{ display: 'inline-block', fontSize: '12px', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.12em' }}>
          SHOW ON MAP
        </span>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
        {AVAILABLE_CATEGORIES.map((category) => {
          const isActive = selectedCategories.includes(category);
          const accentColor = CATEGORY_COLOR_MAP[category] ?? '#9ca3af';
          
          const buttonStyle: React.CSSProperties = {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 14px',
            borderRadius: '20px',
            border: `1px solid ${isActive ? accentColor : '#4b5563'}`,
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
              onClick={() => onCategoryToggle(category)}
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
    </div>
  );
};