import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import HeroSection from "../../components/layout/Sections/HeroSection/HeroSection";
import Categories from "../../components/layout/Sections/Categories/Categories";
import { ServiceProvider } from "../../context/ServiceContext";
import BecomeProviderCard from "../../components/layout/Sections/BecomeProviderCard/BecomeProviderCard";
import {
  ElectricianIcon,
  PlumberIcon,
  MechanicIcon,
} from "../../components/UI/Icons";
import LocationSelector from "../../components/UI/LocationSelector";
import { useParams } from "react-router-dom";
import { countyToCitySlug } from "../../utils/cityUtils";

import EISTeamImage from "../../assets/images/eis-team-images/eis_team.webp";

const ServicePage = () => {
  const { city } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Check for saved location and redirect if needed
  useEffect(() => {
    // Only redirect if no city in URL
    if (!city) {
      const savedLocation = localStorage.getItem("userLocation");
      if (savedLocation) {
        // Convert saved county to city slug and redirect
        const citySlug = countyToCitySlug(savedLocation);
        if (citySlug) {
          navigate(`/${citySlug}/solicita-serviciu`, { replace: true });
        }
      }
    }
  }, [city, navigate]);
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
        <div
          style={{
            padding: "3rem 1rem",
            maxWidth: "1200px",
            margin: "3rem auto 0",
            background: "var(--gradient-primary)",
            borderRadius: "16px",
            boxShadow: "0 4px 12px rgba(59, 130, 246, 0.15)",
          }}
        >
          <div style={{ marginBottom: "1.5rem", textAlign: "center" }}>
            <h2
              style={{
                color: "#ffffff",
                fontSize: "1.75rem",
                fontWeight: "700",
                marginBottom: "0.5rem",
              }}
            >
              Selectează locația ta
            </h2>
            <p
              style={{
                color: "#e0e7ff",
                fontSize: "1rem",
                margin: "0",
                lineHeight: "1.5",
              }}
            >
              Alege județul pentru a vedea furnizorii disponibili în zona ta
            </p>
          </div>
          <LocationSelector currentCity={city} />
        </div>
        <Categories key={location.pathname} city={city} />
        <BecomeProviderCard />
      </div>
    </ServiceProvider>
  );
};

export default ServicePage;
