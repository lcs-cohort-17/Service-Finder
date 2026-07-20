/** @addsuggestions-005-author Onke Mbingeleli
 * Shared types for the "Suggest a place" feature (ADD SUGGESTION-005).
 * ADD SUGGESTION-006 will extend/consume these when it wires real
 * state management, validation, and submission logic.
 */

export interface SuggestFormValues {
  category: string;
  name: string;
  area: string;
  notes: string;
  phone: string;
  website: string;
}

export type SuggestFormErrors = Partial<Record<keyof SuggestFormValues, string>>;

export interface SuggestCategory {
  value: string;
  label: string;
  glyph: string;
}

export interface SuggestHourEntry {
  day: string;
  closed: boolean;
  open: string;
  close: string;
}

export interface SuggestPhoto {
  id: string;
  url: string;
}

export interface LatLng {
  lat: number;
  lng: number;
}

export type ToastVariant = 'success' | 'error';

export interface SuggestToastState {
  variant: ToastVariant;
  message: string;
}

export const DAYS_OF_WEEK: string[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];
