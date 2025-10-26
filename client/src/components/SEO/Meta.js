import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const Meta = ({
  title = "",
  description = "",
  image = "https://eisservice.ro/og-image.jpg",
  url,
  structuredData = null,
  keywords = "",
  ogType = "website",
}) => {
  const location = useLocation();
  const baseUrl = "https://eisservice.ro";
  const path = location.pathname === "/" ? "" : location.pathname;
  const fullUrl = url || `${baseUrl}${path}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullUrl} />
      <meta
        property="og:image"
        content={image || "https://eisservice.ro/og-image.jpg"}
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={description} />
      <meta property="og:site_name" content="EIS Service" />
      <meta property="og:locale" content="ro_RO" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:domain" content="eisservice.ro" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content={image || "https://eisservice.ro/og-image.jpg"}
      />
      <meta name="twitter:image:alt" content={description} />
      <meta name="twitter:site" content="@EISService" />

      {/* Structured Data / JSON-LD */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default Meta;
