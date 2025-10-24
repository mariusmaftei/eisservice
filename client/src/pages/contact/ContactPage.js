import { motion } from "framer-motion";
import styles from "./ContactPage.module.css";
import Meta from "../../components/SEO/Meta";
import {
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Users,
  Send,
  CheckCircle,
  Star,
  Award,
} from "lucide-react";

const ContactPage = () => {
  const email = "contact@eisservice.ro";
  const phone = "0735 520 990";
  const whatsappLink = `https://wa.me/+40735520990`;

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

  const contactMethods = [
    {
      icon: Phone,
      title: "Sună-ne Acum",
      description: "Pentru consultanță rapidă și răspunsuri la întrebări",
      value: phone,
      link: `tel:${phone}`,
      color: "#174bdd",
      priority: "high",
      responseTime: "Imediat",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: "Mesaj rapid cu poze și detalii despre serviciul dorit",
      value: "Trimite mesaj",
      link: whatsappLink,
      color: "#25D366",
      external: true,
      priority: "high",
      responseTime: "Sub 30 min",
    },
    {
      icon: Mail,
      title: "Email Detaliat",
      description: "Pentru cereri complexe și documentație tehnică",
      value: email,
      link: `mailto:${email}`,
      color: "#00134b",
      priority: "medium",
      responseTime: "Sub 4 ore",
    },
  ];

  const companyInfo = [
    {
      icon: MapPin,
      title: "Sediul Principal",
      description: "Strada Baciului nr. 4, Brașov 500000",
      details:
        "Locație centrală, ușor accesibilă cu transportul public și parcare disponibilă în apropiere.",
      highlight: "Accesibil 24/7",
    },
    {
      icon: Clock,
      title: "Program de Lucru",
      description: "Luni - Vineri: 09:00 - 18:00\nSâmbătă: 09:00 - 14:00",
      details:
        "Servicii de urgență disponibile în afara programului normal pentru situații critice.",
      highlight: "Urgențe 24/7",
    },
    {
      icon: Users,
      title: "Echipa Noastră",
      description: "Peste 50 de profesioniști certificați",
      details:
        "Electricieni, instalatori, zugravi și alți specialiști cu experiență de peste 10 ani în domeniu.",
      highlight: "Certificați ANRE",
    },
  ];

  const whyChooseUs = [
    {
      icon: CheckCircle,
      title: "Garantie Completă",
      description:
        "Toate serviciile beneficiază de garanție de minimum 12 luni",
    },
    {
      icon: Star,
      title: "Calitate Premium",
      description:
        "Folosim doar materiale și componente de cea mai bună calitate",
    },
    {
      icon: Award,
      title: "Certificări Oficiale",
      description:
        "Licențe ANRE și certificări pentru toate tipurile de lucrări",
    },
  ];

  return (
    <>
      <Meta
        title="Contact - eisservice.ro | Contactează-ne pentru servicii profesionale"
        description="Contactează echipa eisservice.ro prin telefon, WhatsApp sau email. Servicii profesionale în România cu garanție completă. Răspuns rapid și soluții personalizate pentru toate nevoile tale."
        url="https://eisservice.ro/contact"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact - eisservice.ro",
          description:
            "Contactează echipa eisservice.ro pentru servicii profesionale în România",
          url: "https://eisservice.ro/contact",
          mainEntity: {
            "@type": "Organization",
            name: "E.I.S. SERVICE COMPLETE S.R.L.",
            alternateName: "eisservice.ro",
            url: "https://eisservice.ro",
            telephone: "+40735520990",
            email: "contact@eisservice.ro",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Str. Baciului nr. 4, Biroul",
              addressLocality: "Brașov",
              addressRegion: "Brașov",
              addressCountry: "RO",
              postalCode: "500000",
            },
            contactPoint: [
              {
                "@type": "ContactPoint",
                contactType: "customer service",
                telephone: "+40735520990",
                availableLanguage: "Romanian",
                areaServed: "RO",
              },
              {
                "@type": "ContactPoint",
                contactType: "sales",
                email: "contact@eisservice.ro",
                availableLanguage: "Romanian",
              },
            ],
            openingHours: "Mo-Fr 09:00-18:00,Sa 09:00-14:00",
            sameAs: ["https://eisservice.ro"],
          },
        }}
      />
      <div className={styles.contactPage}>
        {/* Hero Section */}
        <motion.div
          className={styles.heroSection}
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <div className={styles.heroContainer}>
            <motion.h1 className={styles.heroTitle} variants={fadeInUp}>
              Contactează-ne
            </motion.h1>
            <motion.p className={styles.heroDescription} variants={fadeInUp}>
              Suntem aici pentru a te ajuta! Contactează-ne prin oricare dintre
              metodele de mai jos și îți vom răspunde în cel mai scurt timp.
            </motion.p>
          </div>
        </motion.div>

        {/* Contact Methods Section */}
        <motion.section
          className={styles.contactMethodsSection}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
        >
          <div className={styles.sectionContainer}>
            <motion.div
              className={styles.contactMethodsHeader}
              variants={fadeInUp}
            >
              <h2 className={styles.sectionTitle}>Contactează-ne Acum</h2>
              <p className={styles.sectionSubtitle}>
                Alegi metoda care îți convine cel mai bine. Suntem aici să te
                ajutăm!
              </p>
            </motion.div>
            <motion.div
              className={styles.contactMethodsHorizontal}
              variants={staggerContainer}
            >
              {contactMethods.map((method, index) => (
                <motion.div
                  key={method.title}
                  className={`${styles.contactMethodCard} ${
                    styles[method.priority]
                  }`}
                  variants={fadeInUp}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={styles.contactMethodContent}>
                    <div
                      className={styles.contactMethodIcon}
                      style={{ backgroundColor: method.color }}
                    >
                      <method.icon size={24} />
                    </div>
                    <div className={styles.contactMethodInfo}>
                      <h3 className={styles.contactMethodTitle}>
                        {method.title}
                      </h3>
                      <p className={styles.contactMethodDescription}>
                        {method.description}
                      </p>
                      <div className={styles.contactMethodMeta}>
                        <span className={styles.responseTime}>
                          {method.responseTime}
                        </span>
                      </div>
                    </div>
                  </div>
                  <a
                    href={method.link}
                    className={styles.contactMethodButton}
                    target={method.external ? "_blank" : "_self"}
                    rel={method.external ? "noopener noreferrer" : ""}
                  >
                    <Send size={16} />
                    {method.value}
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Company Info Section */}
        <motion.section
          className={styles.companyInfoSection}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
        >
          <div className={styles.sectionContainer}>
            <motion.div
              className={styles.companyInfoHeader}
              variants={fadeInUp}
            >
              <h2 className={styles.sectionTitle}>Despre E.I.S. Service</h2>
              <p className={styles.sectionSubtitle}>
                O echipă de profesioniști cu experiență, dedicată serviciilor de
                calitate superioară
              </p>
            </motion.div>
            <motion.div
              className={styles.companyInfoGrid}
              variants={staggerContainer}
            >
              {companyInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  className={styles.companyInfoCard}
                  variants={fadeInUp}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={styles.companyInfoIcon}>
                    <info.icon size={28} />
                  </div>
                  <div className={styles.companyInfoContent}>
                    <div className={styles.companyInfoHeader}>
                      <h3 className={styles.companyInfoTitle}>{info.title}</h3>
                      <span className={styles.companyInfoHighlight}>
                        {info.highlight}
                      </span>
                    </div>
                    <p className={styles.companyInfoDescription}>
                      {info.description.split("\n").map((line, i) => (
                        <span key={i}>
                          {line}
                          {i < info.description.split("\n").length - 1 && (
                            <br />
                          )}
                        </span>
                      ))}
                    </p>
                    <p className={styles.companyInfoDetails}>{info.details}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Why Choose Us Section */}
        <motion.section
          className={styles.whyChooseUsSection}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
        >
          <div className={styles.sectionContainer}>
            <motion.div
              className={styles.whyChooseUsHeader}
              variants={fadeInUp}
            >
              <h2 className={styles.sectionTitle}>De ce să ne alegi?</h2>
              <p className={styles.sectionSubtitle}>
                Experiență, calitate și încredere - aceasta este promisiunea
                noastră
              </p>
            </motion.div>
            <motion.div
              className={styles.whyChooseUsGrid}
              variants={staggerContainer}
            >
              {whyChooseUs.map((item, index) => (
                <motion.div
                  key={item.title}
                  className={styles.whyChooseUsCard}
                  variants={fadeInUp}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={styles.whyChooseUsIcon}>
                    <item.icon size={24} />
                  </div>
                  <h3 className={styles.whyChooseUsTitle}>{item.title}</h3>
                  <p className={styles.whyChooseUsDescription}>
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
      </div>
    </>
  );
};

export default ContactPage;
