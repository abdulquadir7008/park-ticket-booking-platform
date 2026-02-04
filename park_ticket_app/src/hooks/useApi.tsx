import { useState, useCallback } from 'react';

/**
 * Custom hook for API calls with loading and error states
 * @returns {Object} API state and methods
 */
const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Execute an API call
   * @param {Function} apiFunc - API function to call
   * @param {Object} options - Additional options
   */
  const execute = useCallback(async (apiFunc, options = {}) => {
    const { onSuccess, onError, loadingState = true } = options;

    try {
      if (loadingState) setLoading(true);
      setError(null);

      const response = await apiFunc();

      if (onSuccess) {
        onSuccess(response);
      }

      return response;
    } catch (err) {
      const errorMessage = err.message || 'An error occurred';
      setError(errorMessage);

      if (onError) {
        onError(errorMessage);
      }

      throw err;
    } finally {
      if (loadingState) setLoading(false);
    }
  }, []);

  /**
   * Reset error state
   */
  const resetError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    execute,
    resetError,
  };
};

export default useApi;