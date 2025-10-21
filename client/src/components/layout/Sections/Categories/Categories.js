import CategoryCard from "../../../UI/CategoryCard/CategoryCard";
import styles from "./Categories.module.css";
import { Filter, X } from "lucide-react";
import { useServiceContext } from "../../../../context/ServiceContext";
import { allCategories } from "../../../../constants/allCategories";
import { useState } from "react";

const Categories = () => {
  const { filterServices, searchPerformed, clearServices } =
    useServiceContext();
  const [visibleCount, setVisibleCount] = useState(6);

  const categories =
    searchPerformed && filterServices.length > 0
      ? allCategories.filter((category) =>
          filterServices.some(
            (service) => category.name.toLowerCase() === service.toLowerCase()
          )
        )
      : allCategories;

  // Categoriile vizibile bazate pe visibleCount
  const visibleCategories = categories.slice(0, visibleCount);
  const hasMoreCategories = visibleCount < categories.length;

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

      {categories.length > 0 ? (
        <>
          <div className={styles.grid}>
            {visibleCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
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
