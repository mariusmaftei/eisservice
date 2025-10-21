import { useParams, useLocation } from "react-router-dom";
import ClientServiceRequestForm from "../../components/UI/ClientServiceRequestForm/ClientServiceRequestForm";
import styles from "./RequestServicePage.module.css";

const RequestServicePage = () => {
  const { categorySlug } = useParams();
  const location = useLocation();
  const { categoryName, categoryImage } = location.state || {};

  const defaultCategoryName = categorySlug
    ? categorySlug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "Serviciu";
  const defaultCategoryImage =
    "/placeholder.svg?height=400&width=800&text=Imagine+Serviciu";

  return (
    <div className={styles.requestServicePage}>
      <div className={styles.header}>
        <img
          src={categoryImage || defaultCategoryImage}
          alt={categoryName || defaultCategoryName}
          className={styles.categoryImage}
        />
        <h1 className={styles.title}>
          Solicită Serviciul:{" "}
          <span className={styles.categoryName}>
            {categoryName || defaultCategoryName}
          </span>
        </h1>
        <p className={styles.description}>
          Completează formularul de mai jos pentru a solicita un specialist în{" "}
          <span className={styles.categoryName}>
            {categoryName || defaultCategoryName}
          </span>
          .
        </p>
      </div>

      <ClientServiceRequestForm
        serviceSubject={categoryName || defaultCategoryName}
      />
    </div>
  );
};

export default RequestServicePage;
