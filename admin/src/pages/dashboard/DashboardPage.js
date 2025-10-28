import React, { useState, useEffect } from "react";
import styles from "./DashboardPage.module.css";
import { categoryAPI } from "../../service/api";

// List of all 41 Romanian counties
const ROMANIAN_COUNTIES = [
  "Alba",
  "Arad",
  "Argeș",
  "Bacău",
  "Bihor",
  "Bistrița-Năsăud",
  "Botoșani",
  "Brăila",
  "Brașov",
  "București",
  "Buzău",
  "Caraș-Severin",
  "Călărași",
  "Cluj",
  "Constanța",
  "Covasna",
  "Dâmbovița",
  "Dolj",
  "Galați",
  "Giurgiu",
  "Gorj",
  "Harghita",
  "Hunedoara",
  "Ialomița",
  "Iași",
  "Ilfov",
  "Maramureș",
  "Mehedinți",
  "Mureș",
  "Neamț",
  "Olt",
  "Prahova",
  "Sălaj",
  "Satu Mare",
  "Sibiu",
  "Suceava",
  "Teleorman",
  "Timiș",
  "Tulcea",
  "Vâlcea",
  "Vaslui",
  "Vrancea",
];

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalCategories: 0,
    activeCategories: 0,
    inactiveCategories: 0,
  });
  const [loading, setLoading] = useState(true);
  const [countyProviderCounts, setCountyProviderCounts] = useState({});

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

      // Count providers per county
      const countyCounts = {};
      categories.forEach((category) => {
        const county = category.prestatoriValabili;
        if (county && county.trim() !== "") {
          countyCounts[county] = (countyCounts[county] || 0) + 1;
        }
      });
      setCountyProviderCounts(countyCounts);
    } catch (err) {
      console.error("Error fetching stats:", err);
    } finally {
      setLoading(false);
    }
  };

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

          {/* Providers by County */}
          <div className={styles.countyProvidersSection}>
            <div className={styles.countyProvidersContainer}>
              <h2 className={styles.sectionTitle}>Furnizori pe Județe</h2>
              <p className={styles.sectionSubtitle}>
                Distribuția prestatorilor de servicii pe județele din România
              </p>
              <div className={styles.countiesGrid}>
                {ROMANIAN_COUNTIES.map((county, index) => {
                  const count = countyProviderCounts[county] || 0;
                  return (
                    <div key={index} className={styles.countyCard}>
                      <div className={styles.countyHeader}>
                        <span className={styles.countyName}>{county}</span>
                        <span className={styles.providerCount}>{count}</span>
                      </div>
                      <div className={styles.providerLabel}>
                        {count === 1 ? "prestator" : "prestatori"}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardPage;
