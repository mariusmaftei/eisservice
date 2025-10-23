import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import EISLogo from "../../../assets/images/logo/eis-service-logo.webp";
import { useAuth } from "../../../context/AuthContext.js";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout, getUserDisplayName, getUserInitials, isAdmin } =
    useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      setIsUserMenuOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.navbarContent}>
          <div className={styles.logoWrapper}>
            <Link to="/" className={styles.logoLink}>
              <div className={styles.logoContainer}>
                <img src={EISLogo} alt="E.I.S. Logo" className={styles.logo} />
              </div>
              <span className={styles.logoText}>E.I.S. Administrare</span>
            </Link>
          </div>

          <div className={styles.desktopNav}>
            <Link to="/" className={styles.navLink}>
              Panou Principal
            </Link>
            <Link to="/categories" className={styles.navLink}>
              Categorii
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

          <div className={styles.userSection}>
            <div className={styles.userMenu}>
              <button
                className={styles.userButton}
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                aria-label="User menu"
              >
                {user?.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt="Profile"
                    className={styles.userAvatar}
                  />
                ) : (
                  <div className={styles.userInitials}>{getUserInitials()}</div>
                )}
                <span className={styles.userName}>{getUserDisplayName()}</span>
                <svg
                  className={`${styles.dropdownIcon} ${
                    isUserMenuOpen ? styles.dropdownIconOpen : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isUserMenuOpen && (
                <div className={styles.userDropdown}>
                  <div className={styles.userInfo}>
                    <div className={styles.userInfoName}>
                      {getUserDisplayName()}
                    </div>
                    <div className={styles.userInfoEmail}>{user?.email}</div>
                    {isAdmin() && (
                      <div className={styles.userInfoRole}>Administrator</div>
                    )}
                  </div>
                  <div className={styles.userDropdownDivider}></div>
                  <button
                    className={styles.logoutButton}
                    onClick={handleLogout}
                  >
                    <svg
                      className={styles.logoutIcon}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span>Deconectare</span>
                  </button>
                </div>
              )}
            </div>
          </div>
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
                  Panou Principal
                </Link>
                <Link
                  to="/categories"
                  className={styles.mobileNavLink}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Categorii
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
