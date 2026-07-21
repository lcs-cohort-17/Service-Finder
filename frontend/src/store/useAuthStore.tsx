import { create } from "zustand";

const STORAGE_KEY = "auth";

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

type RegisterPayload = {
  first_name?: string;
  last_name?: string;
  email: string;
  phone_number?: string;
  role?: string;
  password: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

type AuthState = {
  isAuthenticated: boolean;
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  statusMessage: string | null;
  error: string | null;
};

type AuthStore = AuthState & {
  login: (
    emailOrPayload: string | LoginPayload,
    password?: string,
  ) => Promise<AuthUser | null>;
  register: (payload: RegisterPayload) => Promise<boolean>;
  logout: () => Promise<void>;
  hydrate: () => void;
};

function readPersistedAuth(): PersistedAuth | null {
  if (typeof window === "undefined") return null;
  return safeParsePersistedAuth(window.localStorage.getItem(STORAGE_KEY));
}

function safeParsePersistedAuth(raw: string | null): PersistedAuth | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as PersistedAuth;
    if (!parsed || typeof parsed !== "object") return null;
    if (!parsed.token || typeof parsed.token !== "string") return null;
    return parsed;
  } catch {
    return null;
  }
}

function persistAuth(auth: PersistedAuth | null) {
  if (typeof window === "undefined") return;
  if (!auth) {
    window.localStorage.removeItem(STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
}

function normalizeLoginPayload(
  emailOrPayload: string | LoginPayload,
  password?: string,
): LoginPayload {
  if (typeof emailOrPayload === "string") {
    return {
      email: emailOrPayload,
      password: password ?? "",
    };
  }

  return emailOrPayload;
}

// localStorage survives refreshes and browser navigation, so restore the
// session whenever the app starts. Logout is the only place that clears it.
const initialPersisted = readPersistedAuth();

export const useAuthStore = create<AuthStore>()((set) => ({
  isAuthenticated: Boolean(initialPersisted),
  user: (initialPersisted?.user as AuthUser | undefined) ?? null,
  token: initialPersisted?.token ?? null,
  loading: false,
  statusMessage: null,
  error: null,

  login: async (emailOrPayload, password) => {
    const payload = normalizeLoginPayload(emailOrPayload, password);
    set({ loading: true, error: null, statusMessage: null });

    const sessionToken =
      typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? `mock-session-${crypto.randomUUID()}`
        : `mock-session-${Date.now()}`;

    const persisted: PersistedAuth = {
      token: sessionToken,
      user: {
        email: payload.email,
      },
      createdAt: Date.now(),
    };

    persistAuth(persisted);

    const user = persisted.user ?? null;
    set({
      isAuthenticated: true,
      user,
      token: sessionToken,
      loading: false,
      statusMessage: null,
      error: null,
    });

    return user;
  },

  register: async (payload) => {
    if (!payload.email || !payload.password) {
      set({ error: "Enter an email and password." });
      return false;
    }

    set({ error: null, statusMessage: null });
    return true;
  },

  logout: async () => {
    persistAuth(null);
    set({
      isAuthenticated: false,
      user: null,
      token: null,
      loading: false,
      statusMessage: "Session ended",
      error: null,
    });
  },

  hydrate: () => {
    const persisted = readPersistedAuth();

    if (persisted) {
      set({
        isAuthenticated: true,
        user: (persisted.user as AuthUser | undefined) ?? null,
        token: persisted.token,
        loading: false,
        statusMessage: null,
        error: null,
      });
      return;
    }

    set({
      isAuthenticated: false,
      user: null,
      token: null,
      loading: false,
      statusMessage: null,
      error: null,
    });
  },
}));

if (typeof window !== "undefined") {
  const handleStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;

    const persisted = safeParsePersistedAuth(event.newValue);
    useAuthStore.setState({
      isAuthenticated: Boolean(persisted),
      user: (persisted?.user as AuthUser | undefined) ?? null,
      token: persisted?.token ?? null,
      loading: false,
      statusMessage: null,
      error: null,
    });
  };

  // Keep multiple open tabs in sync without affecting refresh persistence.
  window.addEventListener("storage", handleStorage);
}

export default useAuthStore;
