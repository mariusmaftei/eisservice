import styles from "./CategoryCard.module.css";
import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  // Handle both database categories (with slug) and static categories (with id)
  const categorySlug =
    category.slug || category.name?.toLowerCase().replace(/\s+/g, "-");
  const categoryName = category.displayName || category.name;
  const categoryImage = category.image || category.backgroundImage;
  const categoryDescription = category.description || category.shortDescription;

  return (
    <Link
      to={`/solicita-serviciu/${categorySlug}`}
      state={{
        categoryName: categoryName,
        categoryImage: categoryImage,
        categorySlug: categorySlug,
      }}
      className="block group"
    >
      <div className={styles.card}>
        <img
          src={categoryImage || "/placeholder.svg"}
          alt={`${categoryName} background`}
          className={styles.backgroundImage}
        />

        {/* Professional badge */}
        <div className={styles.badge}>
          <span className={styles.badgeText}>{categoryName}</span>
        </div>

        {/* Hover overlay */}
        <div className={styles.overlay}></div>

        <div className={styles.content}>
          <div className={styles.topSection}>
            <div className={styles.providerCount}>
              <span className={styles.countNumber}>
                {category.providerCount || category.count || "N/A"}
              </span>
              <span className={styles.countLabel}>furnizori</span>
            </div>
          </div>

          <div className={styles.middleSection}>
            <p className={styles.description}>{categoryDescription}</p>
          </div>

          <div className={styles.bottomSection}>
            <div className={styles.actionButton}>
              <span className={styles.buttonText}>Vezi opțiuni contact</span>
              <svg
                className={styles.arrowIcon}
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
