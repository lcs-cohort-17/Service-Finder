export interface Service {
  id: string;
  name: string;
  category: string;
  address: string;
  latitude: number;
  longitude: number;
  status?: "approved" | "pending" | "rejected";
  source?: string;
  submittedBy?: string;
  createdAt?: string;
}