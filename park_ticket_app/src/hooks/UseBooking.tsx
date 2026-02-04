import { useState, useCallback } from 'react';
import apiService from '../services/api';
import useApi from './useApi';

/**
 * Custom hook for booking operations
 * @returns {Object} Booking state and methods
 */
const useBooking = () => {
  const [booking, setBooking] = useState(null);
  const { loading, error, execute } = useApi();

  /**
   * Create a new booking
   */
  const createBooking = useCallback(async (bookingData) => {
    const response = await execute(() => apiService.createBooking(bookingData));
    
    if (response.success) {
      setBooking(response.data);
    }
    
    return response;
  }, [execute]);

  /**
   * Fetch booking by ID
   */
  const fetchBooking = useCallback(async (id) => {
    const response = await execute(() => apiService.getBooking(id));
    
    if (response.success) {
      setBooking(response.data);
    }
    
    return response;
  }, [execute]);

  /**
   * Clear booking
   */
  const clearBooking = useCallback(() => {
    setBooking(null);
  }, []);

  return {
    booking,
    loading,
    error,
    createBooking,
    fetchBooking,
    clearBooking,
  };
};

export default useBooking;