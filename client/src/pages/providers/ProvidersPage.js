import ProviderServiceOfferForm from "../../components/UI/ProviderServiceOfferForm/ProviderServiceOfferForm";
import styles from "./ProvidersPage.module.css";
import HeroSection from "../../components/layout/Sections/HeroSection/HeroSection";

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

  return (
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
          <div className={styles.optionsSection}>
            <div className={styles.optionsContainer}>
              <h2 className={styles.optionsTitle}>
                Alege modalitatea de contact
              </h2>
              <p className={styles.optionsDescription}>
                Începe procesul de înregistrare prin modalitatea care ți se
                potrivește cel mai bine
              </p>

              <div className={styles.optionsGrid}>
                {/* Email Form Option */}
                <div className={styles.optionCard} onClick={handleEmailOption}>
                  <div className={styles.cardHeader}>
                    <div className={styles.iconWrapper}>
                      <Mail size={32} className={styles.cardIcon} />
                    </div>
                    <h3 className={styles.cardTitle}>Completează Formularul</h3>
                    <p className={styles.cardSubtitle}>
                      Înregistrează-te prin formularul nostru detaliat
                    </p>
                  </div>

                  <div className={styles.cardContent}>
                    <ul className={styles.featureList}>
                      <li className={styles.featureItem}>
                        <UserPlus size={16} />
                        <span>Proces de înregistrare structurat</span>
                      </li>
                      <li className={styles.featureItem}>
                        <Shield size={16} />
                        <span>Verificare completă a calificărilor</span>
                      </li>
                      <li className={styles.featureItem}>
                        <Briefcase size={16} />
                        <span>Profil profesional personalizat</span>
                      </li>
                    </ul>
                  </div>

                  <div className={styles.cardFooter}>
                    <button className={styles.actionButton}>
                      Completează Formularul
                      <Mail size={16} className={styles.buttonIcon} />
                    </button>
                  </div>
                </div>

                {/* WhatsApp Option */}
                <div
                  className={styles.optionCard}
                  onClick={handleWhatsAppOption}
                >
                  <div className={styles.cardHeader}>
                    <div className={styles.iconWrapper}>
                      <MessageCircle size={32} className={styles.cardIcon} />
                    </div>
                    <h3 className={styles.cardTitle}>
                      Contactează pe WhatsApp
                    </h3>
                    <p className={styles.cardSubtitle}>
                      Vorbește direct cu echipa noastră
                    </p>
                  </div>

                  <div className={styles.cardContent}>
                    <ul className={styles.featureList}>
                      <li className={styles.featureItem}>
                        <Zap size={16} />
                        <span>Răspuns imediat în timpul programului</span>
                      </li>
                      <li className={styles.featureItem}>
                        <Users size={16} />
                        <span>Consultanță personalizată</span>
                      </li>
                      <li className={styles.featureItem}>
                        <Headphones size={16} />
                        <span>Suport în procesul de înregistrare</span>
                      </li>
                    </ul>
                  </div>

                  <div className={styles.cardFooter}>
                    <button className={styles.actionButton}>
                      Deschide WhatsApp
                      <MessageCircle size={16} className={styles.buttonIcon} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
                    Acces la un flux constant de clienți noi și oportunități de
                    afaceri
                  </p>
                </div>
                <div className={styles.benefitItem}>
                  <Shield size={24} className={styles.benefitIcon} />
                  <h4>Platformă Sigură</h4>
                  <p>
                    Sistem de plăți securizat și protecție împotriva clienților
                    problematici
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
  );
};

export default ProvidersPage;
