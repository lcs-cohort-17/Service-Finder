export interface ServiceDetailsData {
  id: string;
  name: string;
  address: string;
  hours: string;
  phone: string;
  website: string;
  lat: number;
  lng: number;
  type?: string;
  description?: string;
  rating?: number;
}

export interface ServiceDetailsActions {
  onDirections: (data: ServiceDetailsData) => void;
  onStreetView: (data: ServiceDetailsData) => void;
  onClose: () => void;
  onSave?: (data: ServiceDetailsData) => void;
  onShare?: (data: ServiceDetailsData) => void;
}

export interface ServiceDetailsProps {
  data: ServiceDetailsData | null;
  isOpen: boolean;
  actions: ServiceDetailsActions;
}

export interface ServiceDetailsState {
  data: ServiceDetailsData | null;
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
}