// src/store/useAuthStore.ts

import { create } from "zustand";

const b_port = import.meta.env.VITE_BACKEND_PORT;
const API_BASE = `http://localhost:${b_port}/api/users`;

type AppUser = {
  email: string;
  first_name: string;
  last_name: string;
  role: string;
};

type RegisterPayload = {
  first_name: string;
  last_name: string;
  email: string;
  home_area: string;
  role: string;
  password: string;
};

/** @addsuggestions-006-author Onke Mbingeleli
 * MockUser shape consumed by the "Suggest a place" feature.
 * Derived from our AppUser so both the backend auth and the
 * suggestions UI share the same store.
 */
export type MockUser = {
  uid: string;
  email: string;
  displayName: string;
};

type AuthState = {
  user: AppUser | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<AppUser | null>;
  register: (payload: RegisterPayload) => Promise<boolean>;
  logout: () => void;

  // ── suggestion feature bridge ──────────────────────────
  /** Derived from AppUser — null when not logged in. */
  currentUser: MockUser | null;
  /** True while a login/register request is in flight. */
  isInitializing: boolean;
};

function getStoredUser(): AppUser | null {
  const raw = localStorage.getItem("app_user");
  return raw ? (JSON.parse(raw) as AppUser) : null;
}

/** Derive a MockUser from our AppUser for the suggestions feature. */
function toMockUser(appUser: AppUser | null): MockUser | null {
  if (!appUser) return null;
  return {
    uid: appUser.email,
    email: appUser.email,
    displayName: `${appUser.first_name} ${appUser.last_name}`.trim() || appUser.email,
  };
}

export const useAuthStore = create<AuthState>((set) => ({
  user: getStoredUser(),

  token: localStorage.getItem("app_token"),

  // Only authenticated if BOTH the token and user exist
  isAuthenticated:
    !!localStorage.getItem("app_token") && !!getStoredUser(),

  loading: false,
  error: null,

  // ── suggestion feature bridge ──────────────────────────
  currentUser: toMockUser(getStoredUser()),
  isInitializing: false,

  login: async (email, password) => {
    set({ loading: true, error: null });

    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Invalid email or password");
      }

      localStorage.setItem("app_token", data.token);
      localStorage.setItem("app_user", JSON.stringify(data.user));

      const appUser = data.user as AppUser;

      set({
        token: data.token,
        user: appUser,
        currentUser: toMockUser(appUser),
        isAuthenticated: true,
        loading: false,
        error: null,
        isInitializing: false,
      });

      return appUser;
    } catch (err: any) {
      set({
        error: err.message,
        loading: false,
        isInitializing: false,
      });

      return null;
    }
  },

  register: async (payload) => {
    set({
      loading: true,
      error: null,
      isInitializing: true,
    });

    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Registration failed");
      }

      set({
        loading: false,
        error: null,
        isInitializing: false,
      });

      return true;
    } catch (err: any) {
      set({
        error: err.message,
        loading: false,
        isInitializing: false,
      });

      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("app_token");
    localStorage.removeItem("app_user");

    set({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,
      currentUser: null,
      isInitializing: false,
    });
  },
}));