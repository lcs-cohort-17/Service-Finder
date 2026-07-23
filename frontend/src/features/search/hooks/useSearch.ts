import { useMemo } from 'react';
import type { Service } from '../../../types/service.types';

/** Searches the same normalized service records that are displayed as markers. */
export function filterServicesBySearch(services: Service[], query: string): Service[] {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  if (!normalizedQuery) return services;

  return services.filter((service) =>
    [service.name, service.category, service.address]
      .filter(Boolean)
      .some((value) => value!.toLocaleLowerCase().includes(normalizedQuery)),
  );
}

export function useSearch(services: Service[], query: string): Service[] {
  return useMemo(() => filterServicesBySearch(services, query), [services, query]);
}
