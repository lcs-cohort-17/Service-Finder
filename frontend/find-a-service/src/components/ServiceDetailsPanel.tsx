import React from 'react';
import type { Service } from '../types/service';
import type { NavigationUrls } from '../hooks/useSelectedService';

interface ServiceDetailsPanelProps {
  service: Service | null;
  navigationUrls: NavigationUrls | null;
  onClose: () => void;
}

/**
 * Displays the full data for the currently selected service (from a marker
 * click) along with Directions / Street View links. Renders nothing when
 * no service is selected, matching "no service data ... when no marker is
 * selected" from the acceptance criteria.
 */
export const ServiceDetailsPanel: React.FC<ServiceDetailsPanelProps> = ({
  service,
  navigationUrls,
  onClose,
}) => {
  if (!service) {
    return null;
  }

  const linkButtonStyle: React.CSSProperties = {
    flex: 1,
    textAlign: 'center',
    padding: '10px 12px',
    borderRadius: '6px',
    backgroundColor: '#ffcc00',
    color: '#000',
    fontWeight: 700,
    fontSize: '13px',
    textDecoration: 'none',
  };

  return (
    <aside
      aria-label="Service details"
      style={{
        backgroundColor: '#1e1e1e',
        color: '#fff',
        borderRadius: '8px',
        padding: '20px',
        position: 'relative',
        minWidth: '220px',
      }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close details panel"
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'transparent',
          border: 'none',
          color: '#aaa',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        ✕
      </button>

      <h3 style={{ marginTop: 0, marginBottom: '4px', paddingRight: '24px' }}>{service.name}</h3>
      <p style={{ color: '#ffcc00', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', marginTop: 0 }}>
        {(service.type ?? service.category).toUpperCase()}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '14px', color: '#d1d5db' }}>
        {service.address && <p style={{ margin: 0 }}>📍 {service.address}</p>}
        {service.phone && <p style={{ margin: 0 }}>📞 {service.phone}</p>}
        {service.website && (
          <p style={{ margin: 0 }}>
            🌐{' '}
            <a href={service.website} target="_blank" rel="noreferrer" style={{ color: '#60a5fa' }}>
              {service.website}
            </a>
          </p>
        )}
        {service.hours && <p style={{ margin: 0 }}>🕒 {service.hours}</p>}
      </div>

      {navigationUrls && (
        <div style={{ display: 'flex', gap: '10px', marginTop: '18px' }}>
          <a href={navigationUrls.directionsUrl} target="_blank" rel="noreferrer" style={linkButtonStyle}>
            Directions
          </a>
          <a
            href={navigationUrls.streetViewUrl}
            target="_blank"
            rel="noreferrer"
            style={{ ...linkButtonStyle, backgroundColor: '#374151', color: '#fff' }}
          >
            Street View
          </a>
        </div>
      )}
    </aside>
  );
};
