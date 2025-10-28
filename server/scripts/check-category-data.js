import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "../models/Category.js";

dotenv.config();

const checkCategoryData = async () => {
  try {
    // Connect to MongoDB
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
      console.error("MONGODB_URI environment variable not set");
      process.exit(1);
    }

    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB\n");

    // Check for categories with root-level slug or isActive
    const categoriesWithOldFields = await Category.find({
      $or: [{ slug: { $exists: true } }, { isActive: { $exists: true } }],
    });

    console.log(
      `Found ${categoriesWithOldFields.length} categories with old field structure`
    );

    if (categoriesWithOldFields.length > 0) {
      console.log("\nSample categories with old fields:");
      categoriesWithOldFields.slice(0, 3).forEach((cat) => {
        console.log({
          id: cat._id,
          hasOldSlug: cat.slug !== undefined,
          hasOldIsActive: cat.isActive !== undefined,
          hasNewSlug: cat.categoryInformation?.slug !== undefined,
          slugValue: cat.slug,
          categorySlug: cat.categoryInformation?.slug,
        });
      });
    }

    // Check for categories with null slugs in categoryInformation
    const categoriesWithNullSlugs = await Category.find({
      $or: [
        { "categoryInformation.slug": null },
        { "categoryInformation.slug": "" },
      ],
    });

    console.log(
      `\nFound ${categoriesWithNullSlugs.length} categories with null or empty slugs in categoryInformation`
    );

    if (categoriesWithNullSlugs.length > 0) {
      console.log("\nCategories with null slugs:");
      categoriesWithNullSlugs.forEach((cat) => {
        console.log({
          id: cat._id,
          name: cat.categoryInformation?.name || "unknown",
          slug: cat.categoryInformation?.slug,
        });
      });
    }

    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

checkCategoryData();


