/** @addsuggestions-005-author Onke Mbingeleli */
import type { CSSProperties, MouseEvent, ReactElement } from 'react';
import type { LatLng } from '../../../types/suggestion.types';

export interface MiniMapProps {
  active: boolean;
  selectedLocation: LatLng | null;
  onSetLocation: (location: LatLng) => void;
}

// Roughly centers the placeholder's click area on Cape Town so the
// generated coordinates look plausible in a demo/review.
const CENTER: LatLng = { lat: -33.9249, lng: 18.4241 };
const SPAN = 0.08; // degrees covered by the placeholder box, each direction

const containerStyle: CSSProperties = {
  position: 'relative',
  width: '100%',
  height: 160,
  borderRadius: 10,
  border: '1px solid var(--line, #dce3e1)',
  background:
    'repeating-linear-gradient(0deg, rgba(18,40,60,0.06) 0 1px, transparent 1px 20px),' +
    'repeating-linear-gradient(90deg, rgba(18,40,60,0.06) 0 1px, transparent 1px 20px),' +
    'var(--paper, #eef2f1)',
  overflow: 'hidden',
};

export function MiniMap({ active, selectedLocation, onSetLocation }: MiniMapProps): ReactElement {
  function handleClick(event: MouseEvent<HTMLDivElement>) {
    if (!active) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const xRatio = (event.clientX - rect.left) / rect.width;
    const yRatio = (event.clientY - rect.top) / rect.height;
    onSetLocation({
      lat: CENTER.lat + SPAN * (0.5 - yRatio),
      lng: CENTER.lng + SPAN * (xRatio - 0.5),
    });
  }

  return (
    <div
      style={{ ...containerStyle, cursor: active ? 'crosshair' : 'default' }}
      onClick={handleClick}
      role="button"
      aria-label="Mini map — click to set this suggestion's location"
    >
      {selectedLocation && (
        <div
          style={{
            position: 'absolute',
            left: `${((selectedLocation.lng - CENTER.lng) / SPAN + 0.5) * 100}%`,
            top: `${(0.5 - (selectedLocation.lat - CENTER.lat) / SPAN) * 100}%`,
            transform: 'translate(-50%, -100%)',
            fontSize: 22,
          }}
        >
          📍
        </div>
      )}
      {!selectedLocation && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
            color: 'var(--muted, #5d6b72)',
            textAlign: 'center',
            padding: 12,
          }}
        >
          {active ? 'Click anywhere in this box to set the location' : 'No location set yet'}
        </div>
      )}
    </div>
  );
}

export default MiniMap;
