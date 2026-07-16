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

describe('ServiceDetailsPanel', () => {
  it('renders nothing when no service is selected', () => {
    const { container } = render(
      <ServiceDetailsPanel
        service={null}
        onClose={() => {}}
        onDirections={() => {}}
        onLocate={() => {}}
      />
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('renders the full service data', () => {
    render(
      <ServiceDetailsPanel
        service={service}
        onClose={() => {}}
        onDirections={() => {}}
        onLocate={() => {}}
      />
    );

    expect(screen.getByText('Community Clinic')).toBeInTheDocument();
    expect(screen.getByText(/101 Main Road/)).toBeInTheDocument();
    expect(screen.getByText(/021 555 0110/)).toBeInTheDocument();
    expect(screen.getByText(/Mon-Fri 07:00-17:00/)).toBeInTheDocument();
  });

  it('calls onDirections and onLocate when their buttons are clicked, acting on our own map', () => {
    const onDirections = vi.fn();
    const onLocate = vi.fn();
    render(
      <ServiceDetailsPanel
        service={service}
        onClose={() => {}}
        onDirections={onDirections}
        onLocate={onLocate}
      />
    );

    fireEvent.click(screen.getByText('Directions'));
    fireEvent.click(screen.getByText('Locate'));

    expect(onDirections).toHaveBeenCalledTimes(1);
    expect(onLocate).toHaveBeenCalledTimes(1);
  });

  it('shows a route summary when provided', () => {
    render(
      <ServiceDetailsPanel
        service={service}
        onClose={() => {}}
        onDirections={() => {}}
        onLocate={() => {}}
        routeSummary={{ distanceKm: 3.4, durationMin: 9 }}
      />
    );

    expect(screen.getByText(/3.4 km/)).toBeInTheDocument();
    expect(screen.getByText(/9 min/)).toBeInTheDocument();
  });

  it('shows a routing error when provided', () => {
    render(
      <ServiceDetailsPanel
        service={service}
        onClose={() => {}}
        onDirections={() => {}}
        onLocate={() => {}}
        routeError="Could not calculate directions. Please try again."
      />
    );

    expect(screen.getByRole('alert')).toHaveTextContent('Could not calculate directions');
  });

  it('calls onClose when the dismiss button is clicked', () => {
    const onClose = vi.fn();
    render(
      <ServiceDetailsPanel
        service={service}
        onClose={onClose}
        onDirections={() => {}}
        onLocate={() => {}}
      />
    );

    fireEvent.click(screen.getByLabelText('Close details panel'));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
