import express from "express";
import Category from "../models/Category.js";
import { processCategoryImages } from "../utils/imageUrlCleaner.js";

const categoryRoute = express.Router();

// Get all active categories
categoryRoute.get("/", async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true })
      .select("slug name displayName description image")
      .sort({ createdAt: -1 });

    // Process images for each category
    const processedCategories = categories.map((category) =>
      processCategoryImages(category.toObject())
    );

    res.json({
      success: true,
      data: processedCategories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching categories",
      error: error.message,
    });
  }
});

// Get category by slug
categoryRoute.get("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    const category = await Category.findOne({
      slug: slug,
      isActive: true,
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Process images for the category
    const processedCategory = processCategoryImages(category.toObject());

    res.json({
      success: true,
      data: processedCategory,
    });
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching category",
      error: error.message,
    });
  }
});

// Create new category (admin only - you might want to add authentication)
categoryRoute.post("/", async (req, res) => {
  try {
    const categoryData = req.body;

    // Check if category with same slug already exists
    const existingCategory = await Category.findOne({
      slug: categoryData.slug,
    });
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category with this slug already exists",
      });
    }

    const category = new Category(categoryData);
    await category.save();

    res.status(201).json({
      success: true,
      data: category,
      message: "Category created successfully",
    });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({
      success: false,
      message: "Error creating category",
      error: error.message,
    });
  }
});

// Update category (admin only)
categoryRoute.put("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const updateData = req.body;

    const category = await Category.findOneAndUpdate(
      { slug: slug },
      updateData,
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.json({
      success: true,
      data: category,
      message: "Category updated successfully",
    });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({
      success: false,
      message: "Error updating category",
      error: error.message,
    });
  }
});

// Delete category (admin only)
categoryRoute.delete("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    const category = await Category.findOneAndDelete({ slug: slug });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting category",
      error: error.message,
    });
  }
});

export default categoryRoute;
