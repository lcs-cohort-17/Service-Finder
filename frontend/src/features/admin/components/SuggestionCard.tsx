import React from 'react';
import VerifyLocationButton from './VerifyLocationButton';

export interface Suggestion {
  id: string;
  name: string;
  type: string;
  address: string;
  submittedBy: string;
}

export interface SuggestionCardProps {
  suggestion: Suggestion;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  /** Optional override for admin-gating, passed through to VerifyLocationButton. */
  isAdmin?: boolean;
}

/**
 * ADMIN-010: renders a single service suggestion with its details and the
 * admin action row (Verify Location / Approve / Reject).
 */
const SuggestionCard: React.FC<SuggestionCardProps> = ({
  suggestion,
  onApprove,
  onReject,
  isAdmin,
}) => {
  return (
    <div className="suggestion-card">
      <div className="suggestion-details">
        <strong>{suggestion.name}</strong>{' '}
        <span className="suggestion-type">({suggestion.type})</span>
        <p className="suggestion-address">{suggestion.address}</p>
        <p className="suggestion-submitted-by">Submitted by {suggestion.submittedBy}</p>
      </div>

      <div className="suggestion-actions">
        <VerifyLocationButton
          address={suggestion.address}
          suggestionId={suggestion.id}
          isAdmin={isAdmin}
        />
        <button type="button" onClick={() => onApprove(suggestion.id)}>
          Approve
        </button>
        <button type="button" onClick={() => onReject(suggestion.id)}>
          Reject
        </button>
      </div>
    </div>
  );
};

export default SuggestionCard;
