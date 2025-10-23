import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8080/api";

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
  withCredentials: true, // Enable cookies for session-based auth
});

// Request interceptor - no need to add tokens since we're using session-based auth
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access (not logged in) - redirect to auth page
      window.location.href = "/auth";
    } else if (error.response?.status === 403) {
      // Handle forbidden access (logged in but no permission) - redirect to access denied page
      window.location.href = "/access-denied";
    }
    return Promise.reject(error);
  }
);

// User utilities - Note: These are kept for compatibility but session-based auth is handled by auth-services.js
export const userAPI = {
  // Login user (redirects to OAuth)
  login: async () => {
    // This should redirect to OAuth, handled by auth-services.js
    window.location.href = "/api/auth/google";
  },

  // Logout user
  logout: async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Error during logout:", error);
    }
    window.location.href = "/auth";
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await api.get("/auth/me");
      return response.data;
    } catch (error) {
      console.error("Error getting current user:", error);
      throw error;
    }
  },

  // Check if user is authenticated (use auth-services.js instead)
  isAuthenticated: async () => {
    try {
      const response = await api.get("/auth/check");
      return response.data.isAuthenticated;
    } catch (error) {
      return false;
    }
  },
};

// Categories API
export const categoryAPI = {
  // Get all categories
  getAll: async () => {
    try {
      const response = await api.get("/admin/categories");
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },

  // Get single category by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/admin/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching category:", error);
      throw error;
    }
  },

  // Create new category
  create: async (categoryData) => {
    try {
      // Check if it's FormData (file upload)
      const isFormData = categoryData instanceof FormData;

      const config = {
        headers: isFormData
          ? { "Content-Type": "multipart/form-data" }
          : { "Content-Type": "application/json" },
      };

      const response = await api.post(
        "/admin/categories",
        categoryData,
        config
      );
      return response.data;
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  },

  // Update category
  update: async (id, categoryData) => {
    try {
      // Check if it's FormData (file upload)
      const isFormData = categoryData instanceof FormData;

      const config = {
        headers: isFormData
          ? { "Content-Type": "multipart/form-data" }
          : { "Content-Type": "application/json" },
      };

      const response = await api.put(
        `/admin/categories/${id}`,
        categoryData,
        config
      );
      return response.data;
    } catch (error) {
      console.error("Error updating category:", error);
      throw error;
    }
  },

  // Delete category
  delete: async (id) => {
    try {
      const response = await api.delete(`/admin/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting category:", error);
      throw error;
    }
  },

  // Toggle category status
  toggleStatus: async (id) => {
    try {
      const response = await api.patch(`/admin/categories/${id}/toggle`);
      return response.data;
    } catch (error) {
      console.error("Error toggling category status:", error);
      throw error;
    }
  },
};

export default api;
