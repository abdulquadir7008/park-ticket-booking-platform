import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import useForm from '../hooks/useForm';
import useBooking from '../hooks/useBooking';
import Button from '../components/Button';
import TimeSlot from '../components/TimeSlot';
import LoadingSpinner from '../components/LoadingSpinner';
import { getMinDate, calculateTotalPrice, formatCurrency } from '../utils/helpers';
import '../styles/Booking.css';

/**
 * Booking Page
 * Handles ticket booking process
 */
const Booking = () => {
  const navigate = useNavigate();
  const [attraction, setAttraction] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const { createBooking, loading: bookingLoading } = useBooking();

  useEffect(() => {
    fetchAttraction();
  }, []);

  const fetchAttraction = async () => {
    try {
      const response = await apiService.getAttraction();
      if (response.success) {
        setAttraction(response.data);
      }
    } catch (err) {
      console.error('Error fetching attraction:', err);
    }
  };

  const validateBooking = (values) => {
    const errors = {};

    if (!values.date) {
      errors.date = 'Please select a date';
    }

    if (!values.timeSlot) {
      errors.timeSlot = 'Please select a time slot';
    }

    if (!values.tickets || values.tickets < 1) {
      errors.tickets = 'Please enter at least 1 ticket';
    } else if (values.tickets > 10) {
      errors.tickets = 'Maximum 10 tickets per booking';
    }

    if (!values.name || values.name.trim().length < 2) {
      errors.name = 'Please enter a valid name';
    }

    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = 'Please enter a valid email';
    }

    return errors;
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useForm(
    {
      date: '',
      timeSlot: '',
      tickets: 1,
      name: '',
      email: '',
    },
    validateBooking
  );

  const totalPrice = attraction
    ? calculateTotalPrice(values.tickets, attraction.ticketPrice)
    : 0;

  const handleTimeSlotSelect = (slot) => {
    setFieldValue('timeSlot', slot);
  };

  const proceedToPayment = handleSubmit(() => {
    setShowPayment(true);
  });

  const handleConfirmPayment = async () => {
    try {
      const bookingData = {
        ...values,
        totalPrice,
      };

      const response = await createBooking(bookingData);

      if (response.success) {
        navigate(`/confirmation/${response.data.id}`);
      }
    } catch (err) {
      alert('Error creating booking. Please try again.');
    }
  };

  if (!attraction) {
    return <LoadingSpinner message="Loading booking form..." />;
  }

  return (
    <div className="booking-page">
      <div className="booking-container">
        <h1>Book Your Tickets</h1>
        <p className="subtitle">Dubai Frame - {formatCurrency(attraction.ticketPrice)} per person</p>

        {!showPayment ? (
          <form onSubmit={proceedToPayment} className="booking-form">
            <div className="form-section">
              <h2>Select Date & Time</h2>

              <div className="form-group">
                <label htmlFor="date">Visit Date *</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={values.date}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  min={getMinDate()}
                  className={touched.date && errors.date ? 'error' : ''}
                />
                {touched.date && errors.date && (
                  <span className="error-message">{errors.date}</span>
                )}
              </div>

              <div className="form-group">
                <label>Time Slot *</label>
                <TimeSlot
                  slots={attraction.availableTimeSlots}
                  selectedSlot={values.timeSlot}
                  onSelect={handleTimeSlotSelect}
                />
                {touched.timeSlot && errors.timeSlot && (
                  <span className="error-message">{errors.timeSlot}</span>
                )}
              </div>
            </div>

            <div className="form-section">
              <h2>Ticket Details</h2>

              <div className="form-group">
                <label htmlFor="tickets">Number of Tickets *</label>
                <input
                  type="number"
                  id="tickets"
                  name="tickets"
                  value={values.tickets}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  min="1"
                  max="10"
                  className={touched.tickets && errors.tickets ? 'error' : ''}
                />
                {touched.tickets && errors.tickets && (
                  <span className="error-message">{errors.tickets}</span>
                )}
              </div>

              <div className="price-display">
                <span>Total Price:</span>
                <strong>{formatCurrency(totalPrice)}</strong>
              </div>
            </div>

            <div className="form-section">
              <h2>Personal Information</h2>

              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your full name"
                  className={touched.name && errors.name ? 'error' : ''}
                />
                {touched.name && errors.name && (
                  <span className="error-message">{errors.name}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="your.email@example.com"
                  className={touched.email && errors.email ? 'error' : ''}
                />
                {touched.email && errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>
            </div>

            <div className="form-actions">
              <Button type="button" variant="secondary" onClick={() => navigate('/')}>
                Cancel
              </Button>
              <Button type="submit" variant="primary-dark">
                Proceed to Payment
              </Button>
            </div>
          </form>
        ) : (
          <div className="payment-section">
            <h2>Payment Summary</h2>

            <div className="payment-details">
              <div className="payment-row">
                <span>Date:</span>
                <strong>{values.date}</strong>
              </div>
              <div className="payment-row">
                <span>Time:</span>
                <strong>{values.timeSlot}</strong>
              </div>
              <div className="payment-row">
                <span>Tickets:</span>
                <strong>{values.tickets} person(s)</strong>
              </div>
              <div className="payment-row total">
                <span>Total Amount:</span>
                <strong>{formatCurrency(totalPrice)}</strong>
              </div>
            </div>

            <div className="payment-info">
              <p>⚠️ This is a payment simulation. No actual payment will be processed.</p>
            </div>

            <div className="form-actions">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setShowPayment(false)}
              >
                Back
              </Button>
              <Button
                type="button"
                variant="primary-dark"
                onClick={handleConfirmPayment}
                loading={bookingLoading}
              >
                Confirm Payment
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;