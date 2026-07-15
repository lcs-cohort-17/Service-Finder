import React from 'react';
import {
  AVAILABLE_CATEGORIES,
  CATEGORY_COLOR_MAP,
  CATEGORY_LABEL_MAP,
} from './ServiceMapFilter.constants';
import type { CategoryId } from '../types/categories';

interface ServiceMapFilterProps {
  selectedCategories: CategoryId[];
  onCategoryToggle: (category: CategoryId) => void;
}

export const ServiceMapFilter: React.FC<ServiceMapFilterProps> = ({
  selectedCategories,
  onCategoryToggle,
}) => {
  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: '#1e1e1e',
        color: 'white',
        borderRadius: '8px',
      }}
    >
      <div style={{ marginBottom: '15px' }}>
        <span
          style={{
            display: 'inline-block',
            fontSize: '12px',
            fontWeight: 700,
            color: '#9ca3af',
            letterSpacing: '0.12em',
          }}
        >
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
              <span style={{ fontSize: '13px', fontWeight: 600 }}>
                {CATEGORY_LABEL_MAP[category]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

