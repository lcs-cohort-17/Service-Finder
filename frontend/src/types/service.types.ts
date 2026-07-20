/**
 * Category identifiers shown as filters in the sidebar and used to
 * colour-code markers on the map.
 */
export type ServiceCategoryId =
  | "hospitals"
  | "clinics"
  | "libraries"
  | "shelters"
  | "police"
  | "taxi_ranks"
  | "bus_stops"
  | "train_stations";

/**
 * The full shape of a single service record, as required by the
 * marker-click ticket: id, name, address, type, phone, website, hours,
 * lat, lng.
 */
export interface Service {
  id: string;
  name: string;
  type: ServiceCategoryId;
  address: string;
  phone: string;
  website: string;
  hours: string;
  lat: number;
  lng: number;
  description?: string;
}

/**
 * Derived data generated for whichever service is currently selected,
 * ready for the details panel components to consume.
 */
export interface SelectedServiceData {
  service: Service;
  directionsUrl: string;
  streetViewUrl: string;
}
