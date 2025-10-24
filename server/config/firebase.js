import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config({ debug: false });

// Initialize Firebase Admin SDK only if credentials are provided
let app;
let storage;
let bucket;

// Check if Firebase credentials are provided and valid
const hasValidFirebaseCredentials = () => {
  return (
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_PRIVATE_KEY_ID &&
    process.env.FIREBASE_PRIVATE_KEY &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_CLIENT_ID &&
    process.env.FIREBASE_PROJECT_ID !== "your-firebase-project-id" &&
    process.env.FIREBASE_PRIVATE_KEY !== "your-firebase-private-key"
  );
};

if (hasValidFirebaseCredentials()) {
  try {
    // Firebase Admin SDK configuration
    const firebaseConfig = {
      type: "service_account",
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.FIREBASE_CLIENT_EMAIL}`,
    };

    // Check if Firebase app is already initialized
    if (!admin.apps.length) {
      app = admin.initializeApp({
        credential: admin.credential.cert(firebaseConfig),
        storageBucket:
          process.env.FIREBASE_STORAGE_BUCKET ||
          `${process.env.FIREBASE_PROJECT_ID}.firebasestorage.app`,
      });
    } else {
      app = admin.app();
    }

    storage = admin.storage();
    bucket = storage.bucket();
    // Firebase Admin SDK initialized successfully
  } catch (error) {
    console.error("Error initializing Firebase Admin SDK:", error);
    // Firebase features will be disabled
    app = null;
    storage = null;
    bucket = null;
  }
} else {
  // Firebase credentials not provided - Firebase features disabled
  app = null;
  storage = null;
  bucket = null;
}

/**
 * Upload image to Firebase Storage
 * @param {Buffer} fileBuffer - The file buffer to upload
 * @param {string} fileName - The name of the file
 * @param {string} folder - The folder path in storage (e.g., 'categories', 'services')
 * @param {Object} metadata - Optional metadata for the file
 * @returns {Promise<Object>} Upload result with download URL
 */
export const uploadImage = async (
  fileBuffer,
  fileName,
  folder = "uploads",
  metadata = {}
) => {
  if (!bucket) {
    throw new Error(
      "Firebase Storage is not configured. Please set up Firebase credentials."
    );
  }

  try {
    // Use the processed filename from Sharp (already includes unique ID and .webp extension)
    const fileExtension = fileName.split(".").pop();
    const uniqueFileName = `${folder}/${fileName}`;

    // Create file reference
    const file = bucket.file(uniqueFileName);

    // Determine content type - if it's a processed image, it should be WebP
    const contentType =
      fileExtension === "webp" ? "image/webp" : `image/${fileExtension}`;

    // Upload options
    const uploadOptions = {
      metadata: {
        contentType: contentType,
        metadata: {
          originalName: fileName,
          uploadedAt: new Date().toISOString(),
          ...metadata,
        },
      },
      public: true, // Make file publicly accessible
      validation: "crc32c",
    };

    // Upload file
    await file.save(fileBuffer, uploadOptions);

    // Get download URL
    const downloadURL = `https://storage.googleapis.com/${bucket.name}/${uniqueFileName}`;

    console.log(`Image uploaded successfully: ${uniqueFileName}`);

    return {
      success: true,
      fileName: uniqueFileName,
      downloadURL,
      bucket: bucket.name,
      size: fileBuffer.length,
      contentType: contentType,
    };
  } catch (error) {
    console.error("Error uploading image to Firebase Storage:", error);
    throw new Error(`Failed to upload image: ${error.message}`);
  }
};

/**
 * Delete image from Firebase Storage
 * @param {string} fileName - The name of the file to delete
 * @returns {Promise<Object>} Delete result
 */
export const deleteImage = async (fileName) => {
  if (!bucket) {
    throw new Error(
      "Firebase Storage is not configured. Please set up Firebase credentials."
    );
  }

  try {
    const file = bucket.file(fileName);

    // Check if file exists
    const [exists] = await file.exists();
    if (!exists) {
      throw new Error(`File ${fileName} does not exist`);
    }

    // Delete file
    await file.delete();

    console.log(`Image deleted successfully: ${fileName}`);

    return {
      success: true,
      fileName,
      message: "Image deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting image from Firebase Storage:", error);
    throw new Error(`Failed to delete image: ${error.message}`);
  }
};

/**
 * Get image download URL
 * @param {string} fileName - The name of the file
 * @returns {Promise<string>} Download URL
 */
export const getImageURL = async (fileName) => {
  if (!bucket) {
    throw new Error(
      "Firebase Storage is not configured. Please set up Firebase credentials."
    );
  }

  try {
    const file = bucket.file(fileName);

    // Check if file exists
    const [exists] = await file.exists();
    if (!exists) {
      throw new Error(`File ${fileName} does not exist`);
    }

    // Get download URL
    const [url] = await file.getSignedUrl({
      action: "read",
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    });

    return url;
  } catch (error) {
    console.error("Error getting image URL:", error);
    throw new Error(`Failed to get image URL: ${error.message}`);
  }
};

/**
 * List images in a specific folder
 * @param {string} folder - The folder path to list
 * @param {number} maxResults - Maximum number of results to return
 * @returns {Promise<Array>} List of files
 */
export const listImages = async (folder = "uploads", maxResults = 100) => {
  if (!bucket) {
    throw new Error(
      "Firebase Storage is not configured. Please set up Firebase credentials."
    );
  }

  try {
    const [files] = await bucket.getFiles({
      prefix: folder,
      maxResults,
    });

    const fileList = files.map((file) => ({
      name: file.name,
      size: file.metadata.size,
      contentType: file.metadata.contentType,
      timeCreated: file.metadata.timeCreated,
      updated: file.metadata.updated,
      downloadURL: `https://storage.googleapis.com/${bucket.name}/${file.name}`,
    }));

    return fileList;
  } catch (error) {
    console.error("Error listing images:", error);
    throw new Error(`Failed to list images: ${error.message}`);
  }
};

/**
 * Update image metadata
 * @param {string} fileName - The name of the file
 * @param {Object} metadata - New metadata to set
 * @returns {Promise<Object>} Update result
 */
export const updateImageMetadata = async (fileName, metadata) => {
  if (!bucket) {
    throw new Error(
      "Firebase Storage is not configured. Please set up Firebase credentials."
    );
  }

  try {
    const file = bucket.file(fileName);

    // Check if file exists
    const [exists] = await file.exists();
    if (!exists) {
      throw new Error(`File ${fileName} does not exist`);
    }

    // Update metadata
    await file.setMetadata({
      metadata: {
        ...metadata,
        updatedAt: new Date().toISOString(),
      },
    });

    console.log(`Image metadata updated successfully: ${fileName}`);

    return {
      success: true,
      fileName,
      metadata,
      message: "Image metadata updated successfully",
    };
  } catch (error) {
    console.error("Error updating image metadata:", error);
    throw new Error(`Failed to update image metadata: ${error.message}`);
  }
};

/**
 * Validate image file
 * @param {Object} file - Multer file object
 * @returns {Object} Validation result
 */
export const validateImageFile = (file) => {
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
  ];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!file) {
    return { valid: false, error: "No file provided" };
  }

  if (!allowedTypes.includes(file.mimetype)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed types: ${allowedTypes.join(", ")}`,
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File too large. Maximum size: ${maxSize / (1024 * 1024)}MB`,
    };
  }

  return { valid: true };
};

// Export Firebase app and storage for other uses
export { app, storage, bucket };
export default {
  uploadImage,
  deleteImage,
  getImageURL,
  listImages,
  updateImageMetadata,
  validateImageFile,
};
