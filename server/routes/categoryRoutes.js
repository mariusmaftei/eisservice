import express from "express";
import Category from "../models/Category.js";
import { processCategoryImages } from "../utils/imageUrlCleaner.js";

const categoryRoute = express.Router();

// Get all active categories
categoryRoute.get("/", async (req, res) => {
  try {
    const categories = await Category.find({
      "categoryInformation.isActive": true,
    })
      .select("categoryInformation city")
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

// Get categories by city (e.g., /bucuresti or /bucuresti/electrician)
categoryRoute.get("/by-city/:city/:slug?", async (req, res) => {
  try {
    const { city, slug } = req.params;

    // Build query object
    const query = {
      city: city.toLowerCase(),
      "categoryInformation.isActive": true,
    };

    // If slug is provided, add it to the query to get specific category
    if (slug) {
      query["categoryInformation.slug"] = slug;
      const category = await Category.findOne(query);

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
    } else {
      // No slug provided - return ALL categories for the city
      const categories = await Category.find(query).sort({ createdAt: -1 });

      // Process images for all categories (even if empty array)
      const processedCategories = categories.map((category) =>
        processCategoryImages(category.toObject())
      );

      // Return 200 with empty array instead of 404 for better UX
      // This prevents browser console errors when no categories exist
      res.json({
        success: true,
        data: processedCategories, // Will be empty array if no categories
      });
    }
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

    // Check if category with same slug AND city already exists (compound unique)
    const slugToCheck =
      categoryData.categoryInformation?.slug || categoryData.slug;
    const cityToCheck = categoryData.city || "";

    const query = {
      "categoryInformation.slug": slugToCheck,
    };

    if (cityToCheck) {
      query.city = cityToCheck.toLowerCase();
    }

    const existingCategory = await Category.findOne(query);
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: `Category with slug "${slugToCheck}" and city "${
          cityToCheck || "none"
        }" already exists`,
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

    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "A category with this slug and city already exists",
      });
    }

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
      { "categoryInformation.slug": slug },
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

    const category = await Category.findOneAndDelete({
      "categoryInformation.slug": slug,
    });

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
