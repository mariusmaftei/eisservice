import styles from "./SearchBar.module.css";
import { Search } from "lucide-react";
import { useServiceContext } from "../../../context/ServiceContext";
import ServiceSelectionInput from "../../layout/Sections/ServiceSelectionInput/ServiceSelectionInput";

const SearchBar = () => {
  const { selectedServices, setSelectedServices, performSearch } =
    useServiceContext();

  const handleSearch = (e) => {
    e.preventDefault();
    performSearch();

    const servicesSection = document.getElementById("servicii-populare");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={styles.searchBarContainer}>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <div className={styles.searchInputWrapper}>
          <ServiceSelectionInput
            id="search-services"
            name="searchServices"
            label="Ce serviciu cauți?"
            placeholder="ex. Electrician, Instalator, Mecanic Auto"
            selectedServices={selectedServices}
            onServicesChange={setSelectedServices}
          />
        </div>
        <div className={styles.buttonWrapper}>
          <button type="submit" className={styles.searchButton}>
            <Search size={18} className={styles.searchIcon} />
            Caută
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
