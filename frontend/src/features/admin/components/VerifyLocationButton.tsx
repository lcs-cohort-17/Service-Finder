import React from 'react';
import { useAuthStore } from '../../../store/useAuthStore';

export interface VerifyLocationButtonProps {
  address: string;
  suggestionId?: string;
  onVerify?: (address: string) => void;
  /**
   * Optional override for the admin check. Useful for preview/test harnesses
   * where wiring up the real auth store isn't practical. When omitted,
   * falls back to the real useAuthStore role check.
   */
  isAdmin?: boolean;
}

/**
 * ADMIN-010: Verify Location Button
 *
 * Displayed on each service suggestion in the Admin Review Suggestions page.
 * Lets an admin open the suggested address in Google Maps before
 * approving/rejecting. Only renders for authenticated users with the
 * "admin" role.
 */
const VerifyLocationButton: React.FC<VerifyLocationButtonProps> = ({
  address,
  suggestionId,
  onVerify,
  isAdmin,
}) => {
  const { user } = useAuthStore();
  const hasAdminAccess = isAdmin ?? user?.role === 'admin';

  if (!hasAdminAccess) {
    return null;
  }

  const handleVerify = (): void => {
    if (onVerify) {
      onVerify(address);
      return;
    }

    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(mapsUrl, '_blank', 'noopener,noreferrer');

    if (suggestionId) {
      console.log(`Verifying address: "${address}" for suggestion: ${suggestionId}`);
    }
  };

  return (
    <button
      type="button"
      className="verify-location-btn"
      onClick={handleVerify}
      aria-label={`Verify location for ${address}`}
    >
      Verify Location
    </button>
  );
};

export default VerifyLocationButton;
