import React, { useState, useCallback } from 'react';
import { useAuthStore } from '../../../store/useAuthStore';

/**
 * Props for the VerifyLocationButton component
 * @interface VerifyLocationButtonProps
 */
export interface VerifyLocationButtonProps {
  /** The address to verify */
  address: string;
  /** Optional suggestion ID for tracking/logging */
  suggestionId?: string;
  /** Optional callback when verify is triggered */
  onVerify?: (address: string, suggestionId?: string) => void;
  /** Optional override for admin role check (useful for testing) */
  isAdmin?: boolean;
  /** Optional CSS class names */
  className?: string;
}

/**
 * ADMIN-011: Verify Location Button Component
 *
 * A reusable button component that allows administrators to verify service
 * suggestion addresses before approving or rejecting submissions. Opens
 * the address in Google Maps for location verification.
 *
 * Features:
 * - Admin-only visibility (role-based access control)
 * - Opens address in Google Maps (new tab)
 * - Logs verification actions
 * - Full TypeScript typing
 * - Accessible (ARIA labels, keyboard navigation)
 * - Responsive design (works on mobile and desktop)
 * - Loading state indicator
 *
 * @component
 * @example
 * ```tsx
 * <VerifyLocationButton
 *   address="123 Main St, City, Country"
 *   suggestionId="sugg-123"
 *   onVerify={(address, id) => console.log(`Verified: ${address}`)}
 * />
 * ```
 */
const VerifyLocationButton: React.FC<VerifyLocationButtonProps> = ({
  address,
  suggestionId,
  onVerify,
  isAdmin,
  className = '',
}) => {
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Determine if user has admin access
  const hasAdminAccess: boolean = isAdmin ?? (user?.role === 'admin');

  // Early return if not admin - don't render anything
  if (!hasAdminAccess) {
    return null;
  }

  /**
   * Handles the verify location action
   * Opens Google Maps in a new tab and triggers optional callback
   */
  const handleVerify = useCallback(async (): Promise<void> => {
    setIsLoading(true);

    try {
      // Trigger optional callback if provided
      if (onVerify) {
        onVerify(address, suggestionId);
      }

      // Build Google Maps URL with address
      const mapsUrl = new URL('https://www.google.com/maps/search/');
      mapsUrl.searchParams.set('api', '1');
      mapsUrl.searchParams.set('query', address);

      // Open in new tab with security options
      const windowRef = window.open(
        mapsUrl.toString(),
        '_blank',
        'noopener,noreferrer,width=1024,height=768'
      );

      // Log action for admin tracking
      if (suggestionId) {
        console.log(
          `[ADMIN-011] Location verification initiated for suggestion "${suggestionId}"`,
          {
            address,
            timestamp: new Date().toISOString(),
            user: user?.email,
          }
        );
      }

      // Verify window opened successfully
      if (!windowRef) {
        console.warn('[ADMIN-011] Failed to open Maps window - popup may be blocked');
      }
    } catch (error) {
      console.error('[ADMIN-011] Error during location verification:', error);
    } finally {
      setIsLoading(false);
    }
  }, [address, suggestionId, onVerify, user?.email]);

  return (
    <button
      type="button"
      onClick={handleVerify}
      disabled={isLoading}
      className={`verify-location-btn ${className} ${isLoading ? 'is-loading' : ''}`}
      aria-label={`Verify location: ${address}`}
      title={address}
    >
      <span className="verify-location-icon" aria-hidden="true">
        📍
      </span>
      <span className="verify-location-text">
        {isLoading ? 'Verifying...' : 'Verify Location'}
      </span>
    </button>
  );
};

export default VerifyLocationButton;
