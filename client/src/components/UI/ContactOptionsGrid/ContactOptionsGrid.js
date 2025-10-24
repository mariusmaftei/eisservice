import ContactOptionCard from "../ContactOptionCard/ContactOptionCard";
import styles from "./ContactOptionsGrid.module.css";

const ContactOptionsGrid = ({
  options = [],
  title = "Alege modalitatea de contact",
  description = "Începe procesul prin modalitatea care ți se potrivește cel mai bine",
  className = "",
}) => {
  if (!options || options.length === 0) {
    return null;
  }

  return (
    <div className={`${styles.optionsSection} ${className}`}>
      <div className={styles.optionsContainer}>
        {title && <h2 className={styles.optionsTitle}>{title}</h2>}
        {description && (
          <p className={styles.optionsDescription}>{description}</p>
        )}

        <div className={styles.optionsGrid}>
          {options.map((option) => (
            <ContactOptionCard
              key={option.id}
              id={option.id}
              title={option.title}
              subtitle={option.subtitle}
              icon={option.icon}
              features={option.features}
              buttonText={option.buttonText}
              onClick={option.action}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactOptionsGrid;
