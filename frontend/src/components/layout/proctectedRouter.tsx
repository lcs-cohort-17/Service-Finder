
// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import AdminLayout from './AdminLayout'; // import the layout

const ProtectedRoute = () => {
  const { user, loading } = useAuthStore();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Wrap the protected content with AdminLayout
  return <AdminLayout />;
};

export default ProtectedRoute;
