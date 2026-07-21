import React, { createContext, useContext, type ReactNode } from 'react';
import { useAuthStore } from '../../../store/useAuthStore';

interface AuthUser {
  email?: string;
  role?: 'admin' | 'user';
}

interface AuthContextValue {
  user: AuthUser | null;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * Wraps the app and exposes auth state via useAuth(). Currently backed by
 * the placeholder useAuthStore (store/useAuthStore.js) until real Firebase
 * Authentication is wired in — see that file's TODO comment.
 */
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, login, logout } = useAuthStore();
  const isAdmin = user?.role === 'admin';

  const value: AuthContextValue = { user, isAdmin, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * useAuth() — read auth state and actions anywhere inside <AuthProvider>.
 * Throws clearly if used outside the provider, rather than silently
 * returning undefined fields.
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an <AuthProvider>');
  }
  return context;
}
