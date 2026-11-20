const express = require('express');
const router = express.Router();
const {
  uploadProviderDocs,
  uploadPortfolioImages,
  getProviderProfile,
} = require('../controllers/providerController');
const { protect } = require('../middleware/authMiddleware');
const { roleCheck } = require('../middleware/roleMiddleware');
const { uploadDocuments, uploadPortfolio } = require('../middleware/upload');

// ============================================================
// PROVIDER ROUTES
// All routes require login + provider role
// ============================================================

// Upload / update verification documents
// Fields: idDocument, license, addressProof (1 file each)
// @route   POST /api/provider/documents
// @access  Private (provider only)
router.post(
  '/documents',
  protect,
  roleCheck(['provider']),
  uploadDocuments,
  uploadProviderDocs
);

// Upload portfolio / work photos
// Field: portfolio (array, max 6 files)
// @route   POST /api/provider/portfolio
// @access  Private (provider only)
router.post(
  '/portfolio',
  protect,
  roleCheck(['provider']),
  uploadPortfolio,
  uploadPortfolioImages
);

// Get own provider profile
// @route   GET /api/provider/profile
// @access  Private (provider only)
router.get('/profile', protect, roleCheck(['provider']), getProviderProfile);

module.exports = router;
