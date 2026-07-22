/** @addsuggestions-006-author Onke Mbingeleli
 * ADD SUGGESTION-006: Suggest a Place Functionality & Integration
 *
 * Owns all the logic behind the suggestion form: auth gating, field state,
 * validation, mini-map coordinate capture, submission (via the mock
 * useServiceStore — same contract a real Firestore write will have),
 * loading state, and toast feedback. `SuggestionForm.tsx` (ticket 005) is
 * purely presentational and just renders whatever this hook gives it.
 */
import { useCallback, useState } from 'react';
import { useAuthStore } from '../../../store/useAuthStore';
import { useServiceStore } from '../../../store/useServiceStore';
import { DAYS_OF_WEEK } from '../../../types/suggestion.types';
import type {
  LatLng,
  SuggestFormErrors,
  SuggestFormValues,
  SuggestHourEntry,
  SuggestPhoto,
  SuggestToastState,
} from '../../../types/suggestion.types';

const EMPTY_VALUES: SuggestFormValues = {
  category: '',
  name: '',
  area: '',
  notes: '',
  phone: '',
  website: '',
};

function emptyHours(): SuggestHourEntry[] {
  return DAYS_OF_WEEK.map((day) => ({ day, closed: true, open: '', close: '' }));
}

const WEEKDAYS = DAYS_OF_WEEK.slice(0, 5);
const WEEKEND = DAYS_OF_WEEK.slice(5);

export interface UseSuggestionOptions {
  /**
   * Called when the form is requested but no one is logged in.
   * Technical requirement: "Redirect unauthenticated users to the login
   * page." There's no router in this project yet, so this hook doesn't
   * assume one — wire this to whatever "go log in" means in your app
   * (a view toggle, a route change, etc.).
   */
  onRequireLogin?: () => void;
}

export function useSuggestion(options: UseSuggestionOptions = {}) {
  const { onRequireLogin } = options;

  const currentUser = useAuthStore((s) => s.currentUser);
  const submitSuggestion = useServiceStore((s) => s.submitSuggestion);
  const isAuthenticated = !!currentUser;

  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState<SuggestFormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<SuggestFormErrors>({});
  const [formError, setFormError] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photos, setPhotos] = useState<SuggestPhoto[]>([]);
  const [hours, setHours] = useState<SuggestHourEntry[]>(emptyHours());
  const [isHoursModalOpen, setIsHoursModalOpen] = useState(false);
  const [toast, setToast] = useState<SuggestToastState | null>(null);

  const resetForm = useCallback(() => {
    setValues(EMPTY_VALUES);
    setErrors({});
    setFormError('');
    setSelectedLocation(null);
    setPhotos([]);
    setHours(emptyHours());
    setIsHoursModalOpen(false);
  }, []);

  // Technical requirement: "Check authentication status when the form is
  // accessed." Only opens the form for logged-in users; otherwise hands
  // off to onRequireLogin instead of showing the form at all.
  const openForm = useCallback(() => {
    if (!currentUser) {
      onRequireLogin?.();
      return;
    }
    setIsOpen(true);
  }, [currentUser, onRequireLogin]);

  const closeForm = useCallback(() => {
    setIsOpen(false);
    setIsHoursModalOpen(false);
  }, []);

  const onFieldChange = useCallback((field: keyof SuggestFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  // Technical requirement: capture lat/lng when the user clicks the mini-map.
  const onSetLocation = useCallback((location: LatLng) => {
    setSelectedLocation(location);
    setFormError('');
  }, []);

  const onAddPhotos = useCallback(() => {
    const id = `${Date.now()}`;
    setPhotos((prev) => [...prev, { id, url: `https://picsum.photos/seed/${id}/56/56` }]);
  }, []);

  const applyHours = useCallback(
    (days: string[], open: string, close: string, closed: boolean) => {
      setHours((prev) =>
        prev.map((entry) => (days.includes(entry.day) ? { ...entry, closed, open, close } : entry))
      );
    },
    []
  );

  const onOpenHours = useCallback(() => setIsHoursModalOpen(true), []);
  const onCloseHours = useCallback(() => setIsHoursModalOpen(false), []);
  const onBackFromHours = useCallback(() => setIsHoursModalOpen(false), []);
  const onSaveHours = useCallback(() => setIsHoursModalOpen(false), []);
  const onEditAllHours = useCallback(
    () => applyHours(DAYS_OF_WEEK, '09:00', '17:00', false),
    [applyHours]
  );
  const onEditWeekdayHours = useCallback(
    () => applyHours(WEEKDAYS, '09:00', '17:00', false),
    [applyHours]
  );
  const onEditWeekendHours = useCallback(
    () => applyHours(WEEKEND, '10:00', '14:00', false),
    [applyHours]
  );
  const onEditHourDay = useCallback((day: string) => {
    setHours((prev) =>
      prev.map((entry) =>
        entry.day === day
          ? entry.closed
            ? { ...entry, closed: false, open: '09:00', close: '17:00' }
            : { ...entry, closed: true, open: '', close: '' }
          : entry
      )
    );
  }, []);

  // Technical requirement: validate required fields (Category, Name, Area,
  // Location) before allowing submission.
  function validate(): boolean {
    const nextErrors: SuggestFormErrors = {};
    if (!values.category) nextErrors.category = 'Category is required.';
    if (!values.name.trim()) nextErrors.name = 'Name is required.';
    if (!values.area.trim()) nextErrors.area = 'Area is required.';

    const locationOk = !!selectedLocation;
    setFormError(locationOk ? '' : 'Please set a location on the map before submitting.');
    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0 && locationOk;
  }

  // Technical requirement: on submission, construct a data object with
  // form fields, coordinates, user id/email, status "pending", and a
  // timestamp, then submit via the store (mock Firestore contract —
  // submitSuggestion already stamps id/status/timestamp).
  const onSubmit = useCallback(async () => {
    if (!currentUser) {
      onRequireLogin?.();
      return;
    }
    if (!validate() || !selectedLocation) return;

    setIsSubmitting(true);
    try {
      await submitSuggestion({
        category: values.category,
        name: values.name.trim(),
        area: values.area.trim(),
        notes: values.notes.trim(),
        phone: values.phone.trim(),
        website: values.website.trim(),
        lat: selectedLocation.lat,
        lng: selectedLocation.lng,
        userId: currentUser.uid,
        userEmail: currentUser.email,
      });
      setIsSubmitting(false);
      setIsOpen(false);
      resetForm();
      setToast({ variant: 'success', message: 'Thanks! Your suggestion was submitted for review.' });
    } catch (err) {
      setIsSubmitting(false);
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setToast({ variant: 'error', message });
      // Deliberately not resetting form state here — acceptance criteria:
      // "the user remains on the form with data intact if submission fails".
    }
  }, [currentUser, onRequireLogin, selectedLocation, submitSuggestion, values, resetForm]);

  const dismissToast = useCallback(() => setToast(null), []);

  return {
    isOpen,
    openForm,
    closeForm,
    isAuthenticated,
    currentUser,

    values,
    errors,
    formError,
    isSubmitting,
    onFieldChange,
    onSubmit,

    selectedLocation,
    onSetLocation,

    photos,
    onAddPhotos,

    hours,
    isHoursModalOpen,
    onOpenHours,
    onCloseHours,
    onBackFromHours,
    onEditHourDay,
    onEditAllHours,
    onEditWeekdayHours,
    onEditWeekendHours,
    onSaveHours,

    toast,
    dismissToast,
  };
}

export default useSuggestion;
