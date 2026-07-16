// Standardized Service Interface for SEARCH-003
export interface Service {
  id: string;
  name: string;
  category: string;
  address: string;
  latitude: number;
  longitude: number;
}

// Map marker type used across the app
export interface MapMarker {
  id: string;
  position: [number, number];
  title: string;
  description?: string;
  // Optional for this project; some components expect a custom icon.
  icon?: any;
}


// Map configuration
export interface MapConfig {
  defaultCenter: [number, number];
  defaultZoom: number;
  minZoom: number;
  maxZoom: number;
  tileLayer: {
    url: string;
    attribution: string;
  };
}

// Props for the Map component
export interface MapComponentProps {
  center: [number, number];
  zoom: number;
  markers?: MapMarker[];
  className?: string;
  showZoomControl?: boolean;
  showAttribution?: boolean;
  interactive?: boolean;
  onMove?: (center: any) => void;
  onZoom?: (zoom: number) => void;
  onReady?: (map: any) => void;
  onClick?: (latlng: any) => void;
}

// Cape Town Mock Data Fallback
export const mockServices: Service[] = [
  {
    id: "mock-clinic-1",
    name: "Chapel Street Clinic",
    category: "Clinics",
    address: "Chapel St, District Six, Cape Town, 8001",
    latitude: -33.9262,
    longitude: 18.4312,
  },
  {
    id: "mock-clinic-2",
    name: "Sea Point Community Health Centre",
    category: "Clinics",
    address: "Kloof Rd, Sea Point, Cape Town, 8005",
    latitude: -33.9219,
    longitude: 18.3812,
  },
  {
    id: "mock-library-1",
    name: "Central Library Cape Town",
    category: "Libraries",
    address: "Drilling Rd, Cape Town City Centre, Cape Town, 8000",
    latitude: -33.9249,
    longitude: 18.4241,
  },
  {
    id: "mock-library-2",
    name: "Rondebosch Public Library",
    category: "Libraries",
    address: "Town Hall, Camp Ground Rd, Rondebosch, Cape Town, 7700",
    latitude: -33.9654,
    longitude: 18.4721,
  },
  {
    id: "mock-shelter-1",
    name: "The Haven Night Shelter (District Six)",
    category: "Shelters",
    address: "Selkirk St, District Six, Cape Town, 8001",
    latitude: -33.9295,
    longitude: 18.4328,
  },
  {
    id: "mock-shelter-2",
    name: "The Haven Night Shelter (Napier Street)",
    category: "Shelters",
    address: "Napier St, Green Point, Cape Town, 8051",
    latitude: -33.9168,
    longitude: 18.4172,
  },
];

