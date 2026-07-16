import { useState, type FormEvent } from 'react'
import LocationInput from './LocationInput'
import TransportModeSelector, {
  type TransportMode,
} from './TransportModeSelector'

export interface RouteDetails {
  origin: string
  destination: string
  transportMode: TransportMode
}

interface DirectionsFormProps {
  onGetDirections?: (routeDetails: RouteDetails) => void
}

function DirectionsForm({ onGetDirections }: DirectionsFormProps) {
  const [origin, setOrigin] = useState<string>('')
  const [destination, setDestination] = useState<string>('')
  const [transportMode, setTransportMode] =
    useState<TransportMode>('walking')
  const [locationError, setLocationError] = useState<string>('')
  const [isGettingLocation, setIsGettingLocation] =
    useState<boolean>(false)

  const formIsComplete =
    origin.trim() !== '' && destination.trim() !== ''

  const handleSwapLocations = () => {
    setOrigin(destination)
    setDestination(origin)
  }

  const handleClearRoute = () => {
    setOrigin('')
    setDestination('')
    setTransportMode('walking')
    setLocationError('')
  }

  const handleCurrentLocation = () => {
    setLocationError('')

    if (!navigator.geolocation) {
      setLocationError('Location services are not supported.')
      return
    }

    setIsGettingLocation(true)

    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords

        setOrigin(`${latitude}, ${longitude}`)
        setIsGettingLocation(false)
      },
      () => {
        setLocationError('Unable to access your current location.')
        setIsGettingLocation(false)
      },
    )
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!formIsComplete) {
      return
    }

    onGetDirections?.({
      origin: origin.trim(),
      destination: destination.trim(),
      transportMode,
    })
  }

  return (
    <form className="route-form" onSubmit={handleSubmit}>
      <p className="route-section-title">Plan a route</p>

      <div className="route-input-row">
        <span className="route-dot origin-dot" aria-hidden="true" />

        <LocationInput
          id="origin"
          value={origin}
          onChange={setOrigin}
          placeholder="From — address or 'my location'"
          ariaLabel="Origin"
        />

        <button
          type="button"
          className="location-icon-button"
          onClick={handleCurrentLocation}
          disabled={isGettingLocation}
          aria-label="Use current location"
          title="Use current location"
        >
          📍
        </button>
      </div>

      <div className="route-input-row">
        <span
          className="route-dot destination-dot"
          aria-hidden="true"
        />

        <LocationInput
          id="destination"
          value={destination}
          onChange={setDestination}
          placeholder="To — address, clinic, station..."
          ariaLabel="Destination"
        />

        <button
          type="button"
          className="swap-icon-button"
          onClick={handleSwapLocations}
          disabled={!origin.trim() || !destination.trim()}
          aria-label="Swap locations"
          title="Swap locations"
        >
          ⇅
        </button>
      </div>

      <TransportModeSelector
        selectedMode={transportMode}
        onChange={setTransportMode}
      />

      {locationError && (
        <p className="route-error" role="alert">
          {locationError}
        </p>
      )}

      <div className="route-actions">
        <button
          type="submit"
          className="get-directions-button"
          disabled={!formIsComplete}
        >
          Get directions
        </button>

        <button
          type="button"
          className="clear-route-button"
          onClick={handleClearRoute}
        >
          Clear
        </button>
      </div>
    </form>
  )
}

export default DirectionsForm