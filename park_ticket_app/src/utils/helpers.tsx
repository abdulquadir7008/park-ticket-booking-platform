import { format, parse, isAfter, isBefore, startOfDay } from 'date-fns';

/**
 * Format date to display string
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date
 */
export const formatDate = (date) => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, 'MMMM dd, yyyy');
  } catch (error) {
    return '';
  }
};

/**
 * Format date for input field (YYYY-MM-DD)
 * @param {Date} date - Date to format
 * @returns {string} Formatted date
 */
export const formatDateForInput = (date) => {
  try {
    return format(date, 'yyyy-MM-dd');
  } catch (error) {
    return '';
  }
};

/**
 * Get minimum date (today)
 * @returns {string} Minimum date for booking
 */
export const getMinDate = () => {
  return formatDateForInput(new Date());
};

/**
 * Check if date is valid for booking
 * @param {string} date - Date string
 * @returns {boolean} Is valid
 */
export const isValidBookingDate = (date) => {
  try {
    const selectedDate = startOfDay(new Date(date));
    const today = startOfDay(new Date());
    return isAfter(selectedDate, today) || selectedDate.getTime() === today.getTime();
  } catch (error) {
    return false;
  }
};

/**
 * Format currency
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code
 * @returns {string} Formatted currency
 */
export const formatCurrency = (amount, currency = 'AED') => {
  return `${currency} ${amount.toFixed(2)}`;
};

/**
 * Calculate total price
 * @param {number} tickets - Number of tickets
 * @param {number} pricePerTicket - Price per ticket
 * @returns {number} Total price
 */
export const calculateTotalPrice = (tickets, pricePerTicket) => {
  return tickets * pricePerTicket;
};