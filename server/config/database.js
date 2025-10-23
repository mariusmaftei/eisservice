import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const databaseConnect = async () => {
  try {
    if (!MONGODB_URI) {
      console.log("MongoDB URI not provided - database features disabled");
      return;
    }

    const conn = await mongoose.connect(MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Database connection error:", error);
    console.log("Server will continue without database connection");
    // Don't exit the process - let the server run without database
  }
};

export default databaseConnect;
