import React from "react";
import { motion } from "framer-motion";
import styles from "./Button.module.css";

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  onClick,
  disabled = false,
  className = "",
  icon,
  iconPosition = "right",
  fullWidth = false,
  ...props
}) => {
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const iconElement = icon && <span className={styles.icon}>{icon}</span>;

  return (
    <motion.button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {icon && iconPosition === "left" && iconElement}
      <span className={styles.content}>{children}</span>
      {icon && iconPosition === "right" && iconElement}
    </motion.button>
  );
};

export default Button;
