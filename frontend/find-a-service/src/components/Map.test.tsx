import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Map } from './Map';
import type { Service } from '../types/service';

const services: Service[] = [
  { id: '1', name: 'Community Clinic', category: 'Clinics', lat: -33.9249, lng: 18.4241 },
  { id: '2', name: 'Central Library', category: 'Libraries', lat: -33.9255, lng: 18.428 },
];

describe('Map', () => {
  it('renders a marker per service', () => {
    render(<Map services={services} />);

    expect(screen.getByText('Community Clinic')).toBeInTheDocument();
    expect(screen.getByText('Central Library')).toBeInTheDocument();
  });

  it('calls onMarkerClick with the clicked service id', () => {
    const onMarkerClick = vi.fn();
    render(<Map services={services} onMarkerClick={onMarkerClick} />);

    fireEvent.click(screen.getByText('Community Clinic'));

    expect(onMarkerClick).toHaveBeenCalledTimes(1);
    expect(onMarkerClick).toHaveBeenCalledWith('1');
  });

  it('supports activating a marker via the keyboard', () => {
    const onMarkerClick = vi.fn();
    render(<Map services={services} onMarkerClick={onMarkerClick} />);

    fireEvent.keyDown(screen.getByText('Central Library'), { key: 'Enter' });

    expect(onMarkerClick).toHaveBeenCalledWith('2');
  });

  it('marks the selected marker as pressed', () => {
    render(<Map services={services} selectedServiceId="1" />);

    expect(screen.getByLabelText('View details for Community Clinic')).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(screen.getByLabelText('View details for Central Library')).toHaveAttribute(
      'aria-pressed',
      'false'
    );
  });
});
