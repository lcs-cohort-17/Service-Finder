import React, { useEffect, useRef, useState } from "react";
import "./SearchBar.css";
import type { SearchBarProps } from "../../../types/SearchBar.types";

// 1. Define some quick mock data for visual testing
const MOCK_SUGGESTIONS = [
  { id: "1", name: "Cape Town Central Clinic" },
  { id: "2", name: "Mitchells Plain Day Hospital" },
  { id: "3", name: "Woodstock Community Health Centre" },
];

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  defaultValue = "",
  placeholder = "Search services…",
  onSearchChange,
  onClear,
  className = "",
  disabled = false,
  ariaLabel = "Search services",
}) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [showDropdown, setShowDropdown] = useState(false); // Track dropdown visibility
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isControlled) setInternalValue(value as string);
  }, [isControlled, value]);

  const currentValue = isControlled ? (value as string) : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    if (!isControlled) setInternalValue(next);
    onSearchChange?.(next);
    setShowDropdown(next.trim().length > 0); // Show dropdown if text exists
  };

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isControlled) setInternalValue("");
    onSearchChange?.("");
    onClear?.(e);
    setShowDropdown(false); // Hide dropdown on clear
    inputRef.current?.focus();
  };

  // Filter mock data based on input text
  const filteredSuggestions = MOCK_SUGGESTIONS.filter(item =>
    item.name.toLowerCase().includes(currentValue.toLowerCase())
  );

  return (
    /* The search-wrapper div gives our absolute elements a mounting anchor */
    <div className="search-wrapper">
      <div className={`cwu-search ${className}`.trim()}>
        <svg className="cwu-search__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>

        <input
          ref={inputRef}
          className="cwu-search__input"
          type="text"
          value={currentValue}
          onChange={handleChange}
          placeholder={placeholder}
          autoComplete="off"
          aria-label={ariaLabel}
          disabled={disabled}
          onFocus={() => currentValue.length > 0 && setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)} // Timeout allows item click to register
        />

        <button
          type="button"
          className={`cwu-search__clear ${currentValue.length > 0 ? "cwu-search__clear--visible" : ""}`}
          aria-label="Clear search"
          onClick={handleClear}
          disabled={disabled}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* 2. Render the Dropdown Panel using your clean standard CSS classes */}
      {showDropdown && filteredSuggestions.length > 0 && (
        <ul className="suggestions-dropdown">
          {filteredSuggestions.map((item) => (
            <li 
              key={item.id} 
              className="suggestion-item"
              onClick={() => {
                if (!isControlled) setInternalValue(item.name);
                onSearchChange?.(item.name);
                setShowDropdown(false);
              }}
            >
              <div className="suggestion-icon-container">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <span className="suggestion-text">{item.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;