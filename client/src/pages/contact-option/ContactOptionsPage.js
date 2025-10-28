import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styles from "./ContactOptionsPage.module.css";
import {
  Mail,
  MessageCircle,
  Clock,
  Shield,
  Star,
  Zap,
  Users,
  Headphones,
} from "lucide-react";
import { contactInfo } from "../../config/contactInfo";
import { useCategory } from "../../context/CategoryContext";
import StatisticsSection from "../../components/layout/Sections/StatisticsSection/StatisticsSection";
import ContactOptionsGrid from "../../components/UI/ContactOptionsGrid/ContactOptionsGrid";
import Meta from "../../components/SEO/Meta";

const ContactOptionsPage = () => {
  const { city, categorySlug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { categoryData, loading, error, fetchCategory, clearSSRData } =
    useCategory();

  // Fetch category data if not available or if category changed
  useEffect(() => {
    // Get categorySlug from URL params or from SSR
    const currentSlug =
      categorySlug ||
      (typeof window !== "undefined" && window.__CATEGORY_SLUG__);

    // If we don't have a category slug and we don't have a city, don't fetch
    if (!city) return;

    // Helper to get slug from category data (handles both old and new structure)
    const getCategorySlug = (data) => {
      return data?.categoryInformation?.slug || data?.slug;
    };

    // Check if we have initial data from SSR first
    if (
      currentSlug &&
      typeof window !== "undefined" &&
      window.__INITIAL_DATA__ &&
      (window.__INITIAL_DATA__.categoryInformation?.slug ||
        window.__INITIAL_DATA__.slug) === currentSlug
    ) {
      // Data is already available from SSR, no need to fetch
      console.log("Using SSR data for category:", currentSlug);
      return;
    }

    // Check if we need to fetch data
    const currentDataSlug = getCategorySlug(categoryData);
    const currentDataCity = categoryData?.city || "";

    const needsFetch =
      !categoryData || // No data at all
      (currentSlug && currentDataSlug !== currentSlug) || // Data is for different category
      currentDataCity !== city || // Data is for different city
      (!loading && !currentDataSlug); // Loading finished but no data

    if (needsFetch && !loading) {
      console.log(
        "Fetching category data for city:",
        city,
        "slug:",
        currentSlug
      );
      fetchCategory(city, currentSlug);
    }
  }, [categorySlug, city, categoryData, fetchCategory, loading]);

  // Cleanup effect to clear SSR data when component unmounts
  useEffect(() => {
    return () => {
      // Clear SSR data when leaving the page to prevent stale data
      clearSSRData();
    };
  }, [clearSSRData]);

  // Debug logging
  useEffect(() => {
    const currentSlug =
      categorySlug ||
      (typeof window !== "undefined" && window.__CATEGORY_SLUG__);
    console.log("ContactOptionsPage - categoryData:", categoryData);
    console.log("ContactOptionsPage - loading:", loading);
    console.log("ContactOptionsPage - error:", error);
    console.log("ContactOptionsPage - categorySlug:", categorySlug);
    console.log("ContactOptionsPage - currentSlug:", currentSlug);
    console.log(
      "ContactOptionsPage - SSR data:",
      typeof window !== "undefined" ? window.__INITIAL_DATA__ : "N/A"
    );
  }, [categoryData, loading, error, categorySlug]);

  const currentSlug =
    categorySlug || (typeof window !== "undefined" && window.__CATEGORY_SLUG__);
  const currentCity = city || "";

  const defaultCategoryName = currentSlug
    ? currentSlug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "Serviciu";

  // Get city name for display
  const getCityName = () => {
    return currentCity
      ? currentCity.charAt(0).toUpperCase() + currentCity.slice(1)
      : "Brașov"; // Default city
  };

  // Helper functions to get category data from nested or flat structure
  const getCategoryDisplayName = () => {
    if (categoryData) {
      return (
        categoryData.categoryInformation?.displayName ||
        categoryData.categoryInformation?.name ||
        categoryData.displayName ||
        categoryData.name
      );
    }
    return defaultCategoryName;
  };

  const getCategoryImage = () => {
    if (categoryData) {
      return (
        categoryData.categoryInformation?.imageUrl ||
        categoryData.imageUrl ||
        categoryData.image
      );
    }
    return null;
  };

  const getCategoryServices = () => {
    return categoryData?.services || [];
  };

  const categoryDisplayName = getCategoryDisplayName();
  const categoryImage = getCategoryImage();

  const handleEmailOption = () => {
    const urlPath = currentSlug
      ? `/solicita-serviciu/${city}/${currentSlug}/formular`
      : `/solicita-serviciu/${city}/formular`;

    navigate(urlPath, {
      state: {
        categoryName: categoryDisplayName,
        categoryImage: categoryImage,
      },
    });
  };

  const handleWhatsAppOption = () => {
    const message = `Salut! Sunt interesat de servicii de ${categoryDisplayName}. Poți să mă ajuți cu mai multe informații?`;
    const whatsappUrl = `https://wa.me/${
      contactInfo.phoneFormatted
    }?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  // Helper to get SEO data from nested or flat structure
  const getCategorySEO = (field) => {
    if (categoryData) {
      return (
        categoryData.seoMetadata?.[field] ||
        categoryData.seo?.[field] ||
        categoryData.categoryInformation?.seoMetadata?.[field]
      );
    }
    return null;
  };

  // Dynamic page data based on category
  // Use pageMainTitle for displayed title, SEO metadata only for meta tags
  const cityName = getCityName();

  const pageData = {
    title:
      categoryData?.pageMainTitle?.pageTitle ||
      getCategorySEO("title") ||
      `${defaultCategoryName} ${cityName} – Servicii Profesionale`,
    description:
      categoryData?.pageMainTitle?.pageSubtitle ||
      getCategorySEO("description") ||
      `Acasa / Solicita-Serviciu / ${defaultCategoryName} ${cityName} - Servicii Profesionale`,
    services:
      getCategoryServices().length > 0
        ? getCategoryServices().map((service) =>
            typeof service === "string"
              ? service
              : service.title || service.name
          )
        : [
            "Servicii profesionale",
            "Calitate garantată",
            "Prețuri competitive",
            "Echipa specializată",
          ],
    contactOptions: [
      {
        id: "form",
        title: "Completează Formularul",
        subtitle: "Trimite-ne detaliile proiectului tău",
        icon: Mail,
        features: [
          { icon: Clock, text: "Răspuns în maxim 24 de ore" },
          { icon: Shield, text: "Specialiști verificați și evaluați" },
          { icon: Star, text: "Oferte personalizate pentru proiectul tău" },
        ],
        buttonText: "Completează Formularul",
        action: handleEmailOption,
      },
      {
        id: "whatsapp",
        title: "Contactează pe WhatsApp",
        subtitle: "Vorbește direct cu echipa noastră",
        icon: MessageCircle,
        features: [
          { icon: Zap, text: "Răspuns imediat în timpul programului" },
          { icon: Users, text: "Comunicare directă cu specialiștii" },
          { icon: Headphones, text: "Suport în timp real" },
        ],
        buttonText: "Deschide WhatsApp",
        action: handleWhatsAppOption,
      },
    ],
  };

  // Determine if we're showing a specific category or all categories for the city
  const isShowingAllCategories = !categorySlug && Array.isArray(categoryData);

  // If we're showing all categories, we need to render a different view
  const categoriesToDisplay = isShowingAllCategories ? categoryData : [];

  // Show loading state only if we don't have any data and we're loading
  if (loading && !categoryData) {
    return (
      <div className={styles.contactOptionsPage}>
        <div className={styles.loadingContainer}>
          <h2>Se încarcă...</h2>
        </div>
      </div>
    );
  }

  // Show error state only if we have an error and no data
  if (error && !categoryData) {
    return (
      <div className={styles.contactOptionsPage}>
        <div className={styles.errorContainer}>
          <h2>Eroare la încărcarea datelor</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // If showing all categories for city, show a category grid
  if (isShowingAllCategories && categoriesToDisplay.length > 0) {
    return (
      <div className={styles.contactOptionsPage}>
        <div className={styles.heroSection}>
          <div className={styles.heroContainer}>
            <h1 className={styles.mainTitle}>
              Categorii disponibile în {getCityName()}
            </h1>
            <div className={styles.mainDescription}>
              <span
                className={styles.breadcrumbLink}
                onClick={() => navigate("/")}
              >
                Acasa
              </span>
              <span className={styles.breadcrumbSeparator}> / </span>
              <span className={styles.breadcrumbCurrent}>
                {getCityName()} - Categorii Servicii
              </span>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {categoriesToDisplay.map((cat) => {
              const categorySlug = cat.categoryInformation?.slug || cat.slug;
              const categoryName =
                cat.categoryInformation?.displayName ||
                cat.displayName ||
                cat.name;
              const categoryImage =
                cat.categoryInformation?.imageUrl || cat.imageUrl || cat.image;

              return (
                <div
                  key={cat._id || categorySlug}
                  onClick={() => navigate(`/${city}/${categorySlug}`)}
                  style={{
                    cursor: "pointer",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.5rem",
                    padding: "1rem",
                    transition: "all 0.3s ease",
                  }}
                >
                  {categoryImage && (
                    <img
                      src={categoryImage}
                      alt={categoryName}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "0.5rem",
                        marginBottom: "1rem",
                      }}
                    />
                  )}
                  <h3 style={{ marginBottom: "0.5rem" }}>{categoryName}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {(() => {
        const seoTitle =
          getCategorySEO("title") ||
          `${defaultCategoryName} ${cityName} – Contactează-ne | Servicii Profesionale`;
        const seoDescription =
          getCategorySEO("description") ||
          `Contactează-ne pentru servicii de ${defaultCategoryName.toLowerCase()} în ${cityName}. Completează formularul sau trimite-ne un mesaj pe WhatsApp. Răspuns rapid și oferte personalizate.`;
        const seoCanonical =
          getCategorySEO("canonicalUrl") ||
          `https://eisservice.ro/${city}${
            currentSlug ? `/${currentSlug}` : ""
          }`;
        const rawKeywords = getCategorySEO("keywords");
        const seoKeywords = Array.isArray(rawKeywords)
          ? rawKeywords.join(", ")
          : typeof rawKeywords === "string"
          ? rawKeywords
          : "";
        const seoImage =
          getCategorySEO("ogImage") ||
          categoryImage ||
          "https://eisservice.ro/og-image.jpg";

        return (
          <Meta
            title={seoTitle}
            description={seoDescription}
            url={seoCanonical}
            image={seoImage}
            keywords={seoKeywords}
            structuredData={{
              "@context": "https://schema.org",
              "@type": "Service",
              name: `${defaultCategoryName} ${cityName}`,
              description: `Servicii profesionale de ${defaultCategoryName.toLowerCase()} în ${cityName}`,
              provider: {
                "@type": "Organization",
                name: "E.I.S. SERVICE COMPLETE S.R.L.",
                url: "https://eisservice.ro",
              },
              areaServed: {
                "@type": "City",
                name: cityName,
                addressCountry: "RO",
              },
              availableChannel: [
                {
                  "@type": "ServiceChannel",
                  serviceUrl: `https://eisservice.ro/solicita-serviciu/${city}/${currentSlug}/formular`,
                  serviceName: "Formular de contact",
                },
                {
                  "@type": "ServiceChannel",
                  serviceUrl: `https://wa.me/${contactInfo.phoneFormatted}`,
                  serviceName: "WhatsApp",
                },
              ],
            }}
          />
        );
      })()}
      <div className={styles.contactOptionsPage}>
        {/* Hero Section with Gradient Title */}
        <div className={styles.heroSection}>
          <div className={styles.heroContainer}>
            <h1 className={styles.mainTitle}>{pageData.title}</h1>
            <div className={styles.mainDescription}>
              <span
                className={styles.breadcrumbLink}
                onClick={() => navigate("/")}
              >
                Acasa
              </span>
              <span className={styles.breadcrumbSeparator}> / </span>
              <span
                className={styles.breadcrumbLink}
                onClick={() => navigate("/solicita-serviciu")}
              >
                Solicita-Serviciu
              </span>
              <span className={styles.breadcrumbSeparator}> / </span>
              <span className={styles.breadcrumbCurrent}>
                {categoryData?.pageMainTitle?.pageSubtitle ||
                  categoryData?.seo?.description ||
                  `${defaultCategoryName} ${cityName} - Servicii Profesionale`}
              </span>
            </div>
          </div>
        </div>

        {/* Professional Services Section */}
        <div className={styles.professionalSection}>
          <div className={styles.professionalContainer}>
            <div className={styles.professionalContent}>
              <div className={styles.professionalText}>
                <h2 className={styles.professionalTitle}>
                  {categoryData?.professionalContent?.title ||
                    `${defaultCategoryName} ${cityName} – Servicii Profesionale`}
                </h2>
                {categoryData?.professionalContent?.paragraphs?.map(
                  (paragraph, index) => (
                    <p key={index} className={styles.professionalParagraph}>
                      {paragraph}
                    </p>
                  )
                ) || (
                  <p className={styles.professionalParagraph}>
                    Servicii profesionale de calitate superioară în {cityName}.
                    Echipa noastră de specialiști oferă soluții complete pentru
                    nevoile tale.
                  </p>
                )}
                <button
                  className={styles.searchButton}
                  onClick={handleEmailOption}
                >
                  CAUTA {defaultCategoryName.toUpperCase()}{" "}
                  {cityName.toUpperCase()}
                </button>
              </div>
              <div className={styles.professionalImage}>
                <img
                  src={
                    categoryData?.image ||
                    "/assets/images/category-images/worker-image.webp"
                  }
                  alt={categoryData?.displayName || defaultCategoryName}
                  className={styles.painterImage}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Section */}
        <div className={styles.whyChooseSection}>
          <div className={styles.whyChooseContainer}>
            <div className={styles.whyChooseText}>
              <h3 className={styles.whyChooseTitle}>
                {categoryData?.whyChooseUs?.title ||
                  `De ce să alegi un ${defaultCategoryName.toLowerCase()} ${cityName} din platforma noastră`}
              </h3>
              {categoryData?.whyChooseUs?.paragraphs?.map(
                (paragraph, index) => (
                  <p key={index} className={styles.whyChooseParagraph}>
                    {paragraph}
                  </p>
                )
              ) || (
                <p className={styles.whyChooseParagraph}>
                  Colaborând cu un {defaultCategoryName.toLowerCase()}{" "}
                  {cityName}
                  din platforma noastră, beneficiezi de siguranța unei lucrări
                  executate corect, la timp și la preț corect.
                </p>
              )}
            </div>
            <div className={styles.whyChooseImage}>
              <img
                src={
                  categoryData?.workingImage ||
                  "/assets/images/category-images/worker-image.webp"
                }
                alt={`${
                  categoryData?.displayName || defaultCategoryName
                } la lucru`}
                className={styles.painterWorkingImage}
              />
            </div>
          </div>
        </div>

        {/* Services Offered Section */}
        <div className={styles.servicesOfferedSection}>
          <div className={styles.servicesOfferedContainer}>
            <h4 className={styles.servicesOfferedTitle}>
              Servicii oferite de{" "}
              {categoryData?.displayName?.toLowerCase() ||
                defaultCategoryName.toLowerCase()}{" "}
              {cityName}
            </h4>
            <p className={styles.servicesOfferedParagraph}>
              {categoryData?.description ||
                `Oferim o gamă completă de servicii profesionale, potrivite pentru locuințe, birouri și spații comerciale. Fiecare lucrare este realizată cu atenție, folosind echipamente profesionale și materiale de calitate.`}
            </p>
          </div>
        </div>

        {/* Services Cards Section */}
        <div className={styles.servicesCardsSection}>
          <div className={styles.servicesCardsContainer}>
            <div className={styles.servicesCardsGrid}>
              {categoryData?.services?.map((service, index) => (
                <div key={index} className={styles.serviceCard}>
                  <h5 className={styles.serviceCardTitle}>{service.title}</h5>
                  <p className={styles.serviceCardParagraph}>
                    {service.description}
                  </p>
                </div>
              )) || (
                <>
                  <div className={styles.serviceCard}>
                    <h5 className={styles.serviceCardTitle}>
                      Servicii profesionale
                    </h5>
                    <p className={styles.serviceCardParagraph}>
                      Oferim servicii de calitate superioară cu echipamente
                      moderne și materiale de calitate.
                    </p>
                  </div>
                  <div className={styles.serviceCard}>
                    <h5 className={styles.serviceCardTitle}>
                      Consultanță gratuită
                    </h5>
                    <p className={styles.serviceCardParagraph}>
                      Oferim consultanță gratuită pentru alegerea soluțiilor
                      potrivite pentru proiectul tău.
                    </p>
                  </div>
                  <div className={styles.serviceCard}>
                    <h5 className={styles.serviceCardTitle}>
                      Garanție și suport
                    </h5>
                    <p className={styles.serviceCardParagraph}>
                      Toate lucrările beneficiază de garanție și suport tehnic
                      după finalizare.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <StatisticsSection
          introText={`Suntem opțiunea perfectă pentru alegerea unui ${defaultCategoryName.toLowerCase()} ${cityName}, cu mii de intervenții reușite și clienți mulțumiți.`}
        />

        {/* Call to Action Section */}
        <div className={styles.callToActionSection}>
          <h6 className={styles.callToActionTitle}>
            Solicită acum un{" "}
            {categoryData?.displayName?.toLowerCase() ||
              defaultCategoryName.toLowerCase()}{" "}
            din {cityName} <br />
            Echipa noastră răspunde rapid solicitărilor, iar specialiștii
            disponibili te pot contacta în cel mai scurt timp.
          </h6>
        </div>

        {/* Contact Options */}
        <ContactOptionsGrid
          options={pageData.contactOptions}
          title="Alege modalitatea de contact"
          description="Începe procesul prin modalitatea care ți se potrivește cel mai bine"
        />
      </div>
    </>
  );
};

export default ContactOptionsPage;
