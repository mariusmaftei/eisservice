import {
  uploadImage,
  deleteImage,
  getImageURL,
  listImages,
} from "../config/firebase.js";

/**
 * Upload a single image
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
      message: "Image uploaded successfully",
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
 * Upload multiple images
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
      message: `${results.length} images uploaded successfully`,
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
 * Upload category image
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

    const result = await uploadImage(
      req.file.buffer,
      req.file.originalname,
      "categories",
      {
        categoryId,
        categoryName,
        uploadedBy: req.user?.id || "admin",
        type: "category-image",
      }
    );

    res.status(200).json({
      success: true,
      data: result,
      message: "Category image uploaded successfully",
    });
  } catch (error) {
    console.error("Error uploading category image:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
