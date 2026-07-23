// ================================================================
//  PLACEHOLDER – Ticket COMMUNITY-003 (Retrieve and Display Community Reports)
//
//  Behaviour matches the ticket's acceptance criteria:
//    - Returns only reports with status: 'active'
//    - Sorted by createdAt descending (newest first)
//    - Real‑time updates (simulated by the `simulateNewReport` function)
//    - Loading & error states
//    - Graceful empty dataset handling
//
//  🔁 WHEN THE REAL COMMUNITY-003 IS MERGED:
//     1. Delete this file.
//     2. Use the real hook that the ticket produces. It should be
//        placed in the same path (or update imports accordingly).
//     3. The real hook must return { reports, loading, error } with
//        the same CommunityReport[] type.
//     4. Ensure the real hook subscribes to Firestore onSnapshot and
//        filters active reports, sorted by newest first.
// ================================================================

import { useState, useEffect, useCallback } from 'react';
import type { CommunityReport } from '../types/report';

// Sample data that mimics Firestore documents
const SAMPLE_REPORTS: CommunityReport[] = [
  {
    id: 'rep-001',
    title: 'Broken traffic light at 5th Ave',
    description: 'Traffic light completely off since yesterday.',
    location: { lat: 40.7128, lng: -74.006 },
    category: 'hazard',
    status: 'active',
    creatorId: 'test-user-123',       // matches the mock AUTH user
    createdAt: new Date('2026-07-22T08:00:00Z'),
  },
  {
    id: 'rep-002',
    title: 'Parking lot pothole',
    description: 'Large pothole near the library entrance.',
    location: { lat: 40.713, lng: -74.0055 },
    category: 'hazard',
    status: 'active',
    creatorId: 'other-user-456',
    createdAt: new Date('2026-07-21T14:30:00Z'),
  },
];

export function useCommunityReports() {
  const [reports, setReports] = useState<CommunityReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Simulate initial fetch with a short delay to show loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      // Simulate filtering active only + sorting by createdAt desc
      const active = SAMPLE_REPORTS
        .filter(r => r.status === 'active')
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setReports(active);
      setLoading(false);
    }, 800); // enough to see the loader

    return () => clearTimeout(timer);
  }, []);

  // Optional: simulate a new report appearing (real-time behaviour)
  const simulateNewReport = useCallback((newReport: CommunityReport) => {
    setReports(prev => {
      // Only add if it's active and not already present
      if (newReport.status !== 'active') return prev;
      const exists = prev.some(r => r.id === newReport.id);
      if (exists) return prev;
      // Add and re-sort by date
      return [newReport, ...prev].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    });
  }, []);

  return { reports, loading, error, simulateNewReport };
}