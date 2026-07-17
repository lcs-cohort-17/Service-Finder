// src/utils/authErrors.ts

export const getAuthErrorMessage = (errorCode: string, errorMessage?: string): string | undefined => {
  const code = (errorCode || '').toString().toLowerCase();
  const message = (errorMessage || '').toString().toLowerCase();
  const combined = `${code} ${message}`;

  if (combined.includes('auth/wrong-password')) {
    return 'Incorrect password. Please try again.';
  }

  if (combined.includes('auth/invalid-credential') || combined.includes('invalid email or password') || combined.includes('invalid credential')) {
    return 'Invalid email or password..';
  }

  if (combined.includes('auth/user-not-found') || combined.includes('user not found') || combined.includes('no user record')) {
    return 'No account found with this email address.';
  }

  if (combined.includes('auth/invalid-email') || combined.includes('invalid email')) {
    return 'Please enter a valid email address.';
  }

  if (combined.includes('auth/user-disabled') || combined.includes('user disabled')) {
    return 'This account has been disabled. Please contact support.';
  }

  if (combined.includes('auth/network-request-failed') || combined.includes('auth/network-error') || combined.includes('network error')) {
    return 'Network error. Please check your internet connection and try again.';
  }

  if (combined.includes('auth/too-many-requests') || combined.includes('too many requests')) {
    return 'Too many failed login attempts. Please try again later.';
  }

  return undefined;
};