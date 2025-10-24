import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateDefaultSeoData, mergeSeoData } from "./seoHelpers.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const renderApp = (
  url,
  categoryData = null,
  pageType = "contact-option",
  staticPageData = null
) => {
  // Read the built index.html file
  const indexPath = path.join(__dirname, "../../client/build/index.html");
  let indexHtml = fs.readFileSync(indexPath, "utf8");

  // Generate SEO data using helper functions
  let mergedSeo;
  if (staticPageData) {
    // Use static page data directly
    mergedSeo = staticPageData;
  } else {
    const defaultSeo = generateDefaultSeoData(categoryData, pageType);
    mergedSeo = mergeSeoData(categoryData?.seo, defaultSeo);
  }

  const baseUrl = "https://eisservice.ro";
  const fullUrl = `${baseUrl}${url}`;

  // Extract SEO data
  const title = mergedSeo.title;
  const description = mergedSeo.description;
  const keywords = Array.isArray(mergedSeo.keywords)
    ? mergedSeo.keywords.join(", ")
    : mergedSeo.keywords;
  const ogTitle = mergedSeo.ogTitle;
  const ogDescription = mergedSeo.ogDescription;
  const ogImage = mergedSeo.ogImage;
  const twitterTitle = mergedSeo.twitterTitle;
  const twitterDescription = mergedSeo.twitterDescription;
  const twitterImage = mergedSeo.twitterImage;
  const canonicalUrl = mergedSeo.canonicalUrl;

  // Replace title
  indexHtml = indexHtml.replace(
    /<title>.*?<\/title>/,
    `<title>${title}</title>`
  );

  // Replace basic meta tags
  indexHtml = indexHtml.replace(
    /<meta name="description" content=".*?" \/>/,
    `<meta name="description" content="${description}" />`
  );

  // Add or replace keywords meta tag
  if (indexHtml.includes('name="keywords"')) {
    indexHtml = indexHtml.replace(
      /<meta name="keywords" content=".*?" \/>/,
      `<meta name="keywords" content="${keywords}" />`
    );
  } else {
    indexHtml = indexHtml.replace(
      /<meta name="description" content=".*?" \/>/,
      `<meta name="description" content="${description}" />\n      <meta name="keywords" content="${keywords}" />`
    );
  }

  // Add canonical link
  if (indexHtml.includes('rel="canonical"')) {
    indexHtml = indexHtml.replace(
      /<link rel="canonical" href=".*?" \/>/,
      `<link rel="canonical" href="${canonicalUrl}" />`
    );
  } else {
    indexHtml = indexHtml.replace(
      /<meta name="keywords" content=".*?" \/>/,
      `<meta name="keywords" content="${keywords}" />\n      <link rel="canonical" href="${canonicalUrl}" />`
    );
  }

  // Add Open Graph meta tags
  const ogMetaTags = `
      <!-- Open Graph / Facebook -->
      <meta property="og:title" content="${ogTitle}" />
      <meta property="og:description" content="${ogDescription}" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="${canonicalUrl}" />
      <meta property="og:image" content="${ogImage}" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <!-- Twitter -->
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:domain" content="eisservice.ro" />
      <meta name="twitter:url" content="${canonicalUrl}" />
      <meta name="twitter:title" content="${twitterTitle}" />
      <meta name="twitter:description" content="${twitterDescription}" />
      <meta name="twitter:image" content="${twitterImage}" />
      <meta name="twitter:image:alt" content="${twitterDescription}" />`;

  // Remove existing OG and Twitter meta tags if they exist
  indexHtml = indexHtml.replace(
    /<!-- Open Graph \/ Facebook -->[\s\S]*?<meta name="twitter:image:alt"[^>]*\/>/,
    ""
  );

  // Add new OG and Twitter meta tags before closing head tag
  indexHtml = indexHtml.replace("</head>", `${ogMetaTags}\n  </head>`);

  // Add structured data if available
  if (mergedSeo.structuredData) {
    const structuredDataScript = `
    <script type="application/ld+json">
      ${JSON.stringify(mergedSeo.structuredData)}
    </script>`;
    indexHtml = indexHtml.replace(
      "</head>",
      `${structuredDataScript}\n  </head>`
    );
  }

  // Inject initial data
  const initialDataScript = `
    <script>
      window.__INITIAL_DATA__ = ${JSON.stringify(categoryData || {})};
      window.__CATEGORY_SLUG__ = ${JSON.stringify(categoryData?.slug || "")};
      console.log('SSR: Injected category data:', ${JSON.stringify(
        categoryData || {}
      )});
    </script>`;

  // Insert the script before the closing body tag
  indexHtml = indexHtml.replace("</body>", `${initialDataScript}\n  </body>`);

  return indexHtml;
};

export default renderApp;
