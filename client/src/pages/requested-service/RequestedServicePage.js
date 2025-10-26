import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCategory } from "../../context/CategoryContext";
import ClientServiceRequestForm from "../../components/UI/ClientServiceRequestForm/ClientServiceRequestForm";
import Meta from "../../components/SEO/Meta";
import styles from "./RequestServicePage.module.css";

const RequestServicePage = () => {
  const { categorySlug } = useParams();
  const { categoryData, loading, error, fetchCategory, clearSSRData } =
    useCategory();

  // Fetch category data if not available
  useEffect(() => {
    // Get categorySlug from URL params or from SSR
    const currentSlug =
      categorySlug ||
      (typeof window !== "undefined" && window.__CATEGORY_SLUG__);

    if (!currentSlug) return;

    // Check if we have initial data from SSR first
    if (
      typeof window !== "undefined" &&
      window.__INITIAL_DATA__ &&
      (window.__INITIAL_DATA__.categoryInformation?.slug ||
        window.__INITIAL_DATA__.slug) === currentSlug
    ) {
      // Data is already available from SSR, no need to fetch
      console.log("Using SSR data for category:", currentSlug);
      return;
    }

    // Helper to get slug from category data (handles both old and new structure)
    const getCategorySlug = (data) => {
      return data?.categoryInformation?.slug || data?.slug;
    };

    // Check if we need to fetch data
    const needsFetch =
      !categoryData || // No data at all
      getCategorySlug(categoryData) !== currentSlug || // Data is for different category
      (!loading && !getCategorySlug(categoryData)); // Loading finished but no data

    if (needsFetch && !loading) {
      console.log("Fetching category data for:", currentSlug);
      fetchCategory(currentSlug);
    }
  }, [categorySlug, categoryData, fetchCategory, loading]);

  // Cleanup effect to clear SSR data when component unmounts
  useEffect(() => {
    return () => {
      // Clear SSR data when leaving the page to prevent stale data
      clearSSRData();
    };
  }, [clearSSRData]);

  // Helper to get data from nested or flat structure
  const getCategoryDisplayName = () => {
    if (categoryData) {
      return (
        categoryData.categoryInformation?.displayName ||
        categoryData.categoryInformation?.name ||
        categoryData.displayName ||
        categoryData.name
      );
    }
    return categorySlug
      ? categorySlug
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      : "Serviciu";
  };

  const getCategoryImage = () => {
    if (categoryData) {
      return (
        categoryData.categoryInformation?.imageUrl ||
        categoryData.imageUrl ||
        categoryData.image
      );
    }
    return "/placeholder.svg?height=400&width=800&text=Imagine+Serviciu";
  };

  const categoryName = getCategoryDisplayName();
  const categoryImage = getCategoryImage();

  // Get pageMainTitle data from database
  const getPageTitle = () => {
    // First try nested structure
    if (categoryData?.pageMainTitle?.pageTitle) {
      return categoryData.pageMainTitle.pageTitle;
    }

    // Try legacy root-level pageTitle
    if (categoryData?.pageTitle) {
      return categoryData.pageTitle;
    }

    // Fallback to default
    return "Solicită Serviciul:";
  };

  const getPageDescription = () => {
    // First try pageMainTitle.pageSubtitle (nested structure)
    if (categoryData?.pageMainTitle?.pageSubtitle) {
      return categoryData.pageMainTitle.pageSubtitle;
    }

    // Try legacy root-level pageSubtitle
    if (categoryData?.pageSubtitle) {
      return categoryData.pageSubtitle;
    }

    // Fallback to default
    const defaultCategoryName = categorySlug
      ? categorySlug
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      : "Serviciu";
    return `Completează formularul de mai jos pentru a solicita un specialist în ${defaultCategoryName}.`;
  };

  // Generate SEO data for the requested service page
  // Priority: pageMainTitle > seoMetadata > defaults
  const seoTitle =
    categoryData?.pageMainTitle?.pageTitle ||
    categoryData?.seoMetadata?.title ||
    `Solicită ${categoryName} - eisservice.ro`;
  const seoDescription =
    categoryData?.pageMainTitle?.pageSubtitle ||
    categoryData?.seoMetadata?.description ||
    `Completează formularul pentru a solicita un specialist în ${categoryName}. Servicii profesionale verificate în România.`;
  const seoUrl =
    categoryData?.seoMetadata?.canonicalUrl ||
    `https://eisservice.ro/solicita-serviciu/${categorySlug}/formular`;
  const seoKeywords = categoryData?.seoMetadata?.keywords?.join(", ") || "";
  const seoImage =
    categoryData?.seoMetadata?.ogImage ||
    categoryImage ||
    "https://eisservice.ro/og-image.jpg";

  // Use structured data from database if available, otherwise generate default
  const structuredData = categoryData?.seoMetadata?.structuredData || {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${categoryName} - Servicii Profesionale`,
    description: seoDescription,
    provider: {
      "@type": "Organization",
      name: "E.I.S. SERVICE COMPLETE S.R.L.",
      url: "https://eisservice.ro",
    },
    areaServed: {
      "@type": "Country",
      name: "Romania",
    },
    url: seoUrl,
  };

  return (
    <>
      <Meta
        title={seoTitle}
        description={seoDescription}
        url={seoUrl}
        image={seoImage}
        keywords={seoKeywords}
        structuredData={structuredData}
      />
      <div className={styles.requestServicePage}>
        <div className={styles.header}>
          <img
            src={categoryImage}
            alt={categoryName}
            className={styles.categoryImage}
          />
          <h1 className={styles.title}>
            {getPageTitle()}{" "}
            <span className={styles.categoryName}>{categoryName}</span>
          </h1>
          <p className={styles.description}>{getPageDescription()}</p>
        </div>

        <ClientServiceRequestForm serviceSubject={categoryName} />
      </div>
    </>
  );
};

export default RequestServicePage;
