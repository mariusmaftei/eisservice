"use client";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import styles from "./ContactOptionsPage.module.css";
import {
  Mail,
  MessageCircle,
  ArrowLeft,
  Clock,
  Shield,
  Star,
  Zap,
  Users,
  Headphones,
} from "lucide-react";
import { contactInfo } from "../../config/contactInfo";

const ContactOptionsPage = () => {
  const { categorySlug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { categoryName, categoryImage } = location.state || {};

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

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className={styles.contactOptionsPage}>
      {/* Header Section */}
      <div className={styles.header}>
        <button onClick={handleBackClick} className={styles.backButton}>
          <ArrowLeft size={20} />
          Înapoi
        </button>

        <div className={styles.headerContent}>
          <img
            src={
              categoryImage ||
              "/placeholder.svg?height=300&width=600&text=Serviciu"
            }
            alt={categoryName || defaultCategoryName}
            className={styles.categoryImage}
          />
          <div className={styles.headerText}>
            <h1 className={styles.title}>
              Solicită{" "}
              <span className={styles.categoryName}>
                {categoryName || defaultCategoryName}
              </span>{" "}
              pentru nevoile dumneavoastră
            </h1>
            <p className={styles.description}>
              Alege modalitatea preferată de contact pentru a găsi specialiștii
              potriviți
            </p>
          </div>
        </div>
      </div>

      {/* Contact Options */}
      <div className={styles.optionsContainer}>
        <div className={styles.optionsGrid}>
          {/* Email Option */}
          <div className={styles.optionCard} onClick={handleEmailOption}>
            <div className={styles.cardHeader}>
              <div className={styles.iconWrapper}>
                <Mail size={32} className={styles.cardIcon} />
              </div>
              <h2 className={styles.cardTitle}>Completează Formularul</h2>
              <p className={styles.cardSubtitle}>
                Trimite-ne detaliile proiectului tău
              </p>
            </div>

            <div className={styles.cardContent}>
              <ul className={styles.featureList}>
                <li className={styles.featureItem}>
                  <Clock size={16} />
                  <span>Răspuns în maxim 24 de ore</span>
                </li>
                <li className={styles.featureItem}>
                  <Shield size={16} />
                  <span>Specialiști verificați și evaluați</span>
                </li>
                <li className={styles.featureItem}>
                  <Star size={16} />
                  <span>Oferte personalizate pentru proiectul tău</span>
                </li>
              </ul>
            </div>

            <div className={styles.cardFooter}>
              <button className={styles.actionButton}>
                Completează Formularul
                <ArrowLeft size={16} className={styles.buttonIcon} />
              </button>
            </div>
          </div>

          {/* WhatsApp Option */}
          <div className={styles.optionCard} onClick={handleWhatsAppOption}>
            <div className={styles.cardHeader}>
              <div className={styles.iconWrapper}>
                <MessageCircle size={32} className={styles.cardIcon} />
              </div>
              <h2 className={styles.cardTitle}>Contactează pe WhatsApp</h2>
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
                  <span>Comunicare directă cu specialiștii</span>
                </li>
                <li className={styles.featureItem}>
                  <Headphones size={16} />
                  <span>Suport în timp real</span>
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

      {/* Info Section */}
      <div className={styles.infoSection}>
        <div className={styles.infoContent}>
          <h3 className={styles.infoTitle}>De ce să alegi E.I.S. Service?</h3>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <Shield size={24} className={styles.infoIcon} />
              <h4>Specialiști Verificați</h4>
              <p>
                Toți profesioniștii din rețeaua noastră sunt verificați și
                evaluați
              </p>
            </div>
            <div className={styles.infoItem}>
              <Star size={24} className={styles.infoIcon} />
              <h4>Calitate Garantată</h4>
              <p>
                Servicii de înaltă calitate cu garanție și suport post-serviciu
              </p>
            </div>
            <div className={styles.infoItem}>
              <Clock size={24} className={styles.infoIcon} />
              <h4>Răspuns Rapid</h4>
              <p>
                Te contactăm în cel mai scurt timp pentru a găsi soluția
                potrivită
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactOptionsPage;
