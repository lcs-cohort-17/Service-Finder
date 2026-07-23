import React from 'react';
import VerifyLocationButton from './VerifyLocationButton';
import { Service } from '../../../types/service.types';

export interface SuggestionCardProps {
  suggestion: Service;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onVerify?: (address: string, suggestionId: string) => void;
  isAdmin?: boolean;
}

const SuggestionCard: React.FC<SuggestionCardProps> = ({
  suggestion,
  onApprove,
  onReject,
  onVerify,
  isAdmin,
}) => {
  const categoryClass = suggestion.category
    .toLowerCase()
    .replace(/\s+/g, '-');

  return (
    <div className="suggestion-card">
      {/* Left Side */}
      <div className="suggestion-details">
        <div className="suggestion-header">
          <span className={`suggestion-type ${categoryClass}`}>
            {suggestion.category}
          </span>

          <h3 className="suggestion-name">
            {suggestion.name}
          </h3>
        </div>

        <p className="suggestion-address">
          📍 {suggestion.address}
        </p>

        {suggestion.submittedBy && (
          <p className="suggestion-submitted-by">
            Suggested by{' '}
            <strong>{suggestion.submittedBy}</strong>
          </p>
        )}
      </div>

      {/* Right Side */}
      <div className="suggestion-actions">
        <button
          type="button"
          className="btn btn-approve"
          onClick={() => onApprove(suggestion.id)}
        >
          ✓ Approve
        </button>

        <button
          type="button"
          className="btn btn-reject"
          onClick={() => onReject(suggestion.id)}
        >
          ✕ Reject
        </button>

        <VerifyLocationButton
          address={suggestion.address ?? ''}
          suggestionId={suggestion.id}
          isAdmin={isAdmin}
          onVerify={
            onVerify
              ? () => onVerify(suggestion.address ?? '', suggestion.id)
              : undefined
          }
        />
      </div>
    </div>
  );
};

export default SuggestionCard;