import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useBooking from '../hooks/useBooking';
import QRDisplay from '../components/QRDisplay';
import TicketCard from '../components/TicketCard';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/Confirmation.css';

/**
 * Confirmation Page
 * Displays booking confirmation and QR code
 */
const Confirmation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { booking, loading, error, fetchBooking } = useBooking();

  useEffect(() => {
    if (id) {
      fetchBooking(id);
    }
  }, [id, fetchBooking]);

  if (loading) {
    return <LoadingSpinner message="Loading your booking..." />;
  }

  if (error || !booking) {
    return (
      <div className="error-container">
        <h2>Booking Not Found</h2>
        <p>We couldn't find the booking you're looking for.</p>
        <Button onClick={() => navigate('/')}>Go Home</Button>
      </div>
    );
  }

  return (
    <div className="confirmation-page">
      <div className="confirmation-container">
        <div className="success-header">
          <div className="success-icon">✓</div>
          <h1>Booking Confirmed!</h1>
          <p>Your tickets have been booked successfully</p>
        </div>

        <div className="confirmation-content">
          <div className="ticket-section">
            <TicketCard booking={booking} />
          </div>

          <div className="qr-section">
            <h2>Your Entry Pass</h2>
            <p>Show this QR code at the entrance gate</p>
            <QRDisplay value={booking.qrCode} bookingId={booking.id} />
            <div className="qr-info">
              <p>📧 A confirmation email has been sent to <strong>{booking.email}</strong></p>
              <p>💡 Save or download this QR code for entry</p>
            </div>
          </div>
        </div>

        <div className="confirmation-actions">
          <Button onClick={() => navigate('/')} variant="primary">
            Back to Home
          </Button>
          <Button onClick={() => window.print()} variant="secondary">
            Print Ticket
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;