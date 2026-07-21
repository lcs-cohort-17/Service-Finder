// Export components
export { default as DesktopPopup } from './components/DesktopPopup';
export { default as MobileBottomSheet } from './components/MobileBottomSheet';
export { default as ServiceDetailsContent } from './components/ServiceDetailsContent';
export { default as ServiceDetailsActions } from './components/ServiceDetailsActions';

// Export types
export type { 
  ServiceDetailsData, 
  ServiceDetailsActions, 
  ServiceDetailsProps,
  ServiceDetailsState 
} from './types';

// Export hooks
export { useServiceDetails } from './hooks/useServiceDetails';