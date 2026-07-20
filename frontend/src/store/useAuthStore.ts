// where you integrate users(register & login) const API_BASE = "http://localhost:1818/api/users";
//
// TEMPORARY MOCK AUTH — per team decision, we're not wiring real Firebase
// Authentication yet (avoiding hitting Firebase's usage limits while
// AUTH-005/AUTH-007 are still being built). This store fakes
// `currentUser` / `login` / `logout` with the same shape AUTH-007's real
// Firebase AuthContext will eventually expose (`uid`, `email`,
// `displayName`, `login()`, `logout()`), so consuming code (like the
// suggestion form) doesn't need to change when AUTH-007 lands — only
// this file gets replaced.
import { create } from 'zustand';
import type { MockUser } from '../types/suggestion.types';

const STORAGE_KEY = 'sf_mock_current_user';

function loadStoredUser(): MockUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as MockUser) : null;
  } catch {
    return null;
  }
}

interface AuthStoreState {
  currentUser: MockUser | null;
  login: (email: string) => MockUser;
  logout: () => void;
}

export const useAuthStore = create<AuthStoreState>((set) => ({
  currentUser: loadStoredUser(),

  login: (email: string) => {
    const trimmed = (email || '').trim();
    if (!trimmed) throw new Error('Email is required to log in.');
    const user: MockUser = {
      uid: `mock-${Date.now()}`,
      email: trimmed,
      displayName: trimmed.split('@')[0],
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    set({ currentUser: user });
    return user;
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ currentUser: null });
  },
}));

export default useAuthStore;
