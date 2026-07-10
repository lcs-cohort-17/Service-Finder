import React from 'react';

// 1. Define the TypeScript data structure for a public service item
interface Service {
  id: string;
  name: string;
  category: string;
  lat: number;
  lng: number;
}

// 2. Define the explicit shape of props this map component expects
interface MapProps {
  services: Service[];
}

// 3. Type the functional component with React.FC<MapProps>
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
      color: '#aaa'
    }}>
      <h3 style={{ color: '#fff', marginBottom: '10px' }}>🗺️ Interactive Map View</h3>
      <p>Pins visible on map: <strong style={{ color: '#ffcc00' }}>{services.length}</strong></p>
      
      {/* Loop through and display the filtered active service pins */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '15px' }}>
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
    </div>
  );
};