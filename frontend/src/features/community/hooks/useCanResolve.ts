import { useAuth } from '../../auth/context/AuthContext';  // from ticket AUTH-007
import type { CommunityReport, CurrentUser } from '../types/report';

/*
Determines if the current user can mark a report as resolved.
Rules: The user must be either:
  - The creator of the report (currentUser.uid === report.creatorId)
  - An admin (currentUser.isAdmin === true)

Relies on ticket AUTH-007 for the currentUser object.
The `isAdmin` field is a PLACEHOLDER – it may come from ticket AUTH-007 or
a later admin role implementation. Until then it defaults to false.
 */
export function useCanResolve(report: CommunityReport | null): boolean {
  const { currentUser } = useAuth();   // ticket AUTH-007 provides this

  if (!currentUser || !report) return false;

  const isCreator = currentUser.uid === report.creatorId;
  const isAdmin = currentUser.isAdmin === true;   // PLACEHOLDER (see note)

  return isCreator || isAdmin;
}

/*
Placeholder explanation:
currentUser.isAdmin is not yet part of the real user object (AUTH-007 doesn’t mention it).
In the future, an admin flag may be added either in Firestore user doc or via custom claims.
For now, only the creator will be able to resolve their own report.
Once admin roles are implemented, this check will automatically work if you add isAdmin: boolean to the user type in AUTH-007.
*/