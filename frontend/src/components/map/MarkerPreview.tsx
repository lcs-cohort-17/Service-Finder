import type { FC } from 'react';
import type { MapMarker, ServiceMarker } from '../../types/map.types';

type PreviewMarker = MapMarker | ServiceMarker;

interface MarkerPreviewProps {
  marker: PreviewMarker;
  onClose: () => void;
}

const MarkerPreview: FC<MarkerPreviewProps> = ({ marker, onClose }) => {
  const title = 'name' in marker ? marker.name : marker.title;
  const category = 'category' in marker ? marker.category : undefined;

  return (
  <aside
    aria-label={`${title ?? 'Location'} details`}
    style={{
      position: 'absolute',
      left: '50%',
      bottom: '16px',
      zIndex: 1,
      width: 'min(320px, calc(100% - 32px))',
      transform: 'translateX(-50%)',
      borderRadius: '8px',
      backgroundColor: 'white',
      padding: '16px',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.16)',
    }}
  >
    <button
      type="button"
      aria-label="Close marker details"
      onClick={onClose}
      style={{ float: 'right' }}
    >
      ×
    </button>
    <h3 style={{ margin: 0 }}>{title ?? 'Service location'}</h3>
    {category && <p style={{ margin: '8px 0 0' }}>{category}</p>}
    {marker.description && <p style={{ margin: '8px 0 0' }}>{marker.description}</p>}
    {'rating' in marker && marker.rating !== undefined && (
      <p style={{ margin: '8px 0 0' }}>Rating: {marker.rating}</p>
    )}
  </aside>
  );
};

export default MarkerPreview;
