import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8080/api";

// Create axios instance with credentials
const authAPI = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Response interceptor to handle auth-specific errors
authAPI.interceptors.response.use(
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

// Auth service functions
export const authService = {
  // Check authentication status
  checkAuth: async () => {
    try {
      const response = await authAPI.get("/auth/check");
      return response.data;
    } catch (error) {
      console.error("Auth check failed:", error);
      return {
        success: false,
        isAuthenticated: false,
        user: null,
      };
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await authAPI.get("/auth/me");
      return response.data;
    } catch (error) {
      console.error("Get current user failed:", error);
      throw error;
    }
  },

  // Logout
  logout: async () => {
    try {
      const response = await authAPI.post("/auth/logout");
      return response.data;
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  },

  // Get all users (admin only)
  getAllUsers: async () => {
    try {
      const response = await authAPI.get("/auth/users");
      return response.data;
    } catch (error) {
      console.error("Get all users failed:", error);
      throw error;
    }
  },

  // Update user role (admin only)
  updateUserRole: async (userId, role) => {
    try {
      const response = await authAPI.put(`/auth/users/${userId}/role`, {
        role,
      });
      return response.data;
    } catch (error) {
      console.error("Update user role failed:", error);
      throw error;
    }
  },

  // Google OAuth login URL
  getGoogleLoginUrl: () => {
    return `${API_BASE_URL}/auth/google`;
  },

  // Check if Google OAuth is available
  checkGoogleOAuthAvailability: async () => {
    try {
      const response = await authAPI.get("/auth/status");
      return {
        available: response.data.googleOAuth.available,
        message: response.data.googleOAuth.message,
      };
    } catch (error) {
      console.error("Failed to check OAuth status:", error);
      return {
        available: false,
        message: "Failed to check authentication availability",
      };
    }
  },
};

// Auth context helper functions
export const authHelpers = {
  // Check if user is authenticated
  isAuthenticated: (authState) => {
    return authState?.isAuthenticated === true;
  },

  // Check if user is admin
  isAdmin: (authState) => {
    return (
      authState?.isAuthenticated === true && authState?.user?.role === "admin"
    );
  },

  // Get user display name
  getUserDisplayName: (user) => {
    if (!user) return "";
    return user.displayName || `${user.firstName} ${user.lastName}`;
  },

  // Get user initials
  getUserInitials: (user) => {
    if (!user) return "";
    return `${user.firstName?.[0] || ""}${
      user.lastName?.[0] || ""
    }`.toUpperCase();
  },
};

export default authService;
