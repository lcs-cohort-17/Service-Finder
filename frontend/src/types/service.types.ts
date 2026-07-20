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