import React from 'react';
import styles from './FilterButtons.module.css';

interface FilterButtonsProps {
  categories: readonly string[];
  selected: string[];
  onToggle: (category: string) => void;
  onClearAll: () => void;
  label?: string;
}

export function FilterButtons({
  categories,
  selected,
  onToggle,
  onClearAll,
  label = 'Category:',
}: FilterButtonsProps) {
  return (
    <div className={styles.filterButtons}>
      <span className={styles.filterLabel}>{label}</span>
      {categories.map((cat) => {
        const isActive = selected.includes(cat);
        return (
          <button
            key={cat}
            className={`${styles.filterBtn} ${isActive ? styles.active : ''}`}
            onClick={() => onToggle(cat)}
            aria-pressed={isActive}
          >
            {cat}
          </button>
        );
      })}
      {selected.length > 0 && (
        <button
          className={`${styles.filterBtn} ${styles.clearAll}`}
          onClick={onClearAll}
        >
          Clear all
        </button>
      )}
    </div>
  );
}