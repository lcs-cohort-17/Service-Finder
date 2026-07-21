import "./index.css";
import AdminDashboard from "./features/admin/pages/AdminDashboard";

// TEMP: rendering AdminDashboard directly so ADMIN-010 is reachable for
// testing without a router yet. Swap back to the real landing page /
// routing once that's set up.
//
// To actually see the dashboard (rather than "Access Denied"), open
// src/store/useAuthStore.js and set MOCK_USER to
// { email: 'admin@test.com', role: 'admin' }.
function App() {
  return <AdminDashboard />;
}

export default App;
