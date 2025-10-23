import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authService, authHelpers } from "../../service/auth-services.js";
import { useAuth } from "../../context/AuthContext.js";
import styles from "./AuthPage.module.css";
import logoImage from "../../assets/images/logo/eis-service-logo.webp";

const AuthPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [googleOAuthAvailable, setGoogleOAuthAvailable] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    // Check if there's an error message from OAuth callback
    const errorMessage = searchParams.get("message");
    if (errorMessage) {
      const decodedMessage = decodeURIComponent(errorMessage);

      // If it's an access denied error, redirect to access denied page
      if (
        decodedMessage.includes("Access denied") ||
        decodedMessage.includes("not authorized")
      ) {
        navigate("/access-denied", { replace: true });
        return;
      }

      setError(decodedMessage);
    }

    // Check if Google OAuth is available
    checkGoogleOAuthAvailability();
  }, [searchParams, navigate]);

  // Redirect if already authenticated
  useEffect(() => {
    console.log("AuthPage useEffect - auth state:", {
      isAuthenticated,
      isLoading,
    });
    if (!isLoading && isAuthenticated) {
      console.log("AuthPage: User is authenticated, redirecting to dashboard");
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Check for OAuth callback success
  useEffect(() => {
    const success = searchParams.get("success");
    if (success === "true") {
      // Force a fresh auth check after successful OAuth
      window.location.reload();
    }
  }, [searchParams]);

  const checkGoogleOAuthAvailability = async () => {
    try {
      const result = await authService.checkGoogleOAuthAvailability();
      setGoogleOAuthAvailable(result.available);
      if (!result.available) {
        setError(result.message);
      }
    } catch (error) {
      console.error("Failed to check Google OAuth availability:", error);
      setGoogleOAuthAvailable(false);
      setError("Failed to check authentication availability");
    }
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    setError("");

    // Redirect to Google OAuth
    window.location.href = authService.getGoogleLoginUrl();
  };

  const handleRetry = () => {
    setError("");
    setLoading(false);
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.headerSection}>
        <div className={styles.logoContainer}>
          <img src={logoImage} alt="EIS Service Logo" className={styles.logo} />
          <h1 className={styles.authTitle}>E.I.S Admin</h1>
        </div>
        <p className={styles.welcomeMessage}>
          Bun venit înapoi! Conectează-te pentru a accesa panoul de
          administrare.
        </p>
      </div>

      <div className={styles.authCard}>
        <div className={styles.permissionNotice}>
          <p className={styles.permissionText}>
            Doar persoanele cu permisiuni au dreptul de a accesa acest panou.
          </p>
        </div>
        {error && (
          <div className={styles.errorContainer}>
            <div className={styles.errorIcon}>⚠️</div>
            <div className={styles.errorContent}>
              <h3 className={styles.errorTitle}>Authentication Error</h3>
              <p className={styles.errorMessage}>{error}</p>
              <button
                className={styles.retryButton}
                onClick={handleRetry}
                disabled={loading}
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {!error && googleOAuthAvailable && (
          <div className={styles.authContent}>
            <div className={styles.loginSection}>
              <div className={styles.googleLoginContainer}>
                <button
                  className={styles.googleLoginButton}
                  onClick={handleGoogleLogin}
                  disabled={loading}
                >
                  {loading ? (
                    <div className={styles.loadingSpinner}></div>
                  ) : (
                    <>
                      <svg
                        className={styles.googleIcon}
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                      >
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Continue with Google
                    </>
                  )}
                </button>
              </div>

              <div className={styles.authInfo}>
                <p className={styles.infoText}>
                  You'll be redirected to Google to sign in securely
                </p>
              </div>
            </div>
          </div>
        )}

        <div className={styles.authFooter}>
          <p className={styles.footerText}>E.I.S. Service Admin Panel</p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
