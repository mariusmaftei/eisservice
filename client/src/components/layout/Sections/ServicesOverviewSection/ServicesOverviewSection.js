import { ArrowRight, CheckCircle } from "lucide-react";
import ElectricianImage from "../../../../assets/images/category-images/electrician-image.webp";
import PlumberImage from "../../../../assets/images/category-images/plumber-image.webp";
import ConstructorImage from "../../../../assets/images/category-images/bricklayer-image.webp";
import PainterImage from "../../../../assets/images/category-images/painter-image.webp";
import CarMechanicImage from "../../../../assets/images/category-images/car-mechanic-image.webp";

import styles from "./ServicesOverviewSection.module.css";

const ServicesOverviewSection = ({ onNavigateToServices }) => {
  return (
    <section className={styles.servicesOverviewSection}>
      <div className={styles.servicesOverviewContainer}>
        <div className={styles.servicesOverviewContent}>
          <div className={styles.servicesOverviewText}>
            <h2 className={styles.servicesOverviewTitle}>
              Servicii pentru toate nevoile tale
            </h2>
            <p className={styles.servicesOverviewDescription}>
              De la reparații casnice la servicii profesionale, găsim
              specialiștii potriviți pentru orice proiect. Explorează peste 20
              de categorii de servicii și găsește soluția perfectă.
            </p>
            <div className={styles.servicesOverviewFeatures}>
              <div className={styles.featureItem}>
                <CheckCircle size={20} />
                <span>Peste 20 categorii de servicii</span>
              </div>
              <div className={styles.featureItem}>
                <CheckCircle size={20} />
                <span>Specialiști verificați și evaluați</span>
              </div>
              <div className={styles.featureItem}>
                <CheckCircle size={20} />
                <span>Prețuri transparente și competitive</span>
              </div>
            </div>
            <button
              onClick={onNavigateToServices}
              className={styles.servicesOverviewButton}
              title="Vezi toate serviciile disponibile"
            >
              Vezi toate serviciile
              <ArrowRight size={20} />
            </button>
          </div>
          <div className={styles.servicesOverviewImage}>
            <img
              src={ElectricianImage || "/placeholder.svg"}
              alt="Electrician - Servicii de electricitate"
              title="Electrician - Servicii de electricitate"
              className={styles.obliqueImg1}
            />
            <img
              src={PlumberImage || "/placeholder.svg"}
              alt="Instalator - Servicii de instalații"
              title="Instalator - Servicii de instalații"
              className={styles.obliqueImg2}
            />
            <img
              src={ConstructorImage || "/placeholder.svg"}
              alt="Constructor - Servicii de construcții"
              title="Constructor - Servicii de construcții"
              className={styles.obliqueImg3}
            />
            <img
              src={PainterImage || "/placeholder.svg"}
              alt="Zugrav - Servicii de zugrăvit"
              title="Zugrav - Servicii de zugrăvit"
              className={styles.obliqueImg4}
            />
            <img
              src={CarMechanicImage || "/placeholder.svg"}
              alt="Mecanic auto - Servicii auto"
              title="Mecanic auto - Servicii auto"
              className={styles.obliqueImg5}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverviewSection;
