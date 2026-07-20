// ProtectedAdminRoute.tsx
// Wrap admin-only routes with this component in your router config.

import React, { ReactNode } from 'react';
import { useAuth } from '../features/auth/hooks/useAuth';

interface RoutesProps {
  children: ReactNode;
  currentPathname?: string;
}

export default function Routes({ children, currentPathname }: RoutesProps) {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!isAuthenticated) {
    window.location.replace(`/admin/login?from=${encodeURIComponent(currentPathname || window.location.pathname)}`);
    return null;
  }

  if (!isAdmin) {
    window.location.replace('/');
    return null;
  }

  return <>{children}</>;
}