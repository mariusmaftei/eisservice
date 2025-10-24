import ProviderServiceOfferForm from "../../components/UI/ProviderServiceOfferForm/ProviderServiceOfferForm";
import styles from "./ProvidersPage.module.css";
import HeroSection from "../../components/layout/Sections/HeroSection/HeroSection";
import ContactOptionsGrid from "../../components/UI/ContactOptionsGrid/ContactOptionsGrid";
import Meta from "../../components/SEO/Meta";

import ServiceProviderOfficeImage from "../../assets/images/eis-team-images/service-provider-office-image.webp";
import ElectricianIcon from "../../assets/images/illustration/electrician-image.webp";
import PlumberIcon from "../../assets/images/illustration/plumber-image.webp";
import WelderIcon from "../../assets/images/illustration/welder-image.webp";
import {
  Mail,
  MessageCircle,
  Shield,
  Star,
  Zap,
  Users,
  Headphones,
  UserPlus,
  Briefcase,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

import { contactInfo } from "../../config/contactInfo";

const ProvidersPage = () => {
  const [showForm, setShowForm] = useState(false);

  const popularServiceIcons = [
    {
      icon: (
        <img
          src={ElectricianIcon || "/placeholder.svg"}
          alt="Electrician"
          className={styles.serviceIconImage}
        />
      ),
      text: "Electrician",
    },
    {
      icon: (
        <img
          src={PlumberIcon || "/placeholder.svg"}
          alt="Instalator"
          className={styles.serviceIconImage}
        />
      ),
      text: "Instalator",
    },
    {
      icon: (
        <img
          src={WelderIcon}
          alt="Sanitare"
          className={styles.serviceIconImage}
        />
      ),
      text: "Sanitare",
    },
  ];

  const handleEmailOption = () => {
    setShowForm(true);
  };

  const handleWhatsAppOption = () => {
    const message = `Salut! Sunt interesat să devin prestator în platforma E.I.S. Service. Poți să îmi oferi mai multe informații despre procesul de înregistrare?`;
    const whatsappUrl = `https://wa.me/${
      contactInfo.phoneFormatted
    }?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  // Contact options data
  const contactOptions = [
    {
      id: "form",
      title: "Completează Formularul",
      subtitle: "Înregistrează-te prin formularul nostru detaliat",
      icon: Mail,
      features: [
        { icon: UserPlus, text: "Proces de înregistrare structurat" },
        { icon: Shield, text: "Verificare completă a calificărilor" },
        { icon: Briefcase, text: "Profil profesional personalizat" },
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
        { icon: Users, text: "Consultanță personalizată" },
        { icon: Headphones, text: "Suport în procesul de înregistrare" },
      ],
      buttonText: "Deschide WhatsApp",
      action: handleWhatsAppOption,
    },
  ];

  return (
    <>
      <Meta
        title="Devino Prestator - eisservice.ro | Alătură-te rețelei noastre de profesioniști"
        description="Ești profesionist? Alătură-te platformei eisservice.ro și găsește clienți noi în zona ta. Proces simplu de înregistrare, platformă sigură și oportunități constante de afaceri. Începe astăzi!"
        url="https://eisservice.ro/providers"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Devino Prestator - eisservice.ro",
          description:
            "Alătură-te rețelei noastre de profesioniști și găsește clienți noi în zona ta",
          url: "https://eisservice.ro/providers",
          mainEntity: {
            "@type": "Organization",
            name: "E.I.S. SERVICE COMPLETE S.R.L.",
            url: "https://eisservice.ro",
            description:
              "Platforma ta de încredere pentru servicii profesionale în România",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Str. Baciului nr. 4, Biroul",
              addressLocality: "Brașov",
              addressRegion: "Brașov",
              addressCountry: "RO",
            },
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "customer service",
              url: "https://eisservice.ro/contact",
            },
          },
        }}
      />
      <div className={styles.serviceProviderPage}>
        <HeroSection
          badgeText="Devino Prestator"
          title="Ești profesionist?"
          highlightText="Alătură-te platformei noastre!"
          description="Alătură-te rețelei noastre de profesioniști și găsește clienți noi în zona ta. Alege modalitatea preferată de contact pentru a începe!"
          imageSrc={ServiceProviderOfficeImage}
          popularServicesSection={{
            title: "Presteaza Servicii",
            icons: popularServiceIcons,
          }}
          className={styles.shortHero}
        />

        {!showForm ? (
          <>
            {/* Contact Options Section */}
            <ContactOptionsGrid
              options={contactOptions}
              title="Alege modalitatea de contact"
              description="Începe procesul de înregistrare prin modalitatea care ți se potrivește cel mai bine"
            />

            {/* Benefits Section */}
            <div className={styles.benefitsSection}>
              <div className={styles.benefitsContent}>
                <h3 className={styles.benefitsTitle}>
                  Beneficiile de a fi prestator E.I.S. Service
                </h3>
                <div className={styles.benefitsGrid}>
                  <div className={styles.benefitItem}>
                    <TrendingUp size={24} className={styles.benefitIcon} />
                    <h4>Creștere Constantă</h4>
                    <p>
                      Acces la un flux constant de clienți noi și oportunități
                      de afaceri
                    </p>
                  </div>
                  <div className={styles.benefitItem}>
                    <Shield size={24} className={styles.benefitIcon} />
                    <h4>Platformă Sigură</h4>
                    <p>
                      Sistem de plăți securizat și protecție împotriva
                      clienților problematici
                    </p>
                  </div>
                  <div className={styles.benefitItem}>
                    <Star size={24} className={styles.benefitIcon} />
                    <h4>Reputație Online</h4>
                    <p>
                      Construiește-ți reputația prin sistemul nostru de recenzii
                      și evaluări
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          // Form Section
          <div className={styles.formSection}>
            <div className={styles.formContainer}>
              <button
                onClick={() => setShowForm(false)}
                className={styles.backToOptionsButton}
              >
                ← Înapoi la opțiuni
              </button>
              <ProviderServiceOfferForm />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProvidersPage;
