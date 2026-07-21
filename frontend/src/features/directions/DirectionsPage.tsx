import { useMemo, useState } from 'react'
import DirectionsForm, { type RouteDetails } from './components/DirectionsForm'
import MapContainer from '../../components/map/MapContainer'
import './directions.css'

function parseLatLng(value: string): [number, number] | null {
  const m = value.trim().match(/^(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)$/)
  if (!m) return null
  const lat = Number(m[1])
  const lng = Number(m[2])
  if (Number.isNaN(lat) || Number.isNaN(lng)) return null
  return [lat, lng]
}

function DirectionsPage() {
  const [origin, setOrigin] = useState<string>('')
  const [destination, setDestination] = useState<string>('')
  const [mapPickTarget, setMapPickTarget] = useState<'origin' | 'destination' | null>(null)

  const handleGetDirections = (routeDetails: RouteDetails) => {
    // TODO: integrate real routing API — for now show values in console
    console.log('Directions requested:', routeDetails)
  }

  const projectLocation: [number, number] = [-33.9249, 18.4241]

  const markers = useMemo(() => {
    const arr: Array<any> = []
    const o = parseLatLng(origin)
    const d = parseLatLng(destination)
    if (o) arr.push({ id: 'origin', position: o, title: 'Origin' })
    if (d) arr.push({ id: 'destination', position: d, title: 'Destination' })
    return arr
  }, [origin, destination])

  const handleMapClick = (latlng: [number, number]) => {
    const str = `${latlng[0]}, ${latlng[1]}`
    if (mapPickTarget === 'origin') {
      setOrigin(str)
      setMapPickTarget(null)
    } else if (mapPickTarget === 'destination') {
      setDestination(str)
      setMapPickTarget(null)
    }
  }

  return (
    <main className="directions-page">
      <aside className="directions-panel">
        <DirectionsForm
          onGetDirections={handleGetDirections}
          origin={origin}
          destination={destination}
          onOriginChange={setOrigin}
          onDestinationChange={setDestination}
          mapPickTarget={mapPickTarget}
          onMapPickChange={setMapPickTarget}
        />
      </aside>

      <section className="map-placeholder" aria-label="Map area">
        <MapContainer
          center={projectLocation}
          zoom={13}
          className="h-full w-full"
          markers={markers}
          onClick={handleMapClick}
        />
      </section>
    </main>
  )
}

export default DirectionsPage