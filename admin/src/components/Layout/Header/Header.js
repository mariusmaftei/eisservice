import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import EISLogo from "../../../assets/images/logo/eis-service-logo.webp";
import { contactInfo } from "../../../config/contactInfo";
import { FaPhoneAlt } from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.navbarContent}>
          <div className={styles.logoWrapper}>
            <Link to="/" className={styles.logoLink}>
              <div className={styles.logoContainer}>
                <img src={EISLogo} alt="E.I.S. Logo" className={styles.logo} />
              </div>
              <span className={styles.logoText}>E.I.S. Admin</span>
            </Link>
          </div>

          <div className={styles.desktopNav}>
            <Link to="/" className={styles.navLink}>
              Dashboard
            </Link>
            <Link to="/categories" className={styles.navLink}>
              Categories
            </Link>
            <Link to="/providers" className={styles.navLink}>
              Providers
            </Link>
            <Link to="/clients" className={styles.navLink}>
              Clients
            </Link>
            <Link to="/settings" className={styles.navLink}>
              Settings
            </Link>
          </div>

          <div className={styles.mobileMenuButton}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={styles.menuToggle}
              aria-label="Toggle menu"
            >
              <svg
                className={styles.menuIcon}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          <a
            href={`tel:${contactInfo.phoneFormatted}`}
            className={styles.phoneLink}
          >
            <FaPhoneAlt className={styles.phoneIcon} aria-hidden="true" />
            <span className={styles.phoneText}>{contactInfo.phone}</span>
          </a>
        </div>

        {/* Mobile Menu and Overlay */}
        {isMenuOpen && (
          <>
            <div
              className={styles.mobileMenuOverlay}
              onClick={() => setIsMenuOpen(false)}
            ></div>
            <div className={styles.mobileMenu}>
              <div className={styles.mobileMenuContent}>
                <Link
                  to="/"
                  className={styles.mobileNavLink}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/categories"
                  className={styles.mobileNavLink}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Categories
                </Link>
                <Link
                  to="/providers"
                  className={styles.mobileNavLink}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Providers
                </Link>
                <Link
                  to="/clients"
                  className={styles.mobileNavLink}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Clients
                </Link>
                <Link
                  to="/settings"
                  className={styles.mobileNavLink}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Settings
                </Link>
                <a
                  href={`tel:${contactInfo.phoneFormatted}`}
                  className={styles.mobilePhoneLink}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaPhoneAlt className={styles.phoneIcon} aria-hidden="true" />
                  <span className={styles.phoneText}>{contactInfo.phone}</span>
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
