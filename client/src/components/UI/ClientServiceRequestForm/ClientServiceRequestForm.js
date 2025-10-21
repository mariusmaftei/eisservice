"use client";

import { useState } from "react";
import styles from "./ClientServiceRequestForm.module.css";
import { clientServices } from "../../../services/client-services.js";
import SuccessModal from "../SuccessModal/SuccessModal";

const ClientServiceRequestForm = ({ serviceSubject = "" }) => {
  const [formData, setFormData] = useState({
    nume: "",
    prenume: "",
    localitate: "",
    telefon: "",
    email: "",
    subiect: serviceSubject,
    descriereServiciu: "",
    gdprConsent: {
      dataProcessingConsent: false,
      privacyPolicyAccepted: false,
      marketingConsent: false,
      timestamp: null,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const romanianCounties = [
    "Alba",
    "Arad",
    "Argeș",
    "Bacău",
    "Bihor",
    "Bistrița-Năsăud",
    "Botoșani",
    "Brașov",
    "Brăila",
    "București (municipiu cu statut de județ)",
    "Buzău",
    "Caraș-Severin",
    "Călărași",
    "Cluj",
    "Constanța",
    "Covasna",
    "Dâmbovița",
    "Dolj",
    "Galați",
    "Giurgiu",
    "Gorj",
    "Harghita",
    "Hunedoara",
    "Ialomița",
    "Iași",
    "Ilfov",
    "Maramureș",
    "Mehedinți",
    "Mureș",
    "Neamț",
    "Olt",
    "Prahova",
    "Sălaj",
    "Satu Mare",
    "Sibiu",
    "Suceava",
    "Teleorman",
    "Timiș",
    "Tulcea",
    "Vâlcea",
    "Vaslui",
    "Vrancea",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear specific field error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleConsentChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      gdprConsent: {
        ...prevData.gdprConsent,
        [name]: checked,
        timestamp: checked
          ? new Date().toISOString()
          : prevData.gdprConsent.timestamp,
      },
    }));

    // Clear consent errors when user checks boxes
    if (formErrors.gdprConsent || formErrors.privacyPolicy) {
      setFormErrors((prev) => ({
        ...prev,
        gdprConsent: "",
        privacyPolicy: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");
    setFormErrors({});

    // Validate form data
    const validation = clientServices.validateClientForm(formData);

    if (!validation.isValid) {
      setFormErrors(validation.errors);
      setIsSubmitting(false);
      setSubmitMessage("Vă rugăm să corectați erorile din formular.");
      return;
    }

    try {
      // Send form data to backend
      const result = await clientServices.sendServiceRequest(formData);

      if (result.success) {
        // Reset form on success
        setFormData({
          nume: "",
          prenume: "",
          localitate: "",
          telefon: "",
          email: "",
          subiect: serviceSubject,
          descriereServiciu: "",
          gdprConsent: {
            dataProcessingConsent: false,
            privacyPolicyAccepted: false,
            marketingConsent: false,
            timestamp: null,
          },
        });
        setShowSuccessModal(true);
      } else {
        setSubmitMessage(result.message);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitMessage(
        "A apărut o eroare neașteptată. Vă rugăm să încercați din nou."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit =
    formData.gdprConsent.dataProcessingConsent &&
    formData.gdprConsent.privacyPolicyAccepted &&
    !isSubmitting;

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Solicită un Serviciu</h2>

      {submitMessage && (
        <div
          className={`${styles.message} ${
            submitMessage.includes("succes") ? styles.success : styles.error
          }`}
        >
          {submitMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="nume" className={styles.label}>
              Nume:
            </label>
            <input
              type="text"
              id="nume"
              name="nume"
              value={formData.nume}
              onChange={handleChange}
              className={`${styles.input} ${
                formErrors.nume ? styles.inputError : ""
              }`}
              required
            />
            {formErrors.nume && (
              <span className={styles.errorText}>{formErrors.nume}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="prenume" className={styles.label}>
              Prenume:
            </label>
            <input
              type="text"
              id="prenume"
              name="prenume"
              value={formData.prenume}
              onChange={handleChange}
              className={`${styles.input} ${
                formErrors.prenume ? styles.inputError : ""
              }`}
              required
            />
            {formErrors.prenume && (
              <span className={styles.errorText}>{formErrors.prenume}</span>
            )}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="localitate" className={styles.label}>
            Localitate:
          </label>
          <select
            id="localitate"
            name="localitate"
            value={formData.localitate}
            onChange={handleChange}
            className={`${styles.input} ${
              formErrors.localitate ? styles.inputError : ""
            }`}
            required
          >
            <option value="" disabled>
              Selectează o localitate
            </option>
            {romanianCounties.map((county) => (
              <option key={county} value={county}>
                {county}
              </option>
            ))}
          </select>
          {formErrors.localitate && (
            <span className={styles.errorText}>{formErrors.localitate}</span>
          )}
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="telefon" className={styles.label}>
              Telefon:
            </label>
            <input
              type="tel"
              id="telefon"
              name="telefon"
              value={formData.telefon}
              onChange={handleChange}
              className={`${styles.input} ${
                formErrors.telefon ? styles.inputError : ""
              }`}
              placeholder="0XXXXXXXXX"
              required
            />
            {formErrors.telefon && (
              <span className={styles.errorText}>{formErrors.telefon}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`${styles.input} ${
                formErrors.email ? styles.inputError : ""
              }`}
              required
            />
            {formErrors.email && (
              <span className={styles.errorText}>{formErrors.email}</span>
            )}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="subiect" className={styles.label}>
            Subiect:
          </label>
          <input
            type="text"
            id="subiect"
            name="subiect"
            value={formData.subiect}
            onChange={handleChange}
            className={`${styles.input} ${
              formErrors.subiect ? styles.inputError : ""
            }`}
            required
          />
          {formErrors.subiect && (
            <span className={styles.errorText}>{formErrors.subiect}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="descriereServiciu" className={styles.label}>
            Descriere Serviciu Dorit:
          </label>
          <textarea
            id="descriereServiciu"
            name="descriereServiciu"
            value={formData.descriereServiciu}
            onChange={handleChange}
            className={`${styles.textarea} ${
              formErrors.descriereServiciu ? styles.inputError : ""
            }`}
            rows="5"
            placeholder="Descrieți în detaliu serviciul de care aveți nevoie..."
            required
          ></textarea>
          {formErrors.descriereServiciu && (
            <span className={styles.errorText}>
              {formErrors.descriereServiciu}
            </span>
          )}
        </div>

        {/* GDPR Consent Section */}
        <div className={styles.gdprSection}>
          <h3 className={styles.gdprTitle}>
            Consimțământ pentru prelucrarea datelor (GDPR)
          </h3>

          <div className={styles.consentGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="dataProcessingConsent"
                checked={formData.gdprConsent.dataProcessingConsent}
                onChange={handleConsentChange}
                className={styles.checkbox}
                required
              />
              <span className={styles.checkboxText}>
                <strong>Sunt de acord cu prelucrarea datelor personale</strong>{" "}
                în scopul contactării și furnizării serviciilor solicitate. *
              </span>
            </label>
            {formErrors.gdprConsent && (
              <span className={styles.errorText}>{formErrors.gdprConsent}</span>
            )}
          </div>

          <div className={styles.consentGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="privacyPolicyAccepted"
                checked={formData.gdprConsent.privacyPolicyAccepted}
                onChange={handleConsentChange}
                className={styles.checkbox}
                required
              />
              <span className={styles.checkboxText}>
                <strong>Am citit și accept</strong>{" "}
                <a
                  href="/politica-confidentialitate"
                  target="_blank"
                  className={styles.policyLink}
                  rel="noreferrer"
                >
                  Politica de Confidențialitate
                </a>{" "}
                și{" "}
                <a
                  href="/termeni-conditii"
                  target="_blank"
                  className={styles.policyLink}
                  rel="noreferrer"
                >
                  Termenii și Condițiile
                </a>
                . *
              </span>
            </label>
            {formErrors.privacyPolicy && (
              <span className={styles.errorText}>
                {formErrors.privacyPolicy}
              </span>
            )}
          </div>

          <div className={styles.consentGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="marketingConsent"
                checked={formData.gdprConsent.marketingConsent}
                onChange={handleConsentChange}
                className={styles.checkbox}
              />
              <span className={styles.checkboxText}>
                Sunt de acord să primesc comunicări de marketing și oferte
                speciale pe email. (opțional)
              </span>
            </label>
          </div>

          <div className={styles.gdprNote}>
            <p>
              * Câmpurile marcate sunt obligatorii. Datele dumneavoastră vor fi
              procesate conform{" "}
              <a
                href="/politica-confidentialitate"
                target="_blank"
                className={styles.policyLink}
                rel="noreferrer"
              >
                Politicii de Confidențialitate
              </a>
              .
            </p>
          </div>
        </div>

        <button
          type="submit"
          className={`${styles.submitButton} ${
            !canSubmit ? styles.submitButtonDisabled : ""
          }`}
          disabled={!canSubmit}
        >
          {isSubmitting ? "Se trimite..." : "Trimite Solicitarea"}
        </button>
      </form>
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Solicitare Trimisă cu Succes!"
        message="Mulțumim pentru încrederea acordată! Solicitarea dumneavoastră pentru servicii a fost înregistrată cu succes în sistemul nostru."
        emailMessage="Veți primi un email de confirmare la adresa specificată în formular."
      />
    </div>
  );
};

export default ClientServiceRequestForm;
