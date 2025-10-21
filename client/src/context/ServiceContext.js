import { createContext, useState, useContext } from "react";

const ServiceContext = createContext();

export const useServiceContext = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error(
      "useServiceContext trebuie utilizat în interiorul unui ServiceProvider"
    );
  }
  return context;
};

export const ServiceProvider = ({ children }) => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [filterServices, setFilterServices] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const addService = (service) => {
    if (!selectedServices.includes(service)) {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const removeService = (service) => {
    setSelectedServices(selectedServices.filter((s) => s !== service));
  };

  const clearServices = () => {
    setSelectedServices([]);
    setFilterServices([]);
    setSearchPerformed(false);
  };

  const performSearch = () => {
    setFilterServices([...selectedServices]);
    setSearchPerformed(true);
  };

  const value = {
    selectedServices,
    setSelectedServices,
    filterServices,
    searchPerformed,
    addService,
    removeService,
    clearServices,
    performSearch,
  };

  return (
    <ServiceContext.Provider value={value}>{children}</ServiceContext.Provider>
  );
};

export default ServiceContext;
