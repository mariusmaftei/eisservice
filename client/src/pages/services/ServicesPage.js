import HeroSection from "../../components/layout/Sections/HeroSection/HeroSection";
import Categories from "../../components/layout/Sections/Categories/Categories";
import { ServiceProvider } from "../../context/ServiceContext";
import BecomeProviderCard from "../../components/layout/Sections/BecomeProviderCard/BecomeProviderCard";
import {
  ElectricianIcon,
  PlumberIcon,
  MechanicIcon,
} from "../../components/UI/Icons";

import EISTeamImage from "../../assets/images/eis-team-images/eis_team.webp";

const ServicePage = () => {
  const popularServiceIcons = [
    {
      icon: <ElectricianIcon size={32} color="#ffffff" />,
      text: "Electrician",
      isCard: true,
    },
    {
      icon: <PlumberIcon size={32} color="#ffffff" />,
      text: "Instalator",
      isCard: true,
    },
    {
      icon: <MechanicIcon size={32} color="#ffffff" />,
      text: "Mecanic",
      isCard: true,
    },
  ];

  return (
    <ServiceProvider>
      <div>
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
