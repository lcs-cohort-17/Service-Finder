import React, { useEffect, useRef, useState } from "react";
// @ts-ignore
import "./SearchBar.css";
import type { SearchBarProps } from "./SearchBar.types";

/**
 * Presentational search bar (Ticket 004).
 *
 * Pure UI component — no data fetching, no Firestore calls. It just holds
 * (or mirrors) the input text and reports changes upward via props, so
 * whichever component owns the actual search logic (e.g. a Firestore
 * query hook built in Ticket 003) can decide what to do with the value.
 *
 * Works controlled or uncontrolled:
 *   - Controlled:   <SearchBar value={q} onSearchChange={setQ} />
 *   - Uncontrolled: <SearchBar defaultValue="" onSearchChange={console.log} />
 */
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
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep internal state in sync if a controlled parent resets `value` externally.
  useEffect(() => {
    if (isControlled) setInternalValue(value as string);
  }, [isControlled, value]);

  const currentValue = isControlled ? (value as string) : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    if (!isControlled) setInternalValue(next);
    onSearchChange?.(next);
  };

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isControlled) setInternalValue("");
    onSearchChange?.("");
    onClear?.(e);
    inputRef.current?.focus();
  };

  return (
    <div className={`cwu-search ${className}`.trim()}>
      <svg
        className="cwu-search__icon"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
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
      />

      <button
        type="button"
        className={`cwu-search__clear ${
          currentValue.length > 0 ? "cwu-search__clear--visible" : ""
        }`}
        aria-label="Clear search"
        onClick={handleClear}
        disabled={disabled}
      >
        <svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
