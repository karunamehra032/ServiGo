const ProviderProfile = require('../models/ProviderProfile');

// @desc    Upload provider verification documents (idDocument, license, addressProof)
// @route   POST /api/provider/documents
// @access  Private (provider)
exports.uploadProviderDocs = async (req, res) => {
  try {
    const userId = req.user.id;
    const files = req.files; // { idDocument: [...], license: [...], addressProof: [...] }

    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const updateData = {};

    if (files.idDocument) {
      updateData.idDocumentUrl =
        `${baseUrl}/uploads/documents/${files.idDocument[0].filename}`;
    }
    if (files.license) {
      updateData.licenseUrl =
        `${baseUrl}/uploads/documents/${files.license[0].filename}`;
    }
    if (files.addressProof) {
      updateData.addressProofUrl =
        `${baseUrl}/uploads/documents/${files.addressProof[0].filename}`;
    }

    let profile = await ProviderProfile.findOne({ user: userId });

    if (!profile) {
      profile = await ProviderProfile.create({
        user: userId,
        ...updateData,
      });
    } else {
      profile = await ProviderProfile.findOneAndUpdate(
        { user: userId },
        updateData,
        { new: true }
      );
    }

    res.json({
      message: 'Documents uploaded successfully',
      profile,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

// @desc    Upload portfolio / work photos (multiple images)
// @route   POST /api/provider/portfolio
// @access  Private (provider)
exports.uploadPortfolioImages = async (req, res) => {
  try {
    const userId = req.user.id;
    const files = req.files; // array of portfolio files

    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const imageUrls = files.map(
      (f) => `${baseUrl}/uploads/portfolio/${f.filename}`
    );

    let profile = await ProviderProfile.findOne({ user: userId });

    if (!profile) {
      profile = await ProviderProfile.create({
        user: userId,
        portfolioImages: imageUrls,
      });
    } else {
      // Append new images and keep max 20
      profile.portfolioImages = [
        ...(profile.portfolioImages || []),
        ...imageUrls,
      ].slice(0, 20);
      await profile.save();
    }

    res.json({
      message: 'Portfolio images uploaded successfully',
      portfolioImages: profile.portfolioImages,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

// @desc    Get logged-in provider's profile
// @route   GET /api/provider/profile
// @access  Private (provider)
exports.getProviderProfile = async (req, res) => {
  try {
    const profile = await ProviderProfile.findOne({ user: req.user.id });
    res.json({ profile });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
