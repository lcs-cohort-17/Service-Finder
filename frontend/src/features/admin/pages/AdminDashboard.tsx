import React from 'react';
import { useAuth } from '../../auth/context/AuthContext';
import ReviewQueue from '../components/ReviewQueue';

/**
 * ADMIN-003 (in progress) / hosts ADMIN-010's ReviewQueue.
 * Gates access to logged-in admins only, via the real AuthContext.
 */
const AdminDashboard: React.FC = () => {
  const { user, isAdmin } = useAuth();

  if (!user) {
    return <div className="access-denied">Please log in to access this page.</div>;
  }

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
