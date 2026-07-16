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
// IMPORTANT: `category` MUST match the `CategoryId` values exactly
// (lowercase ids like "police", "taxi", "bus", "train").
export const mockServices: Service[] = [
  {
    id: "mock-clinic-1",
    name: "Chapel Street Clinic",
    category: "clinic",
    address: "Chapel St, District Six, Cape Town, 8001",
    latitude: -33.9262,
    longitude: 18.4312,
  },

  {
    id: "mock-clinic-2",
    name: "Sea Point Community Health Centre",
    category: "clinic",
    address: "Kloof Rd, Sea Point, Cape Town, 8005",
    latitude: -33.9219,
    longitude: 18.3812,
  },

  {
    id: "mock-library-1",
    name: "Central Library Cape Town",
    category: "library",
    address: "Drilling Rd, Cape Town City Centre, Cape Town, 8000",
    latitude: -33.9249,
    longitude: 18.4241,
  },

  {
    id: "mock-library-2",
    name: "Rondebosch Public Library",
    category: "library",
    address: "Town Hall, Camp Ground Rd, Rondebosch, Cape Town, 7700",
    latitude: -33.9654,
    longitude: 18.4721,
  },

  {
    id: "mock-shelter-1",
    name: "The Haven Night Shelter (District Six)",
    category: "shelter",
    address: "Selkirk St, District Six, Cape Town, 8001",
    latitude: -33.9295,
    longitude: 18.4328,
  },

  {
    id: "mock-shelter-2",
    name: "The Haven Night Shelter (Napier Street)",
    category: "shelter",
    address: "Napier St, Green Point, Cape Town, 8051",
    latitude: -33.9168,
    longitude: 18.4172,
  },

  // Missing categories added to ensure filter toggles render markers
  {
    id: "mock-police-1",
    name: "Central Police Station",
    category: "police",
    address: "Adderley Street, Cape Town, 8000",
    latitude: -33.9253,
    longitude: 18.4239,
  },
  {
    id: "mock-police-2",
    name: "Green Point Police Station",
    category: "police",
    address: "Main Road, Green Point, Cape Town, 8005",
    latitude: -33.9158,
    longitude: 18.4056,
  },

  {
    id: "mock-taxi-1",
    name: "Taxi Rank - Adderley Street",
    category: "taxi",
    address: "Adderley Street, Cape Town, 8001",
    latitude: -33.9250,
    longitude: 18.4230,
  },

  {
    id: "mock-taxi-2",
    name: "Taxi Rank - Sea Point",
    category: "taxi",
    address: "Main Road, Sea Point, Cape Town, 8060",
    latitude: -33.9259,
    longitude: 18.4141,
  },

  {
    id: "mock-bus-1",
    name: "Bus Stop - Heerengracht",
    category: "bus",
    address: "Heerengracht, Cape Town, 8001",
    latitude: -33.9257,
    longitude: 18.4179,
  },

  {
    id: "mock-bus-2",
    name: "Bus Stop - Station Road",
    category: "bus",
    address: "Station Road, Cape Town, 8000",
    latitude: -33.9305,
    longitude: 18.4200,
  },

  {
    id: "mock-train-1",
    name: "Train Station - Cape Town",
    category: "train",
    address: "Station Road, Cape Town, 8000",
    latitude: -33.9301,
    longitude: 18.4214,
  },
];

