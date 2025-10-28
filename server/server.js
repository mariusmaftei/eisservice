import dotenv from "dotenv";
dotenv.config({ debug: false });

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import compression from "compression";
import passport from "./config/passport.js";
import clientRoute from "./routes/clientRoutes.js";
import providerRoute from "./routes/providerRouts.js";
import policyRoute from "./routes/policyRoute.js";
import categoryRoute from "./routes/categoryRoutes.js";
import adminRoute from "./routes/adminRoutes.js";
import uploadRoute from "./routes/uploadRoutes.js";
import authRoute from "./routes/authRoutes.js";
import databaseConnect from "./config/database.js";
import {
  handleContactOptionSSR,
  handleRequestedServiceSSR,
  handleHomeSSR,
  handleAboutSSR,
  handleContactSSR,
  handleProvidersSSR,
  handlePrivacyPolicySSR,
  handleServicesWithCitySSR,
} from "./controllers/ssrController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

// Trust proxy - required for reverse proxy setups and proper IP detection
app.set("trust proxy", 1);

// Middleware
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// CORS configuration - Allow multiple origins including production domain
const allowedOrigins = [
  "https://eisservice.ro",
  "https://admin.eisservice.ro",
  "https://www.admin.eisservice.ro", // Add www subdomain
  "http://localhost:3000",
  "http://localhost:3001",
  process.env.ADMIN_FRONTEND_URL,
].filter(Boolean); // Remove any undefined values

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // For development, allow any localhost origin
      if (
        process.env.NODE_ENV === "development" &&
        origin.includes("localhost")
      ) {
        return callback(null, true);
      }

      // Allow any admin.eisservice.ro subdomain in production
      if (
        process.env.NODE_ENV === "production" &&
        origin.includes("admin.eisservice.ro")
      ) {
        return callback(null, true);
      }

      const msg =
        "The CORS policy for this site does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    },
    credentials: true,
    // Explicitly set these headers for cookie handling
    exposedHeaders: ["set-cookie"],
  })
);

// Session configuration with proper cookie settings for cross-domain
app.use(
  session({
    secret: process.env.JWT_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    name: "adminSession", // Custom session name to avoid conflicts
    cookie: {
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // 'none' for cross-site in production
      // Don't set domain - let browser set it automatically
      path: "/",
    },
    proxy: true, // Trust the proxy (important for reverse proxy setups)
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Root API route for API health check
app.get("/api", (req, res) => {
  res.json({
    status: "OK",
    service: "E.I.S. service API",
    message: "The E.Is.S. service backend service is up and running.",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

// Add middleware to ensure CORS headers are set for all API routes
app.use("/api", (req, res, next) => {
  // Ensure the origin is in the allowed origins
  const origin = req.headers.origin;
  if (
    origin &&
    (origin.includes("admin.eisservice.ro") || origin.includes("localhost"))
  ) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Methods",
      "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
  }
  next();
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

// Serve source assets for images that weren't processed during build
app.use(
  "/assets",
  express.static(path.join(__dirname, "../client/src/assets"))
);

// SSR Routes - Clean controller-based implementation
app.get("/", handleHomeSSR);
app.get("/despre", handleAboutSSR);
app.get("/contact", handleContactSSR);
app.get("/devino-prestator", handleProvidersSSR);
app.get("/politica-confidentialitate", handlePrivacyPolicySSR);
app.get("/solicita-serviciu", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
// Route for services page with city - must come before other city routes
app.get("/:city/solicita-serviciu", handleServicesWithCitySSR);
// Routes for formular pages (must have /formular at the end)
app.get(
  "/solicita-serviciu/:city/:categorySlug?/formular",
  handleRequestedServiceSSR
);
// Routes for contact option pages (without /formular) - city first
// These routes handle /:city/:categorySlug pattern
// Note: This must come AFTER specific routes to avoid conflicts
app.get("/:city/:categorySlug", handleContactOptionSSR);

// Catch-all handler: send back React's index.html file for client-side routing
// This should only catch routes that don't start with /api
app.get("*", (req, res, next) => {
  // Skip API routes
  if (req.path.startsWith("/api")) {
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
