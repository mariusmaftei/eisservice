import CategoryCard from "../../../UI/CategoryCard/CategoryCard";
import styles from "./Categories.module.css";
import { Filter, X } from "lucide-react";
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

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get("/api/categories");

        if (response.data.success) {
          setCategories(response.data.data);
        } else {
          throw new Error(
            response.data.message || "Failed to fetch categories"
          );
        }
      } catch (err) {
        console.error("Error fetching categories:", err);

        if (err.response) {
          // Server responded with error status
          setError(
            err.response.data?.message || `Server error: ${err.response.status}`
          );
        } else if (err.request) {
          // Request was made but no response received
          setError(
            "Server returned HTML instead of JSON. Please check if the server is running."
          );
        } else {
          // Something else happened
          setError("Failed to fetch categories");
        }

        // Fallback to static categories if API fails
        setCategories(allCategories);
      } finally {
        setLoading(false);
      }
    };

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
          <p>Se încarcă categoriile...</p>
        </div>
      ) : error ? (
        <div className={styles.errorContainer}>
          <p>Eroare la încărcarea categoriilor: {error}</p>
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
