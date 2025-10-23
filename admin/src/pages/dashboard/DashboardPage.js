import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./DashboardPage.module.css";
import { categoryAPI } from "../../service/api";

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalCategories: 0,
    activeCategories: 0,
    inactiveCategories: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await categoryAPI.getAll();
      const categories = response.data;

      setStats({
        totalCategories: categories.length,
        activeCategories: categories.filter((c) => c.isActive).length,
        inactiveCategories: categories.filter((c) => !c.isActive).length,
      });
    } catch (err) {
      console.error("Error fetching stats:", err);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    {
      title: "Gestionează Categoriile",
      description: "Creează, editează și gestionează categoriile de servicii",
      link: "/categories",
      icon: "📂",
      color: "#174bdd",
    },
    {
      title: "Vezi Furnizorii",
      description: "Gestionează furnizorii de servicii și profilurile lor",
      link: "/providers",
      icon: "👥",
      color: "#059669",
    },
    {
      title: "Gestionarea Clienților",
      description: "Vezi și gestionează cererile și datele clienților",
      link: "/clients",
      icon: "👤",
      color: "#dc2626",
    },
    {
      title: "Setări",
      description: "Configurează setările platformei și preferințele",
      link: "/settings",
      icon: "⚙️",
      color: "#7c3aed",
    },
  ];

  return (
    <div className={styles.dashboardPage}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <h1 className={styles.mainTitle}>Panou de Administrare</h1>
        <p className={styles.mainDescription}>
          Bine ai venit în panoul de administrare E.I.S. Service
        </p>
      </div>

      {loading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <h2>Se încarcă panoul...</h2>
        </div>
      ) : (
        <>
          {/* Stats Overview */}
          <div className={styles.statsSection}>
            <div className={styles.statsContainer}>
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <div className={styles.statIcon}>📊</div>
                  <div className={styles.statContent}>
                    <h3 className={styles.statNumber}>
                      {stats.totalCategories}
                    </h3>
                    <p className={styles.statLabel}>Categorii Totale</p>
                  </div>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statIcon}>✅</div>
                  <div className={styles.statContent}>
                    <h3 className={styles.statNumber}>
                      {stats.activeCategories}
                    </h3>
                    <p className={styles.statLabel}>Categorii Active</p>
                  </div>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statIcon}>⏸️</div>
                  <div className={styles.statContent}>
                    <h3 className={styles.statNumber}>
                      {stats.inactiveCategories}
                    </h3>
                    <p className={styles.statLabel}>Categorii Inactive</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className={styles.quickActions}>
            <div className={styles.quickActionsContainer}>
              <h2 className={styles.sectionTitle}>Acțiuni Rapide</h2>
              <div className={styles.actionsGrid}>
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    to={action.link}
                    className={styles.actionCard}
                    style={{ "--action-color": action.color }}
                  >
                    <div className={styles.actionIcon}>{action.icon}</div>
                    <div className={styles.actionContent}>
                      <h3 className={styles.actionTitle}>{action.title}</h3>
                      <p className={styles.actionDescription}>
                        {action.description}
                      </p>
                    </div>
                    <div className={styles.actionArrow}>→</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className={styles.recentActivity}>
            <div className={styles.recentActivityContainer}>
              <h2 className={styles.sectionTitle}>Activitate Recentă</h2>
              <div className={styles.activityCard}>
                <div className={styles.activityItem}>
                  <div className={styles.activityIcon}>📝</div>
                  <div className={styles.activityContent}>
                    <p className={styles.activityText}>
                      Sistemul de gestionare a categoriilor este gata
                    </p>
                    <span className={styles.activityTime}>Chiar acum</span>
                  </div>
                </div>

                <div className={styles.activityItem}>
                  <div className={styles.activityIcon}>🚀</div>
                  <div className={styles.activityContent}>
                    <p className={styles.activityText}>
                      Panoul de administrare a fost inițializat cu succes
                    </p>
                    <span className={styles.activityTime}>Chiar acum</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardPage;
