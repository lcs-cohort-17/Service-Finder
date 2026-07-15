// import { create } from 'zustand';
// import { signOut, onAuthStateChanged } from 'firebase/auth';
// import { auth } from '../firebase/index';

// interface AuthState {
//   user: any;
//   isLoading: boolean;
//   setUser: (user: any) => void;
//   logout: () => Promise<void>;
//   initializeAuth: () => void;
// }

// const useAuthStore = create<AuthState>((set) => ({
//   user: null,
//   isLoading: true,

//   setUser: (user: any) => {
//     set({ user });
//   },

//   logout: async () => {
//     set({ isLoading: true });
//     try {
//       await signOut(auth);
//       set({ user: null, isLoading: false });
//     } catch (error) {
//       set({ isLoading: false });
//       console.error('Logout failed:', error);
//     }
//   },

//   initializeAuth: () => {
//     onAuthStateChanged(auth, (firebaseUser) => {
//       if (firebaseUser) {
//         set({
//           user: {
//             id: firebaseUser.uid,
//             email: firebaseUser.email,
//             displayName: firebaseUser.displayName,
//           },
//           isLoading: false,
//         });
//       } else {
//         set({ user: null, isLoading: false });
//       }
//     });
//   },
// }));

// // Initialize auth on store creation
// useAuthStore.getState().initializeAuth();

// export default useAuthStore;
// src/store/useAuthStore.ts
import { create } from 'zustand';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { auth } from '../firebase/index';

interface AuthState {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  login: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      set({ user: userCredential.user });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      await signOut(auth);
      set({ user: null });
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
}));

// Listen to auth state changes (persist session)
onAuthStateChanged(auth, (user) => {
  useAuthStore.getState().setUser(user);
  useAuthStore.getState().setLoading(false);
});