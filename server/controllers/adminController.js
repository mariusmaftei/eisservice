import Category from "../models/Category.js";
import { uploadImage, deleteImage } from "../config/firebase.js";
import { processImage } from "../utils/imageProcessor.js";

// Helper function to transform flat form data to nested structure
const transformToNestedStructure = (flatData) => {
  return {
    categoryInformation: {
      slug: flatData.slug || "",
      name: flatData.name || "",
      displayName: flatData.displayName || flatData.name || "",
      description: flatData.description || flatData.shortDescription || "",
      shortDescription: flatData.shortDescription || "",
      providerCount: flatData.providerCount || 0,
      isActive: flatData.isActive !== undefined ? flatData.isActive : true,
      imageUrl: flatData.imageUrl || "",
      imageFileName: flatData.imageFileName || "",
    },
    pageMainTitle: {
      pageTitle: flatData.pageTitle || "",
      pageSubtitle: flatData.pageSubtitle || "",
    },
    professionalContent: {
      title: flatData.professionalContent?.title || "",
      paragraphs: Array.isArray(flatData.professionalContent?.paragraphs)
        ? flatData.professionalContent.paragraphs
        : [""],
      // Main category image is used for professional content
      imageUrl:
        flatData.imageUrl || flatData.professionalContent?.imageUrl || "",
      imageFileName:
        flatData.imageFileName ||
        flatData.professionalContent?.imageFileName ||
        "",
    },
    whyChooseUs: {
      title: flatData.whyChooseUs?.title || "",
      paragraphs: Array.isArray(flatData.whyChooseUs?.paragraphs)
        ? flatData.whyChooseUs.paragraphs
        : [""],
      whyChooseUsImageUrl: flatData.whyChooseUsImageUrl || "",
      whyChooseUsImageFileName: flatData.whyChooseUsImageFileName || "",
    },
    aboutUs: {
      title: flatData.aboutUs?.title || "",
      description: flatData.aboutUs?.description || "",
    },
    services: Array.isArray(flatData.services) ? flatData.services : [],
    seoMetadata: {
      title: flatData.seo?.title || flatData.seoMetadata?.title || "",
      description:
        flatData.seo?.description || flatData.seoMetadata?.description || "",
      keywords: Array.isArray(flatData.seo?.keywords)
        ? flatData.seo.keywords
        : Array.isArray(flatData.seoMetadata?.keywords)
        ? flatData.seoMetadata.keywords
        : [],
      ogTitle: flatData.seo?.ogTitle || flatData.seoMetadata?.ogTitle || "",
      ogDescription:
        flatData.seo?.ogDescription ||
        flatData.seoMetadata?.ogDescription ||
        "",
      ogImage:
        flatData.seo?.ogImage ||
        flatData.seoMetadata?.ogImage ||
        "https://eisservice.ro/og-image.jpg",
      twitterTitle:
        flatData.seo?.twitterTitle || flatData.seoMetadata?.twitterTitle || "",
      twitterDescription:
        flatData.seo?.twitterDescription ||
        flatData.seoMetadata?.twitterDescription ||
        "",
      twitterImage:
        flatData.seo?.twitterImage ||
        flatData.seoMetadata?.twitterImage ||
        "https://eisservice.ro/og-image.jpg",
      canonicalUrl:
        flatData.seo?.canonicalUrl || flatData.seoMetadata?.canonicalUrl || "",
      structuredData:
        flatData.seo?.structuredData ||
        flatData.seoMetadata?.structuredData ||
        null,
    },
  };
};

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
    if (typeof categoryData.aboutUs === "string") {
      categoryData.aboutUs = JSON.parse(categoryData.aboutUs);
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
      "categoryInformation.slug": categoryData.slug,
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

    // Transform flat data to nested structure
    const nestedData = transformToNestedStructure(categoryData);

    const category = new Category(nestedData);
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
    if (typeof updateData.aboutUs === "string") {
      updateData.aboutUs = JSON.parse(updateData.aboutUs);
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
        "categoryInformation.slug": updateData.slug,
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

    // Preserve existing image URLs if not uploading new ones
    if (!req.files?.image?.[0]) {
      updateData.imageUrl = currentCategory.categoryInformation?.imageUrl || "";
      updateData.imageFileName =
        currentCategory.categoryInformation?.imageFileName || "";
    }
    // Preserve professionalContent image (uses the same image as categoryInformation)
    if (!updateData.professionalContent) {
      updateData.professionalContent = {};
    }
    if (!updateData.professionalContent.imageUrl) {
      updateData.professionalContent.imageUrl =
        currentCategory.professionalContent?.imageUrl ||
        updateData.imageUrl ||
        "";
    }
    if (!req.files?.whyChooseUsImage?.[0]) {
      updateData.whyChooseUsImageUrl =
        currentCategory.whyChooseUs?.whyChooseUsImageUrl || "";
      updateData.whyChooseUsImageFileName =
        currentCategory.whyChooseUs?.whyChooseUsImageFileName || "";
    }

    // Handle new image uploads if provided
    if (req.files) {
      // Handle main image
      if (req.files.image && req.files.image[0]) {
        try {
          // Delete old image if it exists
          if (currentCategory.categoryInformation?.imageFileName) {
            try {
              await deleteImage(
                currentCategory.categoryInformation.imageFileName
              );
            } catch (deleteError) {
              console.warn("Error deleting old image:", deleteError);
              // Continue with upload even if deletion fails
            }
          }
          // Also delete old professionalContent image if it exists and is different
          if (
            currentCategory.professionalContent?.imageFileName &&
            currentCategory.professionalContent.imageFileName !==
              currentCategory.categoryInformation?.imageFileName
          ) {
            try {
              await deleteImage(
                currentCategory.professionalContent.imageFileName
              );
            } catch (deleteError) {
              console.warn(
                "Error deleting old professionalContent image:",
                deleteError
              );
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
                currentCategory.categoryInformation?.name ||
                currentCategory.categoryInformation?.displayName,
              uploadedBy: "admin",
              type: "category-image",
              processedWithSharp: true,
              processedMetadata: processedImage.metadata,
            }
          );

          updateData.imageUrl = uploadResult.downloadURL;
          updateData.imageFileName = uploadResult.fileName;

          // Also update professionalContent image (uses the same image)
          if (!updateData.professionalContent) {
            updateData.professionalContent = {};
          }
          updateData.professionalContent.imageUrl = uploadResult.downloadURL;
          updateData.professionalContent.imageFileName = uploadResult.fileName;
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
          if (currentCategory.whyChooseUs?.whyChooseUsImageFileName) {
            try {
              await deleteImage(
                currentCategory.whyChooseUs.whyChooseUsImageFileName
              );
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
                currentCategory.categoryInformation?.name ||
                currentCategory.categoryInformation?.displayName,
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

    // Transform flat data to nested structure
    const nestedData = transformToNestedStructure(updateData);

    const category = await Category.findByIdAndUpdate(id, nestedData, {
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
    if (category.categoryInformation?.imageFileName) {
      try {
        await deleteImage(category.categoryInformation.imageFileName);
      } catch (deleteError) {
        console.warn("Error deleting category image:", deleteError);
        // Continue with category deletion even if image deletion fails
      }
    }

    if (category.whyChooseUs?.whyChooseUsImageFileName) {
      try {
        await deleteImage(category.whyChooseUs.whyChooseUsImageFileName);
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

    // Toggle isActive in the nested structure
    category.categoryInformation.isActive =
      !category.categoryInformation.isActive;
    await category.save();

    res.status(200).json({
      success: true,
      message: `Category ${
        category.categoryInformation.isActive ? "activated" : "deactivated"
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
    if (category.categoryInformation?.imageFileName) {
      try {
        await deleteImage(category.categoryInformation.imageFileName);
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
        categoryName:
          category.categoryInformation?.name ||
          category.categoryInformation?.displayName,
        uploadedBy: "admin",
        type: "category-image",
        processedWithSharp: true,
        processedMetadata: processedImage.metadata,
      }
    );

    // Update category with new image info
    category.categoryInformation.imageUrl = uploadResult.downloadURL;
    category.categoryInformation.imageFileName = uploadResult.fileName;
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
