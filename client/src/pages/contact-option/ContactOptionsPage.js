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
import Meta from "../../components/SEO/Meta";

const ContactOptionsPage = () => {
  const { categorySlug } = useParams();
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

    if (!currentSlug) return;

    // Check if we have initial data from SSR first
    if (
      typeof window !== "undefined" &&
      window.__INITIAL_DATA__ &&
      window.__INITIAL_DATA__.slug === currentSlug
    ) {
      // Data is already available from SSR, no need to fetch
      console.log("Using SSR data for category:", currentSlug);
      return;
    }

    // Check if we need to fetch data
    const needsFetch =
      !categoryData || // No data at all
      categoryData.slug !== currentSlug || // Data is for different category
      (!loading && !categoryData.slug); // Loading finished but no data

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
  const defaultCategoryName = currentSlug
    ? currentSlug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "Serviciu";

  const handleEmailOption = () => {
    navigate(`/solicita-serviciu/${currentSlug}/formular`, {
      state: {
        categoryName: categoryData?.displayName || defaultCategoryName,
        categoryImage: categoryData?.image,
      },
    });
  };

  const handleWhatsAppOption = () => {
    const message = `Salut! Sunt interesat de servicii de ${
      categoryData?.displayName || defaultCategoryName
    }. Poți să mă ajuți cu mai multe informații?`;
    const whatsappUrl = `https://wa.me/${
      contactInfo.phoneFormatted
    }?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  // Dynamic page data based on category
  const pageData = {
    title:
      categoryData?.seo?.title ||
      `${defaultCategoryName} Brașov – Servicii Profesionale`,
    description:
      categoryData?.seo?.description ||
      `Acasa / ${defaultCategoryName} Brașov - Servicii Profesionale`,
    services: categoryData?.services || [
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

  return (
    <>
      <Meta
        title={
          categoryData?.seo?.title ||
          `${defaultCategoryName} Brașov – Contactează-ne | Servicii Profesionale`
        }
        description={
          categoryData?.seo?.description ||
          `Contactează-ne pentru servicii de ${defaultCategoryName.toLowerCase()} în Brașov. Completează formularul sau trimite-ne un mesaj pe WhatsApp. Răspuns rapid și oferte personalizate.`
        }
        url={`https://eisservice.ro/solicita-serviciu/${currentSlug}`}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: `${defaultCategoryName} Brașov`,
          description: `Servicii profesionale de ${defaultCategoryName.toLowerCase()} în Brașov`,
          provider: {
            "@type": "Organization",
            name: "E.I.S. SERVICE COMPLETE S.R.L.",
            url: "https://eisservice.ro",
          },
          areaServed: {
            "@type": "City",
            name: "Brașov",
            addressCountry: "RO",
          },
          availableChannel: [
            {
              "@type": "ServiceChannel",
              serviceUrl: `https://eisservice.ro/solicita-serviciu/${currentSlug}/formular`,
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
      <div className={styles.contactOptionsPage}>
        {/* Hero Section with Gradient Title */}
        <div className={styles.heroSection}>
          <h1 className={styles.mainTitle}>{pageData.title}</h1>
          <p className={styles.mainDescription}>{pageData.description}</p>
        </div>

        {/* Professional Services Section */}
        <div className={styles.professionalSection}>
          <div className={styles.professionalContainer}>
            <div className={styles.professionalContent}>
              <div className={styles.professionalText}>
                <h2 className={styles.professionalTitle}>
                  {categoryData?.professionalContent?.title ||
                    `${defaultCategoryName} Brașov – Servicii Profesionale`}
                </h2>
                {categoryData?.professionalContent?.paragraphs?.map(
                  (paragraph, index) => (
                    <p key={index} className={styles.professionalParagraph}>
                      {paragraph}
                    </p>
                  )
                ) || (
                  <p className={styles.professionalParagraph}>
                    Servicii profesionale de calitate superioară în Brașov.
                    Echipa noastră de specialiști oferă soluții complete pentru
                    nevoile tale.
                  </p>
                )}
                <button className={styles.searchButton}>
                  CAUTA {defaultCategoryName.toUpperCase()} BRASOV
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
                  `De ce să alegi un ${defaultCategoryName.toLowerCase()} Brașov din platforma noastră`}
              </h3>
              {categoryData?.whyChooseUs?.paragraphs?.map(
                (paragraph, index) => (
                  <p key={index} className={styles.whyChooseParagraph}>
                    {paragraph}
                  </p>
                )
              ) || (
                <p className={styles.whyChooseParagraph}>
                  Colaborând cu un {defaultCategoryName.toLowerCase()} Brașov
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
              Brașov
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
        <StatisticsSection />

        {/* Call to Action Section */}
        <div className={styles.callToActionSection}>
          <h6 className={styles.callToActionTitle}>
            Solicită acum un{" "}
            {categoryData?.displayName?.toLowerCase() ||
              defaultCategoryName.toLowerCase()}{" "}
            Brașov <br />
            Echipa noastră răspunde rapid solicitărilor, iar specialiștii
            disponibili te pot contacta în cel mai scurt timp.
          </h6>
        </div>

        {/* Contact Options */}
        <div className={styles.optionsContainer}>
          <div className={styles.optionsGrid}>
            {pageData.contactOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <div
                  key={option.id}
                  className={styles.optionCard}
                  onClick={option.action}
                >
                  <div className={styles.cardHeader}>
                    <div className={styles.iconWrapper}>
                      <IconComponent size={32} className={styles.cardIcon} />
                    </div>
                    <h2 className={styles.cardTitle}>{option.title}</h2>
                    <p className={styles.cardSubtitle}>{option.subtitle}</p>
                  </div>

                  <div className={styles.cardContent}>
                    <ul className={styles.featureList}>
                      {option.features.map((feature, featureIndex) => {
                        const FeatureIcon = feature.icon;
                        return (
                          <li key={featureIndex} className={styles.featureItem}>
                            <FeatureIcon size={16} />
                            <span>{feature.text}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className={styles.cardFooter}>
                    <button className={styles.actionButton}>
                      {option.buttonText}
                      <IconComponent size={16} className={styles.buttonIcon} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactOptionsPage;
