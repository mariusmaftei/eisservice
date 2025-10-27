import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "../models/Category.js";

dotenv.config();

const fixCategoryIndexes = async () => {
  try {
    // Connect to MongoDB
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
      console.error("MONGODB_URI environment variable not set");
      process.exit(1);
    }

    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // Get the collection
    const collection = mongoose.connection.db.collection("categories");

    // List all current indexes
    const indexes = await collection.indexes();
    console.log("\nCurrent indexes:");
    console.log(JSON.stringify(indexes, null, 2));

    // Drop all indexes
    console.log("\nDropping all indexes...");
    await collection.dropIndexes();

    // Let mongoose recreate the indexes from the schema
    console.log("Recreating indexes from schema...");
    await Category.syncIndexes();

    // Verify the new indexes
    const newIndexes = await collection.indexes();
    console.log("\nNew indexes:");
    console.log(JSON.stringify(newIndexes, null, 2));

    console.log("\nIndex fix complete!");
    process.exit(0);
  } catch (error) {
    console.error("Error during index fix:", error);
    process.exit(1);
  }
};

fixCategoryIndexes();

