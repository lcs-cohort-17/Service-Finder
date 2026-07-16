import React from 'react';
import type { Service } from '../types/service';
import type { RouteSummary } from '../hooks/useMapActions';

interface ServiceDetailsPanelProps {
  service: Service | null;
  onClose: () => void;
  /** Fetches a real route to this service and draws it on our own map. */
  onDirections: () => void;
  /** Centers/zooms our own map on this service and opens its popup. */
  onLocate: () => void;
  isRouting?: boolean;
  routeError?: string | null;
  routeSummary?: RouteSummary | null;
}

/**
 * Displays the full data for the currently selected service (from a marker
 * click) along with Directions / Locate actions. Both actions act on our
 * own in-app Leaflet map (see useMapActions) instead of opening Google
 * Maps in a new tab. Renders nothing when no service is selected, matching
 * "no service data ... when no marker is selected" from the acceptance
 * criteria.
 */
export const ServiceDetailsPanel: React.FC<ServiceDetailsPanelProps> = ({
  service,
  onClose,
  onDirections,
  onLocate,
  isRouting = false,
  routeError = null,
  routeSummary = null,
}) => {
  if (!service) {
    return null;
  }

  const actionButtonStyle: React.CSSProperties = {
    flex: 1,
    textAlign: 'center',
    padding: '10px 12px',
    borderRadius: '6px',
    backgroundColor: '#ffcc00',
    color: '#000',
    fontWeight: 700,
    fontSize: '13px',
    border: 'none',
    cursor: 'pointer',
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

      <div style={{ display: 'flex', gap: '10px', marginTop: '18px' }}>
        <button type="button" onClick={onDirections} disabled={isRouting} style={actionButtonStyle}>
          {isRouting ? 'Routing…' : 'Directions'}
        </button>
        <button
          type="button"
          onClick={onLocate}
          style={{ ...actionButtonStyle, backgroundColor: '#374151', color: '#fff' }}
        >
          Locate
        </button>
      </div>

      {routeSummary && (
        <p style={{ marginTop: '10px', marginBottom: 0, fontSize: '12px', color: '#9ca3af' }}>
          🚗 {routeSummary.distanceKm} km · {routeSummary.durationMin} min
        </p>
      )}

      {routeError && (
        <p role="alert" style={{ marginTop: '10px', marginBottom: 0, fontSize: '12px', color: '#f87171' }}>
          {routeError}
        </p>
      )}
    </aside>
  );
};
