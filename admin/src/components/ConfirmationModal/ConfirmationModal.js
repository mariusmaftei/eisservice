import React from "react";
import styles from "./ConfirmationModal.module.css";
import { AlertTriangle, X } from "lucide-react";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmare",
  message = "Ești sigur că vrei să continui?",
  confirmText = "Confirmă",
  cancelText = "Anulează",
  type = "warning", // warning, danger, info
  isLoading = false,
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleConfirm = () => {
    onConfirm();
  };

  const getIconColor = () => {
    switch (type) {
      case "danger":
        return "#ef4444";
      case "info":
        return "#3b82f6";
      case "warning":
      default:
        return "#f59e0b";
    }
  };

  const getConfirmButtonClass = () => {
    switch (type) {
      case "danger":
        return styles.dangerButton;
      case "info":
        return styles.infoButton;
      case "warning":
      default:
        return styles.warningButton;
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleBackdropClick}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <div className={styles.titleContainer}>
            <AlertTriangle
              size={24}
              className={styles.icon}
              style={{ color: getIconColor() }}
            />
            <h3 className={styles.title}>{title}</h3>
          </div>
          <button
            onClick={onClose}
            className={styles.closeButton}
            disabled={isLoading}
          >
            <X size={20} />
          </button>
        </div>

        <div className={styles.modalBody}>
          <p className={styles.message}>{message}</p>
        </div>

        <div className={styles.modalFooter}>
          <button
            onClick={onClose}
            className={styles.cancelButton}
            disabled={isLoading}
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className={`${styles.confirmButton} ${getConfirmButtonClass()}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className={styles.loadingSpinner}></div>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
