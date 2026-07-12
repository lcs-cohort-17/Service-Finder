export function filterServicesByCategories(services, selectedCategories) {
  if (!selectedCategories || selectedCategories.length === 0) {
    return services;
  }

  return services.filter((service) => selectedCategories.includes(service.category));
}
