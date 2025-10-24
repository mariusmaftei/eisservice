/**
 * SEO Helper Functions for generating structured data and meta tags
 */

/**
 * Generate structured data for a service category
 * @param {Object} category - Category data from database
 * @returns {Object} Structured data object
 */
export const generateCategoryStructuredData = (category) => {
  if (!category) return null;

  const baseUrl = "https://eisservice.ro";

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: category.displayName || category.name,
    description: category.description || category.shortDescription,
    url: `${baseUrl}/contact-option/${category.slug}`,
    provider: {
      "@type": "Organization",
      name: "E.I.S. SERVICE COMPLETE S.R.L.",
      url: baseUrl,
      logo: `${baseUrl}/og-image.jpg`,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Str. Baciului nr. 4, Biroul",
        addressLocality: "Brașov",
        addressRegion: "Brașov",
        addressCountry: "RO",
      },
    },
    areaServed: {
      "@type": "Country",
      name: "Romania",
    },
    serviceType: category.name,
    category: category.name,
    ...(category.imageUrl && {
      image: category.imageUrl,
    }),
  };
};

/**
 * Generate structured data for a service request page
 * @param {Object} category - Category data from database
 * @returns {Object} Structured data object
 */
export const generateServiceRequestStructuredData = (category) => {
  if (!category) return null;

  const baseUrl = "https://eisservice.ro";

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Solicită ${
      category.displayName || category.name
    } - Servicii Profesionale`,
    description: `Completează formularul pentru a solicita un specialist în ${
      category.displayName || category.name
    }. Servicii profesionale verificate în România.`,
    url: `${baseUrl}/requested-service/${category.slug}`,
    provider: {
      "@type": "Organization",
      name: "E.I.S. SERVICE COMPLETE S.R.L.",
      url: baseUrl,
    },
    areaServed: {
      "@type": "Country",
      name: "Romania",
    },
  };
};

/**
 * Generate default SEO data for a category if not provided
 * @param {Object} category - Category data from database
 * @param {String} pageType - Type of page ('contact-option' or 'requested-service')
 * @returns {Object} SEO data object
 */
export const generateDefaultSeoData = (
  category,
  pageType = "contact-option"
) => {
  if (!category) return {};

  const baseUrl = "https://eisservice.ro";
  const categoryName = category.displayName || category.name;

  if (pageType === "requested-service") {
    return {
      title: `Solicită ${categoryName} - Servicii Profesionale | eisservice.ro`,
      description: `Completează formularul pentru a solicita un specialist în ${categoryName}. Servicii profesionale verificate în România.`,
      keywords: [
        `solicită ${categoryName.toLowerCase()}`,
        "servicii profesionale",
        "romania",
        "specialisti",
        "verificati",
        "calificati",
        "formular solicitare",
      ],
      ogTitle: `Solicită ${categoryName} - Servicii Profesionale | eisservice.ro`,
      ogDescription: `Completează formularul pentru a solicita un specialist în ${categoryName}. Servicii profesionale verificate în România.`,
      ogImage: category.imageUrl || `${baseUrl}/og-image.jpg`,
      twitterTitle: `Solicită ${categoryName} - Servicii Profesionale | eisservice.ro`,
      twitterDescription: `Completează formularul pentru a solicita un specialist în ${categoryName}. Servicii profesionale verificate în România.`,
      twitterImage: category.imageUrl || `${baseUrl}/og-image.jpg`,
      canonicalUrl: `${baseUrl}/requested-service/${category.slug}`,
      structuredData: generateServiceRequestStructuredData(category),
    };
  }

  // Default contact-option page
  return {
    title: `${categoryName} - Servicii Profesionale | eisservice.ro`,
    description:
      category.shortDescription ||
      `Servicii profesionale de ${categoryName} în România. Găsește specialisti verificați și calificați.`,
    keywords: [
      categoryName.toLowerCase(),
      "servicii profesionale",
      "romania",
      "specialisti",
      "verificati",
      "calificati",
    ],
    ogTitle: `${categoryName} - Servicii Profesionale | eisservice.ro`,
    ogDescription:
      category.shortDescription ||
      `Servicii profesionale de ${categoryName} în România.`,
    ogImage: category.imageUrl || `${baseUrl}/og-image.jpg`,
    twitterTitle: `${categoryName} - Servicii Profesionale | eisservice.ro`,
    twitterDescription:
      category.shortDescription ||
      `Servicii profesionale de ${categoryName} în România.`,
    twitterImage: category.imageUrl || `${baseUrl}/og-image.jpg`,
    canonicalUrl: `${baseUrl}/contact-option/${category.slug}`,
    structuredData: generateCategoryStructuredData(category),
  };
};

/**
 * Merge custom SEO data with defaults
 * @param {Object} customSeo - Custom SEO data from database
 * @param {Object} defaultSeo - Default SEO data
 * @returns {Object} Merged SEO data
 */
export const mergeSeoData = (customSeo = {}, defaultSeo = {}) => {
  return {
    title: customSeo.title || defaultSeo.title,
    description: customSeo.description || defaultSeo.description,
    keywords: customSeo.keywords?.length
      ? customSeo.keywords
      : defaultSeo.keywords,
    ogTitle: customSeo.ogTitle || customSeo.title || defaultSeo.ogTitle,
    ogDescription:
      customSeo.ogDescription ||
      customSeo.description ||
      defaultSeo.ogDescription,
    ogImage: customSeo.ogImage || defaultSeo.ogImage,
    twitterTitle:
      customSeo.twitterTitle || customSeo.title || defaultSeo.twitterTitle,
    twitterDescription:
      customSeo.twitterDescription ||
      customSeo.description ||
      defaultSeo.twitterDescription,
    twitterImage:
      customSeo.twitterImage || customSeo.ogImage || defaultSeo.twitterImage,
    canonicalUrl: customSeo.canonicalUrl || defaultSeo.canonicalUrl,
    structuredData: customSeo.structuredData || defaultSeo.structuredData,
  };
};
