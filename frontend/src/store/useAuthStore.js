import { useState } from 'react';

// TODO(auth-ticket): Replace this with real Firebase Authentication.
// This is a temporary placeholder so components that depend on
// useAuthStore (e.g. AuthContext, VerifyLocationButton) have something
// real to import while auth is still being built.
//
// To test admin-only UI (e.g. AdminDashboard) locally, temporarily set
// MOCK_USER below to { email: 'admin@test.com', role: 'admin' }.
// const null = { email: 'admin@test.com', role: 'admin' };
const MOCK_USER = null;

export function useAuthStore() {
  const [user] = useState(MOCK_USER);

  return {
    user,
    login: async () => {
      console.warn('useAuthStore.login: not implemented yet');
    },
    logout: async () => {
      console.warn('useAuthStore.logout: not implemented yet');
    },
  };
}
