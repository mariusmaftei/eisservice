import OfficeWomanImage from "../../../../assets/images/eis-team-images/office-woman-homepage.webp";
import { Link } from "react-router-dom";
import { ArrowRight, Users, TrendingUp, Shield } from "lucide-react";
import styles from "./BecomeProviderCard.module.css";

export default function BecomeProviderCard() {
  return (
    <section className={styles.becomeProviderSection}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.textContent}>
            <div className={styles.badge}>
              <Users size={16} />
              DEVINO PRESTATOR
            </div>
            <h2 className={styles.title}>
              Ești profesionist? Alătură-te platformei noastre!
            </h2>
            <p className={styles.description}>
              Completează formularul de înscriere și noi îți vom găsi clientul
              potrivit rapid și eficient. Crește-ți afacerea cu ajutorul nostru!
            </p>

            <div className={styles.benefits}>
              <div className={styles.benefit}>
                <TrendingUp size={20} />
                <span>Creștere rapidă a afacerii</span>
              </div>
              <div className={styles.benefit}>
                <Shield size={20} />
                <span>Clienți verificați și de calitate</span>
              </div>
            </div>

            <Link to="/devino-prestator" className={styles.ctaButton}>
              Înscrie-te ca specialist
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className={styles.imageContent}>
            <div className={styles.imageWrapper}>
              <img
                src={OfficeWomanImage || "/placeholder.svg"}
                alt="Devino Prestator"
                className={styles.image}
              />
              <div className={styles.imageOverlay}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
