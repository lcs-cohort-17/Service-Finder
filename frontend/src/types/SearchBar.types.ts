import type { MouseEvent } from "react";

/** Minimal shape needed to render a suggestion row — a full Service object
 *  satisfies this, but the component doesn't need to know about the rest
 *  of Service's fields. */
export interface SearchSuggestion {
  id: string;
  name: string;
}

export interface SearchBarProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onSearchChange?: (value: string) => void;
  onClear?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
  /** Already-filtered results from the parent (e.g. filterServicesBySearch).
   *  When omitted, the component falls back to its built-in mock list —
   *  useful for standalone/isolated testing. */
  results?: SearchSuggestion[];
  /** Called when the person picks a suggestion from the dropdown. */
  onSelect?: (suggestion: SearchSuggestion) => void;
}
