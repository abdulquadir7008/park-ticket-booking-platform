import axios from 'axios';
import.meta.env;
const API_BASE_URL = import.meta.env.VITE_API_URL;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

/**
 * API Service Methods
 */
const apiService = {
  /**
   * Get attraction details
   */
  getAttraction: async () => {
    return await api.get('/attraction');
  },

  /**
   * Create a new booking
   */
  createBooking: async (bookingData) => {
    return await api.post('/book', bookingData);
  },

  /**
   * Get booking by ID
   */
  getBooking: async (id) => {
    return await api.get(`/booking/${id}`);
  },

  /**
   * Validate QR code
   */
  validateQrCode: async (qrCode) => {
    return await api.post('/validate', { qrCode });
  },

  /**
   * Mark ticket as used
   */
  markAsUsed: async (qrCode) => {
    return await api.post('/mark-used', { qrCode });
  },
};

export default apiService;