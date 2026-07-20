// where you integrate services e.g const API_BASE = "http://localhost:1818/api/services";
//
// TEMPORARY MOCK PERSISTENCE — per team decision, we are NOT writing to
// real Firebase/Firestore yet, to avoid burning through Firebase's usage
// limits while FIRESTORE-001 is still being finalized. Firebase isn't
// going away — this is a stand-in with the exact same data shape and
// async contract a real Firestore call would have, so swapping the
// internals of `submitSuggestion` for a real
// `addDoc(collection(firestore, 'suggestions'), payload)` later is a
// one-file change. Nothing calling this store needs to change.
import { create } from 'zustand';
import type { SuggestionRecord } from '../types/suggestion.types';

const STORAGE_KEY = 'sf_suggestions';
const SIMULATED_LATENCY_MS = 700;

function readAll(): SuggestionRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SuggestionRecord[]) : [];
  } catch {
    return [];
  }
}

function writeAll(list: SuggestionRecord[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export type NewSuggestionPayload = Omit<SuggestionRecord, 'id' | 'status' | 'timestamp'>;

interface ServiceStoreState {
  suggestions: SuggestionRecord[];
  submitSuggestion: (payload: NewSuggestionPayload) => Promise<SuggestionRecord>;
}

export const useServiceStore = create<ServiceStoreState>((set, get) => ({
  suggestions: readAll(),

  /**
   * Persists a suggestion. Mirrors ADD SUGGESTION-006's required data
   * object: form fields + coordinates + user id/email + status +
   * timestamp. Returns a Promise, like a real Firestore write would.
   */
  submitSuggestion: (payload: NewSuggestionPayload) => {
    return new Promise<SuggestionRecord>((resolve, reject) => {
      setTimeout(() => {
        try {
          if (!payload || typeof payload !== 'object') {
            throw new Error('Suggestion payload is missing.');
          }
          const record: SuggestionRecord = {
            id: `sg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
            ...payload,
            status: 'pending',
            timestamp: Date.now(),
          };
          const list = [...get().suggestions, record];
          writeAll(list);
          set({ suggestions: list });
          resolve(record);
        } catch (err) {
          reject(err);
        }
      }, SIMULATED_LATENCY_MS);
    });
  },
}));

export default useServiceStore;
