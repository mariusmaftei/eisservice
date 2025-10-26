import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import WorkersImage from "../../../../assets/images/eis-team-images/workers-home-image.webp";
import Button from "../../../UI/Button/Button";
import TrustBadge from "../../../UI/TrustBadge/TrustBadge";
import styles from "./HeroSection.module.css";

const HeroSection = ({
  onRequestService,
  onBecomeProvider,
  // New props for different page content
  badgeText,
  title,
  highlightText,
  description,
  imageSrc,
  popularServicesSection,
  className,
}) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // Default content for home page
  const defaultContent = {
    badgeText: "Prestări servicii în toată țara",
    title: "Găsește specialiștii potriviți pentru orice serviciu",
    highlightText: "specialiștii potriviți",
    description:
      "Conectăm clienții cu profesioniști verificați din toată România. Simplu, rapid și sigur.",
    imageSrc: WorkersImage,
    showButtons: true,
    showTrustSignals: true,
  };

  // Use provided props or fallback to defaults
  const content = {
    badgeText: badgeText || defaultContent.badgeText,
    title: title || defaultContent.title,
    highlightText: highlightText || defaultContent.highlightText,
    description: description || defaultContent.description,
    imageSrc: imageSrc || defaultContent.imageSrc,
    showButtons: onRequestService && onBecomeProvider,
    showTrustSignals: !popularServicesSection,
  };

  return (
    <section className={`${styles.heroSection} ${className || ""}`}>
      <div className={styles.heroContainer}>
        <motion.h1
          className={styles.heroMainTitle}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {content.badgeText}
        </motion.h1>
        <motion.div
          className={styles.heroContent}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className={styles.heroText}>
            <motion.h1 className={styles.heroTitle} variants={itemVariants}>
              {content.title.includes(content.highlightText)
                ? content.title
                    .split(content.highlightText)
                    .map((part, index, array) => (
                      <span key={index}>
                        {part}
                        {index < array.length - 1 && (
                          <span className={styles.highlight}>
                            {content.highlightText}
                          </span>
                        )}
                      </span>
                    ))
                : content.title}
            </motion.h1>
            <motion.p
              className={styles.heroDescription}
              variants={itemVariants}
            >
              {content.description}
            </motion.p>

            {content.showButtons && (
              <motion.div
                className={styles.heroButtons}
                variants={itemVariants}
              >
                <Button
                  variant="primary"
                  size="medium"
                  onClick={onRequestService}
                  icon={<ArrowRight size={20} />}
                  iconPosition="right"
                >
                  Caut un specialist
                </Button>
                <Button
                  variant="secondary"
                  size="medium"
                  onClick={onBecomeProvider}
                >
                  Sunt specialist
                </Button>
              </motion.div>
            )}

            {/* Trust Signals as clickable badges - only show on home page */}
            {content.showTrustSignals && (
              <motion.div
                className={styles.trustSignals}
                variants={itemVariants}
              >
                <TrustBadge text="Profesioniști verificați" />
                <TrustBadge text="Răspuns în 24h" />
                <TrustBadge text="În toată țara" />
                <TrustBadge text="Suport complet" />
              </motion.div>
            )}

            {/* Popular Services Section - for other pages */}
            {popularServicesSection && (
              <motion.div
                className={styles.popularServicesSection}
                variants={itemVariants}
              >
                <h3 className={styles.popularServicesTitle}>
                  {popularServicesSection.title}
                </h3>
                <div className={styles.popularServicesIcons}>
                  {popularServicesSection.icons.map((service, index) => (
                    <div
                      key={index}
                      className={`${styles.popularServiceItem} ${
                        typeof service.icon === "string"
                          ? ""
                          : service.isCard
                          ? styles.outlinedCardItem
                          : styles.trustBadgeItem
                      }`}
                    >
                      {typeof service.icon === "string" ? (
                        <>
                          <img
                            src={service.icon}
                            alt={service.text}
                            className={styles.popularServiceIcon}
                          />
                          <span className={styles.popularServiceText}>
                            {service.text}
                          </span>
                        </>
                      ) : (
                        <>
                          {service.icon}
                          {service.text && (
                            <span className={styles.popularServiceText}>
                              {service.text}
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
          <motion.div className={styles.heroImage} variants={imageVariants}>
            <img
              src={content.imageSrc || "/placeholder.svg"}
              alt="Echipa de specialiști"
              className={styles.heroImg}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
