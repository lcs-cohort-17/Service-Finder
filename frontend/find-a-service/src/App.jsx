/** @addsuggestions-005-author Onke Mbingeleli */
import { useState } from 'react'
import './styles/app-shell.css'
import {
  SuggestPlaceButton,
  SuggestPlaceModal,
  SuggestToast,
  DAYS,
} from './components/SuggestPlaceForm'

const CATEGORY_CHIPS = [
  { label: 'Hospitals', color: '#e85d4e' },
  { label: 'Clinics', color: '#0e7c86' },
  { label: 'Libraries', color: '#4c51bf' },
  { label: 'Shelters', color: '#7c3aed' },
  { label: 'Police', color: '#1b1f23' },
  { label: 'Taxi ranks', color: '#e8a33d' },
  { label: 'Bus stops', color: '#12283c' },
  { label: 'Train stations', color: '#d6409f' },
]

const TRANSIT_LINES = [
  { name: 'Southern Line', status: 'On time', tone: 'status-on' },
  { name: 'Central Line', status: 'On time', tone: 'status-on' },
  { name: 'Northern Line', status: '+12 min', tone: 'status-delay' },
  { name: 'Cape Flats Line', status: 'On time', tone: 'status-on' },
]

const CATEGORIES = [
  { value: 'clinic', label: 'Clinic', glyph: '🏥' },
  { value: 'library', label: 'Library', glyph: '📚' },
  { value: 'shelter', label: 'Shelter', glyph: '🏠' },
  { value: 'police', label: 'Police station', glyph: '🚓' },
  { value: 'school', label: 'School', glyph: '🏫' },
]

const EMPTY_VALUES = {
  category: '',
  name: '',
  area: '',
  notes: '',
  phone: '',
  website: '',
}

function App() {
  // --- ADD SUGGESTION-005 demo wiring ---------------------------------
  // Local-only state so the built UI is visible and clickable end to end.  // Real auth/validation/persistence is ADD SUGGESTION-006's job.
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isSuggestOpen, setIsSuggestOpen] = useState(false)
  const [values, setValues] = useState(EMPTY_VALUES)
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [pinDropActive, setPinDropActive] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [photos, setPhotos] = useState([])
  const [hours, setHours] = useState(
    DAYS.map((day) => ({ day, closed: true, open: '', close: '' }))
  )
  const [isHoursModalOpen, setIsHoursModalOpen] = useState(false)
  const [toast, setToast] = useState(null)

  function resetSuggestForm() {
    setValues(EMPTY_VALUES)
    setErrors({})
    setFormError('')
    setSelectedLocation(null)
    setPinDropActive(false)
    setPhotos([])
    setHours(DAYS.map((day) => ({ day, closed: true, open: '', close: '' })))
  }

  function applyHours(days, open, close, closed) {
    setHours((prev) =>
      prev.map((entry) =>
        days.includes(entry.day) ? { ...entry, closed, open, close } : entry
      )
    )
  }

  const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  const WEEKEND = ['Saturday', 'Sunday']

  function handleFieldChange(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  function handleAddPhotos() {
    const id = `${Date.now()}`
    setPhotos((prev) => [
      ...prev,
      { id, url: `https://picsum.photos/seed/${id}/56/56` },
    ])
  }

  function handleSuggestSubmit() {
    const nextErrors = {}
    if (!values.category) nextErrors.category = 'Category is required'
    if (!values.name.trim()) nextErrors.name = 'Name is required'
    if (!values.area.trim()) nextErrors.area = 'Area is required'
    if (!selectedLocation) {
      setFormError('Please set a location on the map before submitting.')
    } else {
      setFormError('')
    }
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0 || !selectedLocation) return

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuggestOpen(false)
      resetSuggestForm()
      setToast({
        variant: 'success',
        message: 'Thanks! Your suggestion was submitted for review.',
      })
    }, 900)
  }
  // ----------------------------------------------------------------------

  return (
    <div id="app">
      <header className="app-topbar">
        <div className="brand">
          <div className="dot" />
          ConnectWithUs
        </div>
        <div className="search-wrap">
          <span>🔎</span>
          <input placeholder="Search services…" />
        </div>
        <button type="button" className="icon-btn" title="Voice search">
          🎙️
        </button>
        <div className="mode-switch">
          <button type="button" className="active" title="Walking">🚶</button>
          <button type="button" title="Cycling">🚴</button>
          <button type="button" title="Driving">🚗</button>
        </div>
        <div className="conn-pill" title="Connection status">
          <span className="conn-dot" />
          <span>Online</span>
        </div>
        <button
          type="button"
          className="account-pill"
          onClick={() => setIsAuthenticated((v) => !v)}
          title="Your account"
        >
          <span className="account-avatar">{isAuthenticated ? '🙂' : '👤'}</span>
          <span>{isAuthenticated ? 'Onke M.' : 'Sign in'}</span>
        </button>
      </header>

      <aside id="sidebar">
        <div className="section">
          <div className="section-title">Show on map</div>
          <div className="chip-grid">
            {CATEGORY_CHIPS.map((c) => (
              <button key={c.label} type="button" className="chip">
                <span className="swatch" style={{ background: c.color }} />
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="section">
          <div className="section-title">Plan a route</div>
          <div className="route-field from">
            <span className="dot" />
            <input placeholder="From — address or 'my location'" />
            <button type="button" className="route-mini-btn" title="Use my location">📍</button>
          </div>
          <div className="route-field to">
            <span className="dot" />
            <input placeholder="To — address, clinic, station…" />
            <button type="button" className="route-mini-btn" title="Swap">⇅</button>
          </div>
          <div className="route-actions">
            <button type="button" className="btn btn-primary">Get directions</button>
            <button type="button" className="btn btn-ghost btn-sm">Clear</button>
          </div>
        </div>

        <div className="section">
          <div className="section-title">Live transit status</div>
          <div className="ticker-list">
            {TRANSIT_LINES.map((line) => (
              <div key={line.name} className="ticker-item">
                <span className={`status-dot ${line.tone}`} />
                <span className="line-name">{line.name}</span>
                <span className="status-text">{line.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="section" style={{ borderBottom: 'none' }}>
          <div className="section-title">Conditions</div>
          <div className="weather-banner">
            <span>🌧️</span>
            <span>
              Heavy rain expected over Mitchells Plain &amp; Khayelitsha this
              afternoon — possible flooding on low-lying routes.
            </span>
          </div>
          <div className="toggle-row">
            <span>Live traffic layer</span>
            <label className="switch">
              <input type="checkbox" defaultChecked />
              <span className="slider" />
            </label>
          </div>
          <div className="toggle-row">
            <span>Community hazard reports</span>
            <label className="switch">
              <input type="checkbox" defaultChecked />
              <span className="slider" />
            </label>
          </div>
          <div className="toggle-row">
            <span>SAPS crime hotspots</span>
            <label className="switch">
              <input type="checkbox" defaultChecked />
              <span className="slider" />
            </label>
          </div>
        </div>
      </aside>

      <div className="map-area">
        {/* Real map integration belongs to the map ticket; this is a
            placeholder so ADD SUGGESTION-005 can be reviewed in context. */}
        <div id="map-placeholder">Map view — Leaflet integration is a separate ticket</div>

        <div className="map-float-controls">
          <button type="button" className="float-btn" title="Switch to satellite imagery">
            🛰️ Satellite view
          </button>
          <button type="button" className="float-btn">🧍 Street View</button>
          <button type="button" className="float-btn">📍 Drop a report pin</button>
          <SuggestPlaceButton onClick={() => setIsSuggestOpen(true)} />
          <button type="button" className="float-btn">🎯 Recenter on me</button>
        </div>

        <button type="button" className="emergency-fab">🚨 Emergency</button>

        {pinDropActive && (
          <div
            style={{
              position: 'absolute',
              left: '50%',
              bottom: 90,
              transform: 'translateX(-50%)',
              zIndex: 1000,
            }}
          >
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => {
                setSelectedLocation({ lat: -29.8587, lng: 31.0218 })
                setPinDropActive(false)
                setFormError('')
              }}
            >
              📍 Simulate map click (real map is a separate ticket)
            </button>
          </div>
        )}
      </div>

      <SuggestPlaceModal
        isOpen={isSuggestOpen}
        onClose={() => {
          setIsSuggestOpen(false)
          setIsHoursModalOpen(false)
        }}
        isAuthenticated={isAuthenticated}
        onLoginRedirect={() => setIsAuthenticated(true)}
        categories={CATEGORIES}
        values={values}
        errors={errors}
        formError={formError}
        selectedLocation={selectedLocation}
        nearestPlaceLabel=""
        pinDropActive={pinDropActive}
        isSubmitting={isSubmitting}
        onFieldChange={handleFieldChange}
        onRequestPinDrop={() => setPinDropActive(true)}
        onSubmit={handleSuggestSubmit}
        photos={photos}
        onAddPhotos={handleAddPhotos}
        hours={hours}
        isHoursModalOpen={isHoursModalOpen}
        onOpenHours={() => setIsHoursModalOpen(true)}
        onCloseHours={() => setIsHoursModalOpen(false)}
        onBackFromHours={() => setIsHoursModalOpen(false)}
        onEditHourDay={(day) =>
          setHours((prev) =>
            prev.map((entry) =>
              entry.day === day
                ? entry.closed
                  ? { ...entry, closed: false, open: '09:00', close: '17:00' }
                  : { ...entry, closed: true, open: '', close: '' }
                : entry
            )
          )
        }
        onEditAllHours={() => applyHours(DAYS, '09:00', '17:00', false)}
        onEditWeekdayHours={() => applyHours(WEEKDAYS, '09:00', '17:00', false)}
        onEditWeekendHours={() => applyHours(WEEKEND, '10:00', '14:00', false)}
        onSaveHours={() => setIsHoursModalOpen(false)}
      />

      {toast && (
        <SuggestToast
          variant={toast.variant}
          message={toast.message}
          onDismiss={() => setToast(null)}
        />
      )}
    </div>
  )
}

export default App
/** @addsuggestions-005-author Onke Mbingeleli
 */