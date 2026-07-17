import { useState, useCallback } from 'react';
import { ServiceDetailsData, ServiceDetailsState } from '../types';

export const useServiceDetails = () => {
  const [state, setState] = useState<ServiceDetailsState>({
    data: null,
    isOpen: false,
    isLoading: false,
    error: null,
  });

  const openDetails = useCallback((data: ServiceDetailsData) => {
    setState({
      data,
      isOpen: true,
      isLoading: false,
      error: null,
    });
  }, []);

  const closeDetails = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isOpen: false,
    }));
  }, []);

  const setLoading = useCallback((isLoading: boolean) => {
    setState((prev) => ({
      ...prev,
      isLoading,
    }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState((prev) => ({
      ...prev,
      error,
    }));
  }, []);

  const updateData = useCallback((data: Partial<ServiceDetailsData>) => {
    setState((prev) => ({
      ...prev,
      data: prev.data ? { ...prev.data, ...data } : null,
    }));
  }, []);

  return {
    state,
    openDetails,
    closeDetails,
    setLoading,
    setError,
    updateData,
  };
};