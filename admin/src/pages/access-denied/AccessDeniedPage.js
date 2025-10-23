import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.js";
import styles from "./AccessDeniedPage.module.css";
import logoImage from "../../assets/images/logo/eis-service-logo.webp";

const AccessDeniedPage = () => {
  const { getUserDisplayName, isAdmin } = useAuth();
  const location = useLocation();

  // Get the attempted path from location state
  const attemptedPath = location.state?.from?.pathname || location.pathname;
  const isAdminRoute = attemptedPath?.includes("/admin");

  return (
    <div className={styles.authContainer}>
      <div className={styles.headerSection}>
        <div className={styles.logoContainer}>
          <img src={logoImage} alt="EIS Service Logo" className={styles.logo} />
          <h1 className={styles.authTitle}>E.I.S Admin</h1>
        </div>
        <p className={styles.welcomeMessage}>
          Acces interzis! Nu aveți permisiunile necesare pentru a accesa această
          pagină.
        </p>
      </div>

      <div className={styles.authCard}>
        <div className={styles.permissionNotice}>
          <p className={styles.permissionText}>
            Doar persoanele cu permisiuni au dreptul de a accesa acest panou.
          </p>
        </div>
        <div className={styles.iconContainer}>
          <svg
            className={styles.icon}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>

        <div className={styles.textContainer}>
          <h1 className={styles.title}>Acces Refuzat</h1>
          <p className={styles.subtitle}>
            Nu aveți permisiunea de a accesa această pagină
          </p>
          <p className={styles.description}>
            {isAdminRoute ? (
              <>
                Contul dumneavoastră ({getUserDisplayName()}) nu are
                privilegiile de administrator necesare pentru a accesa panoul de
                administrare. Vă rugăm să contactați administratorul dacă
                credeți că aceasta este o eroare.
              </>
            ) : (
              <>
                Adresa dumneavoastră de email ({getUserDisplayName()}) nu este
                autorizată să acceseze această resursă. Vă rugăm să contactați
                administratorul dacă credeți că aceasta este o eroare.
              </>
            )}
          </p>
          {attemptedPath && (
            <p className={styles.attemptedPath}>
              Încercat să acceseze: <code>{attemptedPath}</code>
            </p>
          )}
        </div>

        <div className={styles.actions}>
          <Link to="/" className={styles.homeButton}>
            <svg
              className={styles.homeIcon}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Mergi la Dashboard
          </Link>
        </div>

        <div className={styles.authFooter}>
          <p className={styles.footerText}>
            Ai nevoie de ajutor? Contactează administratorul sistemului pentru
            permisiuni de acces.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccessDeniedPage;
