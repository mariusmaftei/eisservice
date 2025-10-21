import api from "./api.js";

export const policyServices = {
  // Get privacy policy content
  getPrivacyPolicy: async () => {
    try {
      const response = await api.get("/policy/privacy");
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("Error fetching privacy policy:", error);
      return {
        success: false,
        message: "Nu s-a putut încărca politica de confidențialitate.",
      };
    }
  },

  // Get terms of service
  getTermsOfService: async () => {
    try {
      const response = await api.get("/policy/terms");
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("Error fetching terms of service:", error);
      return {
        success: false,
        message: "Nu s-au putut încărca termenii și condițiile.",
      };
    }
  },

  // Record user consent
  recordConsent: async (consentData) => {
    try {
      const response = await api.post("/policy/consent", consentData);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("Error recording consent:", error);
      return {
        success: false,
        message: "Nu s-a putut înregistra consimțământul.",
      };
    }
  },

  // Validate consent requirements
  validateConsent: (consentData) => {
    const errors = {};

    if (!consentData.dataProcessingConsent) {
      errors.dataProcessingConsent =
        "Consimțământul pentru prelucrarea datelor este obligatoriu";
    }

    if (!consentData.privacyPolicyAccepted) {
      errors.privacyPolicyAccepted =
        "Acceptarea politicii de confidențialitate este obligatorie";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  },
};

export default policyServices;
