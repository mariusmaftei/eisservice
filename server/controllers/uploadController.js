import {
  uploadImage,
  deleteImage,
  getImageURL,
  listImages,
} from "../config/firebase.js";
import {
  processImage,
  processMultipleImages,
} from "../utils/imageProcessor.js";

/**
 * Upload a single image with Sharp processing
 * POST /api/upload/image
 */
export const uploadSingleImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "No image file provided",
      });
    }

    const { folder = "uploads" } = req.body;

    // Process image with Sharp (convert to WebP, optimize size, add unique ID)
    const processedImage = await processImage(
      req.file.buffer,
      req.file.originalname,
      {
        maxSizeKB: 150,
        quality: 80,
        maxWidth: 1920,
        maxHeight: 1080,
      }
    );

    // Upload processed image to Firebase
    const result = await uploadImage(
      processedImage.buffer,
      processedImage.fileName,
      folder,
      {
        uploadedBy: req.user?.id || "anonymous",
        category: req.body.category || "general",
        processedWithSharp: true,
        processedMetadata: processedImage.metadata,
      }
    );

    res.status(200).json({
      success: true,
      data: {
        ...result,
        processedWithSharp: true,
        processedMetadata: processedImage.metadata,
      },
      message: "Image uploaded and processed successfully",
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/**
 * Upload multiple images with Sharp processing
 * POST /api/upload/images
 */
export const uploadMultipleImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        error: "No image files provided",
      });
    }

    const { folder = "uploads" } = req.body;

    // Process all images with Sharp
    const processedImages = await processMultipleImages(req.files, {
      maxSizeKB: 150,
      quality: 80,
      maxWidth: 1920,
      maxHeight: 1080,
    });

    // Filter out any images that failed to process
    const successfulImages = processedImages.filter((img) => !img.error);
    const failedImages = processedImages.filter((img) => img.error);

    if (successfulImages.length === 0) {
      return res.status(400).json({
        success: false,
        error: "All images failed to process",
        failedImages: failedImages,
      });
    }

    // Upload all successfully processed images to Firebase
    const uploadPromises = successfulImages.map((processedImage) =>
      uploadImage(processedImage.buffer, processedImage.fileName, folder, {
        uploadedBy: req.user?.id || "anonymous",
        category: req.body.category || "general",
        processedWithSharp: true,
        processedMetadata: processedImage.metadata,
      })
    );

    const results = await Promise.all(uploadPromises);

    res.status(200).json({
      success: true,
      data: results.map((result, index) => ({
        ...result,
        processedWithSharp: true,
        processedMetadata: successfulImages[index].metadata,
      })),
      message: `${results.length} images uploaded and processed successfully`,
      ...(failedImages.length > 0 && {
        warnings: `${failedImages.length} images failed to process`,
        failedImages: failedImages,
      }),
    });
  } catch (error) {
    console.error("Error uploading images:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/**
 * Delete an image
 * DELETE /api/upload/image/:fileName
 */
export const deleteImageFile = async (req, res) => {
  try {
    const { fileName } = req.params;

    if (!fileName) {
      return res.status(400).json({
        success: false,
        error: "File name is required",
      });
    }

    const result = await deleteImage(fileName);

    res.status(200).json({
      success: true,
      data: result,
      message: "Image deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/**
 * Get image URL
 * GET /api/upload/image/:fileName/url
 */
export const getImageUrl = async (req, res) => {
  try {
    const { fileName } = req.params;

    if (!fileName) {
      return res.status(400).json({
        success: false,
        error: "File name is required",
      });
    }

    const url = await getImageURL(fileName);

    res.status(200).json({
      success: true,
      data: { url },
      message: "Image URL retrieved successfully",
    });
  } catch (error) {
    console.error("Error getting image URL:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/**
 * List images in a folder
 * GET /api/upload/images?folder=uploads&limit=50
 */
export const listImagesInFolder = async (req, res) => {
  try {
    const { folder = "uploads", limit = 50 } = req.query;

    const images = await listImages(folder, parseInt(limit));

    res.status(200).json({
      success: true,
      data: images,
      count: images.length,
      message: "Images listed successfully",
    });
  } catch (error) {
    console.error("Error listing images:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/**
 * Upload category image with Sharp processing
 * POST /api/upload/category-image
 */
export const uploadCategoryImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "No image file provided",
      });
    }

    const { categoryId, categoryName } = req.body;

    if (!categoryId || !categoryName) {
      return res.status(400).json({
        success: false,
        error: "Category ID and name are required",
      });
    }

    // Process image with Sharp (convert to WebP, optimize size, add unique ID)
    const processedImage = await processImage(
      req.file.buffer,
      req.file.originalname,
      {
        maxSizeKB: 150,
        quality: 80,
        maxWidth: 1920,
        maxHeight: 1080,
      }
    );

    // Upload processed image to Firebase
    const result = await uploadImage(
      processedImage.buffer,
      processedImage.fileName,
      "categories",
      {
        categoryId,
        categoryName,
        uploadedBy: req.user?.id || "admin",
        type: "category-image",
        processedWithSharp: true,
        processedMetadata: processedImage.metadata,
      }
    );

    res.status(200).json({
      success: true,
      data: {
        ...result,
        processedWithSharp: true,
        processedMetadata: processedImage.metadata,
      },
      message: "Category image uploaded and processed successfully",
    });
  } catch (error) {
    console.error("Error uploading category image:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/**
 * Upload a single image (legacy - without Sharp processing)
 * POST /api/upload/image-legacy
 */
export const uploadSingleImageLegacy = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "No image file provided",
      });
    }

    const { folder = "uploads" } = req.body;
    const result = await uploadImage(
      req.file.buffer,
      req.file.originalname,
      folder,
      {
        uploadedBy: req.user?.id || "anonymous",
        category: req.body.category || "general",
      }
    );

    res.status(200).json({
      success: true,
      data: result,
      message: "Image uploaded successfully (legacy)",
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/**
 * Upload multiple images (legacy - without Sharp processing)
 * POST /api/upload/images-legacy
 */
export const uploadMultipleImagesLegacy = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        error: "No image files provided",
      });
    }

    const { folder = "uploads" } = req.body;
    const uploadPromises = req.files.map((file) =>
      uploadImage(file.buffer, file.originalname, folder, {
        uploadedBy: req.user?.id || "anonymous",
        category: req.body.category || "general",
      })
    );

    const results = await Promise.all(uploadPromises);

    res.status(200).json({
      success: true,
      data: results,
      message: `${results.length} images uploaded successfully (legacy)`,
    });
  } catch (error) {
    console.error("Error uploading images:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
