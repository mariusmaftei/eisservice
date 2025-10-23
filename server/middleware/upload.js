import multer from "multer";
import { validateImageFile } from "../config/firebase.js";

// Configure multer for memory storage (we'll upload directly to Firebase)
const storage = multer.memoryStorage();

// File filter function
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(`Invalid file type. Allowed types: ${allowedTypes.join(", ")}`),
      false
    );
  }
};

// Multer configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 5, // Maximum 5 files per request
  },
});

// Middleware for single file upload
export const uploadSingle = (fieldName = "image") => {
  return (req, res, next) => {
    upload.single(fieldName)(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          error: err.message,
        });
      }

      // Validate the uploaded file
      if (req.file) {
        const validation = validateImageFile(req.file);
        if (!validation.valid) {
          return res.status(400).json({
            success: false,
            error: validation.error,
          });
        }
      }

      next();
    });
  };
};

// Middleware for multiple files upload
export const uploadMultiple = (fieldName = "images", maxCount = 5) => {
  return (req, res, next) => {
    upload.array(fieldName, maxCount)(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          error: err.message,
        });
      }

      // Validate all uploaded files
      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          const validation = validateImageFile(file);
          if (!validation.valid) {
            return res.status(400).json({
              success: false,
              error: validation.error,
            });
          }
        }
      }

      next();
    });
  };
};

// Middleware for mixed file uploads (different field names)
export const uploadFields = (fields) => {
  return (req, res, next) => {
    upload.fields(fields)(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          error: err.message,
        });
      }

      // Validate all uploaded files
      if (req.files) {
        for (const fieldName in req.files) {
          const files = Array.isArray(req.files[fieldName])
            ? req.files[fieldName]
            : [req.files[fieldName]];

          for (const file of files) {
            const validation = validateImageFile(file);
            if (!validation.valid) {
              return res.status(400).json({
                success: false,
                error: validation.error,
              });
            }
          }
        }
      }

      next();
    });
  };
};

export default upload;
