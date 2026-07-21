// src/store/useAuthStore.ts
import { create } from "zustand";
const b_port = import.meta.env.VITE_BACKEND_PORT
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

type AuthState = {
  user: AppUser | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<AppUser | null>;
  register: (payload: RegisterPayload) => Promise<boolean>;
  logout: () => void;
};

function getStoredUser(): AppUser | null {
  const raw = localStorage.getItem("app_user");
  return raw ? (JSON.parse(raw) as AppUser) : null;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: getStoredUser(),
  token: localStorage.getItem("app_token"),
  isAuthenticated: !!localStorage.getItem("app_token"),
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Invalid credentials");

      localStorage.setItem("app_token", data.token);
      localStorage.setItem("app_user", JSON.stringify(data.user));

      set({
        token: data.token,
        user: data.user,
        isAuthenticated: true,
        loading: false,
      });
      return data.user;
    } catch (err: any) {
      set({ error: err.message, loading: false });
      return null;
    }
  },

register: async (payload) => {
  set({ loading: true, error: null });
  try {
    const res = await fetch(`${API_BASE}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.message || "Registration failed");
    }

    set({ loading: false });
    return true;
  } catch (err: any) {
    set({ error: err.message, loading: false });
    return false;
  }
},


  logout: () => {
    localStorage.removeItem("app_token");
    localStorage.removeItem("app_user");
    set({ user: null, token: null, isAuthenticated: false, error: null });
  },
}));