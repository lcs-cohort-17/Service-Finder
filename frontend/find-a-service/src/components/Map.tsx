import React from 'react';
import type { Service } from '../types/service';

interface MapProps {
  services: Service[];
  /** Called with the clicked service's id so the caller can retrieve the full record. */
  onMarkerClick?: (serviceId: string) => void;
  /** Id of the currently selected service, used to visually highlight its marker. */
  selectedServiceId?: string | null;
}

export const Map: React.FC<MapProps> = ({ services, onMarkerClick, selectedServiceId }) => {
  const handleMarkerActivate = (serviceId: string) => {
    onMarkerClick?.(serviceId);
  };

  return (
    <div style={{ 
      border: '2px dashed #444', 
      borderRadius: '8px', 
      padding: '20px', 
      backgroundColor: '#252526', 
      minHeight: '300px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#aaa',
      textAlign: 'center'
    }}>
      <h3 style={{ color: '#fff', marginBottom: '10px' }}>🗺️ Interactive Map View</h3>
      <p>Pins visible on map: <strong style={{ color: '#ffcc00' }}>{services.length}</strong></p>
      
      {services.length === 0 ? (
        <p style={{ marginTop: '12px', color: '#ffcc00' }}>No locations match the current filters.</p>
      ) : (
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '15px', justifyContent: 'center' }}>
          {services.map((service) => {
            const isSelected = service.id === selectedServiceId;

            return (
              <div
                key={service.id}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                aria-label={`View details for ${service.name}`}
                onClick={() => handleMarkerActivate(service.id)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    handleMarkerActivate(service.id);
                  }
                }}
                style={{ 
                  backgroundColor: isSelected ? '#ff8c00' : '#ffcc00', 
                  color: '#000', 
                  padding: '5px 10px', 
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  border: isSelected ? '2px solid #fff' : '2px solid transparent',
                }}
              >
                <span aria-hidden="true">📍 </span>
                <span>{service.name}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
