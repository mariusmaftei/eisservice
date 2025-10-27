import styles from "./CategoryCard.module.css";
import { Link, useParams } from "react-router-dom";
import { contactInfo } from "../../../config/contactInfo";

const CategoryCard = ({ category }) => {
  const params = useParams();
  // Helper to get slug from nested or flat structure
  const getCategorySlug = () => {
    if (category.categoryInformation?.slug) {
      return category.categoryInformation.slug;
    }
    if (category.slug) {
      return category.slug;
    }
    return category.name?.toLowerCase().replace(/\s+/g, "-");
  };

  // Helper to get display name from nested or flat structure
  const getCategoryName = () => {
    return (
      category.categoryInformation?.displayName ||
      category.categoryInformation?.name ||
      category.displayName ||
      category.name
    );
  };

  // Helper to get image from nested or flat structure
  const getCategoryImage = () => {
    return (
      category.categoryInformation?.imageUrl ||
      category.image ||
      category.backgroundImage
    );
  };

  // Helper to get description from nested or flat structure
  const getCategoryDescription = () => {
    return (
      category.categoryInformation?.description ||
      category.categoryInformation?.shortDescription ||
      category.description ||
      category.shortDescription
    );
  };

  // Helper to get provider count from nested or flat structure
  const getProviderCount = () => {
    return (
      category.categoryInformation?.providerCount ||
      category.providerCount ||
      category.count ||
      "N/A"
    );
  };

  const categorySlug = getCategorySlug();
  const categoryName = getCategoryName();
  const categoryImage = getCategoryImage();
  const categoryDescription = getCategoryDescription();

  // Get city from URL params first, then category data, then default city
  // This ensures links work correctly when on a city-specific page
  const urlCity = params.city;
  const categoryCity = urlCity || category.city || contactInfo.defaultCity;

  return (
    <Link
      to={`/${categoryCity}/${categorySlug}`}
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
              <span className={styles.countNumber}>{getProviderCount()}</span>
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
