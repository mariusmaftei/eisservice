import sharp from "sharp";

/**
 * Image processing utility using Sharp
 * Converts images to WebP format with size optimization
 */

/**
 * Generate a unique ID for the image filename using timestamp
 * @returns {string} Unique ID based on timestamp (13 digits)
 */
export const generateUniqueId = () => {
  return Date.now().toString();
};

/**
 * Process image with Sharp - convert to WebP and optimize size
 * @param {Buffer} imageBuffer - Original image buffer
 * @param {string} originalName - Original filename
 * @param {Object} options - Processing options
 * @returns {Promise<Object>} Processed image data
 */
export const processImage = async (imageBuffer, originalName, options = {}) => {
  try {
    const {
      maxSizeKB = 150, // Maximum file size in KB
      quality = 80, // WebP quality (1-100)
      maxWidth = 1920, // Maximum width
      maxHeight = 1080, // Maximum height
    } = options;

    // Generate unique ID for filename
    const uniqueId = generateUniqueId();

    // Extract original filename without extension
    const nameWithoutExt = originalName.replace(/\.[^/.]+$/, "");
    const sanitizedName = nameWithoutExt
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    // Create new filename with unique ID at the end
    const newFileName = `${sanitizedName}-${uniqueId}.webp`;

    // Get image metadata
    const metadata = await sharp(imageBuffer).metadata();
    console.log(`Processing image: ${originalName}`);
    console.log(
      `Original size: ${metadata.width}x${metadata.height}, ${Math.round(
        imageBuffer.length / 1024
      )}KB`
    );

    // Calculate target dimensions while maintaining aspect ratio
    let targetWidth = metadata.width;
    let targetHeight = metadata.height;

    if (metadata.width > maxWidth || metadata.height > maxHeight) {
      const aspectRatio = metadata.width / metadata.height;

      if (metadata.width > metadata.height) {
        targetWidth = Math.min(maxWidth, metadata.width);
        targetHeight = Math.round(targetWidth / aspectRatio);
      } else {
        targetHeight = Math.min(maxHeight, metadata.height);
        targetWidth = Math.round(targetHeight * aspectRatio);
      }
    }

    // Process image with Sharp
    let processedBuffer = await sharp(imageBuffer)
      .resize(targetWidth, targetHeight, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({
        quality: quality,
        effort: 6, // Higher effort for better compression
      })
      .toBuffer();

    // If still too large, reduce quality iteratively
    let currentQuality = quality;
    while (processedBuffer.length > maxSizeKB * 1024 && currentQuality > 20) {
      currentQuality -= 10;
      console.log(
        `Image too large (${Math.round(
          processedBuffer.length / 1024
        )}KB), reducing quality to ${currentQuality}`
      );

      processedBuffer = await sharp(imageBuffer)
        .resize(targetWidth, targetHeight, {
          fit: "inside",
          withoutEnlargement: true,
        })
        .webp({
          quality: currentQuality,
          effort: 6,
        })
        .toBuffer();
    }

    // If still too large, reduce dimensions
    let currentWidth = targetWidth;
    let currentHeight = targetHeight;
    while (processedBuffer.length > maxSizeKB * 1024 && currentWidth > 200) {
      currentWidth = Math.round(currentWidth * 0.9);
      currentHeight = Math.round(currentHeight * 0.9);
      console.log(
        `Image still too large, reducing dimensions to ${currentWidth}x${currentHeight}`
      );

      processedBuffer = await sharp(imageBuffer)
        .resize(currentWidth, currentHeight, {
          fit: "inside",
          withoutEnlargement: true,
        })
        .webp({
          quality: Math.max(currentQuality, 20),
          effort: 6,
        })
        .toBuffer();
    }

    const finalSizeKB = Math.round(processedBuffer.length / 1024);
    console.log(`Processed image: ${newFileName}`);
    console.log(
      `Final size: ${currentWidth}x${currentHeight}, ${finalSizeKB}KB`
    );
    console.log(`File extension: .webp, Content-Type should be: image/webp`);

    return {
      buffer: processedBuffer,
      fileName: newFileName,
      originalName: originalName,
      metadata: {
        width: currentWidth,
        height: currentHeight,
        format: "webp",
        size: processedBuffer.length,
        sizeKB: finalSizeKB,
        quality: currentQuality,
        uniqueId: uniqueId,
      },
    };
  } catch (error) {
    console.error("Error processing image:", error);
    throw new Error(`Failed to process image: ${error.message}`);
  }
};

/**
 * Process multiple images
 * @param {Array} images - Array of image objects with buffer and originalname
 * @param {Object} options - Processing options
 * @returns {Promise<Array>} Array of processed image data
 */
export const processMultipleImages = async (images, options = {}) => {
  const processedImages = [];

  for (const image of images) {
    try {
      const processed = await processImage(
        image.buffer,
        image.originalname,
        options
      );
      processedImages.push(processed);
    } catch (error) {
      console.error(`Error processing image ${image.originalname}:`, error);
      // Continue processing other images even if one fails
      processedImages.push({
        error: error.message,
        originalName: image.originalname,
      });
    }
  }

  return processedImages;
};

/**
 * Validate if the processed image meets size requirements
 * @param {Buffer} imageBuffer - Processed image buffer
 * @param {number} maxSizeKB - Maximum size in KB
 * @returns {Object} Validation result
 */
export const validateProcessedImage = (imageBuffer, maxSizeKB = 150) => {
  const sizeKB = Math.round(imageBuffer.length / 1024);
  const isValid = sizeKB <= maxSizeKB;

  return {
    isValid,
    sizeKB,
    maxSizeKB,
    message: isValid
      ? `Image size is valid (${sizeKB}KB)`
      : `Image size exceeds limit (${sizeKB}KB > ${maxSizeKB}KB)`,
  };
};

export default {
  processImage,
  processMultipleImages,
  validateProcessedImage,
  generateUniqueId,
};
