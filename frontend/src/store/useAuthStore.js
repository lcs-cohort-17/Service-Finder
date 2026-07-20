import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../api/firebase/config";

const initialState = {
  user: null,
  loading: true,
};

let unsubscribeAuth = null;

const toAuthUser = (firebaseUser) => ({
  uid: firebaseUser.uid,
  email: firebaseUser.email,
  displayName: firebaseUser.displayName,
  role: "admin",
});

const getAuthErrorMessage = (error) => {
  switch (error?.code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Invalid email or password.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/too-many-requests":
      return "Too many failed attempts. Please try again later.";
    default:
      return error?.message || "Unable to log in. Please try again.";
  }
};

export const useAuthStore = create(
  persist(
    (set) => ({
      ...initialState,
      initAuthListener: () => {
        if (unsubscribeAuth) {
          return () => {
            unsubscribeAuth?.();
            unsubscribeAuth = null;
          };
        }

        unsubscribeAuth = onAuthStateChanged(
          auth,
          (firebaseUser) => {
            set({
              user: firebaseUser ? toAuthUser(firebaseUser) : null,
              loading: false,
            });
          },
          () => {
            set({ user: null, loading: false });
          }
        );

        return () => {
          unsubscribeAuth?.();
          unsubscribeAuth = null;
        };
      },
      login: async (email, password) => {
        set({ loading: true });

        if (!email || !password) {
          set({ loading: false });
          throw new Error("Please enter your email and password.");
        }

        try {
          const credential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );

          set({
            user: toAuthUser(credential.user),
            loading: false,
          });
        } catch (error) {
          set({ user: null, loading: false });
          throw new Error(getAuthErrorMessage(error));
        }
      },
      logout: async () => {
        set({ loading: true });
        await signOut(auth);
        set({ user: null, loading: false });
      },
    }),
    {
      name: "service-finder-auth",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
