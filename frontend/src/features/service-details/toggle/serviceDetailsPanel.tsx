import React from 'react';
import { ServiceStatusBadge } from './ServiceStatusBadge';
import type { Services } from './service.types';

interface ServiceDetailsProps {
  service: Services;
  onClose?: () => void; 
}

export function ServiceDetails({ service, onClose }: ServiceDetailsProps) {
  if (!service) {
    return <div className="service-details-empty">No service selected</div>;
  }

  return (
    <div className="service-details">
      {/* Header with name and status badge */}
      <div className="service-details-header">
        <div className="service-title-section">
          <h2 className="service-name">{service.name}</h2>
          <ServiceStatusBadge service={service} />
        </div>
        {onClose && (
          <button 
            className="service-details-close" 
            onClick={onClose}
            aria-label="Close details"
          >
            ✕
          </button>
        )}
      </div>

      {/* Basic Information */}
      <div className="service-details-section">
        <h3 className="section-title">Information</h3>
        <dl className="info-grid">
          <dt>Category</dt>
          <dd className="capitalize">{service.category}</dd>

          {service.address && (
            <>
              <dt>Address</dt>
              <dd>{service.address}</dd>
            </>
          )}

          {service.phone && (
            <>
              <dt>Phone</dt>
              <dd>
                <a href={`tel:${service.phone}`} className="phone-link">
                  {service.phone}
                </a>
              </dd>
            </>
          )}

          {service.website && (
            <>
              <dt>Website</dt>
              <dd>
                <a 
                  href={service.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="website-link"
                >
                  {service.website}
                </a>
              </dd>
            </>
          )}
        </dl>
      </div>

      {/* Operating Hours Section */}
      <div className="service-details-section">
        <h3 className="section-title">Operating Hours</h3>
        {service.openingHours ? (
          <div className="operating-hours">
            <p className="hours-display">{service.openingHours}</p>
            <p className="hours-note">
              <ServiceStatusBadge service={service} />
              {' '}based on your current time
            </p>
          </div>
        ) : (
          <p className="hours-unavailable">Hours not available</p>
        )}
      </div>

      {/* Accessibility Section */}
      {service.wheelchair && (
        <div className="service-details-section">
          <h3 className="section-title">Accessibility</h3>
          <div className="accessibility-info">
            <span className="accessibility-icon">
              {service.wheelchair === 'yes' && '♿'}
              {service.wheelchair === 'limited' && '♿⚠️'}
              {service.wheelchair === 'no' && '🚫♿'}
            </span>
            <span className="accessibility-text">
              Wheelchair Access: {service.wheelchair}
            </span>
          </div>
        </div>
      )}

      {/* Location/Map Section */}
      <div className="service-details-section">
        <h3 className="section-title">Location</h3>
        <div className="location-info">
          <p className="coordinates">
            📍 {service.latitude.toFixed(6)}, {service.longitude.toFixed(6)}
          </p>
          {/* Here you could add a small map component */}
        </div>
      </div>

      {/* Metadata (optional - for debugging or admin info) */}
      <div className="service-details-section service-metadata">
        <h3 className="section-title">Source Information</h3>
        <div className="metadata-grid">
          <span>Source: {service.source}</span>
          {service.submittedBy && <span>Submitted by: {service.submittedBy}</span>}
          {service.id && <span className="service-id">ID: {service.id}</span>}
        </div>
      </div>
    </div>
  );
}