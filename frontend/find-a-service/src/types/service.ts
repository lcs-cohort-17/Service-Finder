/**
 * Shared shape for a single public service record.
 *
 * `category` remains the canonical field used for filtering (matches
 * ServiceMapFilter / serviceFilters), while `type` is exposed as well
 * because the details panel / API contract refers to it as "type".
 * `normalizeService` in `utils/serviceDataset.ts` keeps the two in sync.
 */
export interface Service {
  id: string;
  name: string;
  category: string;
  type?: string;
  address?: string;
  phone?: string;
  website?: string;
  hours?: string;
  lat: number;
  lng: number;
}
