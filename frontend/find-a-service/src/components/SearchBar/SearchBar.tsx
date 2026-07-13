import React, { useRef } from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  onClear,
  placeholder = 'Search services...',
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onClear();
    inputRef.current?.focus();
  };

  return (
    <div className={styles.searchBar}>
      <span className={styles.searchIcon}>🔍</span>
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search services"
      />
      <button
        className={`${styles.clearBtn} ${value ? '' : styles.hidden}`}
        onClick={handleClear}
        aria-label="Clear search"
      >
        ✕
      </button>
    </div>
  );
}