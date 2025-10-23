import React, { createContext, useContext, useState, useEffect } from "react";
import { authService, authHelpers } from "../service/auth-services.js";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Add a way to force re-check authentication (useful after login/logout)
  const forceAuthCheck = async () => {
    setAuthChecked(false);
    await checkAuthStatus();
  };

  const checkAuthStatus = async () => {
    // Prevent multiple simultaneous auth checks
    if (authChecked) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setAuthChecked(true);

      console.log("Checking authentication status...");
      const authResult = await authService.checkAuth();
      console.log("Auth result:", authResult);

      if (authResult.success && authResult.isAuthenticated) {
        setUser(authResult.user);
        setIsAuthenticated(true);
        console.log("User authenticated:", authResult.user);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        console.log("User not authenticated");
        // Reset authChecked to allow future checks when not authenticated
        setAuthChecked(false);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setError(error.message || "Authentication check failed");
      setUser(null);
      setIsAuthenticated(false);
      console.log("Auth check failed, resetting authChecked");
      // Reset authChecked to allow future checks when auth fails
      setAuthChecked(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async () => {
    try {
      setError(null);
      // Redirect to Google OAuth
      window.location.href = authService.getGoogleLoginUrl();
    } catch (error) {
      console.error("Login failed:", error);
      setError(error.message);
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
      setAuthChecked(false);
    } catch (error) {
      console.error("Logout failed:", error);
      setError(error.message);
    }
  };

  const refreshUser = async () => {
    try {
      const userResult = await authService.getCurrentUser();
      if (userResult.success) {
        setUser(userResult.user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        setAuthChecked(false);
      }
    } catch (error) {
      console.error("Refresh user failed:", error);
      setError(error.message);
      setUser(null);
      setIsAuthenticated(false);
      setAuthChecked(false);
    }
  };

  const isAdmin = () => {
    return authHelpers.isAdmin({ isAuthenticated, user });
  };

  const getUserDisplayName = () => {
    return authHelpers.getUserDisplayName(user);
  };

  const getUserInitials = () => {
    return authHelpers.getUserInitials(user);
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    refreshUser,
    checkAuthStatus,
    forceAuthCheck,
    isAdmin,
    getUserDisplayName,
    getUserInitials,
    clearError: () => setError(null),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
