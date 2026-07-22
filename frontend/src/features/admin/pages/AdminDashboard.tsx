import React from 'react';
import { useAuthStore } from '../../../store/useAuthStore';
import ReviewQueue from '../components/ReviewQueue';

/**
 * ADMIN-003 (in progress) / hosts ADMIN-010's ReviewQueue.
 * Gates access to logged-in admins only, via useAuthStore directly
 * (login/register goes through the backend via useAuthStore, not Firebase
 * directly from the frontend).
 */
const AdminDashboard: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated || !user) {
    return <div className="access-denied">Please log in to access this page.</div>;
  }

  const isAdmin = user.role === 'admin';

  if (!isAdmin) {
    return <div className="access-denied">Access Denied. Admins only.</div>;
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome back, {user.email || 'Admin'}!</p>
      </header>

      <section className="admin-content">
        <ReviewQueue />
      </section>
    </div>
  );
};

export default AdminDashboard;