/*
Represents a single community report.
The shape here may be extended by ticket COMMUNITY-003, but the fields
below are the minimum required for my ticket, COMMUNITY-007.
 */
export interface CommunityReport {
  id: string;
  title: string;
  description: string;
  location: {
    lat: number;
    lng: number;
  };
  category: string;               // e.g., 'accident', 'hazard'
  status: 'active' | 'resolved';
  creatorId: string;              // uid of the user who created the report
  createdAt: Date | string;       // Firestore Timestamp or ISO string
  resolvedAt?: Date | string;     // filled when marked as resolved
}

/*
Minimal user info from AuthContext (AUTH-007).
Adjust if the actual context exposes different fields.
 */
export interface CurrentUser {
  uid: string;
  email: string;
  isAdmin?: boolean;   // PLACEHOLDER: will be true for admins (from AUTH-007/backend)
}