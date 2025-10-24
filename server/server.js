import dotenv from "dotenv";
dotenv.config();

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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(compression());
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

// SSR Route for dynamic contact options
// This route should only match /contact-option/:categorySlug, not API routes
app.get("/contact-option/:categorySlug", async (req, res) => {
  try {
    const { categorySlug } = req.params;
    console.log("SSR Route called for category:", categorySlug);

    // Import Category model dynamically to avoid circular imports
    const { default: Category } = await import("./models/Category.js");
    const { processCategoryImages } = await import(
      "./utils/imageUrlCleaner.js"
    );
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

    console.log("Processing category images");
    // Process images for the category
    const processedCategory = processCategoryImages(category.toObject());

    console.log("Rendering app with category data");
    // Render the React app with category data
    const html = renderApp(req.url, processedCategory);
    console.log("HTML rendered successfully");

    // Set caching headers for better performance
    res.set("Cache-Control", "public, max-age=3600"); // Cache for 1 hour
    res.send(html);
  } catch (error) {
    console.error("Error in SSR route:", error);
    console.error("Error stack:", error.stack);
    res.status(500).send("Internal server error: " + error.message);
  }
});

// SSR Route for requested service pages
app.get("/requested-service/:categorySlug", async (req, res) => {
  try {
    const { categorySlug } = req.params;
    console.log(
      "SSR Route called for requested service category:",
      categorySlug
    );

    // Import Category model dynamically to avoid circular imports
    const { default: Category } = await import("./models/Category.js");
    const { processCategoryImages } = await import(
      "./utils/imageUrlCleaner.js"
    );
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

    console.log("Processing category images");
    // Process images for the category
    const processedCategory = processCategoryImages(category.toObject());

    console.log("Rendering app with category data for requested service");
    // Render the React app with category data
    const html = renderApp(req.url, processedCategory, "requested-service");
    console.log("HTML rendered successfully");

    // Set caching headers for better performance
    res.set("Cache-Control", "public, max-age=3600"); // Cache for 1 hour
    res.send(html);
  } catch (error) {
    console.error("Error in SSR route:", error);
    console.error("Error stack:", error.stack);
    res.status(500).send("Internal server error: " + error.message);
  }
});

// SSR Route for home page
app.get("/", async (req, res) => {
  try {
    console.log("SSR Route called for home page");
    const renderApp = (await import("./utils/ssr.js")).default;

    const homePageData = {
      title: "E.I.S. Service - Servicii Profesionale în România",
      description:
        "Găsește specialisti verificați pentru toate serviciile tale. Electricieni, mecanici auto, instalatori și multe altele. Servicii profesionale în România.",
      keywords: [
        "servicii profesionale",
        "romania",
        "specialisti",
        "electrician",
        "mecanic auto",
        "instalator",
      ],
      ogTitle: "E.I.S. Service - Servicii Profesionale în România",
      ogDescription:
        "Găsește specialisti verificați pentru toate serviciile tale. Servicii profesionale în România.",
      ogImage: "https://eisservice.ro/og-image.jpg",
      twitterTitle: "E.I.S. Service - Servicii Profesionale în România",
      twitterDescription:
        "Găsește specialisti verificați pentru toate serviciile tale. Servicii profesionale în România.",
      twitterImage: "https://eisservice.ro/og-image.jpg",
      canonicalUrl: "https://eisservice.ro/",
    };

    const html = renderApp(req.url, null, "home", homePageData);
    console.log("Home page HTML rendered successfully");

    // Set caching headers for better performance
    res.set("Cache-Control", "public, max-age=1800"); // Cache for 30 minutes
    res.send(html);
  } catch (error) {
    console.error("Error in home SSR route:", error);
    res.status(500).send("Internal server error: " + error.message);
  }
});

// SSR Route for about page
app.get("/despre", async (req, res) => {
  try {
    console.log("SSR Route called for about page");
    const renderApp = (await import("./utils/ssr.js")).default;

    const aboutPageData = {
      title: "Despre Noi - E.I.S. Service Complete S.R.L.",
      description:
        "Află mai multe despre E.I.S. Service Complete S.R.L. și misiunea noastră de a conecta clienții cu specialisti verificați în România.",
      keywords: [
        "despre noi",
        "e.i.s. service",
        "companie",
        "romania",
        "servicii",
      ],
      ogTitle: "Despre Noi - E.I.S. Service Complete S.R.L.",
      ogDescription:
        "Află mai multe despre E.I.S. Service Complete S.R.L. și misiunea noastră de a conecta clienții cu specialisti verificați.",
      ogImage: "https://eisservice.ro/og-image.jpg",
      twitterTitle: "Despre Noi - E.I.S. Service Complete S.R.L.",
      twitterDescription:
        "Află mai multe despre E.I.S. Service Complete S.R.L. și misiunea noastră de a conecta clienții cu specialisti verificați.",
      twitterImage: "https://eisservice.ro/og-image.jpg",
      canonicalUrl: "https://eisservice.ro/despre",
    };

    const html = renderApp(req.url, null, "about", aboutPageData);
    console.log("About page HTML rendered successfully");

    // Set caching headers for better performance
    res.set("Cache-Control", "public, max-age=3600"); // Cache for 1 hour
    res.send(html);
  } catch (error) {
    console.error("Error in about SSR route:", error);
    res.status(500).send("Internal server error: " + error.message);
  }
});

// SSR Route for contact page
app.get("/contact", async (req, res) => {
  try {
    console.log("SSR Route called for contact page");
    const renderApp = (await import("./utils/ssr.js")).default;

    const contactPageData = {
      title: "Contact - E.I.S. Service Complete S.R.L.",
      description:
        "Contactează-ne pentru servicii profesionale. Sediul nostru se află în Brașov, România. Sună sau trimite un mesaj pentru mai multe informații.",
      keywords: [
        "contact",
        "e.i.s. service",
        "brasov",
        "romania",
        "telefon",
        "email",
      ],
      ogTitle: "Contact - E.I.S. Service Complete S.R.L.",
      ogDescription:
        "Contactează-ne pentru servicii profesionale. Sediul nostru se află în Brașov, România.",
      ogImage: "https://eisservice.ro/og-image.jpg",
      twitterTitle: "Contact - E.I.S. Service Complete S.R.L.",
      twitterDescription:
        "Contactează-ne pentru servicii profesionale. Sediul nostru se află în Brașov, România.",
      twitterImage: "https://eisservice.ro/og-image.jpg",
      canonicalUrl: "https://eisservice.ro/contact",
    };

    const html = renderApp(req.url, null, "contact", contactPageData);
    console.log("Contact page HTML rendered successfully");

    // Set caching headers for better performance
    res.set("Cache-Control", "public, max-age=3600"); // Cache for 1 hour
    res.send(html);
  } catch (error) {
    console.error("Error in contact SSR route:", error);
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
