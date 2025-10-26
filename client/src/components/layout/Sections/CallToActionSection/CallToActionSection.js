import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Mail, MessageCircle, ArrowRight } from "lucide-react";
import styles from "./CallToActionSection.module.css";
import RomaniaMapImage from "../../../../assets/images/background-images/romania-map.png";
import { contactInfo } from "../../../../config/contactInfo";

export default function CallToActionSection() {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section className={styles.callToActionSection}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div className={styles.textContent}>
            <motion.div className={styles.badge} variants={itemVariants}>
              <MessageCircle size={16} />
              CONTACTEAZĂ-NE
            </motion.div>

            <motion.h2 className={styles.title} variants={itemVariants}>
              Conectăm Nevoile cu Soluțiile Perfecte!
            </motion.h2>

            <motion.p className={styles.description} variants={itemVariants}>
              De la clienți căutând servicii de calitate la profesioniști
              doritori să-și dezvolte afacerea - suntem puntea care unește
              dorințele cu realizarea. Fie că ai nevoie de un serviciu sau vrei
              să oferi unul, echipa noastră te ghidează către succes.
            </motion.p>

            <motion.div
              className={styles.contactOptions}
              variants={itemVariants}
            >
              <motion.div
                className={styles.contactOption}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className={styles.contactIcon}>
                  <Phone size={20} />
                </div>
                <div className={styles.contactInfo}>
                  <h3>Sună-ne</h3>
                  <p>Discută direct cu un specialist</p>
                  <span className={styles.contactValue}>
                    {contactInfo.phone}
                  </span>
                </div>
              </motion.div>

              <motion.div
                className={styles.contactOption}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className={styles.contactIcon}>
                  <Mail size={20} />
                </div>
                <div className={styles.contactInfo}>
                  <h3>Trimite email</h3>
                  <p>Scrie-ne pentru detalii</p>
                  <span className={styles.contactValue}>
                    {contactInfo.contactEmail}
                  </span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className={styles.actionButtons}
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/contact" className={styles.primaryButton}>
                  Contactează-ne acum
                  <ArrowRight size={18} />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/solicita-serviciu"
                  className={styles.secondaryButton}
                >
                  Solicită serviciu
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div className={styles.visualContent}>
            <motion.div
              className={styles.romaniaMapContainer}
              variants={itemVariants}
            >
              <img
                src={RomaniaMapImage}
                alt="Romania Map"
                className={styles.romaniaMap}
              />
              <motion.div
                className={styles.mapTextOverlay}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.8,
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <div className={styles.mapTopText}>E.I.S. Service</div>
                <div className={styles.mapBottomText}>
                  Servicii de calitate în toată țara
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
