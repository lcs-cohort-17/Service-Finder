// TEMPORARY BRIDGE — this now reads the REAL Firebase Auth instance
// (src/api/firebase/config.ts, already wired up and used by the real
// Login.tsx). Reading auth state via onAuthStateChanged is read-only
// and doesn't touch Firestore, so it doesn't carry the quota risk the
// team flagged — that concern is specifically about Firestore writes,
// which is why store/useServiceStore.ts still mocks persistence via
// localStorage until FIRESTORE-001's firestore.ts is filled in.
//
// Once AUTH-007's real AuthContext lands, this store can be deleted and
// components can consume that context directly instead — the shape
// here (`currentUser: { uid, email, displayName }`, `logout()`) was
// kept deliberately close to that so the swap is small.
import { create } from 'zustand';
import { onAuthStateChanged, signOut, type User } from 'firebase/auth';
import { auth } from '../api/firebase/config';
import type { MockUser } from '../types/suggestion.types';

function toMockUser(user: User | null): MockUser | null {
  if (!user) return null;
  return {
    uid: user.uid,
    email: user.email ?? '',
    displayName: user.displayName ?? (user.email ? user.email.split('@')[0] : 'User'),
  };
}

interface AuthStoreState {
  currentUser: MockUser | null;
  isInitializing: boolean;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStoreState>((set) => {
  onAuthStateChanged(auth, (firebaseUser) => {
    set({ currentUser: toMockUser(firebaseUser), isInitializing: false });
  });

  return {
    currentUser: toMockUser(auth.currentUser),
    isInitializing: true,
    logout: async () => {
      await signOut(auth);
    },
  };
});

export default useAuthStore;
