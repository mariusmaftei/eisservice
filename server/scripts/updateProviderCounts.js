import mongoose from "mongoose";
import Category from "../models/Category.js";
import dotenv from "dotenv";

dotenv.config();

// Static provider counts from allCategories.js
const providerCounts = {
  electrician: 48,
  "mecanic-auto": 36,
  instalator: 52,
  "personal-necalificat": 26,
  curatenie: 64,
  zugrav: 31,
  gradinar: 18,
  "montaj-mobila": 23,
  "reparatii-electrocasnice": 19,
  transport: 40,
  "reparatii-hardware": 12,
  frizer: 28,
  manichiura: 22,
  "aer-conditionat": 17,
  "montaj-gresie-si-faianta": 20,
  "montaj-panouri-solare": 10,
  zidar: 27,
  "alte-servicii": 11,
};

const updateProviderCounts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Get all categories
    const categories = await Category.find({});
    console.log(`Found ${categories.length} categories`);

    let updatedCount = 0;

    for (const category of categories) {
      const slug = category.slug;

      if (providerCounts[slug]) {
        category.providerCount = providerCounts[slug];
        await category.save();
        console.log(
          `Updated ${category.displayName} (${slug}) with ${providerCounts[slug]} providers`
        );
        updatedCount++;
      } else {
        console.log(
          `No provider count found for ${category.displayName} (${slug})`
        );
      }
    }

    console.log(`\nUpdate complete! Updated ${updatedCount} categories.`);
  } catch (error) {
    console.error("Error updating provider counts:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
};

// Run the update
updateProviderCounts();
