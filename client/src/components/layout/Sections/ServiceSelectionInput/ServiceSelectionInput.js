import { useState, useRef, useEffect } from "react";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { createPortal } from "react-dom";
import styles from "./ServiceSelectionInput.module.css";
import { allCategories } from "../../../../constants/allCategories";

const ALL_POPULAR_SERVICES = allCategories.map((category) => category.name);

const ServiceSelectionInput = ({
  label,
  placeholder,
  selectedServices, // Prop: array of currently selected services
  onServicesChange = () => {}, // Prop: callback to update selected services in parent, cu valoare implicită
  availableServices = ALL_POPULAR_SERVICES, // Prop: list of services to choose from
  id,
  name,
  required = false,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const inputContainerRef = useRef(null);
  const dropdownRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (isDropdownOpen && inputContainerRef.current) {
      const rect = inputContainerRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [isDropdownOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        inputContainerRef.current &&
        !inputContainerRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAddService = (service) => {
    // console.log('handleAddService called. onServicesChange type:', typeof onServicesChange, 'value:', onServicesChange); // Debugging log
    if (!selectedServices.includes(service)) {
      onServicesChange([...selectedServices, service]);
    }
    setSearchTerm("");
    setIsDropdownOpen(false);
  };

  const handleRemoveService = (serviceToRemove) => {
    // console.log('handleRemoveService called. onServicesChange type:', typeof onServicesChange, 'value:', onServicesChange); // Debugging log
    onServicesChange(selectedServices.filter((s) => s !== serviceToRemove));
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const filteredServices = availableServices.filter(
    (service) =>
      service.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedServices.includes(service)
  );

  const renderDropdown = () => {
    if (!isDropdownOpen || !isMounted) return null;

    const isMobile = window.innerWidth < 768;

    return createPortal(
      <div
        ref={dropdownRef}
        className={styles.dropdownPortal}
        style={{
          position: "absolute",
          top: `${dropdownPosition.top}px`,
          left: isMobile
            ? `${dropdownPosition.left}px`
            : `${dropdownPosition.left}px`,
          width: isMobile
            ? `${dropdownPosition.width}px`
            : `${dropdownPosition.width}px`,
          zIndex: 9999,
        }}
      >
        <div className={styles.dropdownHeader}>
          <span>Sugestii de servicii</span>
        </div>
        {filteredServices.length > 0 ? (
          <ul className={styles.servicesList}>
            {filteredServices.map((service) => (
              <li
                key={service}
                className={styles.serviceItem}
                onClick={() => handleAddService(service)}
              >
                {service}
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.noResults}>
            Nu s-au găsit servicii care să corespundă căutării
          </div>
        )}
      </div>,
      document.body
    );
  };

  return (
    <div className={styles.serviceSelectionInputWrapper}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      <div ref={inputContainerRef} className={styles.inputContainer}>
        <div className={styles.selectedServicesTags}>
          {selectedServices.map((service) => (
            <div key={service} className={styles.serviceTag}>
              <span>{service}</span>
              <button
                type="button"
                onClick={() => handleRemoveService(service)}
                className={styles.removeTag}
              >
                <X size={14} />
              </button>
            </div>
          ))}
          <input
            type="text"
            id={id}
            name={name}
            placeholder={
              selectedServices.length > 0
                ? "Adaugă alt serviciu..."
                : placeholder
            }
            className={styles.input}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClick={() => setIsDropdownOpen(true)}
            autoComplete="off"
            required={required && selectedServices.length === 0}
          />
        </div>
        <button
          type="button"
          className={styles.dropdownToggle}
          onClick={toggleDropdown}
        >
          {isDropdownOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>
      {renderDropdown()}
    </div>
  );
};

export default ServiceSelectionInput;
