/** The normalized service record shared by map markers and the details UI. */
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
