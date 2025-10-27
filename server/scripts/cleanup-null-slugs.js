import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "../models/Category.js";

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

const cleanupNullSlugs = async () => {
  try {
    // Connect to MongoDB using environment variable
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
      console.error("MONGODB_URI environment variable not set");
      process.exit(1);
    }

    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // Find categories with null or empty slugs
    const categoriesWithNullSlugs = await Category.find({
      $or: [
        { "categoryInformation.slug": null },
        { "categoryInformation.slug": "" },
        { "categoryInformation.slug": { $exists: false } },
      ],
    });

    console.log(
      `Found ${categoriesWithNullSlugs.length} categories with null or empty slugs`
    );

    if (categoriesWithNullSlugs.length === 0) {
      console.log("No categories to fix. Exiting.");
      process.exit(0);
    }

    for (const category of categoriesWithNullSlugs) {
      const name =
        category.categoryInformation?.name ||
        category.categoryInformation?.displayName ||
        "unknown";
      const slug = generateSlug(name);

      if (!slug) {
        console.log(
          `Skipping category ${category._id} - unable to generate slug from name: ${name}`
        );
        continue;
      }

      console.log(`Fixing category: ${name} -> slug: ${slug}`);

      // Update the slug
      await Category.findByIdAndUpdate(category._id, {
        "categoryInformation.slug": slug,
      });

      console.log(`Fixed category ${category._id}`);
    }

    console.log("Cleanup complete!");
    process.exit(0);
  } catch (error) {
    console.error("Error during cleanup:", error);
    process.exit(1);
  }
};

cleanupNullSlugs();
