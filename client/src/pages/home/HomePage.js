import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "./HomePage.module.css";
import HeroSection from "../../components/layout/Sections/HeroSection/HeroSection";
import StepsSection from "../../components/layout/Sections/StepsSection/StepsSection";
import ServicesOverviewSection from "../../components/layout/Sections/ServicesOverviewSection/ServicesOverviewSection";
import StatisticsSection from "../../components/layout/Sections/StatisticsSection/StatisticsSection";
import TestimonialsSection from "../../components/layout/Sections/TestimonialsSection/TestimonialsSection";
import BecomeProviderCard from "../../components/layout/Sections/BecomeProviderCard/BecomeProviderCard";
import CallToActionSection from "../../components/layout/Sections/CallToActionSection/CallToActionSection";

const HomePage = () => {
  const navigate = useNavigate();

  const handleRequestService = () => {
    navigate("/solicita-serviciu");
  };

  const handleBecomeProvider = () => {
    navigate("/devino-prestator");
  };

  const handleNavigateToServices = () => {
    navigate("/servicii");
  };

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  };

  const fadeInLeft = {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  };

  const fadeInRight = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className={styles.homePage}>
      {/* Hero Section */}
      <motion.div initial="initial" animate="animate" variants={fadeInUp}>
        <HeroSection
          onRequestService={handleRequestService}
          onBecomeProvider={handleBecomeProvider}
        />
      </motion.div>

      {/* Steps Section */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInUp}
      >
        <StepsSection />
      </motion.div>

      {/* Services Overview Section */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInLeft}
      >
        <ServicesOverviewSection
          onNavigateToServices={handleNavigateToServices}
        />
      </motion.div>

      {/* Statistics Section */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInRight}
      >
        <StatisticsSection />
      </motion.div>

      {/* Testimonials Section */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInUp}
      >
        <TestimonialsSection />
      </motion.div>

      {/* Horizontal Line Separator */}
      <motion.div
        className={styles.horizontalLine}
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      ></motion.div>

      {/* Become Provider Section */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInLeft}
      >
        <BecomeProviderCard />
      </motion.div>

      {/* Call to Action Section */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInRight}
      >
        <CallToActionSection />
      </motion.div>
    </div>
  );
};

export default HomePage;
