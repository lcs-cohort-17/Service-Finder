// src/services/authService.ts

export interface User {
  email: string;
  role: 'admin' | 'user';
  isAdmin?: boolean;
}

export interface ServiceSuggestion {
  id: string;
  name: string;
  type: 'clinic' | 'library' | 'shelter' | 'other';
  address: string;
  coordinates: { lat: number; lng: number };
  status: 'pending' | 'approved' | 'rejected';
  submittedBy: string;
  submittedAt: string;
}

const STORAGE_KEYS = {
  user: 'service_finder_user',
  token: 'service_finder_token',
  suggestions: 'service_finder_suggestions',
};

// 100% Mock Data to satisfy 'Definition of Done' visual requirements
const DUMMY_SUGGESTIONS: ServiceSuggestion[] = [
  {
    id: 'sug-001',
    name: 'Downtown Community Clinic',
    type: 'clinic',
    address: '456 Health Ave, Metro City',
    coordinates: { lat: 40.7128, lng: -74.0060 },
    status: 'pending',
    submittedBy: 'citizen_jane@email.com',
    submittedAt: '2026-07-18 14:22'
  },
  {
    id: 'sug-002',
    name: 'Westside Crisis Shelter',
    type: 'shelter',
    address: '789 Hope Blvd, Metro City',
    coordinates: { lat: 40.7250, lng: -74.0100 },
    status: 'pending',
    submittedBy: 'helper_dan@email.com',
    submittedAt: '2026-07-19 09:15'
  },
  {
    id: 'sug-003',
    name: 'East Side Tech Library',
    type: 'library',
    address: '101 Knowledge St, Metro City',
    coordinates: { lat: 40.7050, lng: -73.9900 },
    status: 'approved',
    submittedBy: 'bookworm99@email.com',
    submittedAt: '2026-07-15 11:05'
  }
];

function readJSON<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function writeJSON(key: string, value: any): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getStoredUser(): User | null {
  return readJSON<User>(STORAGE_KEYS.user);
}

export function getToken(): string | null {
  return localStorage.getItem(STORAGE_KEYS.token);
}

export function isAdmin(user: User | null): boolean {
  return !!user && (user.role === 'admin' || user.isAdmin === true);
}

export function getSuggestions(): ServiceSuggestion[] {
  const current = readJSON<ServiceSuggestion[]>(STORAGE_KEYS.suggestions);
  if (!current) {
    writeJSON(STORAGE_KEYS.suggestions, DUMMY_SUGGESTIONS);
    return DUMMY_SUGGESTIONS;
  }
  return current;
}

export function updateSuggestionStatus(id: string, status: 'approved' | 'rejected'): ServiceSuggestion[] {
  const current = getSuggestions();
  const updated = current.map(item => item.id === id ? { ...item, status } : item);
  writeJSON(STORAGE_KEYS.suggestions, updated);
  return updated;
}

export async function login(email: string, password: string): Promise<User> {
  // Simulates standard API network latency
  await new Promise((r) => setTimeout(r, 400));

  if (!email || !password) {
    throw new Error('Email and password are required.');
  }

  const normalized = String(email).trim().toLowerCase();
  
  // Rule matrix for presentation testing
  const role = normalized.includes('admin') || normalized.endsWith('@admin.com') ? 'admin' : 'user';

  const user: User = {
    email: String(email).trim(),
    role,
    isAdmin: role === 'admin'
  };

  writeJSON(STORAGE_KEYS.user, user);
  localStorage.setItem(STORAGE_KEYS.token, 'mock_jwt_token_' + Math.random().toString(36).substring(2));

  return user;
}

export function logout(): void {
  localStorage.removeItem(STORAGE_KEYS.user);
  localStorage.removeItem(STORAGE_KEYS.token);
}