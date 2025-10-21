import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import WorkersImage from "../../../../assets/images/eis-team-images/workers-home-image.webp";
import styles from "./HeroSection.module.css";

const HeroSection = ({ onRequestService, onBecomeProvider }) => {
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

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContainer}>
        <motion.h1
          className={styles.heroMainTitle}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Prestări servicii în toată țara
        </motion.h1>
        <motion.div
          className={styles.heroContent}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className={styles.heroText}>
            <motion.h1 className={styles.heroTitle} variants={itemVariants}>
              Găsește{" "}
              <span className={styles.highlight}>specialiștii potriviți</span>{" "}
              pentru orice serviciu
            </motion.h1>
            <motion.p
              className={styles.heroDescription}
              variants={itemVariants}
            >
              Conectăm clienții cu profesioniști verificați din toată România.
              Simplu, rapid și sigur.
            </motion.p>
            <motion.div className={styles.heroButtons} variants={itemVariants}>
              <motion.button
                onClick={onRequestService}
                className={styles.primaryButton}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                Caut un specialist
                <ArrowRight size={20} />
              </motion.button>
              <motion.button
                onClick={onBecomeProvider}
                className={styles.secondaryButton}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                Sunt specialist
              </motion.button>
            </motion.div>

            {/* Trust Signals as clickable badges */}
            <motion.div className={styles.trustSignals} variants={itemVariants}>
              <motion.button
                className={styles.trustBadge}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <CheckCircle size={16} />
                <span>Profesioniști verificați</span>
              </motion.button>
              <motion.button
                className={styles.trustBadge}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <CheckCircle size={16} />
                <span>Răspuns în 24h</span>
              </motion.button>
              <motion.button
                className={styles.trustBadge}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <CheckCircle size={16} />
                <span>În toată țara</span>
              </motion.button>
              <motion.button
                className={styles.trustBadge}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <CheckCircle size={16} />
                <span>Suport complet</span>
              </motion.button>
            </motion.div>
          </motion.div>
          <motion.div className={styles.heroImage} variants={imageVariants}>
            <img
              src={WorkersImage || "/placeholder.svg"}
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
