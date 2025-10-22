import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const renderApp = (url, categoryData = null) => {
  // Read the built index.html file
  const indexPath = path.join(__dirname, "../../client/build/index.html");
  let indexHtml = fs.readFileSync(indexPath, "utf8");

  // Replace the title
  const title =
    categoryData?.seo?.title || "EIS Service - Servicii Profesionale";
  indexHtml = indexHtml.replace(
    /<title>.*?<\/title>/,
    `<title>${title}</title>`
  );

  // Replace the description meta tag
  const description =
    categoryData?.seo?.description || "Servicii profesionale în Brașov";
  indexHtml = indexHtml.replace(
    /<meta name="description" content=".*?" \/>/,
    `<meta name="description" content="${description}" />`
  );

  // Add keywords meta tag if not present
  const keywords = categoryData?.seo?.keywords?.join(", ") || "servicii brasov";
  if (!indexHtml.includes('name="keywords"')) {
    indexHtml = indexHtml.replace(
      /<meta name="description" content=".*?" \/>/,
      `<meta name="description" content="${description}" />\n      <meta name="keywords" content="${keywords}" />`
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
