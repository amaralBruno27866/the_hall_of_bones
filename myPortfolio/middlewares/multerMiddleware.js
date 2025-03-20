import multer from 'multer';
import path from 'path';

// Configure storage settings for multer
const storage = multer.diskStorage({
  // Set the destination for uploaded files
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  // Set the filename for uploaded files
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// File filter to allow only specific file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/; // Allowed file types
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase()); // Check file extension
  const mimetype = allowedTypes.test(file.mimetype); // Check MIME type

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!'); // Reject files that do not match the allowed types
  }
};

// Configure multer with storage settings, file size limit, and file filter
const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
  fileFilter
});

export default upload;