import express from "express";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  toggleCategoryStatus,
  uploadCategoryImage,
} from "../controllers/adminController.js";
import { uploadSingle, uploadFields } from "../middleware/upload.js";
import {
  isAuthenticated,
  isOwnerEmail,
  isAdmin,
} from "../controllers/authController.js";

const router = express.Router();

// Apply authentication and authorization middleware to all admin routes
router.use(isAuthenticated, isOwnerEmail, isAdmin);

// GET /api/admin/categories - Get all categories
router.get("/categories", getAllCategories);

// GET /api/admin/categories/:id - Get single category
router.get("/categories/:id", getCategoryById);

// POST /api/admin/categories - Create new category (with optional images)
router.post(
  "/categories",
  uploadFields([
    { name: "image", maxCount: 1 },
    { name: "whyChooseUsImage", maxCount: 1 },
  ]),
  createCategory
);

// PUT /api/admin/categories/:id - Update category (with optional images)
router.put(
  "/categories/:id",
  uploadFields([
    { name: "image", maxCount: 1 },
    { name: "whyChooseUsImage", maxCount: 1 },
  ]),
  updateCategory
);

// POST /api/admin/categories/:id/image - Upload category image only
router.post(
  "/categories/:id/image",
  uploadSingle("image"),
  uploadCategoryImage
);

// DELETE /api/admin/categories/:id - Delete category
router.delete("/categories/:id", deleteCategory);

// PATCH /api/admin/categories/:id/toggle - Toggle category active status
router.patch("/categories/:id/toggle", toggleCategoryStatus);

export default router;
