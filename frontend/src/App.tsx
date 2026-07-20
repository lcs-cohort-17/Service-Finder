/** @addsuggestions-005-author Onke Mbingeleli
 * @addsuggestions-006-author Onke Mbingeleli
 */
import { useState } from 'react';
import './components/styles/DesignSystem.css';
import { SuggestPlaceButton, SuggestionForm, SuggestToast } from './features/suggestions/components';
import { useSuggestion } from './features/suggestions/hooks/useSuggestion';
import { useAuthStore } from './store/useAuthStore';
import { LoginForm } from './features/auth/components/LoginForm';
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
  const [showLogin, setShowLogin] = useState(false);

  const suggestion = useSuggestion({ onRequireLogin: () => setShowLogin(true) });

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">Service Finder</h1>
        {currentUser ? (
          <button
            type="button"
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
            onClick={logout}
          >
            Signed in as {currentUser.displayName} — log out
          </button>
        ) : (
          <button
            type="button"
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
            onClick={() => setShowLogin(true)}
          >
            Log in
          </button>
        )}
      </header>

      <main className="p-6 flex justify-center">
        <SuggestPlaceButton onClick={suggestion.openForm} />
      </main>

      <SuggestionForm
        isOpen={suggestion.isOpen}
        onClose={suggestion.closeForm}
        isAuthenticated={suggestion.isAuthenticated}
        onLoginRedirect={() => setShowLogin(true)}
        categories={CATEGORIES}
        values={suggestion.values}
        errors={suggestion.errors}
        formError={suggestion.formError}
        isSubmitting={suggestion.isSubmitting}
        onFieldChange={suggestion.onFieldChange}
        onSubmit={suggestion.onSubmit}
        selectedLocation={suggestion.selectedLocation}
        onSetLocation={suggestion.onSetLocation}
        photos={suggestion.photos}
        onAddPhotos={suggestion.onAddPhotos}
        hours={suggestion.hours}
        isHoursModalOpen={suggestion.isHoursModalOpen}
        onOpenHours={suggestion.onOpenHours}
        onCloseHours={suggestion.onCloseHours}
        onBackFromHours={suggestion.onBackFromHours}
        onEditHourDay={suggestion.onEditHourDay}
        onEditAllHours={suggestion.onEditAllHours}
        onEditWeekdayHours={suggestion.onEditWeekdayHours}
        onEditWeekendHours={suggestion.onEditWeekendHours}
        onSaveHours={suggestion.onSaveHours}
      />

      {showLogin && (
        <LoginForm onSuccess={() => setShowLogin(false)} onCancel={() => setShowLogin(false)} />
      )}

      {suggestion.toast && (
        <SuggestToast
          variant={suggestion.toast.variant}
          message={suggestion.toast.message}
          onDismiss={suggestion.dismissToast}
        />
      )}
    </div>
  );
}

export default App;
