import React from 'react';
import VerifyLocationButton from './VerifyLocationButton';
import { Service } from '../../../types/service.types';

export interface SuggestionCardProps {
  suggestion: Service;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onVerify?: (address: string, suggestionId: string) => void;
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
  onVerify,
  isAdmin,
}) => {
  return (
    <div className="suggestion-card">
      <div className="suggestion-details">
        <strong>{suggestion.name}</strong>{' '}
        <span className="suggestion-type">({suggestion.category})</span>
        <p className="suggestion-address">{suggestion.address}</p>
        {suggestion.submittedBy && (
          <p className="suggestion-submitted-by">Submitted by {suggestion.submittedBy}</p>
        )}
      </div>

      <div className="suggestion-actions">
        <VerifyLocationButton
          address={suggestion.address ?? ''}
          suggestionId={suggestion.id}
          isAdmin={isAdmin}
          onVerify={onVerify ? () => onVerify(suggestion.address ?? '', suggestion.id) : undefined}
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