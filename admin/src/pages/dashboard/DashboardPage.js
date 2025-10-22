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
      title: "Manage Categories",
      description: "Create, edit, and manage service categories",
      link: "/categories",
      icon: "📂",
      color: "#174bdd",
    },
    {
      title: "View Providers",
      description: "Manage service providers and their profiles",
      link: "/providers",
      icon: "👥",
      color: "#059669",
    },
    {
      title: "Client Management",
      description: "View and manage client requests and data",
      link: "/clients",
      icon: "👤",
      color: "#dc2626",
    },
    {
      title: "Settings",
      description: "Configure platform settings and preferences",
      link: "/settings",
      icon: "⚙️",
      color: "#7c3aed",
    },
  ];

  return (
    <div className={styles.dashboardPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Admin Dashboard</h1>
          <p className={styles.subtitle}>
            Welcome to the E.I.S. Service admin panel
          </p>
        </div>

        {loading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}></div>
            <p>Loading dashboard...</p>
          </div>
        ) : (
          <>
            {/* Stats Overview */}
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>📊</div>
                <div className={styles.statContent}>
                  <h3 className={styles.statNumber}>{stats.totalCategories}</h3>
                  <p className={styles.statLabel}>Total Categories</p>
                </div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statIcon}>✅</div>
                <div className={styles.statContent}>
                  <h3 className={styles.statNumber}>
                    {stats.activeCategories}
                  </h3>
                  <p className={styles.statLabel}>Active Categories</p>
                </div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statIcon}>⏸️</div>
                <div className={styles.statContent}>
                  <h3 className={styles.statNumber}>
                    {stats.inactiveCategories}
                  </h3>
                  <p className={styles.statLabel}>Inactive Categories</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className={styles.quickActions}>
              <h2 className={styles.sectionTitle}>Quick Actions</h2>
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

            {/* Recent Activity */}
            <div className={styles.recentActivity}>
              <h2 className={styles.sectionTitle}>Recent Activity</h2>
              <div className={styles.activityCard}>
                <div className={styles.activityItem}>
                  <div className={styles.activityIcon}>📝</div>
                  <div className={styles.activityContent}>
                    <p className={styles.activityText}>
                      Category management system is ready
                    </p>
                    <span className={styles.activityTime}>Just now</span>
                  </div>
                </div>

                <div className={styles.activityItem}>
                  <div className={styles.activityIcon}>🚀</div>
                  <div className={styles.activityContent}>
                    <p className={styles.activityText}>
                      Admin panel initialized successfully
                    </p>
                    <span className={styles.activityTime}>Just now</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
