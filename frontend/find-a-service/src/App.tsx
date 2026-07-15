import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./views/Login";
import Profile from "./views/profile/Profile";
import Overview from "./views/profile/Overview";
import SavedRoutes from "./views/profile/SavedRoutes";
import ReportHistory from "./views/profile/ReportHistory";
import Settings from "./views/profile/Settings";
import "./app.css";

function Home(): React.JSX.Element {
  // Placeholder landing page — replace with your real homepage content.
  return (
    <section id="center">
    <h1>find-a-service</h1>
  </section>
  );
}

function App(): React.JSX.Element {
  return (
   <>
    <Navbar />
   <Routes>
   <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/profile" element={<Profile />}>
      <Route index element={<Overview />} />
      <Route path="saved-routes" element={<SavedRoutes />} />
        <Route path="report-history" element={<ReportHistory />} />
        <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
