import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { SERVICES_DATA, SERVICE_CATEGORIES } from './data/services';

// Mock the ServiceMap to avoid Leaflet
vi.mock('./components/ServiceMap/ServiceMap', () => ({
  ServiceMap: ({ services }: { services: any[] }) => (
    <div data-testid="mock-map" data-count={services.length}>
      Map with {services.length} services
    </div>
  ),
}));

describe('App integration tests', () => {
  const allServicesCount = SERVICES_DATA.length;

  it('filters services by search query', async () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText('Type a service name…');

    // Initially all services
    expect(screen.getByTestId('mock-map')).toHaveAttribute('data-count', String(allServicesCount));

    // Type 'clinic' – should show only clinics
    await userEvent.type(searchInput, 'clinic');
    const clinicCount = SERVICES_DATA.filter(s => 
      s.name.toLowerCase().includes('clinic')
    ).length;
    await waitFor(() => {
      expect(screen.getByTestId('mock-map')).toHaveAttribute('data-count', String(clinicCount));
    });

    // Clear search – resets to all services
    const clearBtn = screen.getByLabelText('Clear search');
    fireEvent.click(clearBtn);
    await waitFor(() => {
      expect(screen.getByTestId('mock-map')).toHaveAttribute('data-count', String(allServicesCount));
    });
  });

  it('filters services by category selection', async () => {
    render(<App />);
    expect(screen.getByTestId('mock-map')).toHaveAttribute('data-count', String(allServicesCount));

    // Select first category
    const firstCategory = SERVICE_CATEGORIES[0];
    fireEvent.click(screen.getByText(firstCategory));
    const categoryCount = SERVICES_DATA.filter(s => s.category === firstCategory).length;
    await waitFor(() => {
      expect(screen.getByTestId('mock-map')).toHaveAttribute('data-count', String(categoryCount));
    });

    // Select second category (adds more)
    const secondCategory = SERVICE_CATEGORIES[1];
    fireEvent.click(screen.getByText(secondCategory));
    const combinedCount = SERVICES_DATA.filter(s => 
      s.category === firstCategory || s.category === secondCategory
    ).length;
    await waitFor(() => {
      expect(screen.getByTestId('mock-map')).toHaveAttribute('data-count', String(combinedCount));
    });

    // Clear all categories
    fireEvent.click(screen.getByText('Clear all'));
    await waitFor(() => {
      expect(screen.getByTestId('mock-map')).toHaveAttribute('data-count', String(allServicesCount));
    });
  });

  it('combines search and category filters', async () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText('Type a service name…');

    // Pick a category that has at least one service
    const categoryWithServices = SERVICE_CATEGORIES.find(cat => 
      SERVICES_DATA.some(s => s.category === cat)
    );
    if (!categoryWithServices) throw new Error('No category with services found');

    // Select that category
    fireEvent.click(screen.getByText(categoryWithServices));
    const categoryCount = SERVICES_DATA.filter(s => s.category === categoryWithServices).length;
    await waitFor(() => {
      expect(screen.getByTestId('mock-map')).toHaveAttribute('data-count', String(categoryCount));
    });

    // Find a service in that category, take its first word as a unique search term
    const serviceInCategory = SERVICES_DATA.find(s => s.category === categoryWithServices);
    // Use the first word of the name (e.g., "City" from "City Health Clinic")
    const searchTerm = serviceInCategory?.name.split(' ')[0] || 'City';

    // Type the search term
    await userEvent.type(searchInput, searchTerm);

    // Expected: services in that category that match the term
    const expectedCount = SERVICES_DATA.filter(s => 
      s.category === categoryWithServices && 
      s.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).length;

    await waitFor(() => {
      expect(screen.getByTestId('mock-map')).toHaveAttribute('data-count', String(expectedCount));
    });

    // Clear search – resets to all services (both search and categories are cleared)
    fireEvent.click(screen.getByLabelText('Clear search'));
    await waitFor(() => {
      expect(screen.getByTestId('mock-map')).toHaveAttribute('data-count', String(allServicesCount));
    });
  });
});