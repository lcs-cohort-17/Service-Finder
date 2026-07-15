/** @addsuggestions-005-author Onke Mbingeleli */
import PropTypes from 'prop-types';
import { LoginPromptModal } from './LoginPromptModal';
import { HoursModal } from './HoursModal';

export function SuggestPlaceModal({
  isOpen,
  onClose,
  isAuthenticated,
  onLoginRedirect,
  categories,
  values,
  errors,
  formError,
  selectedLocation,
  nearestPlaceLabel,
  pinDropActive,
  isSubmitting,
  onFieldChange,
  onRequestPinDrop,
  onSubmit,
  photos,
  onAddPhotos,
  hours,
  isHoursModalOpen,
  onOpenHours,
  onCloseHours,
  onBackFromHours,
  onEditHourDay,
  onEditAllHours,
  onEditWeekdayHours,
  onEditWeekendHours,
  onSaveHours,
}) {
  if (!isOpen) return null;

  if (!isAuthenticated) {
    return (
      <LoginPromptModal
        isOpen={isOpen}
        onClose={onClose}
        onLoginRedirect={onLoginRedirect}
      />
    );
  }

  const coordsText = selectedLocation
    ? `📍 ${selectedLocation.lat.toFixed(5)}, ${selectedLocation.lng.toFixed(5)}${
        nearestPlaceLabel ? ` — ${nearestPlaceLabel}` : ''
      }`
    : 'No location set yet — defaults to your current view if left blank.';

  return (
    <div className="modal-overlay show">
      <div className="modal-card" style={{ width: 'min(420px, 92vw)' }}>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <h3>💡 Suggest a place</h3>
        <div className="sub">
          Know a clinic, shelter or service that&apos;s missing from the map?
          Add it here.
        </div>

        {pinDropActive && (
          <div className="pin-drop-note show">
            <span>📍</span>
            <span>Click anywhere on the map to set this suggestion&apos;s location.</span>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(e);
          }}
          noValidate
        >
          <div className="form-group">
            <label className="form-label" htmlFor="sugCat">
              Category
            </label>
            <select
              id="sugCat"
              className={`form-select ${errors.category ? 'invalid' : ''}`}
              value={values.category}
              onChange={(e) => onFieldChange('category', e.target.value)}
            >
              <option value="" disabled>
                Select a service type
              </option>
              {categories.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.glyph ? `${c.glyph} ${c.label}` : c.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="sugName">
              Name
            </label>
            <input
              id="sugName"
              className={`form-input ${errors.name ? 'invalid' : ''}`}
              placeholder="e.g. Site B Community Clinic"
              value={values.name}
              onChange={(e) => onFieldChange('name', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="sugArea">
              Area
            </label>
            <input
              id="sugArea"
              className={`form-input ${errors.area ? 'invalid' : ''}`}
              placeholder="e.g. Khayelitsha"
              value={values.area}
              onChange={(e) => onFieldChange('area', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Location</label>
            <div>
              <button type="button" className="btn btn-ghost btn-sm" onClick={onRequestPinDrop}>
                📍 Set on map
              </button>
            </div>
            <div className="sv-note">{coordsText}</div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="sugNote">
              What should we know?
            </label>
            <textarea
              id="sugNote"
              className="form-input"
              rows={3}
              placeholder="Hours, contact info, why it matters…"
              value={values.notes}
              onChange={(e) => onFieldChange('notes', e.target.value)}
            />
          </div>

          {/* Phone number (optional) */}
          <div className="form-group">
            <label className="form-label" htmlFor="sugPhone">
              Phone number <span style={{ fontWeight: 400 }}>(optional)</span>
            </label>
            <input
              id="sugPhone"
              type="tel"
              className="form-input"
              placeholder="Phone number"
              value={values.phone}
              onChange={(e) => onFieldChange('phone', e.target.value)}
            />
          </div>

          {/* Website (optional) */}
          <div className="form-group">
            <label className="form-label" htmlFor="sugWebsite">
              Website <span style={{ fontWeight: 400 }}>(optional)</span>
            </label>
            <input
              id="sugWebsite"
              type="url"
              className="form-input"
              placeholder="Website"
              value={values.website}
              onChange={(e) => onFieldChange('website', e.target.value)}
            />
          </div>

          {/* Place photos (optional) */}
          <div className="form-group">
            <label className="form-label">
              Place photos <span style={{ fontWeight: 400 }}>(optional)</span>
            </label>
            <div className="photo-help">Add helpful photos like storefronts, notices, or signs</div>

            {photos.length > 0 && (
              <div className="photo-thumbs">
                {photos.map((photo) => (
                  <img key={photo.id} src={photo.url} alt="" className="photo-thumb" />
                ))}
              </div>
            )}

            <button type="button" className="add-photos-btn" onClick={onAddPhotos}>
              📷 Add photos
            </button>
          </div>

          {/* Hours (optional) */}
          <div className="form-group">
            <label className="form-label">
              Hours <span style={{ fontWeight: 400 }}>(optional)</span>
            </label>
            <button type="button" className="hours-summary-btn" onClick={onOpenHours}>
              <span>
                {hours.every((h) => h.closed)
                  ? 'Not set — tap to add hours'
                  : 'Hours set — tap to edit'}
              </span>
              <span aria-hidden="true">›</span>
            </button>
          </div>

          <div className={`form-error ${formError ? 'show' : ''}`}>{formError}</div>

          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting…' : 'Submit suggestion'}
          </button>

          <div className="sv-note" style={{ marginTop: 10 }}>
            Suggestions are reviewed before they appear as a verified service
            on the map.
          </div>
        </form>
      </div>

      <HoursModal
        isOpen={isHoursModalOpen}
        onClose={onCloseHours}
        onBack={onBackFromHours}
        hours={hours}
        onEditDay={onEditHourDay}
        onEditAll={onEditAllHours}
        onEditWeekdays={onEditWeekdayHours}
        onEditWeekend={onEditWeekendHours}
        onSave={onSaveHours}
      />
    </div>
  );
}

SuggestPlaceModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  onLoginRedirect: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      glyph: PropTypes.string,
    })
  ).isRequired,
  values: PropTypes.shape({
    category: PropTypes.string,
    name: PropTypes.string,
    area: PropTypes.string,
    notes: PropTypes.string,
    phone: PropTypes.string,
    website: PropTypes.string,
  }).isRequired,
  errors: PropTypes.shape({
    category: PropTypes.string,
    name: PropTypes.string,
    area: PropTypes.string,
  }),
  formError: PropTypes.string,
  selectedLocation: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  nearestPlaceLabel: PropTypes.string,
  pinDropActive: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  onFieldChange: PropTypes.func.isRequired,
  onRequestPinDrop: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      url: PropTypes.string.isRequired,
    })
  ),
  onAddPhotos: PropTypes.func.isRequired,
  hours: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.string.isRequired,
      closed: PropTypes.bool.isRequired,
      open: PropTypes.string,
      close: PropTypes.string,
    })
  ).isRequired,
  isHoursModalOpen: PropTypes.bool,
  onOpenHours: PropTypes.func.isRequired,
  onCloseHours: PropTypes.func.isRequired,
  onBackFromHours: PropTypes.func.isRequired,
  onEditHourDay: PropTypes.func.isRequired,
  onEditAllHours: PropTypes.func.isRequired,
  onEditWeekdayHours: PropTypes.func.isRequired,
  onEditWeekendHours: PropTypes.func.isRequired,
  onSaveHours: PropTypes.func.isRequired,
};

SuggestPlaceModal.defaultProps = {
  errors: {},
  formError: '',
  selectedLocation: null,
  nearestPlaceLabel: '',
  pinDropActive: false,
  isSubmitting: false,
  photos: [],
  isHoursModalOpen: false,
};

export default SuggestPlaceModal;
