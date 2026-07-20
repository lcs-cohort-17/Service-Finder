<<<<<<< HEAD
import type { CategoryKey } from "../components/FilterButtons/categoryStyles";

/**
 * Where a given Service record originated from.
 * Services can be sourced from our own Firestore database
 * (user-submitted / verified listings) or from an external API
 * such as Overpass.
 */
export type ServiceSource = "firestore" | "overpass";

/**
 * Canonical shape of a service displayed on the map.
 * Both the Firestore-backed data and the external API data
 * should be normalized into this shape before being rendered
 * or filtered.
 */
export interface Service {
  id: string;
  name: string;
  category: CategoryKey;
  latitude: number;
  longitude: number;
  address?: string;
  source: ServiceSource;
}
=======
export interface Service {
  id: string;
  name: string;
  category: string;
  address: string;
  latitude: number;
  longitude: number;
  status?: "approved" | "pending" | "declined";
  source?: string;
  submittedBy?: string;
  createdAt?: string;
}
>>>>>>> e73a6bdc776359e77e737f8e394e5d7b468492fe
