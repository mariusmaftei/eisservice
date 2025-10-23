import Category from "../models/Category.js";
import { uploadImage, deleteImage } from "../config/firebase.js";
import { processImage } from "../utils/imageProcessor.js";

// Get all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching categories",
      error: error.message,
    });
  }
};

// Get single category by ID
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching category",
      error: error.message,
    });
  }
};

// Create new category with image upload
export const createCategory = async (req, res) => {
  try {
    const categoryData = req.body;

    // Parse JSON strings from FormData
    if (typeof categoryData.services === "string") {
      categoryData.services = JSON.parse(categoryData.services);
    }
    if (typeof categoryData.whyChooseUs === "string") {
      categoryData.whyChooseUs = JSON.parse(categoryData.whyChooseUs);
    }
    if (typeof categoryData.professionalContent === "string") {
      categoryData.professionalContent = JSON.parse(
        categoryData.professionalContent
      );
    }
    if (typeof categoryData.seo === "string") {
      categoryData.seo = JSON.parse(categoryData.seo);
    }

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

    // Handle image uploads if provided
    if (req.files) {
      // Handle main image
      if (req.files.image && req.files.image[0]) {
        try {
          // Process image with Sharp (convert to WebP, optimize size, add unique ID)
          const processedImage = await processImage(
            req.files.image[0].buffer,
            req.files.image[0].originalname,
            {
              maxSizeKB: 150,
              quality: 80,
              maxWidth: 1920,
              maxHeight: 1080,
            }
          );

          // Upload processed image to Firebase
          const uploadResult = await uploadImage(
            processedImage.buffer,
            processedImage.fileName,
            "categories",
            {
              categoryName: categoryData.name || categoryData.displayName,
              uploadedBy: "admin",
              type: "category-image",
              processedWithSharp: true,
              processedMetadata: processedImage.metadata,
            }
          );

          categoryData.imageUrl = uploadResult.downloadURL;
          categoryData.imageFileName = uploadResult.fileName;
        } catch (uploadError) {
          console.error("Error uploading category image:", uploadError);
          return res.status(500).json({
            success: false,
            message: "Error uploading category image",
            error: uploadError.message,
          });
        }
      }

      // Handle whyChooseUs image
      if (req.files.whyChooseUsImage && req.files.whyChooseUsImage[0]) {
        try {
          // Process image with Sharp (convert to WebP, optimize size, add unique ID)
          const processedImage = await processImage(
            req.files.whyChooseUsImage[0].buffer,
            req.files.whyChooseUsImage[0].originalname,
            {
              maxSizeKB: 150,
              quality: 80,
              maxWidth: 1920,
              maxHeight: 1080,
            }
          );

          // Upload processed image to Firebase
          const uploadResult = await uploadImage(
            processedImage.buffer,
            processedImage.fileName,
            "categories",
            {
              categoryName: categoryData.name || categoryData.displayName,
              uploadedBy: "admin",
              type: "why-choose-us-image",
              processedWithSharp: true,
              processedMetadata: processedImage.metadata,
            }
          );

          categoryData.whyChooseUsImageUrl = uploadResult.downloadURL;
          categoryData.whyChooseUsImageFileName = uploadResult.fileName;
        } catch (uploadError) {
          console.error("Error uploading whyChooseUs image:", uploadError);
          return res.status(500).json({
            success: false,
            message: "Error uploading whyChooseUs image",
            error: uploadError.message,
          });
        }
      }
    }

    const category = new Category(categoryData);
    await category.save();

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({
      success: false,
      message: "Error creating category",
      error: error.message,
    });
  }
};

// Update category with image upload
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Parse JSON strings from FormData
    if (typeof updateData.services === "string") {
      updateData.services = JSON.parse(updateData.services);
    }
    if (typeof updateData.whyChooseUs === "string") {
      updateData.whyChooseUs = JSON.parse(updateData.whyChooseUs);
    }
    if (typeof updateData.professionalContent === "string") {
      updateData.professionalContent = JSON.parse(
        updateData.professionalContent
      );
    }
    if (typeof updateData.seo === "string") {
      updateData.seo = JSON.parse(updateData.seo);
    }

    // Check if slug is being updated and if it conflicts with existing category
    if (updateData.slug) {
      const existingCategory = await Category.findOne({
        slug: updateData.slug,
        _id: { $ne: id },
      });
      if (existingCategory) {
        return res.status(400).json({
          success: false,
          message: "Category with this slug already exists",
        });
      }
    }

    // Get current category to check for existing image
    const currentCategory = await Category.findById(id);
    if (!currentCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Handle new image uploads if provided
    if (req.files) {
      // Handle main image
      if (req.files.image && req.files.image[0]) {
        try {
          // Delete old image if it exists
          if (currentCategory.imageFileName) {
            try {
              await deleteImage(currentCategory.imageFileName);
            } catch (deleteError) {
              console.warn("Error deleting old image:", deleteError);
              // Continue with upload even if deletion fails
            }
          }

          // Process image with Sharp (convert to WebP, optimize size, add unique ID)
          const processedImage = await processImage(
            req.files.image[0].buffer,
            req.files.image[0].originalname,
            {
              maxSizeKB: 150,
              quality: 80,
              maxWidth: 1920,
              maxHeight: 1080,
            }
          );

          // Upload processed image to Firebase
          const uploadResult = await uploadImage(
            processedImage.buffer,
            processedImage.fileName,
            "categories",
            {
              categoryName:
                updateData.name ||
                updateData.displayName ||
                currentCategory.name,
              uploadedBy: "admin",
              type: "category-image",
              processedWithSharp: true,
              processedMetadata: processedImage.metadata,
            }
          );

          updateData.imageUrl = uploadResult.downloadURL;
          updateData.imageFileName = uploadResult.fileName;
        } catch (uploadError) {
          console.error("Error uploading category image:", uploadError);
          return res.status(500).json({
            success: false,
            message: "Error uploading category image",
            error: uploadError.message,
          });
        }
      }

      // Handle whyChooseUs image
      if (req.files.whyChooseUsImage && req.files.whyChooseUsImage[0]) {
        try {
          // Delete old image if it exists
          if (currentCategory.whyChooseUsImageFileName) {
            try {
              await deleteImage(currentCategory.whyChooseUsImageFileName);
            } catch (deleteError) {
              console.warn(
                "Error deleting old whyChooseUs image:",
                deleteError
              );
              // Continue with upload even if deletion fails
            }
          }

          // Process image with Sharp (convert to WebP, optimize size, add unique ID)
          const processedImage = await processImage(
            req.files.whyChooseUsImage[0].buffer,
            req.files.whyChooseUsImage[0].originalname,
            {
              maxSizeKB: 150,
              quality: 80,
              maxWidth: 1920,
              maxHeight: 1080,
            }
          );

          // Upload processed image to Firebase
          const uploadResult = await uploadImage(
            processedImage.buffer,
            processedImage.fileName,
            "categories",
            {
              categoryName:
                updateData.name ||
                updateData.displayName ||
                currentCategory.name,
              uploadedBy: "admin",
              type: "why-choose-us-image",
              processedWithSharp: true,
              processedMetadata: processedImage.metadata,
            }
          );

          updateData.whyChooseUsImageUrl = uploadResult.downloadURL;
          updateData.whyChooseUsImageFileName = uploadResult.fileName;
        } catch (uploadError) {
          console.error("Error uploading whyChooseUs image:", uploadError);
          return res.status(500).json({
            success: false,
            message: "Error uploading whyChooseUs image",
            error: uploadError.message,
          });
        }
      }
    }

    const category = await Category.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: category,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({
      success: false,
      message: "Error updating category",
      error: error.message,
    });
  }
};

// Delete category and its associated image
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Delete associated images if they exist
    if (category.imageFileName) {
      try {
        await deleteImage(category.imageFileName);
      } catch (deleteError) {
        console.warn("Error deleting category image:", deleteError);
        // Continue with category deletion even if image deletion fails
      }
    }

    if (category.whyChooseUsImageFileName) {
      try {
        await deleteImage(category.whyChooseUsImageFileName);
      } catch (deleteError) {
        console.warn("Error deleting whyChooseUs image:", deleteError);
        // Continue with category deletion even if image deletion fails
      }
    }

    // Delete the category
    await Category.findByIdAndDelete(id);

    res.status(200).json({
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
};

// Toggle category active status
export const toggleCategoryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    category.isActive = !category.isActive;
    await category.save();

    res.status(200).json({
      success: true,
      message: `Category ${
        category.isActive ? "activated" : "deactivated"
      } successfully`,
      data: category,
    });
  } catch (error) {
    console.error("Error toggling category status:", error);
    res.status(500).json({
      success: false,
      message: "Error toggling category status",
      error: error.message,
    });
  }
};

// Upload category image only (separate endpoint)
export const uploadCategoryImage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file provided",
      });
    }

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Delete old image if it exists
    if (category.imageFileName) {
      try {
        await deleteImage(category.imageFileName);
      } catch (deleteError) {
        console.warn("Error deleting old image:", deleteError);
      }
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
    const uploadResult = await uploadImage(
      processedImage.buffer,
      processedImage.fileName,
      "categories",
      {
        categoryName: category.name || category.displayName,
        uploadedBy: "admin",
        type: "category-image",
        processedWithSharp: true,
        processedMetadata: processedImage.metadata,
      }
    );

    // Update category with new image info
    category.imageUrl = uploadResult.downloadURL;
    category.imageFileName = uploadResult.fileName;
    await category.save();

    res.status(200).json({
      success: true,
      message: "Category image uploaded successfully",
      data: {
        imageUrl: uploadResult.downloadURL,
        imageFileName: uploadResult.fileName,
        category: category,
      },
    });
  } catch (error) {
    console.error("Error uploading category image:", error);
    res.status(500).json({
      success: false,
      message: "Error uploading category image",
      error: error.message,
    });
  }
};
