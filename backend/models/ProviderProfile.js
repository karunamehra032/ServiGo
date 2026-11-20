const mongoose = require('mongoose');

const providerProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    services: [String], // ["maid", "cooking", "elder_care"]
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    experienceYears: Number,
    hourlyRate: Number,
    weeklyRate: Number,
    monthlyRate: Number,
    isVerified: { type: Boolean, default: false }, // admin approved
    isPoliceVerified: { type: Boolean, default: false },
    aadhaarVerified: { type: Boolean, default: false },
    idDocumentUrl: String,   // URL stored in DB, file in uploads/documents
    licenseUrl: String,      // URL stored in DB, file in uploads/documents
    addressProofUrl: String, // URL stored in DB, file in uploads/documents
    portfolioImages: [String], // array of URLs stored in DB, files in uploads/portfolio
    rating: { average: { type: Number, default: 0 }, count: { type: Number, default: 0 } },
    totalJobs: { type: Number, default: 0 },
    completedJobs: { type: Number, default: 0 },
    cancelledJobs: { type: Number, default: 0 },
    isOnline: { type: Boolean, default: false },
    pincode: String,
    languages: [String],
    genderPreference: String,
    verificationNotes: String,
    verifiedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model('ProviderProfile', providerProfileSchema);
