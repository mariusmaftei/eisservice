import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import styles from "./TrustBadge.module.css";

const TrustBadge = ({ text, icon: Icon = CheckCircle, onClick, className }) => {
  return (
    <motion.button
      className={`${styles.trustBadge} ${className || ""}`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
    >
      <Icon size={16} />
      <span>{text}</span>
    </motion.button>
  );
};

export default TrustBadge;

