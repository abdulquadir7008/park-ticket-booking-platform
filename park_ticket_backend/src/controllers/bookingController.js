const Booking = require('../models/Booking');

/**
 * Booking Controller
 * Handles booking-related requests
 */

// Ticket price per person (AED)
const TICKET_PRICE = 50;

/**
 * Create a new booking
 */
const createBooking = async (req, res) => {
  try {
    const { date, timeSlot, tickets, name, email } = req.body;

    // Validation
    if (!date || !timeSlot || !tickets || !name || !email) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Validate tickets number
    if (tickets < 1 || tickets > 10) {
      return res.status(400).json({
        success: false,
        message: 'Tickets must be between 1 and 10'
      });
    }

    // Validate date (must be today or future)
    const bookingDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (bookingDate < today) {
      return res.status(400).json({
        success: false,
        message: 'Booking date must be today or in the future'
      });
    }

    // Calculate total price
    const totalPrice = tickets * TICKET_PRICE;

    // Create booking
    const bookingData = {
      date,
      timeSlot,
      tickets,
      name,
      email,
      totalPrice
    };

    const booking = await Booking.create(bookingData);

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking
    });

  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating booking',
      error: error.message
    });
  }
};

/**
 * Get booking by ID
 */
const getBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.status(200).json({
      success: true,
      data: booking
    });

  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching booking',
      error: error.message
    });
  }
};

/**
 * Validate QR code
 */
const validateQrCode = async (req, res) => {
  try {
    const { qrCode } = req.body;

    if (!qrCode) {
      return res.status(400).json({
        success: false,
        message: 'QR code is required'
      });
    }

    // Find booking by QR code
    const booking = await Booking.findByQrCode(qrCode);

    if (!booking) {
      return res.status(404).json({
        success: false,
        valid: false,
        message: 'Invalid QR code - Booking not found'
      });
    }

    // Check if booking is still valid (not expired)
    const bookingDate = new Date(booking.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (bookingDate < today) {
      return res.status(200).json({
        success: true,
        valid: false,
        message: 'Ticket has expired',
        booking: {
          id: booking.id,
          name: booking.name,
          date: booking.date,
          timeSlot: booking.timeSlot,
          tickets: booking.tickets,
          status: 'expired'
        }
      });
    }

    // Check if booking was already used
    if (booking.status === 'used') {
      return res.status(200).json({
        success: true,
        valid: false,
        message: 'Ticket already used',
        booking: {
          id: booking.id,
          name: booking.name,
          date: booking.date,
          timeSlot: booking.timeSlot,
          tickets: booking.tickets,
          status: booking.status
        }
      });
    }

    // Valid ticket
    res.status(200).json({
      success: true,
      valid: true,
      message: 'Valid ticket',
      booking: {
        id: booking.id,
        name: booking.name,
        email: booking.email,
        date: booking.date,
        timeSlot: booking.timeSlot,
        tickets: booking.tickets,
        totalPrice: booking.totalPrice,
        status: booking.status
      }
    });

  } catch (error) {
    console.error('Error validating QR code:', error);
    res.status(500).json({
      success: false,
      message: 'Error validating QR code',
      error: error.message
    });
  }
};

/**
 * Mark ticket as used
 */
const markAsUsed = async (req, res) => {
  try {
    const { qrCode } = req.body;

    if (!qrCode) {
      return res.status(400).json({
        success: false,
        message: 'QR code is required'
      });
    }

    const booking = await Booking.findByQrCode(qrCode);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    await Booking.updateStatus(booking.id, 'used');

    res.status(200).json({
      success: true,
      message: 'Ticket marked as used'
    });

  } catch (error) {
    console.error('Error marking ticket as used:', error);
    res.status(500).json({
      success: false,
      message: 'Error marking ticket as used',
      error: error.message
    });
  }
};

module.exports = {
  createBooking,
  getBooking,
  validateQrCode,
  markAsUsed
};