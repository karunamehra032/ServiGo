const express = require('express');
const router = express.Router();

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private
router.post('/', (req, res) => {
  const { serviceType, date, time } = req.body;

  if (!serviceType || !date || !time) {
    return res.status(400).json({ message: 'Service type, date, and time are required' });
  }

  // In production, save to Booking model in MongoDB
  res.status(201).json({
    message: 'Booking request received successfully',
    booking: {
      id: Date.now(),
      serviceType,
      date,
      time,
      status: 'pending',
      createdAt: new Date().toISOString(),
    },
  });
});

// @desc    Get user bookings
// @route   GET /api/bookings
// @access  Private
router.get('/', (req, res) => {
  res.json([]);
});

module.exports = router;
