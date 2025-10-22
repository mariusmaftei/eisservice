import { useParams, useLocation, useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
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
import painterImage from "../../assets/images/category-images/Zugrav Brașov – Servicii Profesionale.png";
import painterWorkingImage from "../../assets/images/category-images/Zugrav Brașov vopsind un perete alb într-un apartament modern.png";
import StatisticsSection from "../../components/layout/Sections/StatisticsSection/StatisticsSection";

const ContactOptionsPage = () => {
  const { categorySlug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { categoryName, categoryImage } = location.state || {};

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

  const defaultCategoryName = categorySlug
    ? categorySlug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "Serviciu";

  const handleEmailOption = () => {
    navigate(`/solicita-serviciu/${categorySlug}/formular`, {
      state: {
        categoryName: categoryName || defaultCategoryName,
        categoryImage,
      },
    });
  };

  const handleWhatsAppOption = () => {
    const message = `Salut! Sunt interesat de servicii de ${
      categoryName || defaultCategoryName
    }. Poți să mă ajuți cu mai multe informații?`;
    const whatsappUrl = `https://wa.me/${
      contactInfo.phoneFormatted
    }?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  // Dummy data for dynamic content
  const pageData = {
    title: "Zugrav Brasov – Servicii Profesionale de Vopsitorie",
    description: "Acasa / Zugrav Brasov - Servicii Profesionale de Vopsitorie",
    services: [
      "Vopsitorie interioară și exterioară",
      "Renovare completă",
      "Consultanță în alegerea culorilor",
      "Materiale de calitate superioară",
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
                Zugrav Brașov – Servicii Profesionale de Vopsitorie, Finisaje
                Interioare și Renovări Complete
              </motion.h2>
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
                Cauți un zugrav Brasov profesionist care să îți transforme casa,
                biroul sau apartamentul? Echipa noastră de zugravi autorizați
                oferă servicii complete de vopsitorie și finisaje interioare, cu
                atenție la detalii, respectarea termenelor și rezultate
                impecabile.
              </motion.p>
              <motion.p
                className={styles.professionalParagraph}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  professionalInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                Indiferent dacă dorești o simplă reîmprospătare a culorilor sau
                o renovare completă, zugravii noștri folosesc materiale de
                calitate superioară și tehnici moderne pentru o aplicare
                uniformă, curată și durabilă. Ne ocupăm de tot procesul – de la
                pregătirea pereților până la aplicarea finală a vopselei –
                astfel încât spațiul tău să arate perfect, fără stres sau
                mizerie.
              </motion.p>
              <motion.p
                className={styles.professionalParagraph}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  professionalInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                Înainte de începerea lucrării, oferim consultanță gratuită
                pentru alegerea culorilor, tipului de vopsea și finisajului
                potrivit fiecărei camere. Lucrăm curat, protejăm mobilierul și
                pardoseala, iar la final curățăm totul, lăsând locuința
                impecabilă.
              </motion.p>
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
                CAUTA ZUGRAV BRASOV
              </motion.button>
            </motion.div>
            <motion.div
              className={styles.professionalImage}
              initial="initial"
              animate={professionalInView ? "animate" : "initial"}
              variants={slideInRight}
            >
              <motion.img
                src={painterImage}
                alt="Zugrav Brașov – Servicii Profesionale"
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
              De ce să alegi un instalator Brașov din platforma noastră
            </motion.h3>
            <motion.p
              className={styles.whyChooseParagraph}
              initial={{ opacity: 0, y: 20 }}
              animate={
                whyChooseInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Colaborând cu un zugrav Brașov din platforma noastră, beneficiezi
              de siguranța unei lucrări executate corect, la timp și la preț
              corect. Toți zugravii înscriși sunt profesioniști verificați, cu
              experiență reală și recomandări de la clienți anteriori.
            </motion.p>
            <motion.p
              className={styles.whyChooseParagraph}
              initial={{ opacity: 0, y: 20 }}
              animate={
                whyChooseInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Platforma noastră îți oferă transparență și confort pe tot
              parcursul proiectului. Poți solicita oferte rapid, comunica direct
              cu zugravul și urmări progresul lucrării, astfel încât renovarea
              sau vopsirea locuinței tale să fie fără stres și cu rezultate
              impecabile.
            </motion.p>
            <motion.p
              className={styles.whyChooseParagraph}
              initial={{ opacity: 0, y: 20 }}
              animate={
                whyChooseInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              Alegând platforma noastră, economisești timp și eviți riscul de a
              colabora cu persoane necalificate. Fiecare zugrav are un profil
              complet, cu poze din lucrări, prețuri orientative și recenzii de
              la clienți reali din Brașov.
            </motion.p>
          </motion.div>
          <motion.div
            className={styles.whyChooseImage}
            initial="initial"
            animate={whyChooseInView ? "animate" : "initial"}
            variants={slideInLeft}
          >
            <motion.img
              src={painterWorkingImage}
              alt="Zugrav Brașov vopsind un perete alb într-un apartament modern"
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
            Servicii oferite de zugravi Brasov
          </motion.h4>
          <motion.p
            className={styles.servicesOfferedParagraph}
            initial={{ opacity: 0, y: 20 }}
            animate={
              servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Oferim o gamă completă de servicii de zugrăvit și finisaje
            interioare, potrivite pentru locuințe, birouri și spații comerciale.
            Fiecare lucrare este realizată cu atenție, folosind scule
            profesionale și materiale potrivite fiecărui tip de suprafață.
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
            <motion.div
              className={styles.serviceCard}
              variants={staggerItem}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <h5 className={styles.serviceCardTitle}>
                Zugrăvit pereți și tavane
              </h5>
              <p className={styles.serviceCardParagraph}>
                Aplicații de vopsea lavabilă mată sau satinată, culori uniforme,
                fără urme sau diferențe de nuanță. Lucrăm cu vopsele premium
                pentru rezultate durabile și un aspect modern.
              </p>
            </motion.div>
            <motion.div
              className={styles.serviceCard}
              variants={staggerItem}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <h5 className={styles.serviceCardTitle}>
                Reparații și pregătire pereți
              </h5>
              <p className={styles.serviceCardParagraph}>
                Decapare, gletuire, șlefuire și amorsare profesională înainte de
                zugrăvit, pentru o aderență perfectă. Verificăm planeitatea și
                integritatea suprafeței pentru a preveni fisurile.
              </p>
            </motion.div>
            <motion.div
              className={styles.serviceCard}
              variants={staggerItem}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <h5 className={styles.serviceCardTitle}>Zugrăveli decorative</h5>
              <p className={styles.serviceCardParagraph}>
                Realizăm efecte decorative moderne (stucco, sablat, beton
                aparent, vopsea texturată, tapet decorativ) pentru un design
                unic și elegant. Recomandăm finisaje personalizate pentru camere
                de zi, dormitoare sau birouri.
              </p>
            </motion.div>
            <motion.div
              className={styles.serviceCard}
              variants={staggerItem}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <h5 className={styles.serviceCardTitle}>
                Vopsitorie uși, tâmplărie și elemente din lemn
              </h5>
              <p className={styles.serviceCardParagraph}>
                Folosim lacuri și vopsele ecologice, rezistente la zgârieturi și
                umezeală, pentru uși, tocuri, scări și mobilier din lemn masiv.
              </p>
            </motion.div>
            <motion.div
              className={styles.serviceCard}
              variants={staggerItem}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <h5 className={styles.serviceCardTitle}>
                Zugrăvit fațade și spații exterioare
              </h5>
              <p className={styles.serviceCardParagraph}>
                Aplicații rezistente la intemperii, protejând clădirea de
                umezeală, raze UV și variații de temperatură. Folosim vopsele
                lavabile exterioare și pigmenți de lungă durată.
              </p>
            </motion.div>
            <motion.div
              className={styles.serviceCard}
              variants={staggerItem}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <h5 className={styles.serviceCardTitle}>
                Finisaje premium pentru spații comerciale
              </h5>
              <p className={styles.serviceCardParagraph}>
                Zugrăvim birouri, restaurante, hoteluri și magazine, respectând
                cerințele de design și termenele stricte. Folosim vopsele
                lavabile rezistente la trafic intens și murdărie.
              </p>
            </motion.div>
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
          Solicită acum un zugrav brasov <br />
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
