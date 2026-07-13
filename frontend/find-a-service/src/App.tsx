import { MapContainer, MapControls, MapMarkers } from './components/Map/index';
import type { ServiceMarker } from './types/map';
import './App.css';

function App() {
  // Sample markers (would come from API in real app)
  const sampleMarkers: ServiceMarker[] = [
    {
      id: '1',
      name: 'Plumber Pro',
      category: 'Plumbing',
      lat: -33.9249,
      lng: 18.4241,
      description: 'Expert plumbing services',
    },
    {
      id: '2',
      name: 'Electrician Elite',
      category: 'Electrical',
      lat: -33.9259,
      lng: 18.4251,
      description: 'Licensed electrician',
    },
    {
      id: '3',
      name: 'Clean Co',
      category: 'Cleaning',
      lat: -33.9239,
      lng: 18.4231,
      description: 'Professional cleaning',
    },
  ];

  const handleMarkerClick = (marker: ServiceMarker) => {
    console.log('Clicked marker:', marker);
    alert(`Marker clicked: ${marker.name} (${marker.category})`);
  };

  return (
    <div className="App">
      <h1>Service Finder - Map Demo</h1>
      <MapContainer 
        center={[-33.9249, 18.4241]} 
        zoom={13}
        markers={sampleMarkers}
        onMarkerClick={handleMarkerClick}
      >
        <MapControls 
          onZoomIn={() => console.log('Zoom in')}
          onZoomOut={() => console.log('Zoom out')}
          onReset={() => console.log('Reset view')}
        />
        <MapMarkers 
          markers={sampleMarkers}
          onMarkerClick={handleMarkerClick}
        />
      </MapContainer>
    </div>
  );
}

export default App;