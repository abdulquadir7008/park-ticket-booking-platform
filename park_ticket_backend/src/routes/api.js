const express = require('express');
const router = express.Router();
const attractionController = require('../controllers/attractionController');
const bookingController = require('../controllers/bookingController');

/**
 * Attraction Routes
 */
router.get('/attraction', attractionController.getAttraction);

/**
 * Booking Routes
 */
router.post('/book', bookingController.createBooking);
router.get('/booking/:id', bookingController.getBooking);

/**
 * Validation Routes (Admin)
 */
router.post('/validate', bookingController.validateQrCode);
router.post('/mark-used', bookingController.markAsUsed);

module.exports = router;