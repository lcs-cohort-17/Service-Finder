/** @addsuggestions-005-author Onke Mbingeleli */
import { useState } from 'react';
import './components/styles/DesignSystem.css';
import {
  SuggestPlaceButton,
  SuggestionForm,
  SuggestToast,
  DAYS,
} from './features/suggestions/components';
import type {
  LatLng,
  SuggestCategory,
  SuggestFormErrors,
  SuggestFormValues,
  SuggestHourEntry,
  SuggestPhoto,
  SuggestToastState,
} from './types/suggestion.types';

const CATEGORIES: SuggestCategory[] = [
  { value: 'clinic', label: 'Clinic', glyph: '🏥' },
  { value: 'library', label: 'Library', glyph: '📚' },
  { value: 'shelter', label: 'Shelter', glyph: '🏠' },
  { value: 'police', label: 'Police station', glyph: '🚓' },
  { value: 'school', label: 'School', glyph: '🏫' },
];

const EMPTY_VALUES: SuggestFormValues = {
  category: '',
  name: '',
  area: '',
  notes: '',
  phone: '',
  website: '',
};

const emptyHours = (): SuggestHourEntry[] =>
  DAYS.map((day) => ({ day, closed: true, open: '', close: '' }));

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [values, setValues] = useState<SuggestFormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<SuggestFormErrors>({});
  const [formError, setFormError] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photos, setPhotos] = useState<SuggestPhoto[]>([]);
  const [hours, setHours] = useState<SuggestHourEntry[]>(emptyHours());
  const [isHoursModalOpen, setIsHoursModalOpen] = useState(false);
  const [toast, setToast] = useState<SuggestToastState | null>(null);

  function resetForm() {
    setValues(EMPTY_VALUES);
    setErrors({});
    setFormError('');
    setSelectedLocation(null);
    setPhotos([]);
    setHours(emptyHours());
  }

  function applyHours(days: string[], open: string, close: string, closed: boolean) {
    setHours((prev) =>
      prev.map((entry) => (days.includes(entry.day) ? { ...entry, closed, open, close } : entry))
    );
  }

  const WEEKDAYS = DAYS.slice(0, 5);
  const WEEKEND = DAYS.slice(5);

  function handleFieldChange(field: keyof SuggestFormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function handleAddPhotos() {
    const id = `${Date.now()}`;
    setPhotos((prev) => [...prev, { id, url: `https://picsum.photos/seed/${id}/56/56` }]);
  }

  function handleSubmit() {
    const nextErrors: SuggestFormErrors = {};
    if (!values.category) nextErrors.category = 'Category is required';
    if (!values.name.trim()) nextErrors.name = 'Name is required';
    if (!values.area.trim()) nextErrors.area = 'Area is required';
    if (!selectedLocation) {
      setFormError('Please set a location on the map before submitting.');
    } else {
      setFormError('');
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0 || !selectedLocation) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsFormOpen(false);
      resetForm();
      setToast({ variant: 'success', message: 'Thanks! Your suggestion was submitted for review.' });
    }, 900);
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">Service Finder</h1>
        <button
          type="button"
          className="text-sm font-medium text-gray-700 hover:text-gray-900"
          onClick={() => setIsAuthenticated((v) => !v)}
        >
          {isAuthenticated ? 'Signed in (demo) — click to sign out' : 'Sign in (demo)'}
        </button>
      </header>

      <main className="p-6 flex justify-center">
        <SuggestPlaceButton onClick={() => setIsFormOpen(true)} />
      </main>

      <SuggestionForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setIsHoursModalOpen(false);
        }}
        isAuthenticated={isAuthenticated}
        onLoginRedirect={() => setIsAuthenticated(true)}
        categories={CATEGORIES}
        values={values}
        errors={errors}
        formError={formError}
        isSubmitting={isSubmitting}
        onFieldChange={handleFieldChange}
        onSubmit={handleSubmit}
        selectedLocation={selectedLocation}
        onSetLocation={(location) => {
          setSelectedLocation(location);
          setFormError('');
        }}
        photos={photos}
        onAddPhotos={handleAddPhotos}
        hours={hours}
        isHoursModalOpen={isHoursModalOpen}
        onOpenHours={() => setIsHoursModalOpen(true)}
        onCloseHours={() => setIsHoursModalOpen(false)}
        onBackFromHours={() => setIsHoursModalOpen(false)}
        onEditHourDay={(day) =>
          setHours((prev) =>
            prev.map((entry) =>
              entry.day === day
                ? entry.closed
                  ? { ...entry, closed: false, open: '09:00', close: '17:00' }
                  : { ...entry, closed: true, open: '', close: '' }
                : entry
            )
          )
        }
        onEditAllHours={() => applyHours(DAYS, '09:00', '17:00', false)}
        onEditWeekdayHours={() => applyHours(WEEKDAYS, '09:00', '17:00', false)}
        onEditWeekendHours={() => applyHours(WEEKEND, '10:00', '14:00', false)}
        onSaveHours={() => setIsHoursModalOpen(false)}
      />

      {toast && (
        <SuggestToast variant={toast.variant} message={toast.message} onDismiss={() => setToast(null)} />
      )}
    </div>
  );
}

export default App;
