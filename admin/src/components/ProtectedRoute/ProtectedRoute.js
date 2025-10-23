import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.js";

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, isLoading, isAdmin } = useAuth();
  const location = useLocation();

  console.log("ProtectedRoute render:", {
    isAuthenticated,
    isLoading,
    isAdmin: isAdmin(),
    requireAdmin,
    pathname: location.pathname,
  });

  // Show loading state while checking authentication
  if (isLoading) {
    console.log("ProtectedRoute: Showing loading state");
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "18px",
          color: "#666",
        }}
      >
        Loading...
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    console.log("ProtectedRoute: Redirecting to /auth - not authenticated");
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Redirect to access denied page if authenticated but not admin and admin is required
  if (requireAdmin && !isAdmin()) {
    console.log("ProtectedRoute: Redirecting to /access-denied - not admin");
    return <Navigate to="/access-denied" replace />;
  }

  console.log("ProtectedRoute: Rendering protected content");
  return children;
};

export default ProtectedRoute;
