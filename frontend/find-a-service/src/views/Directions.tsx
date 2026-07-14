import DirectionsForm, {
  type RouteDetails,
} from '../components/directions/DirectionsForm'
import Map from '../components/Map/Map'
import '../styles/directions.css'

function Directions() {
  const handleGetDirections = (routeDetails: RouteDetails) => {
    console.log('Directions requested:', routeDetails)
  }

  const projectLocation: [number, number] = [-33.9249, 18.4241]

  return (
    <main className="directions-page">
      <aside className="directions-panel">
        <DirectionsForm onGetDirections={handleGetDirections} />
      </aside>

      <section className="map-placeholder" aria-label="Map area">
        <Map center={projectLocation} zoom={13} className="h-full w-full" />
      </section>
    </main>
  )
}

export default Directions