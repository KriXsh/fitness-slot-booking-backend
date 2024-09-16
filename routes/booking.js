const express = require('express');
const { bookSlot, cancelSlot , getAllBookings } = require('../controllers/bookingController');
const router = express.Router();

// Book a slot
router.post('/book', bookSlot);

// Cancel a slot
router.post('/cancel', cancelSlot);

// Define the route for getting all bookings
router.get('/all', getAllBookings);

module.exports = router;
