import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import clientRoute from "./routes/clientRoutes.js";
import providerRoute from "./routes/providerRouts.js";
import policyRoute from "./routes/policyRoute.js";
import categoryRoute from "./routes/categoryRoutes.js";
import adminRoute from "./routes/adminRoutes.js";
import uploadRoute from "./routes/uploadRoutes.js";
import databaseConnect from "./config/database.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve static files from React build
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/", (req, res) => {
  res.json({
    status: "OK",
    service: "E.I.S. service API",
    message: "The E.Is.S. service backend service is up and running.",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

// API Routes - These must come BEFORE SSR routes to avoid conflicts
app.use("/api/client", clientRoute);
app.use("/api/provider", providerRoute);
app.use("/api/policy", policyRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/admin", adminRoute);
app.use("/api/upload", uploadRoute);

// SSR Route for dynamic contact options
// This route should only match /contact-option/:categorySlug, not API routes
app.get("/contact-option/:categorySlug", async (req, res) => {
  try {
    const { categorySlug } = req.params;
    console.log("SSR Route called for category:", categorySlug);

    // Import Category model dynamically to avoid circular imports
    const { default: Category } = await import("./models/Category.js");
    const renderApp = (await import("./utils/ssr.js")).default;

    console.log("Looking for category with slug:", categorySlug);
    const category = await Category.findOne({
      slug: categorySlug,
      isActive: true,
    });

    console.log("Found category:", category ? "Yes" : "No");

    if (!category) {
      console.log("Category not found, returning 404");
      return res.status(404).send("Category not found");
    }

    console.log("Rendering app with category data");
    // Render the React app with category data
    const html = renderApp(req.url, category);
    console.log("HTML rendered successfully");
    res.send(html);
  } catch (error) {
    console.error("Error in SSR route:", error);
    console.error("Error stack:", error.stack);
    res.status(500).send("Internal server error: " + error.message);
  }
});

// Catch-all handler: send back React's index.html file for client-side routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

const server = () => {
  try {
    databaseConnect();
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error);
    process.exit(1);
  }
};

server();
