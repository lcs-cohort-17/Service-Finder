import { describe, expect, it } from 'vitest';
import { filterServicesByCategories } from './serviceFilters';

describe('filterServicesByCategories', () => {
  const services = [
    { id: '1', name: 'Clinic A', category: 'Clinics' },
    { id: '2', name: 'Library A', category: 'Libraries' },
    { id: '3', name: 'Shelter A', category: 'Shelters' },
    { id: '4', name: 'Home Affairs Office', category: 'Home Affairs' },
  ];

  it('returns all services when no categories are selected', () => {
    expect(filterServicesByCategories(services, [])).toEqual(services);
  });

  it('returns only the services whose categories are selected', () => {
    expect(filterServicesByCategories(services, ['Clinics', 'Home Affairs'])).toEqual([
      services[0],
      services[3],
    ]);
  });
});
