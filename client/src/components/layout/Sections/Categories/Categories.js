import CategoryCard from "../../../UI/CategoryCard/CategoryCard";
import styles from "./Categories.module.css";
import { Filter, X, RefreshCw, AlertCircle, Wifi, WifiOff } from "lucide-react";
import { useServiceContext } from "../../../../context/ServiceContext";
import { allCategories } from "../../../../constants/allCategories";
import { useState, useEffect } from "react";
import api from "../../../../services/api";

const Categories = () => {
  const { filterServices, searchPerformed, clearServices } =
    useServiceContext();
  const [visibleCount, setVisibleCount] = useState(6);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);

  // Fetch categories from API
  const fetchCategories = async (isManualRetry = false) => {
    try {
      if (isManualRetry) {
        setIsRetrying(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const response = await api.get("/api/categories");

      if (response.data.success) {
        setCategories(response.data.data);
        setRetryCount(0); // Reset retry count on success
      } else {
        throw new Error(response.data.message || "Failed to fetch categories");
      }
    } catch (err) {
      console.error("Error fetching categories:", err);

      let errorMessage = "Failed to fetch categories";
      let errorType = "unknown";

      if (err.response) {
        // Server responded with error status
        errorMessage =
          err.response.data?.message || `Server error: ${err.response.status}`;
        errorType = "server_error";
      } else if (err.request) {
        // Request was made but no response received
        errorMessage =
          "Secțiunea nu a fost încărcată cu succes. Te rugăm să reveniți mai târziu.";
        errorType = "connection_error";
      } else {
        // Something else happened
        errorMessage = "A apărut o eroare neașteptată";
        errorType = "unknown";
      }

      setError({
        message: errorMessage,
        type: errorType,
        originalError: err,
      });

      // Fallback to static categories if API fails
      setCategories(allCategories);
    } finally {
      setLoading(false);
      setIsRetrying(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Filter categories based on search
  const filteredCategories =
    searchPerformed && filterServices.length > 0
      ? categories.filter((category) =>
          filterServices.some(
            (service) =>
              (category.displayName || category.name)
                ?.toLowerCase()
                .includes(service.toLowerCase()) ||
              category.name?.toLowerCase().includes(service.toLowerCase())
          )
        )
      : categories;

  // Categoriile vizibile bazate pe visibleCount
  const visibleCategories = filteredCategories.slice(0, visibleCount);
  const hasMoreCategories = visibleCount < filteredCategories.length;

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
    fetchCategories(true);
  };

  return (
    <section
      id="servicii-populare"
      className={`${styles.section} container mx-auto`}
      style={{ position: "relative", zIndex: 10 }}
    >
      <div className={styles.header}>
        <div>
          <span className={styles.badge}>EXPLOREAZĂ CATEGORII</span>
          <h2 className={styles.title}>
            {searchPerformed && filterServices.length > 0
              ? "Servicii filtrate"
              : "Servicii populare"}
          </h2>
        </div>

        <div className="flex items-center">
          {searchPerformed && filterServices.length > 0 && (
            <div className={styles.filterInfo}>
              <Filter size={16} className="mr-1" />
              <span>Filtrat: {filterServices.join(", ")}</span>
              <button
                onClick={clearServices}
                className={styles.clearFilter}
                title="Șterge filtrele"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>Se încarcă categoriile...</p>
        </div>
      ) : error ? (
        <div className={styles.errorContainer}>
          <div className={styles.errorIcon}>
            {error.type === "connection_error" ? (
              <WifiOff size={48} />
            ) : (
              <AlertCircle size={48} />
            )}
          </div>
          <h3 className={styles.errorTitle}>
            {error.type === "connection_error"
              ? "Secțiunea nu a fost încărcată"
              : "Eroare la încărcare"}
          </h3>
          <p className={styles.errorMessage}>{error.message}</p>
          <div className={styles.errorActions}>
            <button
              onClick={handleRetry}
              className={styles.retryButton}
              disabled={isRetrying}
            >
              <RefreshCw
                size={20}
                className={isRetrying ? styles.spinning : ""}
              />
              {isRetrying ? "Se încearcă..." : "Încearcă din nou"}
            </button>
            {retryCount > 0 && (
              <p className={styles.retryCount}>Tentative: {retryCount}</p>
            )}
          </div>
          <div className={styles.fallbackInfo}>
            <p>
              Folosim categoriile salvate local pentru a continua navigarea.
            </p>
          </div>
        </div>
      ) : filteredCategories.length > 0 ? (
        <>
          <div className={styles.grid}>
            {visibleCategories.map((category) => (
              <CategoryCard
                key={
                  category._id || category.id || category.slug || category.name
                }
                category={category}
              />
            ))}
          </div>

          {/* Load More Button */}
          {hasMoreCategories && (
            <div className={styles.loadMoreContainer}>
              <button
                onClick={handleLoadMore}
                className={styles.loadMoreButton}
              >
                Încarcă mai mult
                <svg
                  className={styles.loadMoreIcon}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          )}
        </>
      ) : (
        <div className={styles.noResults}>
          <p>Nu s-au găsit servicii care să corespundă căutării.</p>
          <button onClick={clearServices} className={styles.resetButton}>
            Resetează filtrele
          </button>
        </div>
      )}
    </section>
  );
};

export default Categories;
