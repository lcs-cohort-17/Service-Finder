import React, { useState, useCallback } from 'react';
import { useAuthStore } from '../../../store/useAuthStore';

export interface VerifyLocationButtonProps {
  address: string;
  suggestionId?: string;
  onVerify?: (address: string, suggestionId?: string) => void;
  isAdmin?: boolean;
  className?: string;
}

const VerifyLocationButton: React.FC<VerifyLocationButtonProps> = ({
  address,
  suggestionId,
  onVerify,
  isAdmin,
  className = '',
}) => {
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const hasAdminAccess = isAdmin ?? (user?.role === 'admin');

  if (!hasAdminAccess) {
    return null;
  }

  const handleVerify = useCallback(async (): Promise<void> => {
    setIsLoading(true);

    try {
      if (onVerify) {
        onVerify(address, suggestionId);
      }

      const mapsUrl = new URL('https://www.google.com/maps/search/');
      mapsUrl.searchParams.set('api', '1');
      mapsUrl.searchParams.set('query', address);

      const windowRef = window.open(
        mapsUrl.toString(),
        '_blank',
        'noopener,noreferrer,width=1024,height=768'
      );

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

      if (!windowRef) {
        console.warn(
          '[ADMIN-011] Failed to open Maps window - popup may be blocked'
        );
      }
    } catch (error) {
      console.error(
        '[ADMIN-011] Error during location verification:',
        error
      );
    } finally {
      setIsLoading(false);
    }
  }, [address, suggestionId, onVerify, user?.email]);

  return (
    <button
      type="button"
      onClick={handleVerify}
      disabled={isLoading}
      className={`verify-location-btn ${className} ${
        isLoading ? 'is-loading' : ''
      }`}
      aria-label={`Verify location: ${address}`}
      title={address}
    >
      {isLoading ? (
        <span
          className="verify-spinner"
          aria-hidden="true"
        />
      ) : (
        <span
          className="verify-location-icon"
          aria-hidden="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
          </svg>
        </span>
      )}

      <span className="verify-location-text">
        {isLoading ? 'Verifying...' : 'Verify location'}
      </span>
    </button>
  );
};

export default VerifyLocationButton;