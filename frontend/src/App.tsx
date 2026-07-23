/** @addsuggestions-005-author Onke Mbingeleli
 * @addsuggestions-006-author Onke Mbingeleli
 *
 * Application shell that combines the AppRouter (for page routing)
 * with the "Suggest a place" feature overlay.
 */
import { useEffect, useState } from 'react';
import './App.css';
import './components/styles/DesignSystem.css';
import AppRouter from './routes/AppRouter';
import { SuggestPlaceButton, SuggestionForm, SuggestToast } from './features/suggestions/components';
import { useSuggestion } from './features/suggestions/hooks/useSuggestion';
import { useAuthStore } from './store/useAuthStore';
import Login from './views/Login';
import type { SuggestCategory } from './types/suggestion.types';

const CATEGORIES: SuggestCategory[] = [
  { value: 'clinic', label: 'Clinic', glyph: '🏥' },
  { value: 'library', label: 'Library', glyph: '📚' },
  { value: 'shelter', label: 'Shelter', glyph: '🏠' },
  { value: 'police', label: 'Police station', glyph: '🚓' },
  { value: 'school', label: 'School', glyph: '🏫' },
];

function App() {
  const currentUser = useAuthStore((s) => s.currentUser);
  const logout = useAuthStore((s) => s.logout);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const suggest = useSuggestion();

  // Close the login overlay once the user is authenticated.
  useEffect(() => {
    if (currentUser && isLoginOpen) setIsLoginOpen(false);
  }, [currentUser, isLoginOpen]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">Service Finder</h1>
        <div className="flex items-center gap-3">
          <SuggestPlaceButton onClick={suggest.openForm} />
          <button
            type="button"
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
            onClick={() => (currentUser ? logout() : setIsLoginOpen(true))}
          >
            {currentUser ? `Sign out (${currentUser.email})` : 'Sign in'}
          </button>
        </div>
      </header>

      <main>
        <AppRouter />
      </main>

      <SuggestionForm
        isOpen={suggest.isOpen}
        onClose={suggest.closeForm}
        isAuthenticated={suggest.isAuthenticated}
        onLoginRedirect={() => {
          suggest.closeForm();
          setIsLoginOpen(true);
        }}
        categories={CATEGORIES}
        values={suggest.values}
        errors={suggest.errors}
        formError={suggest.formError}
        isSubmitting={suggest.isSubmitting}
        onFieldChange={suggest.onFieldChange}
        onSubmit={suggest.onSubmit}
        selectedLocation={suggest.selectedLocation}
        onSetLocation={suggest.onSetLocation}
        photos={suggest.photos}
        onAddPhotos={suggest.onAddPhotos}
        hours={suggest.hours}
        isHoursModalOpen={suggest.isHoursModalOpen}
        onOpenHours={suggest.onOpenHours}
        onCloseHours={suggest.onCloseHours}
        onBackFromHours={suggest.onBackFromHours}
        onEditHourDay={suggest.onEditHourDay}
        onEditAllHours={suggest.onEditAllHours}
        onEditWeekdayHours={suggest.onEditWeekdayHours}
        onEditWeekendHours={suggest.onEditWeekendHours}
        onSaveHours={suggest.onSaveHours}
      />

      {isLoginOpen && !currentUser && (
        <div className="fixed inset-0 z-[2500] bg-slate-900/40 flex items-center justify-center">
          <div className="relative">
            <button
              type="button"
              className="absolute -top-3 -right-3 bg-white rounded-full w-8 h-8 shadow"
              onClick={() => setIsLoginOpen(false)}
              aria-label="Close"
            >
              ✕
            </button>
            <Login />
          </div>
        </div>
      )}

      {suggest.toast && (
        <SuggestToast
          variant={suggest.toast.variant}
          message={suggest.toast.message}
          onDismiss={suggest.dismissToast}
        />
      )}
    </div>
  );
}

export default App;