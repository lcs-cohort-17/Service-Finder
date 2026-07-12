import React from 'react';

interface Service {
  id: string;
  name: string;
  category: string;
  lat: number;
  lng: number;
}

interface MapProps {
  services: Service[];
}

export const Map: React.FC<MapProps> = ({ services }) => {
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
          {services.map((service) => (
            <div 
              key={service.id} 
              style={{ 
                backgroundColor: '#ffcc00', 
                color: '#000', 
                padding: '5px 10px', 
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}
            >
              📍 {service.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};