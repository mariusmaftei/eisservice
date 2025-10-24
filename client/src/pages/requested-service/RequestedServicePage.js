import { useParams, useLocation } from "react-router-dom";
import ClientServiceRequestForm from "../../components/UI/ClientServiceRequestForm/ClientServiceRequestForm";
import Meta from "../../components/SEO/Meta";
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

  // Generate SEO data for the requested service page
  const seoTitle = `Solicită ${
    categoryName || defaultCategoryName
  } - eisservice.ro`;
  const seoDescription = `Completează formularul pentru a solicita un specialist în ${
    categoryName || defaultCategoryName
  }. Servicii profesionale verificate în România.`;
  const seoUrl = `https://eisservice.ro/requested-service/${categorySlug}`;

  return (
    <>
      <Meta
        title={seoTitle}
        description={seoDescription}
        url={seoUrl}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: `${
            categoryName || defaultCategoryName
          } - Servicii Profesionale`,
          description: seoDescription,
          provider: {
            "@type": "Organization",
            name: "E.I.S. SERVICE COMPLETE S.R.L.",
            url: "https://eisservice.ro",
          },
          areaServed: {
            "@type": "Country",
            name: "Romania",
          },
          url: seoUrl,
        }}
      />
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
    </>
  );
};

export default RequestServicePage;
