import React, { useCallback } from 'react';
import VerifyLocationButton from './VerifyLocationButton';

/**
 * Represents a service suggestion to be reviewed by an admin
 * @interface Suggestion
 */
export interface Suggestion {
  /** Unique identifier for the suggestion */
  id: string;
  /** Name of the suggested service */
  name: string;
  /** Category/type of service (e.g., "Clinic", "Library") */
  type: string;
  /** Physical address of the service */
  address: string;
  /** ID of the user who submitted the suggestion */
  submittedBy: string;
}

/**
 * Props for the SuggestionCard component
 * @interface SuggestionCardProps
 */
export interface SuggestionCardProps {
  /** The suggestion to display */
  suggestion: Suggestion;
  /** Callback when admin clicks Approve button */
  onApprove: (id: string) => void | Promise<void>;
  /** Callback when admin clicks Reject button */
  onReject: (id: string) => void | Promise<void>;
  /** Optional callback when Verify Location is clicked */
  onVerify?: (address: string, suggestionId: string) => void;
  /** Optional override for admin-gating (useful for testing) */
  isAdmin?: boolean;
  /** Optional CSS class name */
  className?: string;
}

/**
 * ADMIN-010 / ADMIN-011: Suggestion Card Component
 *
 * Renders a single service suggestion with all its details and admin
 * action buttons (Verify Location, Approve, Reject). Provides the UI
 * for administrators to review and take action on service suggestions.
 *
 * Features:
 * - Displays suggestion details (name, type, address, submitter)
 * - Integrated Verify Location button (ADMIN-011)
 * - Approve and Reject action buttons
 * - Admin-only UI visibility
 * - Full TypeScript typing
 * - Responsive layout for mobile/desktop
 *
 * @component
 * @example
 * ```tsx
 * <SuggestionCard
 *   suggestion={suggestion}
 *   onApprove={handleApprove}
 *   onReject={handleReject}
 *   isAdmin={true}
 * />
 * ```
 */
const SuggestionCard: React.FC<SuggestionCardProps> = ({
  suggestion,
  onApprove,
  onReject,
  onVerify,
  isAdmin,
  className = '',
}) => {
  // Memoize callbacks to prevent unnecessary re-renders
  const handleApprove = useCallback(() => {
    onApprove(suggestion.id);
  }, [suggestion.id, onApprove]);

  const handleReject = useCallback(() => {
    onReject(suggestion.id);
  }, [suggestion.id, onReject]);

  const handleVerify = useCallback(
    (address: string, suggestionId?: string): void => {
      if (onVerify && suggestionId) {
        onVerify(address, suggestionId);
      }
    },
    [onVerify]
  );

  return (
    <div className={`suggestion-card ${className}`}>
      <div className="suggestion-details">
        <div className="suggestion-header">
          <h3 className="suggestion-name">{suggestion.name}</h3>
          <span className="suggestion-type">{suggestion.type}</span>
        </div>

        <address className="suggestion-address">{suggestion.address}</address>

        <p className="suggestion-submitted-by">Submitted by {suggestion.submittedBy}</p>
      </div>

      <div className="suggestion-actions">
        <VerifyLocationButton
          address={suggestion.address}
          suggestionId={suggestion.id}
          onVerify={handleVerify}
          isAdmin={isAdmin}
        />

        <button
          type="button"
          className="btn btn-approve"
          onClick={handleApprove}
          aria-label={`Approve suggestion: ${suggestion.name}`}
        >
          Approve
        </button>

        <button
          type="button"
          className="btn btn-reject"
          onClick={handleReject}
          aria-label={`Reject suggestion: ${suggestion.name}`}
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default SuggestionCard;
