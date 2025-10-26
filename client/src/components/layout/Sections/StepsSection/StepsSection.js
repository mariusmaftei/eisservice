import styles from "./StepsSection.module.css";
import {
  FaPhone,
  FaFileContract,
  FaHardHat,
  FaArrowRight,
} from "react-icons/fa";
import { motion } from "framer-motion";

const StepsSection = () => {
  // Optimized animation variants for better performance
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

  const stepVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic-bezier for smoother animation
      },
    },
  };

  const arrowVariants = {
    hidden: {
      opacity: 0,
      x: -15,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section className={styles.stepsSection}>
      <div className={styles.stepsSectionWrapper}>
        <div className={styles.stepsContainer}>
          <motion.h2
            className={styles.stepsTitle}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Cum funcționează
          </motion.h2>
          <motion.p
            className={styles.stepsSubtitle}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.05 }}
            viewport={{ once: true }}
          >
            Trei pași simpli pentru a găsi specialistul potrivit
          </motion.p>
          <motion.div
            className={styles.stepsGrid}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className={styles.step} variants={stepVariants}>
              <div className={styles.stepIcon}>
                <FaPhone />
              </div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Solicită serviciul</h3>
                <p className={styles.stepDescription}>
                  Completează formularul cu detaliile serviciului de care ai
                  nevoie
                </p>
              </div>
            </motion.div>

            <motion.div
              className={styles.stepIndicator}
              variants={arrowVariants}
            >
              <FaArrowRight className={styles.arrowIcon} />
            </motion.div>

            <motion.div className={styles.step} variants={stepVariants}>
              <div className={styles.stepIcon}>
                <FaFileContract />
              </div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Primești oferte</h3>
                <p className={styles.stepDescription}>
                  Specialiștii verificați îți trimit oferte personalizate în 24h
                </p>
              </div>
            </motion.div>

            <motion.div
              className={styles.stepIndicator}
              variants={arrowVariants}
            >
              <FaArrowRight className={styles.arrowIcon} />
            </motion.div>

            <motion.div className={styles.step} variants={stepVariants}>
              <div className={styles.stepIcon}>
                <FaHardHat />
              </div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Alege și rezolvă</h3>
                <p className={styles.stepDescription}>
                  Selectează oferta potrivită și rezolvă rapid problema ta
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
