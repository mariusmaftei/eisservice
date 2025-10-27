import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const CategoryContext = createContext();

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
};

export const CategoryProvider = ({ children, initialData = null }) => {
  const [categoryData, setCategoryData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // If we have initial data from SSR, use it
  useEffect(() => {
    if (initialData) {
      console.log(
        "CategoryContext: Using initialData from props:",
        initialData
      );
      setCategoryData(initialData);
    } else if (typeof window !== "undefined" && window.__INITIAL_DATA__) {
      console.log(
        "CategoryContext: Using window.__INITIAL_DATA__:",
        window.__INITIAL_DATA__
      );
      setCategoryData(window.__INITIAL_DATA__);
      // Don't clear the window data immediately - let the component decide when to clear it
    }
  }, [initialData]);

  const fetchCategory = async (city = null, slug = null) => {
    if (!city) return;

    // Helper to get slug from category data (handles both old and new structure)
    const getCategorySlug = (data) => {
      return data?.categoryInformation?.slug || data?.slug;
    };

    // Helper to get city from category data
    const getCategoryCity = (data) => {
      return data?.city || "";
    };

    // Don't fetch if we already have data for this city and slug
    const currentSlug = getCategorySlug(categoryData);
    const currentCity = getCategoryCity(categoryData);
    if (categoryData && currentCity === city && currentSlug === (slug || "")) {
      return;
    }

    // Don't fetch if we're already loading
    if (loading) {
      return;
    }

    // Clear existing data when fetching new category
    setCategoryData(null);
    setLoading(true);
    setError(null);

    try {
      console.log(
        `Fetching category data for city: ${city}${
          slug ? `, slug: ${slug}` : ""
        }`
      );
      const url = `/api/categories/by-city/${city}${slug ? `/${slug}` : ""}`;
      const response = await api.get(url);

      if (response.data.success) {
        console.log("Category data fetched successfully:", response.data.data);
        setCategoryData(response.data.data);
      } else {
        setError(response.data.message || "Failed to fetch category data");
      }
    } catch (err) {
      // Only log unexpected errors, not expected 404s
      if (err.response && err.response.status !== 404) {
        console.error("Error fetching category:", err);
        console.error("Error details:", {
          message: err.message,
          stack: err.stack,
          slug: slug,
        });
      }

      if (err.response) {
        // Server responded with error status
        setError(
          err.response.data?.message || `Server error: ${err.response.status}`
        );
      } else if (err.request) {
        // Request was made but no response received
        setError(
          "Server returned HTML instead of JSON. Please check if the server is running."
        );
      } else {
        // Something else happened
        setError("Failed to fetch category data");
      }
    } finally {
      setLoading(false);
    }
  };

  const clearSSRData = () => {
    if (typeof window !== "undefined") {
      window.__INITIAL_DATA__ = null;
      window.__CATEGORY_SLUG__ = null;
    }
  };

  const value = {
    categoryData,
    loading,
    error,
    fetchCategory,
    setCategoryData,
    clearSSRData,
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};
