import Category from "../models/Category.js";
import { processCategoryImages } from "../utils/imageUrlCleaner.js";
import renderApp from "../utils/ssr.js";

/**
 * SSR Controller for handling server-side rendering of pages
 */

/**
 * Handle SSR for contact option pages
 */
export const handleContactOptionSSR = async (req, res) => {
  try {
    const { categorySlug } = req.params;
    console.log("SSR Route called for category:", categorySlug);

    console.log("Looking for category with slug:", categorySlug);
    const category = await Category.findOne({
      "categoryInformation.slug": categorySlug,
      "categoryInformation.isActive": true,
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
};

/**
 * Handle SSR for requested service pages
 */
export const handleRequestedServiceSSR = async (req, res) => {
  try {
    const { categorySlug } = req.params;
    console.log(
      "SSR Route called for requested service category:",
      categorySlug
    );

    console.log("Looking for category with slug:", categorySlug);
    const category = await Category.findOne({
      "categoryInformation.slug": categorySlug,
      "categoryInformation.isActive": true,
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
};

/**
 * Handle SSR for home page
 */
export const handleHomeSSR = async (req, res) => {
  try {
    console.log("SSR Route called for home page");

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
};

/**
 * Handle SSR for about page
 */
export const handleAboutSSR = async (req, res) => {
  try {
    console.log("SSR Route called for about page");

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
};

/**
 * Handle SSR for contact page
 */
export const handleContactSSR = async (req, res) => {
  try {
    console.log("SSR Route called for contact page");

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
};

/**
 * Handle SSR for providers page
 */
export const handleProvidersSSR = async (req, res) => {
  try {
    console.log("SSR Route called for providers page");

    const html = renderApp(req.url, null, "providers");

    console.log("Providers page HTML rendered successfully");

    // Add ETag for caching
    res.set("ETag", '"providers-static"');
    res.set("Cache-Control", "public, max-age=7200"); // 2 hours cache
    res.send(html);
  } catch (error) {
    console.error("Error in SSR route:", error);
    console.error("Error stack:", error.stack);
    res.status(500).send("Internal server error: " + error.message);
  }
};

/**
 * Handle SSR for privacy policy page
 */
export const handlePrivacyPolicySSR = async (req, res) => {
  try {
    console.log("SSR Route called for privacy policy page");

    const html = renderApp(req.url, null, "privacy-policy");

    console.log("Privacy policy page HTML rendered successfully");

    // Add ETag for caching
    res.set("ETag", '"privacy-static"');
    res.set("Cache-Control", "public, max-age=7200"); // 2 hours cache
    res.send(html);
  } catch (error) {
    console.error("Error in SSR route:", error);
    console.error("Error stack:", error.stack);
    res.status(500).send("Internal server error: " + error.message);
  }
};
