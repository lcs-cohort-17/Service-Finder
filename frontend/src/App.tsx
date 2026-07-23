import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import NavBar from "./components/layout/NavBar";
import { AuthModal } from "./features/auth/components/AuthModal";
import ProfilePage from "./features/profile/pages/ProfilePage";
import OverviewTab from "./features/profile/components/OverviewTab";
import SavedRoutesTab from "./features/profile/components/SavedRoutesTab";
import ReportHistoryTab from "./features/profile/components/ReportHistoryTab";
import SettingsTab from "./features/profile/components/SettingsTab";
import { useAuthStore } from "./store/useAuthStore";

import FilterButtons from "./components/FilterButtons/FilterButtons";
import SearchBar from "./features/search/components/SearchBar";
import MapPage from "./views/MapPage";
import { useServiceStore } from "./store/useServiceStore";
import { filterServicesBySearch } from "./features/search/hooks/useSearch";
import "./index.css";

function Home() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const services = useServiceStore((state) => state.services);
  const selectService = useServiceStore((state) => state.selectService);
  const searchResults = filterServicesBySearch(services, searchQuery);

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-search">
          <SearchBar
            value={searchQuery}
            onSearchChange={setSearchQuery}
            results={searchResults}
            onSelect={(service) => {
              setSearchQuery(service.name);
              selectService(service.id);
            }}
          />
        </div>
        <FilterButtons
          selectedCategories={selectedCategories}
          onSelectionChange={setSelectedCategories}
        />
      </aside>
      <MapPage selectedCategories={selectedCategories} searchQuery={searchQuery} />
    </div>
  );
}

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      setIsAuthOpen(false);
    }
  }, [isAuthenticated]);

  return (
    <div className="app-shell">
      <NavBar onSignIn={() => setIsAuthOpen(true)} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<ProfilePage />}>
          <Route index element={<OverviewTab />} />
          <Route path="saved-routes" element={<SavedRoutesTab />} />
          <Route path="report-history" element={<ReportHistoryTab />} />
          <Route path="settings" element={<SettingsTab />} />
        </Route>
      </Routes>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}

export default App;