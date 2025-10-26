import { memo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Users, TrendingUp, Shield } from "lucide-react";
import OfficeWomanImage from "../../../../assets/images/eis-team-images/office-woman-homepage.webp";
import styles from "./BecomeProviderCard.module.css";

const BENEFITS_DATA = [
  {
    icon: TrendingUp,
    text: "Creștere rapidă a afacerii",
    ariaLabel: "Beneficiu: Creștere rapidă a afacerii",
  },
  {
    icon: Shield,
    text: "Clienți verificați și de calitate",
    ariaLabel: "Beneficiu: Clienți verificați și de calitate",
  },
];

function BecomeProviderCard() {
  return (
    <section
      className={styles.becomeProviderSection}
      aria-labelledby="become-provider-title"
    >
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.textContent}>
            <div className={styles.badge} role="banner">
              <Users size={16} aria-hidden="true" />
              <span>DEVINO PRESTATOR</span>
            </div>

            <h2 id="become-provider-title" className={styles.title}>
              Ești profesionist? Alătură-te platformei noastre!
            </h2>

            <p className={styles.description}>
              Completează formularul de înscriere și noi îți vom găsi clientul
              potrivit rapid și eficient. Crește-ți afacerea cu ajutorul nostru!
            </p>

            <div className={styles.benefits} role="list">
              {BENEFITS_DATA.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <div
                    key={index}
                    className={styles.benefit}
                    role="listitem"
                    aria-label={benefit.ariaLabel}
                  >
                    <IconComponent size={20} aria-hidden="true" />
                    <span>{benefit.text}</span>
                  </div>
                );
              })}
            </div>

            <Link
              to="/devino-prestator"
              className={styles.ctaButton}
              aria-label="Înscrie-te ca specialist pe platforma noastră"
            >
              <span>Înscrie-te ca specialist</span>
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>

          <div className={styles.imageContent}>
            <div className={styles.imageWrapper}>
              <img
                src={OfficeWomanImage}
                alt="Profesionistă în birou, reprezentând oportunitatea de a deveni prestator pe platforma noastră"
                title="Profesionistă în birou, reprezentând oportunitatea de a deveni prestator pe platforma noastră"
                className={styles.image}
                loading="lazy"
                width="500"
                height="500"
              />
              <div className={styles.imageOverlay} aria-hidden="true"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(BecomeProviderCard);
