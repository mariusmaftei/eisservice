import React, { useState, useEffect } from "react";
import styles from "./CategoryForm.module.css";
import { categoryAPI } from "../../service/api";

const CategoryForm = ({ category, onSave, onCancel, isEditing = false }) => {
  const [formData, setFormData] = useState({
    slug: "",
    name: "",
    displayName: "",
    description: "",
    shortDescription: "",
    image: "",
    workingImage: "",
    services: [{ title: "", description: "" }],
    whyChooseUs: {
      title: "",
      paragraphs: [""],
    },
    professionalContent: {
      title: "",
      paragraphs: [""],
    },
    seo: {
      title: "",
      description: "",
      keywords: [],
    },
    isActive: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (category && isEditing) {
      setFormData({
        ...category,
        services: category.services || [{ title: "", description: "" }],
        whyChooseUs: {
          title: category.whyChooseUs?.title || "",
          paragraphs: category.whyChooseUs?.paragraphs || [""],
        },
        professionalContent: {
          title: category.professionalContent?.title || "",
          paragraphs: category.professionalContent?.paragraphs || [""],
        },
        seo: {
          title: category.seo?.title || "",
          description: category.seo?.description || "",
          keywords: category.seo?.keywords || [],
        },
      });
    }
  }, [category, isEditing]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNestedInputChange = (section, field, value, index = null) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]:
          index !== null
            ? prev[section][field].map((item, i) =>
                i === index ? value : item
              )
            : value,
      },
    }));
  };

  const addService = () => {
    setFormData((prev) => ({
      ...prev,
      services: [...prev.services, { title: "", description: "" }],
    }));
  };

  const removeService = (index) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
    }));
  };

  const addParagraph = (section) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        paragraphs: [...prev[section].paragraphs, ""],
      },
    }));
  };

  const removeParagraph = (section, index) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        paragraphs: prev[section].paragraphs.filter((_, i) => i !== index),
      },
    }));
  };

  const addKeyword = () => {
    setFormData((prev) => ({
      ...prev,
      seo: {
        ...prev.seo,
        keywords: [...prev.seo.keywords, ""],
      },
    }));
  };

  const removeKeyword = (index) => {
    setFormData((prev) => ({
      ...prev,
      seo: {
        ...prev.seo,
        keywords: prev.seo.keywords.filter((_, i) => i !== index),
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isEditing) {
        await categoryAPI.update(category._id, formData);
      } else {
        await categoryAPI.create(formData);
      }
      onSave();
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>
        {isEditing ? "Editează Categoria" : "Creează Categorie Nouă"}
      </h2>

      {error && <div className={styles.errorMessage}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Basic Information */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Informații de Bază</h3>

          <div className={styles.formGroup}>
            <label htmlFor="slug" className={styles.label}>
              Slug *
            </label>
            <input
              type="text"
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleInputChange}
              className={styles.input}
              required
              placeholder="ex: electrician-brasov"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Nume *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={styles.input}
              required
              placeholder="ex: Electrician"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="displayName" className={styles.label}>
              Nume de Afișare *
            </label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              value={formData.displayName}
              onChange={handleInputChange}
              className={styles.input}
              required
              placeholder="ex: Electrician Brașov"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description" className={styles.label}>
              Descriere *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={styles.textarea}
              required
              rows={4}
              placeholder="Descriere detaliată a categoriei..."
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="shortDescription" className={styles.label}>
              Descriere Scurtă *
            </label>
            <textarea
              id="shortDescription"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleInputChange}
              className={styles.textarea}
              required
              rows={2}
              placeholder="Descriere scurtă..."
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="image" className={styles.label}>
              URL Imagine *
            </label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              className={styles.input}
              required
              placeholder="https://exemplu.com/imagine.jpg"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="workingImage" className={styles.label}>
              URL Imagine de Lucru *
            </label>
            <input
              type="url"
              id="workingImage"
              name="workingImage"
              value={formData.workingImage}
              onChange={handleInputChange}
              className={styles.input}
              required
              placeholder="https://exemplu.com/imagine-lucru.jpg"
            />
          </div>
        </div>

        {/* Services */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Servicii</h3>
          {formData.services.map((service, index) => (
            <div key={index} className={styles.serviceItem}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Titlu Serviciu</label>
                <input
                  type="text"
                  value={service.title}
                  onChange={(e) => {
                    const newServices = [...formData.services];
                    newServices[index].title = e.target.value;
                    setFormData((prev) => ({ ...prev, services: newServices }));
                  }}
                  className={styles.input}
                  placeholder="Titlu serviciu"
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Descriere Serviciu</label>
                <textarea
                  value={service.description}
                  onChange={(e) => {
                    const newServices = [...formData.services];
                    newServices[index].description = e.target.value;
                    setFormData((prev) => ({ ...prev, services: newServices }));
                  }}
                  className={styles.textarea}
                  rows={2}
                  placeholder="Descriere serviciu"
                />
              </div>
              <button
                type="button"
                onClick={() => removeService(index)}
                className={styles.removeButton}
                disabled={formData.services.length === 1}
              >
                Șterge Serviciu
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addService}
            className={styles.addButton}
          >
            Adaugă Serviciu
          </button>
        </div>

        {/* Why Choose Us */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>De ce să ne Alegi</h3>

          <div className={styles.formGroup}>
            <label className={styles.label}>Titlu</label>
            <input
              type="text"
              value={formData.whyChooseUs.title}
              onChange={(e) =>
                handleNestedInputChange("whyChooseUs", "title", e.target.value)
              }
              className={styles.input}
              placeholder="Titlu de ce să ne alegi"
            />
          </div>

          {formData.whyChooseUs.paragraphs.map((paragraph, index) => (
            <div key={index} className={styles.paragraphItem}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Paragraf {index + 1}</label>
                <textarea
                  value={paragraph}
                  onChange={(e) =>
                    handleNestedInputChange(
                      "whyChooseUs",
                      "paragraphs",
                      e.target.value,
                      index
                    )
                  }
                  className={styles.textarea}
                  rows={3}
                  placeholder="Paragraf de ce să ne alegi"
                />
              </div>
              <button
                type="button"
                onClick={() => removeParagraph("whyChooseUs", index)}
                className={styles.removeButton}
                disabled={formData.whyChooseUs.paragraphs.length === 1}
              >
                Șterge Paragraf
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addParagraph("whyChooseUs")}
            className={styles.addButton}
          >
            Adaugă Paragraf
          </button>
        </div>

        {/* Professional Content */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Conținut Profesional</h3>

          <div className={styles.formGroup}>
            <label className={styles.label}>Titlu</label>
            <input
              type="text"
              value={formData.professionalContent.title}
              onChange={(e) =>
                handleNestedInputChange(
                  "professionalContent",
                  "title",
                  e.target.value
                )
              }
              className={styles.input}
              placeholder="Titlu conținut profesional"
            />
          </div>

          {formData.professionalContent.paragraphs.map((paragraph, index) => (
            <div key={index} className={styles.paragraphItem}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Paragraf {index + 1}</label>
                <textarea
                  value={paragraph}
                  onChange={(e) =>
                    handleNestedInputChange(
                      "professionalContent",
                      "paragraphs",
                      e.target.value,
                      index
                    )
                  }
                  className={styles.textarea}
                  rows={3}
                  placeholder="Paragraf conținut profesional"
                />
              </div>
              <button
                type="button"
                onClick={() => removeParagraph("professionalContent", index)}
                className={styles.removeButton}
                disabled={formData.professionalContent.paragraphs.length === 1}
              >
                Șterge Paragraf
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addParagraph("professionalContent")}
            className={styles.addButton}
          >
            Adaugă Paragraf
          </button>
        </div>

        {/* SEO */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Informații SEO</h3>

          <div className={styles.formGroup}>
            <label className={styles.label}>Titlu SEO</label>
            <input
              type="text"
              value={formData.seo.title}
              onChange={(e) =>
                handleNestedInputChange("seo", "title", e.target.value)
              }
              className={styles.input}
              placeholder="Titlu SEO"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Descriere SEO</label>
            <textarea
              value={formData.seo.description}
              onChange={(e) =>
                handleNestedInputChange("seo", "description", e.target.value)
              }
              className={styles.textarea}
              rows={3}
              placeholder="Descriere SEO"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Cuvinte Cheie</label>
            {formData.seo.keywords.map((keyword, index) => (
              <div key={index} className={styles.keywordItem}>
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => {
                    const newKeywords = [...formData.seo.keywords];
                    newKeywords[index] = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      seo: { ...prev.seo, keywords: newKeywords },
                    }));
                  }}
                  className={styles.input}
                  placeholder="Cuvânt cheie"
                />
                <button
                  type="button"
                  onClick={() => removeKeyword(index)}
                  className={styles.removeButton}
                >
                  Șterge
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addKeyword}
              className={styles.addButton}
            >
              Adaugă Cuvânt Cheie
            </button>
          </div>
        </div>

        {/* Status */}
        <div className={styles.section}>
          <div className={styles.formGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    isActive: e.target.checked,
                  }))
                }
                className={styles.checkbox}
              />
              Categoria Activă
            </label>
          </div>
        </div>

        {/* Form Actions */}
        <div className={styles.formActions}>
          <button
            type="button"
            onClick={onCancel}
            className={styles.cancelButton}
            disabled={loading}
          >
            Anulează
          </button>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading
              ? "Se salvează..."
              : isEditing
              ? "Actualizează Categoria"
              : "Creează Categoria"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
