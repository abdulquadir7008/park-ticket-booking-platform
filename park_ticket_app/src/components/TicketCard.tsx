import React from 'react';
import { formatDate, formatCurrency } from '../utils/helpers';
import '../styles/TicketCard.css';

/**
 * TicketCard Component
 * Displays booking details in a card format
 */
const TicketCard = ({ booking }) => {
  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <h3>Dubai Frame</h3>
        <div className={`ticket-status ${booking.status}`}>
          {booking.status}
        </div>
      </div>

      <div className="ticket-body">
        <div className="ticket-info-row">
          <span className="ticket-label">Booking ID:</span>
          <span className="ticket-value">{booking.id}</span>
        </div>

        <div className="ticket-info-row">
          <span className="ticket-label">Name:</span>
          <span className="ticket-value">{booking.name}</span>
        </div>

        <div className="ticket-info-row">
          <span className="ticket-label">Email:</span>
          <span className="ticket-value">{booking.email}</span>
        </div>

        <div className="ticket-info-row">
          <span className="ticket-label">Date:</span>
          <span className="ticket-value">{formatDate(booking.date)}</span>
        </div>

        <div className="ticket-info-row">
          <span className="ticket-label">Time Slot:</span>
          <span className="ticket-value">{booking.timeSlot}</span>
        </div>

        <div className="ticket-info-row">
          <span className="ticket-label">Tickets:</span>
          <span className="ticket-value">{booking.tickets} person(s)</span>
        </div>

        <div className="ticket-info-row total">
          <span className="ticket-label">Total Price:</span>
          <span className="ticket-value">{formatCurrency(booking.totalPrice)}</span>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;