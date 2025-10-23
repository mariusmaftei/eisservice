import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Image URL resolver utility
 * Handles conversion of static asset paths to accessible URLs
 */

// Mapping of original filenames to built filenames
const imageMapping = {
  "electrician-image.webp": "electrician-image.a323430e580891d08d6f.webp",
  "painter-image.webp": "painter-image.f36e25e41a0c5ca3b1ba.webp",
  "worker-image.webp": "worker-image.fb465850205a4ed5bae8.webp",
  "plumber-image.webp": "plumber-image.7652e47ff9dbac977319.webp",
  "carpenter-image.webp": "carpenter-image.19892199f7d27d1d1498.webp",
  "cleaning-image.webp": "cleaning-image.9acce9d88f3a0a8bbf0a.webp",
  "gardener-image.webp": "gardener-image.c5500060832b21e72045.webp",
  "transport-image.webp": "transport-image.c9ec7a29a6a67320bce4.webp",
  "solar-panel-image.webp": "solar-panel-image.b151b8dfd7712490fd6c.webp",
  "appliance-repairs-image.webp":
    "appliance-repairs-image.8abb15ad458600391b80.webp",
  "beauty-salon-Image.webp": "beauty-salon-Image.c53b43f7559ed10372b8.webp",
  "bricklayer-image.webp": "bricklayer-image.4d753c59661f1f1266e1.webp",
  "car-mechanic-image.webp": "car-mechanic-image.564d39d8530a668d8c5e.webp",
  "conditioning-air-image.webp":
    "conditioning-air-image.348371a94101c21779c8.webp",
  "faience-image.webp": "faience-image.6d37380c2b999a3c56ce.webp",
  "furniture-image.webp": "furniture-image.19892199f7d27d1d1498.webp",
  "hardware-repair.webp": "hardware-repair.d86f465bcb5a9964bf45.webp",
  "manicure-image.webp": "manicure-image.c4ccb8c04e1cfa36504a.webp",
  "other-jobs-image.webp": "other-jobs-image.0c9454072f192454d7b4.webp",
  // PNG files that need to be served directly
  "Zugrav Brașov – Servicii Profesionale.png":
    "Zugrav Brașov – Servicii Profesionale.png",
  "Zugrav Brașov vopsind un perete alb într-un apartament modern.png":
    "Zugrav Brașov vopsind un perete alb într-un apartament modern.png",
};

/**
 * Resolve image URL from static asset path
 * @param {string} imagePath - Original image path from database
 * @returns {string} - Resolved image URL
 */
export const resolveImageUrl = (imagePath) => {
  if (!imagePath) {
    return null;
  }

  // If it's already a full URL (Firebase or external), return as is
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  // If it's a static asset path, resolve it
  if (imagePath.startsWith("/assets/images/")) {
    const filename = path.basename(imagePath);
    const mappedFilename = imageMapping[filename] || filename;

    // Check if it's a PNG file that needs to be served from source assets
    if (filename.endsWith(".png")) {
      // Serve PNG files directly from source assets
      return imagePath;
    }

    // Return the static asset URL for processed files
    return `/static/media/${mappedFilename}`;
  }

  // If it's already a static media path, return as is
  if (imagePath.startsWith("/static/media/")) {
    return imagePath;
  }

  // Default fallback
  return imagePath;
};

/**
 * Process category data to resolve all image URLs
 * @param {Object} categoryData - Category data object
 * @returns {Object} - Category data with resolved image URLs
 */
export const processCategoryImages = (categoryData) => {
  if (!categoryData) {
    return categoryData;
  }

  const processed = { ...categoryData };

  // Resolve main image - check both image and imageUrl fields
  if (processed.imageUrl) {
    // Use imageUrl from database (Firebase URL)
    processed.image = processed.imageUrl;
  } else if (processed.image) {
    // Fallback to image field if imageUrl doesn't exist
    processed.image = resolveImageUrl(processed.image);
  }

  // Resolve working image - use whyChooseUsImageUrl as the source
  if (processed.whyChooseUsImageUrl) {
    // Use whyChooseUsImageUrl from database (Firebase URL)
    processed.workingImage = processed.whyChooseUsImageUrl;
  } else if (processed.workingImageUrl) {
    // Fallback to workingImageUrl if whyChooseUsImageUrl doesn't exist
    processed.workingImage = processed.workingImageUrl;
  } else if (processed.workingImage) {
    // Fallback to workingImage field if neither URL exists
    processed.workingImage = resolveImageUrl(processed.workingImage);
  }

  // Resolve whyChooseUsImage if it exists
  if (processed.whyChooseUsImageUrl) {
    // Use whyChooseUsImageUrl from database (Firebase URL)
    processed.whyChooseUsImage = processed.whyChooseUsImageUrl;
  } else if (processed.whyChooseUsImage) {
    // Fallback to whyChooseUsImage field if whyChooseUsImageUrl doesn't exist
    processed.whyChooseUsImage = resolveImageUrl(processed.whyChooseUsImage);
  }

  return processed;
};

/**
 * Get all available images from the build directory
 * @returns {Array} - Array of available image filenames
 */
export const getAvailableImages = () => {
  try {
    const mediaPath = path.join(__dirname, "../../client/build/static/media");
    if (fs.existsSync(mediaPath)) {
      return fs.readdirSync(mediaPath);
    }
    return [];
  } catch (error) {
    console.error("Error reading available images:", error);
    return [];
  }
};

/**
 * Update image mapping by scanning the build directory
 * This can be called to automatically update the mapping
 */
export const updateImageMapping = () => {
  try {
    const availableImages = getAvailableImages();
    const newMapping = {};

    availableImages.forEach((filename) => {
      // Extract base name without hash
      const baseName = filename.replace(/\.[a-f0-9]{20,}\./, ".");
      newMapping[baseName] = filename;
    });

    console.log("Updated image mapping:", newMapping);
    return newMapping;
  } catch (error) {
    console.error("Error updating image mapping:", error);
    return {};
  }
};

export default {
  resolveImageUrl,
  processCategoryImages,
  getAvailableImages,
  updateImageMapping,
};
