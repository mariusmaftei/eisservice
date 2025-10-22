import { useParams, useLocation, useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
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

  // Refs for scroll-triggered animations
  const professionalRef = useRef(null);
  const whyChooseRef = useRef(null);
  const servicesRef = useRef(null);
  const contactOptionsRef = useRef(null);

  const professionalInView = useInView(professionalRef, {
    once: true,
    margin: "-100px",
  });
  const whyChooseInView = useInView(whyChooseRef, {
    once: true,
    margin: "-100px",
  });
  const servicesInView = useInView(servicesRef, {
    once: true,
    margin: "-100px",
  });
  const contactOptionsInView = useInView(contactOptionsRef, {
    once: true,
    margin: "-100px",
  });

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const staggerItem = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" },
  };

  const slideInLeft = {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const slideInRight = {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const scaleIn = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: "easeOut" },
  };

  const cardHover = {
    hover: {
      scale: 1.05,
      y: -5,
      transition: { duration: 0.2, ease: "easeInOut" },
    },
    tap: { scale: 0.95 },
  };

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
    <div className={styles.contactOptionsPage}>
      {/* Hero Section with Gradient Title */}
      <motion.div
        className={styles.heroSection}
        initial="initial"
        animate="animate"
        variants={fadeInUp}
      >
        <motion.h1
          className={styles.mainTitle}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {pageData.title}
        </motion.h1>
        <motion.p
          className={styles.mainDescription}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {pageData.description}
        </motion.p>
      </motion.div>

      {/* Professional Services Section */}
      <motion.div className={styles.professionalSection} ref={professionalRef}>
        <div className={styles.professionalContainer}>
          <div className={styles.professionalContent}>
            <motion.div
              className={styles.professionalText}
              initial="initial"
              animate={professionalInView ? "animate" : "initial"}
              variants={slideInLeft}
            >
              <motion.h2
                className={styles.professionalTitle}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  professionalInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {categoryData?.professionalContent?.title ||
                  `${defaultCategoryName} Brașov – Servicii Profesionale`}
              </motion.h2>
              {categoryData?.professionalContent?.paragraphs?.map(
                (paragraph, index) => (
                  <motion.p
                    key={index}
                    className={styles.professionalParagraph}
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      professionalInView
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 20 }
                    }
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.2 }}
                  >
                    {paragraph}
                  </motion.p>
                )
              ) || (
                <motion.p
                  className={styles.professionalParagraph}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    professionalInView
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Servicii profesionale de calitate superioară în Brașov. Echipa
                  noastră de specialiști oferă soluții complete pentru nevoile
                  tale.
                </motion.p>
              )}
              <motion.button
                className={styles.searchButton}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  professionalInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{ duration: 0.5, delay: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                CAUTA {defaultCategoryName.toUpperCase()} BRASOV
              </motion.button>
            </motion.div>
            <motion.div
              className={styles.professionalImage}
              initial="initial"
              animate={professionalInView ? "animate" : "initial"}
              variants={slideInRight}
            >
              <motion.img
                src={
                  categoryData?.image ||
                  "/assets/images/category-images/worker-image.webp"
                }
                alt={categoryData?.displayName || defaultCategoryName}
                className={styles.painterImage}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  professionalInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Why Choose Section */}
      <motion.div className={styles.whyChooseSection} ref={whyChooseRef}>
        <div className={styles.whyChooseContainer}>
          <motion.div
            className={styles.whyChooseText}
            initial="initial"
            animate={whyChooseInView ? "animate" : "initial"}
            variants={slideInRight}
          >
            <motion.h3
              className={styles.whyChooseTitle}
              initial={{ opacity: 0, y: 30 }}
              animate={
                whyChooseInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {categoryData?.whyChooseUs?.title ||
                `De ce să alegi un ${defaultCategoryName.toLowerCase()} Brașov din platforma noastră`}
            </motion.h3>
            {categoryData?.whyChooseUs?.paragraphs?.map((paragraph, index) => (
              <motion.p
                key={index}
                className={styles.whyChooseParagraph}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  whyChooseInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.4 + index * 0.2 }}
              >
                {paragraph}
              </motion.p>
            )) || (
              <motion.p
                className={styles.whyChooseParagraph}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  whyChooseInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Colaborând cu un {defaultCategoryName.toLowerCase()} Brașov din
                platforma noastră, beneficiezi de siguranța unei lucrări
                executate corect, la timp și la preț corect.
              </motion.p>
            )}
          </motion.div>
          <motion.div
            className={styles.whyChooseImage}
            initial="initial"
            animate={whyChooseInView ? "animate" : "initial"}
            variants={slideInLeft}
          >
            <motion.img
              src={
                categoryData?.workingImage ||
                "/assets/images/category-images/worker-image.webp"
              }
              alt={`${
                categoryData?.displayName || defaultCategoryName
              } la lucru`}
              className={styles.painterWorkingImage}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                whyChooseInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.8 }
              }
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Services Offered Section */}
      <motion.div className={styles.servicesOfferedSection} ref={servicesRef}>
        <div className={styles.servicesOfferedContainer}>
          <motion.h4
            className={styles.servicesOfferedTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={
              servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Servicii oferite de{" "}
            {categoryData?.displayName?.toLowerCase() ||
              defaultCategoryName.toLowerCase()}{" "}
            Brașov
          </motion.h4>
          <motion.p
            className={styles.servicesOfferedParagraph}
            initial={{ opacity: 0, y: 20 }}
            animate={
              servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {categoryData?.description ||
              `Oferim o gamă completă de servicii profesionale, potrivite pentru locuințe, birouri și spații comerciale. Fiecare lucrare este realizată cu atenție, folosind echipamente profesionale și materiale de calitate.`}
          </motion.p>
        </div>
      </motion.div>

      {/* Services Cards Section */}
      <motion.div
        className={styles.servicesCardsSection}
        initial="initial"
        animate={servicesInView ? "animate" : "initial"}
        variants={staggerContainer}
      >
        <div className={styles.servicesCardsContainer}>
          <motion.div
            className={styles.servicesCardsGrid}
            variants={staggerContainer}
          >
            {categoryData?.services?.map((service, index) => (
              <motion.div
                key={index}
                className={styles.serviceCard}
                variants={staggerItem}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <h5 className={styles.serviceCardTitle}>{service.title}</h5>
                <p className={styles.serviceCardParagraph}>
                  {service.description}
                </p>
              </motion.div>
            )) || (
              <>
                <motion.div
                  className={styles.serviceCard}
                  variants={staggerItem}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <h5 className={styles.serviceCardTitle}>
                    Servicii profesionale
                  </h5>
                  <p className={styles.serviceCardParagraph}>
                    Oferim servicii de calitate superioară cu echipamente
                    moderne și materiale de calitate.
                  </p>
                </motion.div>
                <motion.div
                  className={styles.serviceCard}
                  variants={staggerItem}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <h5 className={styles.serviceCardTitle}>
                    Consultanță gratuită
                  </h5>
                  <p className={styles.serviceCardParagraph}>
                    Oferim consultanță gratuită pentru alegerea soluțiilor
                    potrivite pentru proiectul tău.
                  </p>
                </motion.div>
                <motion.div
                  className={styles.serviceCard}
                  variants={staggerItem}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <h5 className={styles.serviceCardTitle}>
                    Garanție și suport
                  </h5>
                  <p className={styles.serviceCardParagraph}>
                    Toate lucrările beneficiază de garanție și suport tehnic
                    după finalizare.
                  </p>
                </motion.div>
              </>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Statistics Section */}
      <StatisticsSection />

      {/* Call to Action Section */}
      <motion.div
        className={styles.callToActionSection}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.h6
          className={styles.callToActionTitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Solicită acum un{" "}
          {categoryData?.displayName?.toLowerCase() ||
            defaultCategoryName.toLowerCase()}{" "}
          Brașov <br />
          Echipa noastră răspunde rapid solicitărilor, iar specialiștii
          disponibili te pot contacta în cel mai scurt timp.
        </motion.h6>
      </motion.div>

      {/* Contact Options */}
      <motion.div className={styles.optionsContainer} ref={contactOptionsRef}>
        <motion.div
          className={styles.optionsGrid}
          initial="initial"
          animate={contactOptionsInView ? "animate" : "initial"}
          variants={staggerContainer}
        >
          {pageData.contactOptions.map((option, index) => {
            const IconComponent = option.icon;
            return (
              <motion.div
                key={option.id}
                className={styles.optionCard}
                onClick={option.action}
                variants={staggerItem}
                whileHover="hover"
                whileTap="tap"
                custom={index}
              >
                <motion.div className={styles.cardHeader} variants={cardHover}>
                  <motion.div
                    className={styles.iconWrapper}
                    initial={{ scale: 0 }}
                    animate={contactOptionsInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                  >
                    <IconComponent size={32} className={styles.cardIcon} />
                  </motion.div>
                  <h2 className={styles.cardTitle}>{option.title}</h2>
                  <p className={styles.cardSubtitle}>{option.subtitle}</p>
                </motion.div>

                <div className={styles.cardContent}>
                  <ul className={styles.featureList}>
                    {option.features.map((feature, featureIndex) => {
                      const FeatureIcon = feature.icon;
                      return (
                        <motion.li
                          key={featureIndex}
                          className={styles.featureItem}
                          initial={{ opacity: 0, x: -20 }}
                          animate={
                            contactOptionsInView
                              ? { opacity: 1, x: 0 }
                              : { opacity: 0, x: -20 }
                          }
                          transition={{
                            duration: 0.3,
                            delay: 0.4 + index * 0.1 + featureIndex * 0.1,
                          }}
                        >
                          <FeatureIcon size={16} />
                          <span>{feature.text}</span>
                        </motion.li>
                      );
                    })}
                  </ul>
                </div>

                <div className={styles.cardFooter}>
                  <motion.button
                    className={styles.actionButton}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={
                      contactOptionsInView
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.8 }
                    }
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {option.buttonText}
                    <IconComponent size={16} className={styles.buttonIcon} />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactOptionsPage;
