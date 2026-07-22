import { useEffect, useState } from "react";
import "./components/styles/DesignSystem.css";
import { Route, Routes } from "react-router-dom";

import NavBar from "./components/layout/NavBar";
import { AuthModal } from "./features/auth/components/AuthModal";
import MapPage from "./views/MapPage";

import ProfilePage from "./features/profile/pages/ProfilePage";
import OverviewTab from "./features/profile/components/OverviewTab";
import SavedRoutesTab from "./features/profile/components/SavedRoutesTab";
import ReportHistoryTab from "./features/profile/components/ReportHistoryTab";
import SettingsTab from "./features/profile/components/SettingsTab";

import { useAuthStore } from "./store/useAuthStore";

/** @addsuggestions-005-author Onke Mbingeleli */
import { SuggestPlaceButton, SuggestionForm, SuggestToast } from "./features/suggestions/components";
import type {
  LatLng,
  SuggestCategory,
  SuggestFormErrors,
  SuggestFormValues,
  SuggestHourEntry,
  SuggestPhoto,
  SuggestToastState,
} from "./types/suggestion.types";
import { DAYS } from "./features/suggestions/components";

const CATEGORIES: SuggestCategory[] = [
  { value: "clinic", label: "Clinic", glyph: "🏥" },
  { value: "library", label: "Library", glyph: "📚" },
  { value: "shelter", label: "Shelter", glyph: "🏠" },
  { value: "police", label: "Police station", glyph: "🚓" },
  { value: "school", label: "School", glyph: "🏫" },
];

const EMPTY_VALUES: SuggestFormValues = {
  category: "",
  name: "",
  area: "",
  notes: "",
  phone: "",
  website: "",
};

const emptyHours = (): SuggestHourEntry[] =>
  DAYS.map((day) => ({ day, closed: true, open: "", close: "" }));

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      setIsAuthOpen(false);
    }
  }, [isAuthenticated]);

  // --- Suggestion form state ---
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [values, setValues] = useState<SuggestFormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<SuggestFormErrors>({});
  const [formError, setFormError] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photos, setPhotos] = useState<SuggestPhoto[]>([]);
  const [hours, setHours] = useState<SuggestHourEntry[]>(emptyHours());
  const [isHoursModalOpen, setIsHoursModalOpen] = useState(false);
  const [toast, setToast] = useState<SuggestToastState | null>(null);

  function resetForm() {
    setValues(EMPTY_VALUES);
    setErrors({});
    setFormError("");
    setSelectedLocation(null);
    setPhotos([]);
    setHours(emptyHours());
  }

  function applyHours(days: string[], open: string, close: string, closed: boolean) {
    setHours((prev) =>
      prev.map((entry) =>
        days.includes(entry.day) ? { ...entry, closed, open, close } : entry
      )
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
    setPhotos((prev) => [
      ...prev,
      { id, url: `https://picsum.photos/seed/${id}/56/56` },
    ]);
  }

  function handleSubmit() {
    const nextErrors: SuggestFormErrors = {};
    if (!values.category) nextErrors.category = "Category is required";
    if (!values.name.trim()) nextErrors.name = "Name is required";
    if (!values.area.trim()) nextErrors.area = "Area is required";
    if (!selectedLocation) {
      setFormError("Please set a location on the map before submitting.");
    } else {
      setFormError("");
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0 || !selectedLocation) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsFormOpen(false);
      resetForm();
      setToast({
        variant: "success",
        message: "Thanks! Your suggestion was submitted for review.",
      });
    }, 900);
  }

  return (
    // 🔥 FIX: use h-screen + flex column to lock viewport height
    <div className="h-screen flex flex-col bg-slate-50 text-slate-900">
      <NavBar onSignIn={() => setIsAuthOpen(true)} />

      {/* 🔥 FIX: flex-1 takes remaining space, min-h-0 prevents overflow */}
      <div className="flex-1 min-h-0 relative">
        <Routes>
          <Route
            path="/"
            element={
              <MapPage onSuggestPlace={() => setIsFormOpen(true)} />
            }
          />
          <Route path="/map" element={<MapPage />} />

          <Route path="/profile" element={<ProfilePage />}>
            <Route index element={<OverviewTab />} />
            <Route path="saved-routes" element={<SavedRoutesTab />} />
            <Route path="report-history" element={<ReportHistoryTab />} />
            <Route path="settings" element={<SettingsTab />} />
          </Route>
        </Routes>
      </div>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      <SuggestionForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setIsHoursModalOpen(false);
        }}
        isAuthenticated={isAuthenticated}
        onLoginRedirect={() => setIsAuthOpen(true)}
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
          setFormError("");
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
                  ? { ...entry, closed: false, open: "09:00", close: "17:00" }
                  : { ...entry, closed: true, open: "", close: "" }
                : entry
            )
          )
        }
        onEditAllHours={() => applyHours(DAYS, "09:00", "17:00", false)}
        onEditWeekdayHours={() => applyHours(WEEKDAYS, "09:00", "17:00", false)}
        onEditWeekendHours={() => applyHours(WEEKEND, "10:00", "14:00", false)}
        onSaveHours={() => setIsHoursModalOpen(false)}
      />

      {toast && (
        <SuggestToast
          variant={toast.variant}
          message={toast.message}
          onDismiss={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default App;