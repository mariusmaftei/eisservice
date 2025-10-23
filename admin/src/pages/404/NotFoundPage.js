import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";
import logoImage from "../../assets/images/logo/eis-service-logo.webp";

const NotFoundPage = () => {
  return (
    <div className={styles.authContainer}>
      <div className={styles.headerSection}>
        <div className={styles.logoContainer}>
          <img src={logoImage} alt="EIS Service Logo" className={styles.logo} />
          <h1 className={styles.authTitle}>E.I.S 404</h1>
        </div>
        <p className={styles.welcomeMessage}>
          Pagina căutată nu a fost găsită! Verificați adresa URL sau navigați
          înapoi la dashboard.
        </p>
      </div>

      <div className={styles.authCard}>
        <div className={styles.permissionNotice}>
          <p className={styles.permissionText}>
            Pagina pe care o căutați nu există sau a fost mutată.
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
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 6.291A7.962 7.962 0 0012 5c-2.34 0-4.29 1.009-5.824 2.709"
            />
          </svg>
        </div>

        <div className={styles.textContainer}>
          <h1 className={styles.title}>404</h1>
          <p className={styles.subtitle}>Pagina nu a fost găsită</p>
          <p className={styles.description}>
            Pagina pe care o căutați nu există sau a fost mutată. Vă rugăm să
            verificați adresa URL sau să navigați înapoi la dashboard.
          </p>
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

          <button
            className={styles.backButton}
            onClick={() => window.history.back()}
          >
            <svg
              className={styles.backIcon}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Mergi înapoi
          </button>
        </div>

        <div className={styles.authFooter}>
          <p className={styles.footerText}>
            Dacă credeți că aceasta este o eroare, vă rugăm să contactați
            administratorul sistemului.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
