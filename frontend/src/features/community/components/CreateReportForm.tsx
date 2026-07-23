// ===========================
// Onke Mbingeleli - COMMUNITY-002 (Create Community Report) //
// Onke Mbingeleli - COMMUNITY-002 (Community Issue Reports) //
// ===========================
//
// These two tickets both describe "logged-in user fills a form with a
// category, description, and a map-picked location, saved with their
// user id/timestamp" — COMMUNITY-002 (Issue Reports) adds an optional
// photo and richer status tracking on top. Building one combined form
// rather than two near-duplicates; flagging this merge decision for
// review rather than assuming silently.
//
// Map picker: reuses the real Map component (components/map/Map.tsx)
// rather than building a second one. This project's primary tiles are
// already OpenStreetMap (see config/map.config.ts), so the "fallback to
// OSM if the primary map API fails" requirement is inherently satisfied
// by default — no Google Maps API is in use to fall back from.
import { useState } from 'react';
import Map from '../../../components/map/Map';
import type { MapMarker } from '../../../types/map.types';
import {
  REPORT_CATEGORIES,
  type CommunityReportFormErrors,
  type CommunityReportFormValues,
  type NewCommunityReportInput,
} from '../../../types/community.types';

export interface CreateReportFormProps {
  onSubmit: (input: NewCommunityReportInput) => Promise<unknown>;
  isSubmitting: boolean;
}

const EMPTY_VALUES: CommunityReportFormValues = {
  category: '',
  title: '',
  description: '',
  manualAddress: '',
};

const DEFAULT_CENTER: [number, number] = [-33.9249, 18.4241];

export function CreateReportForm({ onSubmit, isSubmitting }: CreateReportFormProps) {
  const [values, setValues] = useState<CommunityReportFormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<CommunityReportFormErrors>({});
  const [formError, setFormError] = useState('');
  const [pin, setPin] = useState<{ lat: number; lng: number } | null>(null);
  const [useManualLocation, setUseManualLocation] = useState(false);
  const [manualLat, setManualLat] = useState('');
  const [manualLng, setManualLng] = useState('');
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(undefined);

  function handleField<K extends keyof CommunityReportFormValues>(
    field: K,
    value: CommunityReportFormValues[K]
  ) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function handleAddPhoto() {
    // No upload backend yet — a locally-previewable placeholder image,
    // same pattern used in the suggestions feature (ADD SUGGESTION-005).
    setPhotoUrl(`https://picsum.photos/seed/${Date.now()}/320/160`);
  }

  function resolveLocation(): { lat: number; lng: number } | null {
    if (useManualLocation) {
      const lat = Number(manualLat);
      const lng = Number(manualLng);
      if (Number.isFinite(lat) && Number.isFinite(lng)) return { lat, lng };
      return null;
    }
    return pin;
  }

  async function handleSubmit() {
    const nextErrors: CommunityReportFormErrors = {};
    if (!values.category) nextErrors.category = 'Category is required';
    if (!values.title.trim()) nextErrors.title = 'Title is required';
    if (!values.description.trim()) nextErrors.description = 'Description is required';

    const location = resolveLocation();
    if (!location) {
      nextErrors.location = useManualLocation
        ? 'Enter a valid latitude and longitude.'
        : 'Click the map to set this report\u2019s location, or switch to manual entry.';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0 || !location) return;

    setFormError('');
    try {
      await onSubmit({
        category: values.category as NewCommunityReportInput['category'],
        title: values.title.trim(),
        description: values.description.trim(),
        latitude: location.lat,
        longitude: location.lng,
        address: values.manualAddress.trim() || undefined,
        photoUrl,
      });
      setValues(EMPTY_VALUES);
      setPin(null);
      setManualLat('');
      setManualLng('');
      setPhotoUrl(undefined);
      setUseManualLocation(false);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Could not submit your report.');
    }
  }

  const markers: MapMarker[] = pin
    ? [{ id: 'picked-location', position: [pin.lat, pin.lng], title: 'Report location' }]
    : [];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Report an issue</h2>
      <p className="mt-1 text-sm text-slate-500">
        Let your community know about roadworks, accidents, or hazards nearby.
      </p>

      <div className="mt-4 space-y-4">
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-600" htmlFor="reportCategory">
            Category
          </label>
          <select
            id="reportCategory"
            className={`w-full rounded-lg border px-3 py-2 text-sm ${
              errors.category ? 'border-red-400' : 'border-slate-300'
            }`}
            value={values.category}
            onChange={(e) => handleField('category', e.target.value as CommunityReportFormValues['category'])}
          >
            <option value="">Select a category…</option>
            {REPORT_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.category && <p className="mt-1 text-xs text-red-600">{errors.category}</p>}
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-600" htmlFor="reportTitle">
            Title
          </label>
          <input
            id="reportTitle"
            type="text"
            className={`w-full rounded-lg border px-3 py-2 text-sm ${
              errors.title ? 'border-red-400' : 'border-slate-300'
            }`}
            placeholder="e.g. Pothole on Main Road"
            value={values.title}
            onChange={(e) => handleField('title', e.target.value)}
          />
          {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-600" htmlFor="reportDescription">
            Description
          </label>
          <textarea
            id="reportDescription"
            rows={3}
            className={`w-full rounded-lg border px-3 py-2 text-sm ${
              errors.description ? 'border-red-400' : 'border-slate-300'
            }`}
            placeholder="What's happening, and anything else people should know?"
            value={values.description}
            onChange={(e) => handleField('description', e.target.value)}
          />
          {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
        </div>

        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="block text-xs font-semibold text-slate-600">Location</label>
            <button
              type="button"
              className="text-xs font-medium text-teal-700 underline-offset-2 hover:underline"
              onClick={() => setUseManualLocation((v) => !v)}
            >
              {useManualLocation ? 'Use the map instead' : 'Having trouble with the map? Enter manually'}
            </button>
          </div>

          {useManualLocation ? (
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                inputMode="decimal"
                placeholder="Latitude"
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                value={manualLat}
                onChange={(e) => setManualLat(e.target.value)}
              />
              <input
                type="text"
                inputMode="decimal"
                placeholder="Longitude"
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                value={manualLng}
                onChange={(e) => setManualLng(e.target.value)}
              />
            </div>
          ) : (
            <div className="h-40 w-full overflow-hidden rounded-lg border border-slate-300">
              <Map
                center={pin ? [pin.lat, pin.lng] : DEFAULT_CENTER}
                zoom={14}
                markers={markers}
                showZoomControl={false}
                className="h-full w-full"
                onClick={(latlng) => {
                  const [lat, lng] = latlng as [number, number];
                  setPin({ lat, lng });
                  setErrors((prev) => ({ ...prev, location: undefined }));
                }}
              />
            </div>
          )}

          <div>
            <input
              type="text"
              placeholder="Address (optional)"
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              value={values.manualAddress}
              onChange={(e) => handleField('manualAddress', e.target.value)}
            />
          </div>

          {errors.location && <p className="mt-1 text-xs text-red-600">{errors.location}</p>}
          <p className="mt-1 text-xs text-slate-400">
            No working map on your device? Switch to manual entry above and type in
            coordinates or an address instead.
          </p>
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-600">
            Photo <span className="font-normal">(optional)</span>
          </label>
          {photoUrl && (
            <img src={photoUrl} alt="" className="mb-2 h-28 w-full rounded-lg object-cover" />
          )}
          <button
            type="button"
            className="rounded-full border border-teal-600 px-4 py-1.5 text-xs font-semibold text-teal-700 hover:bg-teal-50"
            onClick={handleAddPhoto}
          >
            + Add a photo
          </button>
        </div>

        {formError && (
          <div className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">{formError}</div>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Submitting…' : 'Submit report'}
        </button>
      </div>
    </div>
  );
}

export default CreateReportForm;
