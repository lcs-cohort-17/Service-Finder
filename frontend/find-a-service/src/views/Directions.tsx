import DirectionsForm, {
  type RouteDetails,
} from '../components/directions/DirectionsForm'
import '../styles/directions.css'

function Directions() {
  const handleGetDirections = (routeDetails: RouteDetails) => {
    console.log('Directions requested:', routeDetails)
  }

  return (
    <main className="directions-page">
      <aside className="directions-panel">
        <DirectionsForm onGetDirections={handleGetDirections} />
      </aside>

      <section className="map-placeholder" aria-label="Map area">
        <p>The route map will appear here.</p>
      </section>
    </main>
  )
}

export default Directions