import express from "express";
import {
  uploadSingleImage,
  uploadMultipleImages,
  uploadSingleImageLegacy,
  uploadMultipleImagesLegacy,
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
import { uploadImage } from "../config/firebase.js";
import { processImage } from "../utils/imageProcessor.js";

const router = express.Router();

// Upload single image (with Sharp processing)
router.post("/image", uploadSingle("image"), uploadSingleImage);

// Upload multiple images (with Sharp processing)
router.post("/images", uploadMultiple("images", 5), uploadMultipleImages);

// Upload category image (with Sharp processing)
router.post("/category-image", uploadSingle("image"), uploadCategoryImage);

// Legacy routes (without Sharp processing)
router.post("/image-legacy", uploadSingle("image"), uploadSingleImageLegacy);
router.post(
  "/images-legacy",
  uploadMultiple("images", 5),
  uploadMultipleImagesLegacy
);

// Upload mixed files (e.g., main image + thumbnail) with Sharp processing
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
        // Process main image with Sharp
        const processedMainImage = await processImage(
          req.files.mainImage[0].buffer,
          req.files.mainImage[0].originalname,
          {
            maxSizeKB: 150,
            quality: 80,
            maxWidth: 1920,
            maxHeight: 1080,
          }
        );

        const mainResult = await uploadImage(
          processedMainImage.buffer,
          processedMainImage.fileName,
          "main-images",
          {
            type: "main-image",
            processedWithSharp: true,
            processedMetadata: processedMainImage.metadata,
          }
        );
        results.mainImage = {
          ...mainResult,
          processedWithSharp: true,
          processedMetadata: processedMainImage.metadata,
        };
      }

      if (req.files.thumbnail) {
        // Process thumbnail with Sharp
        const processedThumbnail = await processImage(
          req.files.thumbnail[0].buffer,
          req.files.thumbnail[0].originalname,
          {
            maxSizeKB: 50,
            quality: 70,
            maxWidth: 400,
            maxHeight: 300,
          }
        );

        const thumbResult = await uploadImage(
          processedThumbnail.buffer,
          processedThumbnail.fileName,
          "thumbnails",
          {
            type: "thumbnail",
            processedWithSharp: true,
            processedMetadata: processedThumbnail.metadata,
          }
        );
        results.thumbnail = {
          ...thumbResult,
          processedWithSharp: true,
          processedMetadata: processedThumbnail.metadata,
        };
      }

      res.status(200).json({
        success: true,
        data: results,
        message: "Mixed files uploaded and processed successfully",
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
