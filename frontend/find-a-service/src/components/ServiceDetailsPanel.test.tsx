import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ServiceDetailsPanel } from './ServiceDetailsPanel';
import type { Service } from '../types/service';

const service: Service = {
  id: '1',
  name: 'Community Clinic',
  category: 'Clinics',
  type: 'Clinics',
  address: '101 Main Road, Cape Town',
  phone: '021 555 0110',
  website: 'https://example.co.za',
  hours: 'Mon-Fri 07:00-17:00',
  lat: -33.9249,
  lng: 18.4241,
};

const navigationUrls = {
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-33.9249,18.4241',
  streetViewUrl: 'https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=-33.9249,18.4241',
};

describe('ServiceDetailsPanel', () => {
  it('renders nothing when no service is selected', () => {
    const { container } = render(
      <ServiceDetailsPanel service={null} navigationUrls={null} onClose={() => {}} />
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('renders the full service data', () => {
    render(<ServiceDetailsPanel service={service} navigationUrls={navigationUrls} onClose={() => {}} />);

    expect(screen.getByText('Community Clinic')).toBeInTheDocument();
    expect(screen.getByText(/101 Main Road/)).toBeInTheDocument();
    expect(screen.getByText(/021 555 0110/)).toBeInTheDocument();
    expect(screen.getByText(/Mon-Fri 07:00-17:00/)).toBeInTheDocument();
  });

  it('renders Directions and Street View links pointing at the generated URLs', () => {
    render(<ServiceDetailsPanel service={service} navigationUrls={navigationUrls} onClose={() => {}} />);

    expect(screen.getByText('Directions')).toHaveAttribute('href', navigationUrls.directionsUrl);
    expect(screen.getByText('Street View')).toHaveAttribute('href', navigationUrls.streetViewUrl);
  });

  it('calls onClose when the dismiss button is clicked', () => {
    const onClose = vi.fn();
    render(<ServiceDetailsPanel service={service} navigationUrls={navigationUrls} onClose={onClose} />);

    fireEvent.click(screen.getByLabelText('Close details panel'));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
