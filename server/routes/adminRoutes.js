import express from "express";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  toggleCategoryStatus,
} from "../controllers/adminController.js";

const router = express.Router();

// GET /api/admin/categories - Get all categories
router.get("/categories", getAllCategories);

// GET /api/admin/categories/:id - Get single category
router.get("/categories/:id", getCategoryById);

// POST /api/admin/categories - Create new category
router.post("/categories", createCategory);

// PUT /api/admin/categories/:id - Update category
router.put("/categories/:id", updateCategory);

// DELETE /api/admin/categories/:id - Delete category
router.delete("/categories/:id", deleteCategory);

// PATCH /api/admin/categories/:id/toggle - Toggle category active status
router.patch("/categories/:id/toggle", toggleCategoryStatus);

export default router;
