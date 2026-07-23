/** @addsuggestions-005-author Onke Mbingeleli.
 */
import type { ReactElement } from 'react';
import { LoginPromptModal } from './LoginPromptModal';
import { HoursModal } from './HoursModal';
import { MiniMap } from './MiniMap';
import type {
  SuggestCategory,
  SuggestFormErrors,
  SuggestFormValues,
  SuggestHourEntry,
  SuggestPhoto,
  LatLng,
} from '../../../types/suggestion.types';

export interface SuggestionFormProps {
  isOpen: boolean;
  onClose: () => void;

  isAuthenticated: boolean;
  onLoginRedirect: () => void;

  categories: SuggestCategory[];
  values: SuggestFormValues;
  errors: SuggestFormErrors;
  formError: string;
  isSubmitting: boolean;
  onFieldChange: (field: keyof SuggestFormValues, value: string) => void;
  onSubmit: () => void;

  selectedLocation: LatLng | null;
  onSetLocation: (location: LatLng) => void;

  photos: SuggestPhoto[];
  onAddPhotos: () => void;

  hours: SuggestHourEntry[];
  isHoursModalOpen: boolean;
  onOpenHours: () => void;
  onCloseHours: () => void;
  onBackFromHours: () => void;
  onEditHourDay: (day: string) => void;
  onEditAllHours: () => void;
  onEditWeekdayHours: () => void;
  onEditWeekendHours: () => void;
  onSaveHours: () => void;
}

export function SuggestionForm({
  isOpen,
  onClose,
  isAuthenticated,
  onLoginRedirect,
  categories,
  values,
  errors,
  formError,
  isSubmitting,
  onFieldChange,
  onSubmit,
  selectedLocation,
  onSetLocation,
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
}: SuggestionFormProps): ReactElement | null {
  if (!isOpen) return null;

  if (!isAuthenticated) {
    return <LoginPromptModal onClose={onClose} onLoginRedirect={onLoginRedirect} />;
  }

  const hoursSetCount = hours.filter((h) => !h.closed).length;

  return (
    <div className="modal-overlay show">
      <div className="modal-card">
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <h3>💡 Suggest a place</h3>
        <div className="sub">
          Know a clinic, shelter, or service that's missing from the map?
          Tell us about it below.
        </div>

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
            <option value="">Select a category…</option>
            {categories.map((c) => (
              <option key={c.value} value={c.value}>
                {c.glyph} {c.label}
              </option>
            ))}
          </select>
          <div className={`form-error ${errors.category ? 'show' : ''}`}>{errors.category}</div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="sugName">
            Name
          </label>
          <input
            id="sugName"
            type="text"
            className={`form-input ${errors.name ? 'invalid' : ''}`}
            placeholder="e.g. Site B Community Clinic"
            value={values.name}
            onChange={(e) => onFieldChange('name', e.target.value)}
          />
          <div className={`form-error ${errors.name ? 'show' : ''}`}>{errors.name}</div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="sugArea">
            Area
          </label>
          <input
            id="sugArea"
            type="text"
            className={`form-input ${errors.area ? 'invalid' : ''}`}
            placeholder="e.g. Khayelitsha"
            value={values.area}
            onChange={(e) => onFieldChange('area', e.target.value)}
          />
          <div className={`form-error ${errors.area ? 'show' : ''}`}>{errors.area}</div>
        </div>

        <div className="form-group">
          <label className="form-label">📍 Set on map</label>
          <MiniMap active selectedLocation={selectedLocation} onSetLocation={onSetLocation} />
          {selectedLocation && (
            <div className="sv-note">
              Location set: {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
            </div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="sugPhone">
            Phone <span style={{ fontWeight: 400 }}>(optional)</span>
          </label>
          <input
            id="sugPhone"
            type="tel"
            className="form-input"
            placeholder="e.g. 021 555 0100"
            value={values.phone}
            onChange={(e) => onFieldChange('phone', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="sugWebsite">
            Website <span style={{ fontWeight: 400 }}>(optional)</span>
          </label>
          <input
            id="sugWebsite"
            type="url"
            className="form-input"
            placeholder="https://…"
            value={values.website}
            onChange={(e) => onFieldChange('website', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Photos (optional)</label>
          <div className="photo-help">Add a photo or two to help people recognize the place.</div>
          <div className="photo-thumbs">
            {photos.map((p) => (
              <img key={p.id} className="photo-thumb" src={p.url} alt="" />
            ))}
          </div>
          <button type="button" className="add-photos-btn" onClick={onAddPhotos}>
            + Add photos
          </button>
        </div>

        <div className="form-group">
          <label className="form-label">Hours (optional)</label>
          <button type="button" className="hours-summary-btn" onClick={onOpenHours}>
            <span>{hoursSetCount > 0 ? `${hoursSetCount} day(s) set` : 'Set opening hours'}</span>
            <span>›</span>
          </button>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="sugNote">
            Notes <span style={{ fontWeight: 400 }}>(optional)</span>
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

        <div className={`form-error ${formError ? 'show' : ''}`}>{formError}</div>

        <button type="button" className="btn btn-primary" onClick={onSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting…' : 'Submit suggestion'}
        </button>

        <div className="sv-note">
          Your suggestion will be reviewed by our team before it appears on the map.
        </div>
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

export default SuggestionForm;
