"use client";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SuccessModal.module.css";

const SuccessModal = ({ isOpen, onClose, title, message, emailMessage }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = () => {
    onClose();
    navigate("/");
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleBackdropClick}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <div className={styles.successIcon}>
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="10" fill="#10B981" />
              <path
                d="M9 12l2 2 4-4"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className={styles.modalTitle}>{title}</h2>
        </div>

        <div className={styles.modalBody}>
          <p className={styles.mainMessage}>{message}</p>

          <div className={styles.emailSection}>
            <div className={styles.emailIcon}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="2"
                  y="4"
                  width="20"
                  height="16"
                  rx="2"
                  fill="#3B82F6"
                />
                <path
                  d="M22 6L12 13L2 6"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className={styles.emailMessage}>{emailMessage}</p>
          </div>

          <div className={styles.infoBox}>
            <h3 className={styles.infoTitle}>Ce urmează?</h3>
            <ul className={styles.infoList}>
              <li>Veți primi un email de confirmare în câteva minute</li>
              <li>Echipa noastră va analiza solicitarea dumneavoastră</li>
              <li>Vă vom contacta în cel mai scurt timp posibil</li>
              <li>Verificați și folderul de spam/junk mail</li>
            </ul>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.closeButton} onClick={handleClose}>
            Înțeles, mergi la pagina principală
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
