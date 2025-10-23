import express from "express";
import {
  uploadSingleImage,
  uploadMultipleImages,
  deleteImageFile,
  getImageUrl,
  listImagesInFolder,
  uploadCategoryImage,
} from "../controllers/uploadController.js";
import {
  uploadSingle,
  uploadMultiple,
  uploadFields,
} from "../middleware/upload.js";

const router = express.Router();

// Upload single image
router.post("/image", uploadSingle("image"), uploadSingleImage);

// Upload multiple images
router.post("/images", uploadMultiple("images", 5), uploadMultipleImages);

// Upload category image
router.post("/category-image", uploadSingle("image"), uploadCategoryImage);

// Upload mixed files (e.g., main image + thumbnail)
router.post(
  "/mixed",
  uploadFields([
    { name: "mainImage", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const results = {};

      if (req.files.mainImage) {
        const mainResult = await uploadImage(
          req.files.mainImage[0].buffer,
          req.files.mainImage[0].originalname,
          "main-images",
          { type: "main-image" }
        );
        results.mainImage = mainResult;
      }

      if (req.files.thumbnail) {
        const thumbResult = await uploadImage(
          req.files.thumbnail[0].buffer,
          req.files.thumbnail[0].originalname,
          "thumbnails",
          { type: "thumbnail" }
        );
        results.thumbnail = thumbResult;
      }

      res.status(200).json({
        success: true,
        data: results,
        message: "Mixed files uploaded successfully",
      });
    } catch (error) {
      console.error("Error uploading mixed files:", error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
);

// Delete image
router.delete("/image/:fileName", deleteImageFile);

// Get image URL
router.get("/image/:fileName/url", getImageUrl);

// List images in folder
router.get("/images", listImagesInFolder);

export default router;
