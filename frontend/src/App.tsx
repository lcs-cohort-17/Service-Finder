/** @addsuggestions-005-author Onke Mbingeleli
 * @addsuggestions-006-author Onke Mbingeleli
 *
 * Demo harness for the "Suggest a place" feature. NOT the final app
 * shell (NavBar/SideBar/the real map are separate tickets). Exists so
 * ADD SUGGESTION-005/006 can be reviewed end to end against the real
 * Firebase Auth already wired up by the auth team.
 */
import { useEffect, useState } from 'react';
import './index.css';
import './components/styles/DesignSystem.css';
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

  // Once the real Firebase auth state flips to signed-in (via the real
  // Login.tsx below), close the login overlay automatically.
  useEffect(() => {
    if (currentUser && isLoginOpen) setIsLoginOpen(false);
  }, [currentUser, isLoginOpen]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">Service Finder</h1>
        <button
          type="button"
          className="text-sm font-medium text-gray-700 hover:text-gray-900"
          onClick={() => (currentUser ? logout() : setIsLoginOpen(true))}
        >
          {currentUser ? `Sign out (${currentUser.email})` : 'Sign in'}
        </button>
      </header>

      <main className="p-6 flex justify-center">
        <SuggestPlaceButton onClick={suggest.openForm} />
      </main>

      <SuggestionForm
        isOpen={suggest.isFormOpen}
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
