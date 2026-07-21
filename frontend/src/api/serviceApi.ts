import type { Suggestion } from '../features/admin/components/SuggestionCard';

const API_BASE_URL = (import.meta as ImportMeta & { env?: { VITE_API_BASE_URL?: string } }).env?.VITE_API_BASE_URL ?? 'http://localhost:3000/api';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  message?: string;
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });
  const body = (await response.json()) as ApiResponse<T>;
  if (!response.ok || !body.success) {
    throw new Error(body.error ?? body.message ?? 'Request failed');
  }
  return body.data;
}

export const getPendingSuggestions = (): Promise<Suggestion[]> =>
  request<Suggestion[]>('/services/suggestions/pending');

export const approveSuggestion = (id: string): Promise<void> =>
  request<void>(`/services/suggestions/${id}/approve`, { method: 'POST' });

export const rejectSuggestion = (id: string, reason = ''): Promise<void> =>
  request<void>(`/services/suggestions/${id}/reject`, {
    method: 'POST',
    body: JSON.stringify({ reason }),
  });