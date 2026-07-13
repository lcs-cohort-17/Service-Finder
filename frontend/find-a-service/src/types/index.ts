export interface Service {
  id: string;
  name: string;
  category: string;
  lat: number;
  lng: number;
  address: string;
  description?: string;
}

export interface FilterState {
  searchQuery: string;
  selectedCategories: string[];
}