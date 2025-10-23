import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import passport from "./config/passport.js";
import clientRoute from "./routes/clientRoutes.js";
import providerRoute from "./routes/providerRouts.js";
import policyRoute from "./routes/policyRoute.js";
import categoryRoute from "./routes/categoryRoutes.js";
import adminRoute from "./routes/adminRoutes.js";
import uploadRoute from "./routes/uploadRoutes.js";
import authRoute from "./routes/authRoutes.js";
import databaseConnect from "./config/database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.ADMIN_FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

// Session configuration
app.use(
  session({
    secret: process.env.JWT_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Root API route - must come before static file serving
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
app.use("/api/auth", authRoute);
app.use("/api/client", clientRoute);
app.use("/api/provider", providerRoute);
app.use("/api/policy", policyRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/admin", adminRoute);
app.use("/api/upload", uploadRoute);

// Serve static files from React build (after API routes)
app.use(express.static(path.join(__dirname, "../client/build")));

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
// This should only catch routes that don't start with /api
app.get("*", (req, res, next) => {
  // Skip API routes
  if (req.path.startsWith("/api")) {
    return next();
  }
  // Skip the root API route
  if (req.path === "/") {
    return next();
  }
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
