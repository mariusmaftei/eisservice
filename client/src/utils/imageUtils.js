/**
 * Utility functions for handling image URLs
 */

/**
 * Cleans image URL by removing unwanted characters like @ symbol
 * @param {string} imageUrl - The image URL to clean
 * @returns {string} - The cleaned image URL
 */
export const cleanImageUrl = (imageUrl) => {
  if (!imageUrl || typeof imageUrl !== "string") {
    return "";
  }

  // Remove @ symbol from the beginning of the URL
  return imageUrl.replace(/^@/, "");
};

/**
 * Gets a clean image URL with fallback
 * @param {string} imageUrl - The image URL to clean
 * @param {string} fallbackUrl - Fallback URL if imageUrl is invalid
 * @returns {string} - The cleaned image URL or fallback
 */
export const getCleanImageUrl = (
  imageUrl,
  fallbackUrl = "/assets/images/category-images/worker-image.webp"
) => {
  const cleanedUrl = cleanImageUrl(imageUrl);
  return cleanedUrl || fallbackUrl;
};

