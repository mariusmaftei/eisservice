import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { ServiceProvider } from "./context/ServiceContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <ServiceProvider>
        <App />
      </ServiceProvider>
    </HelmetProvider>
  </React.StrictMode>
);
