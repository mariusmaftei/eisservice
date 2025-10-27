import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LocationSelector.module.css";
import { countyToCitySlug, citySlugToCounty } from "../../../utils/cityUtils";

const romanianCounties = [
  "Alba",
  "Arad",
  "Argeș",
  "Bacău",
  "Bihor",
  "Bistrița-Năsăud",
  "Botoșani",
  "Brașov",
  "Brăila",
  "București",
  "Buzău",
  "Caraș-Severin",
  "Călărași",
  "Cluj",
  "Constanța",
  "Covasna",
  "Dâmbovița",
  "Dolj",
  "Galați",
  "Giurgiu",
  "Gorj",
  "Harghita",
  "Hunedoara",
  "Ialomița",
  "Iași",
  "Ilfov",
  "Maramureș",
  "Mehedinți",
  "Mureș",
  "Neamț",
  "Olt",
  "Prahova",
  "Sălaj",
  "Satu Mare",
  "Sibiu",
  "Suceava",
  "Teleorman",
  "Timiș",
  "Tulcea",
  "Vâlcea",
  "Vaslui",
  "Vrancea",
];

const LocationSelector = ({ currentCity }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const modalRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    // Load saved location from localStorage or from currentCity prop
    const savedLocation = localStorage.getItem("userLocation");

    // If we have a currentCity from URL, convert it to county name
    if (currentCity) {
      const countyFromCity = citySlugToCounty(currentCity);
      if (countyFromCity) {
        setSelectedLocation(countyFromCity);
      }
    } else if (savedLocation) {
      setSelectedLocation(savedLocation);
    }

    // Focus search input when modal opens
    if (isModalOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 100);
    }
  }, [isModalOpen, currentCity]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
        setSearchTerm("");
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
        setSearchTerm("");
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const filteredCounties = romanianCounties.filter((county) =>
    county.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputClick = () => {
    setIsModalOpen(true);
  };

  const handleLocationSelect = (county) => {
    setSelectedLocation(county);
    localStorage.setItem("userLocation", county);

    // Convert county to city slug and navigate
    const citySlug = countyToCitySlug(county);
    navigate(`/${citySlug}/solicita-serviciu`);

    setIsModalOpen(false);
    setSearchTerm("");
  };

  const handleClearLocation = (e) => {
    e.stopPropagation();
    setSelectedLocation("");
    localStorage.removeItem("userLocation");

    // Navigate back to the general services page (no city)
    navigate("/solicita-serviciu");
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper} onClick={handleInputClick}>
        <svg
          className={styles.locationIcon}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
        <input
          type="text"
          value={selectedLocation}
          placeholder="Care este locația ta?"
          readOnly
          className={styles.input}
        />
        {selectedLocation && (
          <button
            className={styles.clearButton}
            onClick={handleClearLocation}
            type="button"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
          </button>
        )}
        <svg
          className={styles.arrowIcon}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent} ref={modalRef}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Selectează județul</h2>
              <button
                className={styles.closeButton}
                onClick={() => {
                  setIsModalOpen(false);
                  setSearchTerm("");
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className={styles.searchContainer}>
              <svg
                className={styles.searchIcon}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Caută județul..."
                className={styles.searchInput}
              />
            </div>

            <div className={styles.countiesList}>
              {filteredCounties.length === 0 ? (
                <div className={styles.noResults}>
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                  <p>Nu s-au găsit rezultate</p>
                </div>
              ) : (
                filteredCounties.map((county) => (
                  <button
                    key={county}
                    className={styles.countyItem}
                    onClick={() => handleLocationSelect(county)}
                  >
                    <span className={styles.countyName}>{county}</span>
                    {selectedLocation === county && (
                      <svg
                        className={styles.checkIcon}
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    )}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
