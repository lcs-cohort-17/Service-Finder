import { create } from "zustand";
import authService from "../services/authService";

const useAuthStore = create((set) => ({
  // State
  user: authService.getCurrentUser(),
  isAuthenticated: authService.restoreSession(),
  loading: false,
  error: null,

  /**
   * Login using the placeholder auth service.
   * This will later be replaced internally by Firebase.
   */
  login: async (email, password) => {
    set({
      loading: true,
      error: null,
    });

    try {
      const authenticatedUser =
        await authService.login(email, password);

      set({
        user: authenticatedUser,
        isAuthenticated: true,
        loading: false,
        error: null,
      });

      return true;
    } catch (error) {
        set({
            loading: false,
            error:
                error instanceof Error
                    ? error.message
                    : "Login failed.",
        });

        return false;
    }
  },

  /**
   * Logout the current user.
   */
  logout: () => {
    authService.logout();

    set({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,
    });
  },

  /**
   * Restore the user's session when the app loads.
   */
  restoreSession: () => {
    const authenticated = authService.restoreSession();

    set({
        isAuthenticated: authenticated,
        user: authenticated ? authService.getCurrentUser() : null,
        loading: false,
        error: null,
    });
},

  /**
   * Clear any authentication errors.
   */
  clearError: () => {
    set({
      error: null,
    });
  },
}));

export default useAuthStore;