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
 * Generate breadcrumb structured data
 * @param {Array} breadcrumbs - Array of breadcrumb items
 * @returns {Object} Breadcrumb structured data
 */
export const generateBreadcrumbStructuredData = (breadcrumbs) => {
  if (!breadcrumbs || breadcrumbs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};

/**
 * Generate FAQ structured data
 * @param {Array} faqs - Array of FAQ objects
 * @returns {Object} FAQ structured data
 */
export const generateFAQStructuredData = (faqs) => {
  if (!faqs || faqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
};

/**
 * Generate review/rating structured data
 * @param {Object} reviewData - Review data object
 * @returns {Object} Review structured data
 */
export const generateReviewStructuredData = (reviewData) => {
  if (!reviewData) return null;

  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    itemReviewed: {
      "@type": "Service",
      name: reviewData.serviceName,
    },
    ratingValue: reviewData.ratingValue || 4.8,
    bestRating: 5,
    worstRating: 1,
    ratingCount: reviewData.ratingCount || 150,
    reviewCount: reviewData.reviewCount || 120,
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
 * Generate SEO data for requested service page
 * @param {Object} category - Category data from database
 * @returns {Object} SEO data object
 */
export const generateRequestedServiceSeoData = (category) => {
  if (!category) return {};

  const baseUrl = "https://eisservice.ro";
  const categoryName = category.displayName || category.name;

  // Generate breadcrumbs
  const breadcrumbs = [
    { name: "Acasă", url: baseUrl },
    { name: "Solicită Serviciu", url: `${baseUrl}/requested-service` },
    {
      name: categoryName,
      url: `${baseUrl}/requested-service/${category.slug}`,
    },
  ];

  // Generate FAQ data
  const faqs = [
    {
      question: `Cum pot solicita servicii de ${categoryName}?`,
      answer: `Completează formularul de pe această pagină cu detaliile solicitării tale. Echipa noastră va conecta cu prestatori verificați din zona ta.`,
    },
    {
      question: `Cât costă serviciile de ${categoryName}?`,
      answer: `Prețurile variază în funcție de complexitatea lucrării și zona geografică. Prestatorii noștri oferă estimări gratuite pentru fiecare solicitare.`,
    },
    {
      question: `Cât durează procesul de solicitare?`,
      answer: `De obicei, primești răspunsuri de la prestatori în termen de 24-48 de ore. Procesul complet de conectare cu prestatorul potrivit durează 2-3 zile lucrătoare.`,
    },
  ];

  // Generate review data
  const reviewData = {
    serviceName: `Servicii ${categoryName}`,
    ratingValue: 4.8,
    ratingCount: 150,
    reviewCount: 120,
  };

  return {
    title: `Solicită ${categoryName} - Servicii Profesionale | eisservice.ro`,
    description: `Completează formularul pentru a solicita un specialist în ${categoryName}. Servicii profesionale verificate în România. Răspuns rapid și prestatori calificați.`,
    keywords: [
      `solicită ${categoryName.toLowerCase()}`,
      "formular servicii",
      "specialisti verificati",
      "romania",
      "servicii profesionale",
      "rapid",
      "calificati",
    ],
    ogTitle: `Solicită ${categoryName} - Servicii Profesionale | eisservice.ro`,
    ogDescription: `Completează formularul pentru a solicita un specialist în ${categoryName}. Servicii profesionale verificate în România.`,
    ogImage: category.imageUrl || `${baseUrl}/og-image.jpg`,
    twitterTitle: `Solicită ${categoryName} - Servicii Profesionale | eisservice.ro`,
    twitterDescription: `Completează formularul pentru a solicita un specialist în ${categoryName}. Servicii profesionale verificate în România.`,
    twitterImage: category.imageUrl || `${baseUrl}/og-image.jpg`,
    canonicalUrl: `${baseUrl}/requested-service/${category.slug}`,
    structuredData: [
      generateServiceRequestStructuredData(category),
      generateBreadcrumbStructuredData(breadcrumbs),
      generateFAQStructuredData(faqs),
      generateReviewStructuredData(reviewData),
    ].filter(Boolean),
  };
};

/**
 * Generate SEO data for providers page
 * @returns {Object} SEO data object
 */
export const generateProvidersSeoData = () => {
  const baseUrl = "https://eisservice.ro";

  const breadcrumbs = [
    { name: "Acasă", url: baseUrl },
    { name: "Devino Prestator", url: `${baseUrl}/devino-prestator` },
  ];

  const faqs = [
    {
      question: "Cum pot deveni prestator pe eisservice.ro?",
      answer:
        "Completează formularul de înregistrare sau contactează-ne pe WhatsApp. Procesul include verificarea calificărilor și crearea profilului profesional.",
    },
    {
      question: "Ce beneficii am ca prestator?",
      answer:
        "Acces la clienți noi, platformă sigură de plăți, sistem de recenzii pentru reputație online și suport continuu din partea echipei noastre.",
    },
    {
      question: "Cât costă să devin prestator?",
      answer:
        "Înregistrarea este gratuită. Platforma percepe o comision mică doar pentru serviciile efectuate cu succes.",
    },
    {
      question: "Cât durează procesul de verificare?",
      answer:
        "Procesul de verificare și aprobare durează de obicei 2-3 zile lucrătoare după completarea formularului.",
    },
  ];

  const reviewData = {
    serviceName: "Platforma E.I.S. Service",
    ratingValue: 4.9,
    ratingCount: 200,
    reviewCount: 180,
  };

  return {
    title:
      "Devino Prestator - eisservice.ro | Alătură-te rețelei noastre de profesioniști",
    description:
      "Ești profesionist? Alătură-te platformei eisservice.ro și găsește clienți noi în zona ta. Proces simplu de înregistrare, platformă sigură și oportunități constante de afaceri. Începe astăzi!",
    keywords: [
      "devino prestator",
      "înregistrare prestator",
      "servicii profesionale",
      "clienți noi",
      "platformă servicii",
      "romania",
      "oportunități afaceri",
      "verificare prestatori",
    ],
    ogTitle:
      "Devino Prestator - eisservice.ro | Alătură-te rețelei noastre de profesioniști",
    ogDescription:
      "Ești profesionist? Alătură-te platformei eisservice.ro și găsește clienți noi în zona ta. Proces simplu de înregistrare și oportunități constante.",
    ogImage: `${baseUrl}/og-image.jpg`,
    twitterTitle:
      "Devino Prestator - eisservice.ro | Alătură-te rețelei noastre de profesioniști",
    twitterDescription:
      "Ești profesionist? Alătură-te platformei eisservice.ro și găsește clienți noi în zona ta. Proces simplu de înregistrare și oportunități constante.",
    twitterImage: `${baseUrl}/og-image.jpg`,
    canonicalUrl: `${baseUrl}/devino-prestator`,
    structuredData: [
      generateBreadcrumbStructuredData(breadcrumbs),
      generateFAQStructuredData(faqs),
      generateReviewStructuredData(reviewData),
    ].filter(Boolean),
  };
};

/**
 * Generate SEO data for privacy policy page
 * @returns {Object} SEO data object
 */
export const generatePrivacyPolicySeoData = () => {
  const baseUrl = "https://eisservice.ro";

  const breadcrumbs = [
    { name: "Acasă", url: baseUrl },
    {
      name: "Politica de Confidențialitate",
      url: `${baseUrl}/politica-confidentialitate`,
    },
  ];

  return {
    title:
      "Politica de Confidențialitate - eisservice.ro | Protecția Datelor Personale",
    description:
      "Descoperă cum protejăm datele dumneavoastră personale pe eisservice.ro. Politica de confidențialitate GDPR-compliant pentru E.I.S. SERVICE COMPLETE S.R.L. Transparență, securitate și respectarea drepturilor dumneavoastră.",
    keywords: [
      "politica confidențialitate",
      "protecția datelor",
      "GDPR",
      "eisservice.ro",
      "date personale",
      "securitate",
      "transparență",
      "drepturi utilizatori",
    ],
    ogTitle:
      "Politica de Confidențialitate - eisservice.ro | Protecția Datelor Personale",
    ogDescription:
      "Descoperă cum protejăm datele dumneavoastră personale pe eisservice.ro. Politica de confidențialitate GDPR-compliant pentru E.I.S. SERVICE COMPLETE S.R.L.",
    ogImage: `${baseUrl}/og-image.jpg`,
    twitterTitle:
      "Politica de Confidențialitate - eisservice.ro | Protecția Datelor Personale",
    twitterDescription:
      "Descoperă cum protejăm datele dumneavoastră personale pe eisservice.ro. Politica de confidențialitate GDPR-compliant pentru E.I.S. SERVICE COMPLETE S.R.L.",
    twitterImage: `${baseUrl}/og-image.jpg`,
    canonicalUrl: `${baseUrl}/politica-confidentialitate`,
    structuredData: [generateBreadcrumbStructuredData(breadcrumbs)].filter(
      Boolean
    ),
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
