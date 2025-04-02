// Importing multer for handling file uploads
import multer from 'multer';
// Importing path for working with file and directory paths
import path from 'path';

// Configure storage settings for multer
const storage = multer.diskStorage({
  // Set the destination for uploaded files
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Files will be stored in the 'uploads/' directory
  },
  // Set the filename for uploaded files
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Prefix the original filename with a timestamp
  }
});

// File filter to allow only specific file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/; // Allowed file types: JPEG, JPG, PNG
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase()); // Check file extension
  const mimetype = allowedTypes.test(file.mimetype); // Check MIME type

  if (extname && mimetype) {
    return cb(null, true); // Accept the file if it matches the allowed types
  } else {
    cb('Error: Images Only!'); // Reject files that do not match the allowed types
  }
};

// Configure multer with storage settings, file size limit, and file filter
const upload = multer({
  storage, // Use the configured storage settings
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
  fileFilter // Use the configured file filter
});

// Export the configured multer instance for use in other parts of the application
export default upload;