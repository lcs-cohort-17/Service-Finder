import React, { useState } from 'react';
import SuggestionCard, { type Suggestion } from './SuggestionCard';

/** @jsx React.createElement */

export interface ReviewQueueProps {
  /**
   * Admin gating is normally decided by AdminDashboard (via useAuth) before
   * ReviewQueue ever renders. This prop lets ReviewQueue also be used
   * standalone in a preview/test harness without a real logged-in admin.
   */
  isAdmin?: boolean;
}

// TODO(suggestions-ticket): replace with real suggestions fetched from
// the backend (e.g. via useServiceStore) once that API exists. Mock data
// keeps this ticket testable independently in the meantime.
const MOCK_SUGGESTIONS: Suggestion[] = [
  {
    id: 'sugg-1',
    name: 'Sunrise Community Clinic',
    type: 'Clinic',
    address: '12 Berea Road, Durban, 4001',
    submittedBy: 'user_thandiwe',
  },
  {
    id: 'sugg-2',
    name: 'Westville Public Library',
    type: 'Library',
    address: '45 Jan Hofmeyr Road, Westville, 3629',
    submittedBy: 'user_sipho',
  },
  {
    id: 'sugg-3',
    name: 'Overport Night Shelter',
    type: 'Shelter',
    address: '8 Overport Drive, Overport, 4067',
    submittedBy: 'user_naledi',
  },
];

/**
 * ADMIN-010 / Admin Review Suggestions page content.
 * Lists pending service suggestions, each with Verify Location, Approve,
 * and Reject actions.
 */
const ReviewQueue: React.FC<ReviewQueueProps> = ({ isAdmin }) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>(MOCK_SUGGESTIONS);
  const [log, setLog] = useState<string[]>([]);

  const addLog = (message: string): void => {
    setLog((prev) => [`${new Date().toLocaleTimeString()} — ${message}`, ...prev]);
  };

  const handleApprove = (id: string): void => {
    const target = suggestions.find((s) => s.id === id);
    if (target) addLog(`Approved: ${target.name}`);
    setSuggestions((prev) => prev.filter((s) => s.id !== id));
  };

  const handleReject = (id: string): void => {
    const target = suggestions.find((s) => s.id === id);
    if (target) addLog(`Rejected: ${target.name}`);
    setSuggestions((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="review-queue">
      <h2>Review Suggestions</h2>

      {suggestions.length === 0 && <p className="empty-state">No suggestions left to review.</p>}

      {suggestions.map((suggestion) => (
        <SuggestionCard
          key={suggestion.id}
          suggestion={suggestion}
          onApprove={handleApprove}
          onReject={handleReject}
          isAdmin={isAdmin}
        />
      ))}

      {log.length > 0 && (
        <div className="review-queue-log">
          <h3>Action Log</h3>
          <ul>
            {log.map((entry, i) => (
              <li key={i}>{entry}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ReviewQueue;
