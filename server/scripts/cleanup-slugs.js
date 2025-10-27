import mongoose from "mongoose";
import Category from "../models/Category.js";
import dotenv from "dotenv";

dotenv.config();

const generateSlug = (text) => {
  if (!text) return "";

  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
};

const cleanupSlugs = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/eisservice"
    );
    console.log("Connected to MongoDB");

    // Find all categories
    const categories = await Category.find({});
    console.log(`Found ${categories.length} categories`);

    let updated = 0;
    let errors = 0;

    for (const category of categories) {
      const currentSlug = category.categoryInformation?.slug || category.slug;

      if (!currentSlug) {
        console.log(`Skipping category ${category._id} - no slug`);
        continue;
      }

      // Check if slug contains special characters (not just letters, numbers, hyphens)
      const needsCleaning = /[^a-z0-9-]/.test(currentSlug);

      if (needsCleaning) {
        const cleanedSlug = generateSlug(currentSlug);

        console.log(`Cleaning slug: "${currentSlug}" → "${cleanedSlug}"`);

        // Check if the cleaned slug already exists with the same city
        const existingWithSameSlug = await Category.findOne({
          "categoryInformation.slug": cleanedSlug,
          city: category.city,
          _id: { $ne: category._id },
        });

        if (existingWithSameSlug) {
          console.error(
            `ERROR: Cannot clean slug "${currentSlug}" → "${cleanedSlug}" because it would conflict with category ${existingWithSameSlug._id}`
          );
          errors++;
          continue;
        }

        // Update the category
        if (category.categoryInformation) {
          category.categoryInformation.slug = cleanedSlug;
        } else {
          category.slug = cleanedSlug;
        }

        await category.save();
        updated++;
        console.log(`Updated category ${category._id}`);
      }
    }

    console.log(`\nCleanup complete!`);
    console.log(`Updated: ${updated}`);
    console.log(`Errors: ${errors}`);

    process.exit(0);
  } catch (error) {
    console.error("Error during cleanup:", error);
    process.exit(1);
  }
};

cleanupSlugs();

