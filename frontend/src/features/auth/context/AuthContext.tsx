// ================================================================
//  PLACEHOLDER – Tickets AUTH-007 (and AUTH-008) are not yet approved/in review for login, at the time of the development of this code.
//  This mock provides a static logged‑in user so the app can
//  compile and test the COMMUNITY‑007 ticket's UI.
//
//  🔁 WHEN THE REAL AUTH-007 IS MERGED:
//     1. Delete this entire file.
//     2. Ensure the real AuthContext file is located at the
//        same path (features/auth/context/AuthContext.tsx)
//        or update all imports to match the real location.
//     3. The real AuthContext must export a `useAuth()` hook
//        returning { currentUser, login, logout } where
//        currentUser has at least { uid, email }.
//     4. The `isAdmin` field will be added later; until then
//        it remains undefined/false.
// ================================================================

import { createContext, useContext } from 'react';

export interface CurrentUser {
  uid: string;
  email: string | null;
  displayName?: string | null;
  isAdmin?: boolean;          // will be true for admins later
}

interface AuthContextType {
  currentUser: CurrentUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
Mock implementation of useAuth().
Returns a hard‑coded test user so ticket COMMUNITY‑007 UI can be tested.
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  // If there's no provider (e.g., placeholder used without wrapping),
  // we fall back to a dummy user so components don't crash.
  if (!context) {
    return {
      currentUser: {
        uid: 'test-user-123',
        email: 'test@example.com',
        isAdmin: false,       // set to true to test admin flows
      },
      login: async () => {},
      logout: async () => {},
    };
  }

  return context;
}

// I provided a mock AuthProvider because I wanted to wrap the app.
// If you (The QA/Reviewer) already have the real one from ticket AUTH-007, keep it and ignore this.
export function MockAuthProvider({ children }: { children: React.ReactNode }) {
  const value: AuthContextType = {
    currentUser: {
      uid: 'test-user-123',
      email: 'test@example.com',
      isAdmin: false,        // toggle for testing
    },
    login: async () => {},
    logout: async () => {},
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;

/*
Important for QA/Reviewer:
If your version of the app already uses the real [AuthProvider] from ticket AUTH‑007, do not replace it.
Instead, only use this placeholder as a fallback if ticket AUTH‑007 is not yet available.
If the real provider is already in place, you can keep it and just ensure it exports [useAuth()] as above.
The mock is meant to be a safe drop‑in until the real thing is ready.
*/