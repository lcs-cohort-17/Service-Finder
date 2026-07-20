// src/context/useAuth.ts

import { useContext } from 'react';
import { AuthContext, AuthContextType } from '../context/AuthContext';

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}