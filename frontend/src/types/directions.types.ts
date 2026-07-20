// frontend/src/types/directions.types.ts

export interface Coordinates {
  lat: number;
  lng: number;
}

export type TransportMode = "driving" | "walking" | "cycling";

export interface RouteInstruction {
  instruction: string;
  distance: number; // meters
  duration: number; // seconds
}

export interface RouteResult {
  distance: number; // meters
  duration: number; // seconds
  polyline: [number, number][]; // [lng, lat] pairs
  instructions: RouteInstruction[];
}

export type RouteErrorCode =
  | "INVALID_REQUEST"
  | "ROUTE_NOT_FOUND"
  | "ROUTING_SERVICE_UNAVAILABLE"
  | "ROUTING_TIMEOUT"
  | "INTERNAL_ERROR";

export interface ApiErrorResponse {
  status: "error";
  error: {
    code: RouteErrorCode;
    message: string;
  };
}

export interface ApiSuccessResponse extends RouteResult {
  status: "ok";
}

export type DirectionsApiResponse = ApiSuccessResponse | ApiErrorResponse;

export interface RouteRequest {
  origin: Coordinates;
  destination: Coordinates;
  mode: TransportMode;
}

// Geolocation

export type GeolocationPermissionState = "granted" | "denied" | "prompt" | "unknown";