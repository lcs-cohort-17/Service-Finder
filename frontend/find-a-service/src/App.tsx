import Map from './components/Map/Map';
import type { MapMarker } from './types/map.types';
import './App.css';

function App() {
  const sampleMarkers: MapMarker[] = [
    {
      id: '1',
      position: [-33.9249, 18.4241],
      title: 'Plumber Pro',
      description: 'Plumbing — Expert plumbing services',
    },
    {
      id: '2',
      position: [-33.9259, 18.4251],
      title: 'Electrician Elite',
      description: 'Electrical — Licensed electrician',
    },
    {
      id: '3',
      position: [-33.9239, 18.4231],
      title: 'Clean Co',
      description: 'Cleaning — Professional cleaning',
    },
  ];

  return (
    <div className="App">
      <h1>Service Finder - Map Demo</h1>
      <div style={{ height: '500px' }}>
        <Map center={[-33.9249, 18.4241]} zoom={13} markers={sampleMarkers} />
      </div>
    </div>
  );
}

export default App;
