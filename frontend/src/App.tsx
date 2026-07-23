import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import NavBar from "./components/layout/NavBar";
import { AuthModal } from "./features/auth/components/AuthModal";
import MapPage from "./views/MapPage";
import CommunityReportsPage from "./views/CommunityReportsPage";

import ProfilePage from "./features/profile/pages/ProfilePage";
import OverviewTab from "./features/profile/components/OverviewTab";
import SavedRoutesTab from "./features/profile/components/SavedRoutesTab";
import ReportHistoryTab from "./features/profile/components/ReportHistoryTab";
import SettingsTab from "./features/profile/components/SettingsTab";

import { useAuthStore } from "./store/useAuthStore";

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      setIsAuthOpen(false);
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <NavBar onSignIn={() => setIsAuthOpen(true)} />

      <Routes>
        <Route path="/" element={<MapPage onRequireAuth={() => setIsAuthOpen(true)} />} />
        <Route path="/map" element={<MapPage onRequireAuth={() => setIsAuthOpen(true)} />} />

        <Route path="/profile" element={<ProfilePage />}>
          <Route index element={<OverviewTab />} />
          <Route path="saved-routes" element={<SavedRoutesTab />} />
          <Route path="report-history" element={<ReportHistoryTab />} />
          <Route path="settings" element={<SettingsTab />} />
        </Route>

        {/* COMMUNITY-001/002 - Onke Mbingeleli */}
        <Route
          path="/community"
          element={<CommunityReportsPage onRequireAuth={() => setIsAuthOpen(true)} />}
        />
      </Routes>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </div>
  );
}

export default App;