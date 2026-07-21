import { useState, useEffect, type FormEvent } from 'react'
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
  origin?: string
  destination?: string
  onOriginChange?: (value: string) => void
  onDestinationChange?: (value: string) => void
  /**
   * When defined, DirectionsForm will call this with 'origin' | 'destination' | null
   * to indicate which field should take the next map click.
   */
  onMapPickChange?: (target: 'origin' | 'destination' | null) => void
  /**
   * Current map-pick target (if any) — used to render active state for pick buttons.
   */
  mapPickTarget?: 'origin' | 'destination' | null
}

function DirectionsForm({
  onGetDirections,
  origin: originProp,
  destination: destinationProp,
  onOriginChange,
  onDestinationChange,
  onMapPickChange,
  mapPickTarget = null,
}: DirectionsFormProps) {
  const [originLocal, setOriginLocal] = useState<string>('')
  const [destinationLocal, setDestinationLocal] = useState<string>('')
  const [transportMode, setTransportMode] =
    useState<TransportMode>('walking')
  const [locationError, setLocationError] = useState<string>('')
  const [isGettingLocation, setIsGettingLocation] =
    useState<boolean>(false)

  const origin = originProp ?? originLocal
  const destination = destinationProp ?? destinationLocal

  const formIsComplete = origin.trim() !== '' && destination.trim() !== ''

  const handleSwapLocations = () => {
    if (onOriginChange || onDestinationChange) {
      // controlled usage
      onOriginChange?.(destination)
      onDestinationChange?.(origin)
    } else {
      setOriginLocal(destination)
      setDestinationLocal(origin)
    }
  }

  const handleClearRoute = () => {
    if (onOriginChange || onDestinationChange) {
      onOriginChange?.('')
      onDestinationChange?.('')
    } else {
      setOriginLocal('')
      setDestinationLocal('')
    }
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
        const latlng = `${latitude}, ${longitude}`
        if (onOriginChange) onOriginChange(latlng)
        else setOriginLocal(latlng)
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

    onGetDirections?.({ origin: origin.trim(), destination: destination.trim(), transportMode })
  }

  return (
    <form className="route-form" onSubmit={handleSubmit}>
      <p className="route-section-title">Plan a route</p>

      <div className="route-input-row">
        <span className="route-dot origin-dot" aria-hidden="true" />

        <LocationInput
          id="origin"
          value={origin}
          onChange={(v) => {
            if (onOriginChange) onOriginChange(v)
            else setOriginLocal(v)
          }}
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
        <button
          type="button"
          className={mapPickTarget === 'origin' ? 'map-pick-button active' : 'map-pick-button'}
          onClick={() => onMapPickChange?.(mapPickTarget === 'origin' ? null : 'origin')}
          aria-pressed={mapPickTarget === 'origin'}
          title="Pick origin on map"
        >
          🗺️
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
          onChange={(v) => {
            if (onDestinationChange) onDestinationChange(v)
            else setDestinationLocal(v)
          }}
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
        <button
          type="button"
          className={mapPickTarget === 'destination' ? 'map-pick-button active' : 'map-pick-button'}
          onClick={() => onMapPickChange?.(mapPickTarget === 'destination' ? null : 'destination')}
          aria-pressed={mapPickTarget === 'destination'}
          title="Pick destination on map"
        >
          🗺️
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