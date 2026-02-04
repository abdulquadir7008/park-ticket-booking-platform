import React from 'react';
import '../styles/TimeSlot.css';

/**
 * TimeSlot Component
 * Displays available time slots for selection
 */
const TimeSlot = ({ slots, selectedSlot, onSelect }) => {
  return (
    <div className="time-slot-container">
      <div className="time-slot-grid">
        {slots.map((slot) => (
          <button
            key={slot}
            type="button"
            onClick={() => onSelect(slot)}
            className={`time-slot-item ${selectedSlot === slot ? 'selected' : ''}`}
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeSlot;