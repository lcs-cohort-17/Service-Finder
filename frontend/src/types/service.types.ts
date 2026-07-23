/** The normalized service record shared by map markers, search, and details UI. */
export interface Service {
  id: string;
  name: string;
  category: string;
  latitude: number;
  longitude: number;
  address?: string;
  phone?: string;
  website?: string;
  hours?: string;
  status?: "approved" | "pending" | "declined";
  source?: string;
  submittedBy?: string;
  createdAt?: string;
}

/** Lightweight shape used by the optional clustered-marker renderer. */
export interface MapService {
  id: string | number;
  name: string;
  category: string;
  address: string;
  lat: number;
  lng: number;
}

/** Raw approved-service response shape before it is normalized for rendering. */
export interface RawService {
  id: string | number;
  name?: string;
  category?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  [key: string]: unknown;
}
