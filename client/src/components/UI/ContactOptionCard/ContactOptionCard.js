import styles from "./ContactOptionCard.module.css";

const ContactOptionCard = ({
  id,
  title,
  subtitle,
  icon: IconComponent,
  features = [],
  buttonText,
  onClick,
  className = "",
}) => {
  return (
    <div className={`${styles.optionCard} ${className}`} onClick={onClick}>
      <div className={styles.cardHeader}>
        <div className={styles.iconWrapper}>
          <IconComponent size={32} className={styles.cardIcon} />
        </div>
        <h2 className={styles.cardTitle}>{title}</h2>
        <p className={styles.cardSubtitle}>{subtitle}</p>
      </div>

      <div className={styles.cardContent}>
        <ul className={styles.featureList}>
          {features.map((feature, featureIndex) => {
            const FeatureIcon = feature.icon;
            return (
              <li key={featureIndex} className={styles.featureItem}>
                <FeatureIcon size={16} />
                <span>{feature.text}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className={styles.cardFooter}>
        <button className={styles.actionButton}>
          {buttonText}
          <IconComponent size={16} className={styles.buttonIcon} />
        </button>
      </div>
    </div>
  );
};

export default ContactOptionCard;
