import { useEffect, useMemo, useState } from 'react';
const STORAGE_KEY = 'auth';


type AuthUser = {
  id?: string | number;
  email?: string;
  name?: string;
  [key: string]: unknown;
};

type PersistedAuth = {
  token: string;
  user?: AuthUser;
  createdAt?: number;
};

type AuthState = {
  isAuthenticated: boolean;
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
};

function readPersistedAuth(): PersistedAuth | null {
  // If the app is running in the browser, try to load the saved session.
  if (typeof window === 'undefined') return null;
  return safeParsePersistedAuth(window.localStorage.getItem(STORAGE_KEY));
}

function isPageReload(): boolean {
  if (typeof window === 'undefined') return false;

  const navigationEntry = window.performance.getEntriesByType('navigation')[0] as
    | PerformanceNavigationTiming
    | undefined;
  return navigationEntry?.type === 'reload';
}

function safeParsePersistedAuth(raw: string | null): PersistedAuth | null {
  // If nothing was saved, there is no session to restore.
  if (!raw) return null;
  try {
    // Convert the saved text back into an object.
    const parsed = JSON.parse(raw) as PersistedAuth;
    // Ignore anything that does not look like valid auth data.
    if (!parsed || typeof parsed !== 'object') return null;
    if (!parsed.token || typeof parsed.token !== 'string') return null;
    return parsed;
  } catch {
    // If the saved data is broken, treat it like no session exists.
    return null;
  }
}

function persistAuth(auth: PersistedAuth | null) {
  // On the server there is no browser storage, so just stop here.
  if (typeof window === 'undefined') return;
  if (!auth) {
    // Remove the saved session when the user logs out.
    window.localStorage.removeItem(STORAGE_KEY);
    return;
  }
  // Save the current session so refresh can bring it back.
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
}

export default function useAuthStore() {
  // Only restore a saved session when the page was actually refreshed.
  const allowSessionRestore = isPageReload();

  const [state, setState] = useState<AuthState>(() => {
    const persisted = allowSessionRestore ? readPersistedAuth() : null;

    // If nothing was saved, or this was a fresh page open, start logged out.
    if (!persisted) {
      return {
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
      };
    }

    // If a saved session exists, restore it right away.
    return {
      isAuthenticated: true,
      user: (persisted.user as AuthUser | undefined) ?? null,
      token: persisted.token,
      loading: false,
    };
  });

  useEffect(() => {
    // If the app was opened normally, clear any old session so the login page shows first.
    if (!allowSessionRestore && typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY);
    }

    function handleStorage(event: StorageEvent) {
      // Only respond when the auth record changes.
      if (event.key !== STORAGE_KEY) return;

      const persisted = safeParsePersistedAuth(event.newValue);
      // If the session was removed, clear the current auth state.
      if (!persisted) {
        setState({
          isAuthenticated: false,
          user: null,
          token: null,
          loading: false,
        });
        return;
      }

      // If another tab saved a session, mirror it here.
      setState({
        isAuthenticated: true,
        user: (persisted.user as AuthUser | undefined) ?? null,
        token: persisted.token,
        loading: false,
      });
    }

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [allowSessionRestore]);


  const api = useMemo(() => {
    return {
      async login(_payload: { email: string; password: string }) {
        // Mock login: store a fake token plus the email so refresh can restore the session.
        // This is only for testing the refresh behavior.
        setState((s) => ({ ...s, loading: true }));

        // Create a mock token for this session.
        const sessionToken =
          typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
            ? `mock-session-${crypto.randomUUID()}`
            : `mock-session-${Date.now()}`

        // Store the email the user typed so the UI can show it after refresh.
        const persisted: PersistedAuth = {
          token: sessionToken,
          user: {
            email: _payload.email,
          },
          createdAt: Date.now(),
        };

        // Write the mock session to browser storage.
        persistAuth(persisted);

        // Update the UI to show the user as logged in.
        setState({
          isAuthenticated: true,
          user: persisted.user ?? null,
          token: sessionToken,
          loading: false,
        });
      },

      async logout() {
        // Clear the saved session and reset the UI.
        persistAuth(null);
        setState({
          isAuthenticated: false,
          user: null,
          token: null,
          loading: false,
        });
      },
    };
  }, []);

  return {
    ...state,
    login: api.login,
    logout: api.logout,
    hydrate: () => {
      // This can be used if another part of the app needs to force a reload of auth state.
      const persisted = readPersistedAuth();
      if (persisted) {
        // Restore the saved session again.
        setState({
          isAuthenticated: true,
          user: (persisted.user as AuthUser | undefined) ?? null,
          token: persisted.token,
          loading: false,
        });
      } else {
        // If there is nothing saved, stay logged out.
        setState({
          isAuthenticated: false,
          user: null,
          token: null,
          loading: false,
        });
      }
    },
  };
}

