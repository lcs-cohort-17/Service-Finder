export const AUTH_KEY = "service-finder-auth";
export const USER_KEY = "service-finder-user";

/**
 * Mock user used until Firebase Authentication
 * (AUTH-003 & AUTH-004) is implemented.
 */
const mockUser = {
  uid: "temp-user-001",
  displayName: "Test User",
  email: "test@example.com",
};

/**
 * Logs a user in.
 * For now we simply store a mock user in localStorage.
 */
export const login = async (email, password) => {
  // Simulate network delay
  // Remove this once Firebase is connected.
  await Promise.resolve();

  // Very basic validation so login can fail
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  localStorage.setItem(AUTH_KEY, "true");

  localStorage.setItem(
    USER_KEY,
    JSON.stringify({
      ...mockUser,
      email,
    })
  );

  return getCurrentUser();
};

/**
 * Logs the current user out.
 */
export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(USER_KEY);
};

/**
 * Returns true if the user is authenticated.
 */
export const isAuthenticated = () => {
  return localStorage.getItem(AUTH_KEY) === "true";
};

/**
 * Returns the current logged-in user.
 */
export const getCurrentUser = () => {
  const user = localStorage.getItem(USER_KEY);

  if (!user) {
    return null;
  }

  return JSON.parse(user);
};

/**
 * Used when the application first loads.
 * Returns authentication status.
 */
export const restoreSession = () => {
  return isAuthenticated();
};

/**
 * This object mimics what Firebase will eventually provide.
 *
 * AUTH-003
 * Replace login()
 *
 * AUTH-004
 * Replace restoreSession()
 */
const authService = {
  login,
  logout,
  isAuthenticated,
  getCurrentUser,
  restoreSession,
};

export default authService;