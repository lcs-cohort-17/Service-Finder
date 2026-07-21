import type { Service } from '../../../types/service.types';
import { getDirectionsUrl, getStreetViewUrl } from '../../../utils/urlGenerators';

interface DesktopPopupProps { service: Service; onClose: () => void; }

/** Receives the selected marker record and presents the details hand-off. */
export default function DesktopPopup({ service, onClose }: DesktopPopupProps) {
  return (
    <aside className="service-details" aria-label="Selected service details">
      <button className="close-details" type="button" onClick={onClose} aria-label="Close service details">×</button>
      <p className="service-type">{service.category}</p>
      <h2>{service.name}</h2>
      <p>{service.address ?? 'Address not available'}</p>
      {service.phone && <p><a href={`tel:${service.phone}`}>{service.phone}</a></p>}
      {service.hours && <p>{service.hours}</p>}
      {service.website && <p><a href={service.website} target="_blank" rel="noreferrer">Visit website</a></p>}
      <div className="details-actions">
        <a href={getDirectionsUrl(service.latitude, service.longitude)} target="_blank" rel="noreferrer">Directions</a>
        <a href={getStreetViewUrl(service.latitude, service.longitude)} target="_blank" rel="noreferrer">Street View</a>
      </div>
    </aside>
  );
}
