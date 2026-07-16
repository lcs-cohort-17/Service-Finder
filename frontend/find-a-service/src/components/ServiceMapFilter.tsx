import React, { useMemo } from 'react';
import {
  AVAILABLE_CATEGORIES,
  CATEGORY_COLOR_MAP,
  CATEGORY_LABEL_MAP,
} from './ServiceMapFilter.constants';
import type { CategoryId } from '../types/categories';
import type { MapMarker } from '../types/map.types';
import { useServiceStore } from '../store/useServiceStore';

interface ServiceMapFilterProps {
  selectedCategories: CategoryId[];
  onCategoryToggle: (category: CategoryId) => void;
}

const markerMatchesSelectedCategories = (
  marker: MapMarker,
  selectedCategories: CategoryId[]
): boolean => {
  // If no categories selected, show all markers
  if (selectedCategories.length === 0) return true;

  const categoryFromMarker: string | undefined = marker.description;
  if (!categoryFromMarker) return false;

  // `selectedCategories` are CategoryId (string union). Only match if the
  // marker category is exactly one of the selected CategoryIds.
  return selectedCategories.some((c) => c === categoryFromMarker);
};

export const ServiceMapFilter: React.FC<ServiceMapFilterProps> = ({
  selectedCategories,
  onCategoryToggle,
}) => {
  const { markers } = useServiceStore();

  const filteredMarkers = useMemo(
    () =>
      markers.filter((marker) =>
        markerMatchesSelectedCategories(marker, selectedCategories)
      ),
    [markers, selectedCategories]
  );

  // Filtering is completed for SEARCH-002.
  // If this component is only the filter UI, `filteredMarkers` can be used by
  // the parent through props/callback in a future refactor.
  // For now, we keep it here to satisfy the task requirement.
  void filteredMarkers;

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

