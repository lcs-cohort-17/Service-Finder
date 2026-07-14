// where you integrate users(register & login) const API_BASE = "http://localhost:1818/api/users";

import { create } from "zustand";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

const useAuthStore = create((set) => ({
  user: null,          // { uid, name, email }
  isLoggedIn: false,
  isLoading: true,      // true until Firebase resolves initial auth state
  error: null,

  // Called once, on app start, to subscribe to Firebase's auth state.
  // This is what makes login persist across a page refresh.
  // Returns the unsubscribe function so the caller (App.jsx) can clean it
  // up — important because React 18 StrictMode invokes effects twice in
  // dev, and without cleanup that would register two listeners.
  initAuthListener: () => {
    return onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        set({
          user: {
            uid: firebaseUser.uid,
            name: firebaseUser.displayName || firebaseUser.email.split("@")[0],
            email: firebaseUser.email,
          },
          isLoggedIn: true,
          isLoading: false,
        });
      } else {
        set({ user: null, isLoggedIn: false, isLoading: false });
      }
    });
  },

  login: async (email, password) => {
    set({ error: null });
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // onAuthStateChanged listener above updates state automatically
      return { success: true };
    } catch (err) {
      set({ error: err.message });
      return { success: false, error: err.message };
    }
  },

  signup: async (email, password, name) => {
    set({ error: null });
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (name) {
        await updateProfile(cred.user, { displayName: name });
      }
      return { success: true };
    } catch (err) {
      set({ error: err.message });
      return { success: false, error: err.message };
    }
  },

  logout: async () => {
    await signOut(auth);
    set({ user: null, isLoggedIn: false });
  },
}));

export default useAuthStore;