const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getMe,
  updateProfile,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { uploadAvatar } = require('../middleware/upload');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);

// Update logged-in user profile (includes optional avatar upload)
// @route   PATCH /api/auth/profile
// @access  Private
router.patch('/profile', protect, uploadAvatar, updateProfile);

module.exports = router;
