export interface SearchBarProps {
  /**
   * Controlled value. If provided, the component is fully controlled by
   * the parent and `onSearchChange` becomes responsible for updating it.
   * If omitted, the component manages its own internal state.
   */
  value?: string;

  /** Initial value when used in uncontrolled mode. Default: '' */
  defaultValue?: string;

  /** Placeholder text. Default: "Search services…" */
  placeholder?: string;

  // Event handlers
  /** Fired on every keystroke with the current input value. */
  onSearchChange?: (value: string) => void;

  /** Fired when the clear button is pressed (value is always '' at this point). */
  onClear?: (event?: React.MouseEvent<HTMLButtonElement>) => void;

  // UI Behavior
  /** Optional extra class name for layout overrides from a parent. */
  className?: string;

  /** Disables the input (e.g. while a search request is in flight). */
  disabled?: boolean;

  /** aria-label override for accessibility. Default: "Search services" */
  ariaLabel?: string;
}
