const multer = require('multer');
const path = require('path');
const fs = require('fs');

// ============================================================
// STEP 1: Make sure upload folders exist on the server
// ============================================================
// We create subfolders so avatars, documents, and portfolio
// images don't get mixed up in one big folder.
const dirs = [
  path.join(__dirname, '../uploads'),
  path.join(__dirname, '../uploads/avatars'),
  path.join(__dirname, '../uploads/documents'),
  path.join(__dirname, '../uploads/portfolio'),
];

dirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// ============================================================
// STEP 2: Define which file types are allowed
// ============================================================
const ALLOWED_IMAGE_TYPES = /jpeg|jpg|png|webp/;   // images only
const ALLOWED_DOC_TYPES   = /pdf|jpeg|jpg|png/;   // images + PDFs

// Helper: checks both the file extension AND the mime type.
// We check both because a user can rename a .exe to .jpg and
// trick a check that only looks at the extension.
const validateFile = (file, allowedRegex) => {
  const extname = allowedRegex.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedRegex.test(file.mimetype);
  return extname && mimetype;
};

// ============================================================
// STEP 3: Configure Multer diskStorage
// ============================================================
// diskStorage saves files to the server's hard drive.
// We control TWO things: destination (which folder) and
// filename (what to call the file).
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // cb = callback. First arg = error (null if ok), second = folder path.
    if (file.fieldname === 'avatar') {
      cb(null, path.join(__dirname, '../uploads/avatars'));
    } else if (file.fieldname === 'portfolio') {
      cb(null, path.join(__dirname, '../uploads/portfolio'));
    } else {
      // idDocument, license, addressProof -> documents folder
      cb(null, path.join(__dirname, '../uploads/documents'));
    }
  },
  filename: (req, file, cb) => {
    // We rename every file so two users can't overwrite each other.
    // Example: avatar-1732455888-123456789.jpg
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

// ============================================================
// STEP 4: File filter — reject disallowed types BEFORE saving
// ============================================================
const fileFilter = (req, file, cb) => {
  const isImage = validateFile(file, ALLOWED_IMAGE_TYPES);
  const isDoc   = validateFile(file, ALLOWED_DOC_TYPES);

  if (!isImage && !isDoc) {
    // Reject the file with an error message
    return cb(new Error('Only image (jpg, jpeg, png, webp) and PDF files are allowed'), false);
  }
  cb(null, true); // accept the file
};

// ============================================================
// STEP 5: Create the Multer instance with limits
// ============================================================
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,   // 5 MB max per file
    files: 10,                   // max 10 files in one request
  },
});

// ============================================================
// STEP 6: Export ready-to-use middlewares for routes
// ============================================================

// Single file upload. Field name must be 'avatar'.
// Use for: profile picture
exports.uploadAvatar = upload.single('avatar');

// Multiple single-file fields. Each field max 1 file.
// Use for: idDocument, license, addressProof (3 separate file inputs)
exports.uploadDocuments = upload.fields([
  { name: 'idDocument', maxCount: 1 },
  { name: 'license', maxCount: 1 },
  { name: 'addressProof', maxCount: 1 },
]);

// Multiple files under the same field name, max 6 files.
// Use for: portfolio / work photos
exports.uploadPortfolio = upload.array('portfolio', 6);

// Any number of files with any field names. Use cautiously.
exports.uploadAny = upload.any();
