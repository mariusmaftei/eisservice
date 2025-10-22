import styles from "./CategoryCard.module.css";
import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  // Convertim numele categoriei pentru URL
  const categorySlug = category.name.toLowerCase().replace(/\s+/g, "-");

  return (
    <Link
      to={`/solicita-serviciu/${categorySlug}/`}
      state={{
        categoryName: category.name,
        categoryImage: category.backgroundImage,
        categorySlug: categorySlug,
      }}
      className="block group"
    >
      <div className={styles.card}>
        <img
          src={category.backgroundImage || "/placeholder.svg"}
          alt={`${category.name} background`}
          className={styles.backgroundImage}
        />

        {/* Professional badge */}
        <div className={styles.badge}>
          <span className={styles.badgeText}>{category.name}</span>
        </div>

        {/* Hover overlay */}
        <div className={styles.overlay}></div>

        <div className={styles.content}>
          <div className={styles.topSection}>
            <div className={styles.providerCount}>
              <span className={styles.countNumber}>{category.count}</span>
              <span className={styles.countLabel}>furnizori</span>
            </div>
          </div>

          <div className={styles.middleSection}>
            <p className={styles.description}>{category.description}</p>
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
