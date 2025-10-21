import HeroSection from "../../components/layout/Sections/HeroSection/HeroSection";
import Categories from "../../components/layout/Sections/Categories/Categories";
import styles from "./ServicesPage.module.css";
import { ServiceProvider } from "../../context/ServiceContext";
import BecomeProviderCard from "../../components/layout/Sections/BecomeProviderCard/BecomeProviderCard";

import EISTeamImage from "../../assets/images/eis-team-images/eis_team.webp";
import ElectricianIcon from "../../assets/images/illustration/electrician-image.webp";
import PlumberIcon from "../../assets/images/illustration/plumber-image.webp";
import WelderIcon from "../../assets/images/illustration/welder-image.webp";

const ServicePage = () => {
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
          alt="Plumber"
          className={styles.serviceIconImage}
        />
      ),
      text: "Instalator",
    },
    {
      icon: (
        <img
          src={WelderIcon || "/placeholder.svg"}
          alt="Welder"
          className={styles.serviceIconImage}
        />
      ),
      text: "Sudor",
    },
  ];

  return (
    <ServiceProvider>
      <div className={styles.homePage}>
        <HeroSection
          badgeText="Servicii profesionale în toată România"
          title="Tu ceri. Noi găsim."
          highlightText="Simplu."
          description="Nu mai pierde timp căutând. Spune-ne ce ai nevoie și îți aducem specialiștii potriviți în cel mai scurt timp."
          imageSrc={EISTeamImage}
          popularServicesSection={{
            title: "Servicii Populare",
            icons: popularServiceIcons,
          }}
        />
        <Categories />
        <BecomeProviderCard />
      </div>
    </ServiceProvider>
  );
};

export default ServicePage;
