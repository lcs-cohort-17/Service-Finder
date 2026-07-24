import { useState } from 'react';

export type IncidentCategory = 'All' | 'Accidents' | 'Roadworks' | 'Traffic' | 'Hijackings' | 'Flooding' | 'Other';

export const useFilters = () => {
  const [selectedCategories, setSelectedCategories] = useState<IncidentCategory[]>(['All']);

  const toggleCategory = (category: IncidentCategory) => {
    if (category === 'All') {
      // "All" acts as a reset button
      setSelectedCategories(['All']);
      return;
    }

    setSelectedCategories((prev) => {
      // Remove "All" if a specific category is chosen
      const current = prev.filter((c) => c !== 'All');

      if (current.includes(category)) {
        const updated = current.filter((c) => c !== category);
        // If nothing is left, default back to 'All'
        return updated.length === 0 ? ['All'] : updated;
      } else {
        return [...current, category];
      }
    });
  };

  return {
    selectedCategories,
    toggleCategory,
  };
};