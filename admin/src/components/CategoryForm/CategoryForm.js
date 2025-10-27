import React, { useState, useEffect } from "react";
import styles from "./CategoryForm.module.css";
import { categoryAPI } from "../../service/api";
import {
  Upload,
  Image,
  Plus,
  Trash2,
  Save,
  X,
  Eye,
  Tag,
  FileText,
  Settings,
  Search,
  Edit,
} from "lucide-react";

// List of all 41 Romanian counties
const ROMANIAN_COUNTIES = [
  "Alba",
  "Arad",
  "Argeș",
  "Bacău",
  "Bihor",
  "Bistrița-Năsăud",
  "Botoșani",
  "Brăila",
  "Brașov",
  "București",
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

const CategoryForm = ({ category, onSave, onCancel, isEditing = false }) => {
  const [formData, setFormData] = useState({
    slug: "",
    name: "",
    displayName: "",
    description: "",
    shortDescription: "",
    image: "",
    whyChooseUsImage: "",
    providerCount: 0,
    services: [{ title: "", description: "" }],
    pageTitle: "",
    pageSubtitle: "",
    whyChooseUs: {
      title: "",
      paragraphs: [""],
    },
    aboutUs: {
      title: "",
      description: "",
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
    prestatoriValabili: "", // Single county value instead of array
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [whyChooseUsImagePreview, setWhyChooseUsImagePreview] = useState("");

  useEffect(() => {
    if (category && isEditing) {
      setFormData({
        // Extract categoryInformation fields
        name: category.categoryInformation?.name || category.name || "",
        displayName:
          category.categoryInformation?.displayName ||
          category.displayName ||
          "",
        slug: category.categoryInformation?.slug || category.slug || "",
        shortDescription:
          category.categoryInformation?.shortDescription ||
          category.shortDescription ||
          "",
        description:
          category.categoryInformation?.description ||
          category.description ||
          "",
        providerCount:
          category.categoryInformation?.providerCount ||
          category.providerCount ||
          0,
        isActive:
          category.categoryInformation?.isActive ?? category.isActive ?? true,

        // Services
        services: category.services || [{ title: "", description: "" }],

        // Page Title Section - nested in pageMainTitle
        pageTitle:
          category.pageMainTitle?.pageTitle || category.pageTitle || "",
        pageSubtitle:
          category.pageMainTitle?.pageSubtitle || category.pageSubtitle || "",

        // Why Choose Us Section
        whyChooseUs: {
          title: category.whyChooseUs?.title || "",
          paragraphs: category.whyChooseUs?.paragraphs || [""],
        },

        // About Us Section
        aboutUs: {
          title: category.aboutUs?.title || "",
          description: category.aboutUs?.description || "",
        },

        // Professional Content Section
        professionalContent: {
          title: category.professionalContent?.title || "",
          paragraphs: category.professionalContent?.paragraphs || [""],
        },

        // SEO Metadata - nested in seoMetadata
        seo: {
          title: category.seoMetadata?.title || category.seo?.title || "",
          description:
            category.seoMetadata?.description ||
            category.seo?.description ||
            "",
          keywords:
            category.seoMetadata?.keywords || category.seo?.keywords || [],
        },

        // Keep existing image URLs for display
        // Main image is stored in categoryInformation.imageUrl
        image:
          category.categoryInformation?.imageUrl ||
          category.imageUrl ||
          category.image ||
          "",
        // Why choose us image is stored in whyChooseUs.whyChooseUsImageUrl
        whyChooseUsImage:
          category.whyChooseUs?.whyChooseUsImageUrl ||
          category.whyChooseUsImageUrl ||
          category.whyChooseUsImage ||
          "",

        // Available providers by county (single value)
        prestatoriValabili:
          Array.isArray(category.prestatoriValabili) &&
          category.prestatoriValabili.length > 0
            ? category.prestatoriValabili[0]
            : category.prestatoriValabili || "",
      });
      setImagePreview(
        category.categoryInformation?.imageUrl ||
          category.imageUrl ||
          category.image ||
          ""
      );
      setWhyChooseUsImagePreview(
        category.whyChooseUs?.whyChooseUsImageUrl ||
          category.whyChooseUsImageUrl ||
          category.whyChooseUsImage ||
          ""
      );
    }
  }, [category, isEditing]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      // Create preview URL for display
      const previewUrl = URL.createObjectURL(file);

      if (type === "image") {
        setFormData((prev) => ({
          ...prev,
          image: file, // Store the file object instead of base64
          imagePreview: previewUrl,
        }));
        setImagePreview(previewUrl);
      } else if (type === "whyChooseUsImage") {
        setFormData((prev) => ({
          ...prev,
          whyChooseUsImage: file, // Store the file object instead of base64
          whyChooseUsImagePreview: previewUrl,
        }));
        setWhyChooseUsImagePreview(previewUrl);
      }
    }
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

  const editService = (index) => {
    // Move the service to be edited to the end of the list
    const serviceToEdit = formData.services[index];
    const otherServices = formData.services.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      services: [...otherServices, serviceToEdit],
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

  const editParagraph = (section, index) => {
    // Move the paragraph to be edited to the end of the list
    const paragraphToEdit = formData[section].paragraphs[index];
    const otherParagraphs = formData[section].paragraphs.filter(
      (_, i) => i !== index
    );
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        paragraphs: [...otherParagraphs, paragraphToEdit],
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

  const handleCountyToggle = (county) => {
    setFormData((prev) => ({
      ...prev,
      // If clicking the same county, deselect it; otherwise select the new one
      prestatoriValabili: prev.prestatoriValabili === county ? "" : county,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Create FormData for file uploads
      const submitData = new FormData();

      // Set displayName to match name if it's empty (for new categories)
      // Keep existing displayName when editing
      const updatedFormData = {
        ...formData,
        displayName: formData.displayName || formData.name,
      };

      // Also ensure description is set
      if (!updatedFormData.description) {
        updatedFormData.description = updatedFormData.shortDescription;
      }

      // Add all form fields except files
      Object.keys(updatedFormData).forEach((key) => {
        if (
          key === "image" ||
          key === "whyChooseUsImage" ||
          key === "imagePreview" ||
          key === "whyChooseUsImagePreview"
        ) {
          return; // Skip file fields, they'll be added separately
        }

        // Handle simple primitive values
        if (
          typeof updatedFormData[key] !== "object" ||
          updatedFormData[key] === null ||
          updatedFormData[key] instanceof Date
        ) {
          submitData.append(key, updatedFormData[key]);
        } else if (
          key === "services" ||
          key === "whyChooseUs" ||
          key === "aboutUs" ||
          key === "professionalContent" ||
          key === "seo"
        ) {
          // Only stringify specific nested objects
          submitData.append(key, JSON.stringify(updatedFormData[key]));
        } else {
          // For other values, append as string
          submitData.append(key, String(updatedFormData[key]));
        }
      });

      // Add image files if they exist
      if (updatedFormData.image && updatedFormData.image instanceof File) {
        submitData.append("image", updatedFormData.image);
      }

      if (
        updatedFormData.whyChooseUsImage &&
        updatedFormData.whyChooseUsImage instanceof File
      ) {
        submitData.append("whyChooseUsImage", updatedFormData.whyChooseUsImage);
      }

      if (isEditing) {
        await categoryAPI.update(category._id, submitData);
      } else {
        await categoryAPI.create(submitData);
      }
      onSave();
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formPage}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <h1 className={styles.mainTitle}>
          {isEditing ? "Editează Categoria" : "Creează Categorie Nouă"}
        </h1>
        <p className={styles.mainDescription}>
          {isEditing
            ? "Actualizează informațiile categoriei existente"
            : "Completează formularul pentru a crea o nouă categorie"}
        </p>
      </div>

      {/* Form Container */}
      <div className={styles.formContainer}>
        {error && (
          <div className={styles.errorContainer}>
            <div className={styles.errorMessage}>
              {error}
              <button
                onClick={() => setError("")}
                className={styles.closeError}
              >
                ×
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Basic Information Section */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon}>
                <Settings size={24} />
              </div>
              <h3 className={styles.sectionTitle}>
                Informații pentru Categorie
              </h3>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                  Nume Categorie *
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
                <label htmlFor="providerCount" className={styles.label}>
                  Numărul de Furnizori *
                </label>
                <input
                  type="number"
                  id="providerCount"
                  name="providerCount"
                  value={formData.providerCount}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                  min="0"
                  placeholder="ex: 5"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="shortDescription" className={styles.label}>
                  Descriere Categorie *
                </label>
                <input
                  type="text"
                  id="shortDescription"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                  placeholder="ex: Servicii Electrice Autorizate"
                />
              </div>

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
                  placeholder="ex: electrician"
                />
              </div>
            </div>

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
                <Eye size={16} />
                Categoria Activă
              </label>
            </div>
          </div>

          {/* SEO Section */}
          <div className={`${styles.section} ${styles.seoSection}`}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon}>
                <Search size={24} />
              </div>
              <h3 className={styles.sectionTitle}>Informații SEO</h3>
            </div>

            <div className={styles.formGrid}>
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
                    handleNestedInputChange(
                      "seo",
                      "description",
                      e.target.value
                    )
                  }
                  className={styles.textarea}
                  rows={3}
                  placeholder="Descriere SEO"
                />
              </div>
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
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addKeyword}
                className={styles.addButton}
              >
                <Plus size={16} />
                Adaugă Cuvânt Cheie
              </button>
            </div>
          </div>

          {/* Page Title Section */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon}>
                <FileText size={24} />
              </div>
              <h3 className={styles.sectionTitle}>Titlul continului</h3>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Titlul Principal</label>
                <input
                  type="text"
                  name="pageTitle"
                  value={formData.pageTitle}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="Titlul principal al paginii"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Subtitlu</label>
                <input
                  type="text"
                  name="pageSubtitle"
                  value={formData.pageSubtitle}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="Subtitlul paginii"
                />
              </div>
            </div>
          </div>

          {/* Professional Content Section */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon}>
                <FileText size={24} />
              </div>
              <h3 className={styles.sectionTitle}>Conținut Profesional</h3>
            </div>

            <div className={styles.servicesContainer}>
              <div className={styles.servicesContent}>
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

                {formData.professionalContent.paragraphs.map(
                  (paragraph, index) => {
                    // The last paragraph is always in edit mode, others are confirmed if they have content
                    const isLastParagraph =
                      index ===
                      formData.professionalContent.paragraphs.length - 1;
                    const hasContent = paragraph.trim();
                    const isConfirmed = !isLastParagraph && hasContent;

                    return (
                      <div key={index} className={styles.paragraphItem}>
                        <div className={styles.paragraphHeader}>
                          <h4>Paragraf {index + 1}</h4>
                          <div className={styles.paragraphActions}>
                            {isConfirmed && (
                              <button
                                type="button"
                                onClick={() =>
                                  editParagraph("professionalContent", index)
                                }
                                className={styles.editButton}
                              >
                                <Edit size={16} />
                                Editează
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() =>
                                removeParagraph("professionalContent", index)
                              }
                              className={styles.removeButton}
                              disabled={
                                formData.professionalContent.paragraphs
                                  .length === 1
                              }
                            >
                              <Trash2 size={16} />
                              Șterge
                            </button>
                          </div>
                        </div>

                        {isConfirmed ? (
                          <div className={styles.confirmedParagraphContent}>
                            <div className={styles.confirmedParagraphField}>
                              <label className={styles.confirmedLabel}>
                                Conținut:
                              </label>
                              <p className={styles.confirmedValue}>
                                {paragraph}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className={styles.paragraphFormContainer}>
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
                        )}
                      </div>
                    );
                  }
                )}
                {formData.professionalContent.paragraphs.length < 3 && (
                  <button
                    type="button"
                    onClick={() => addParagraph("professionalContent")}
                    className={styles.addButton}
                  >
                    <Plus size={16} />
                    Adaugă Paragraf
                  </button>
                )}
              </div>

              <div className={styles.servicesImageSection}>
                <div className={styles.imageUpload}>
                  <label className={styles.imageLabel}>
                    <Upload size={20} />
                    Imagine Principală *
                  </label>
                  <div className={styles.imageContainer}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, "image")}
                      className={styles.fileInput}
                    />
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className={styles.imagePreview}
                      />
                    ) : (
                      <div className={styles.imagePlaceholder}>
                        <Image size={48} />
                        <p>Selectează o imagine</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon}>
                <FileText size={24} />
              </div>
              <h3 className={styles.sectionTitle}>De ce să ne Alegi</h3>
            </div>

            <div className={styles.servicesContainer}>
              <div className={styles.servicesContent}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Titlu</label>
                  <input
                    type="text"
                    value={formData.whyChooseUs.title}
                    onChange={(e) =>
                      handleNestedInputChange(
                        "whyChooseUs",
                        "title",
                        e.target.value
                      )
                    }
                    className={styles.input}
                    placeholder="Titlu de ce să ne alegi"
                  />
                </div>

                {formData.whyChooseUs.paragraphs.map((paragraph, index) => {
                  // The last paragraph is always in edit mode, others are confirmed if they have content
                  const isLastParagraph =
                    index === formData.whyChooseUs.paragraphs.length - 1;
                  const hasContent = paragraph.trim();
                  const isConfirmed = !isLastParagraph && hasContent;

                  return (
                    <div key={index} className={styles.paragraphItem}>
                      <div className={styles.paragraphHeader}>
                        <h4>Paragraf {index + 1}</h4>
                        <div className={styles.paragraphActions}>
                          {isConfirmed && (
                            <button
                              type="button"
                              onClick={() =>
                                editParagraph("whyChooseUs", index)
                              }
                              className={styles.editButton}
                            >
                              <Edit size={16} />
                              Editează
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() =>
                              removeParagraph("whyChooseUs", index)
                            }
                            className={styles.removeButton}
                            disabled={
                              formData.whyChooseUs.paragraphs.length === 1
                            }
                          >
                            <Trash2 size={16} />
                            Șterge
                          </button>
                        </div>
                      </div>

                      {isConfirmed ? (
                        <div className={styles.confirmedParagraphContent}>
                          <div className={styles.confirmedParagraphField}>
                            <label className={styles.confirmedLabel}>
                              Conținut:
                            </label>
                            <p className={styles.confirmedValue}>{paragraph}</p>
                          </div>
                        </div>
                      ) : (
                        <div className={styles.paragraphFormContainer}>
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
                      )}
                    </div>
                  );
                })}
                {formData.whyChooseUs.paragraphs.length < 3 && (
                  <button
                    type="button"
                    onClick={() => addParagraph("whyChooseUs")}
                    className={styles.addButton}
                  >
                    <Plus size={16} />
                    Adaugă Paragraf
                  </button>
                )}
              </div>

              <div className={styles.servicesImageSection}>
                <div className={styles.imageUpload}>
                  <label className={styles.imageLabel}>
                    <Upload size={20} />
                    Imagine De ce să ne Alegi
                  </label>
                  <div className={styles.imageContainer}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, "whyChooseUsImage")}
                      className={styles.fileInput}
                    />
                    {whyChooseUsImagePreview ? (
                      <img
                        src={whyChooseUsImagePreview}
                        alt="Why Choose Us Preview"
                        className={styles.imagePreview}
                      />
                    ) : (
                      <div className={styles.imagePlaceholder}>
                        <Image size={48} />
                        <p>Selectează o imagine</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* About Us Section */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon}>
                <FileText size={24} />
              </div>
              <h3 className={styles.sectionTitle}>Despre noi</h3>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Titlu</label>
                <input
                  type="text"
                  value={formData.aboutUs.title}
                  onChange={(e) =>
                    handleNestedInputChange("aboutUs", "title", e.target.value)
                  }
                  className={styles.input}
                  placeholder="Titlu despre noi"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Descriere</label>
                <textarea
                  value={formData.aboutUs.description}
                  onChange={(e) =>
                    handleNestedInputChange(
                      "aboutUs",
                      "description",
                      e.target.value
                    )
                  }
                  className={styles.textarea}
                  rows={6}
                  placeholder="Descrierea completă despre voi"
                />
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon}>
                <Tag size={24} />
              </div>
              <h3 className={styles.sectionTitle}>Servicii</h3>
            </div>

            {formData.services.map((service, index) => {
              // The last service is always in edit mode, others are confirmed if they have content
              const isLastService = index === formData.services.length - 1;
              const hasContent =
                service.title.trim() && service.description.trim();
              const isConfirmed = !isLastService && hasContent;

              return (
                <div key={index} className={styles.serviceItem}>
                  <div className={styles.serviceHeader}>
                    <h4>Serviciu {index + 1}</h4>
                    <div className={styles.serviceActions}>
                      {isConfirmed && (
                        <button
                          type="button"
                          onClick={() => editService(index)}
                          className={styles.editButton}
                        >
                          <Edit size={16} />
                          Editează
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => removeService(index)}
                        className={styles.removeButton}
                        disabled={formData.services.length === 1}
                      >
                        <Trash2 size={16} />
                        Șterge
                      </button>
                    </div>
                  </div>

                  {isConfirmed ? (
                    <div className={styles.confirmedServiceContent}>
                      <div className={styles.confirmedServiceField}>
                        <label className={styles.confirmedLabel}>Titlu:</label>
                        <p className={styles.confirmedValue}>{service.title}</p>
                      </div>
                      <div className={styles.confirmedServiceField}>
                        <label className={styles.confirmedLabel}>
                          Descriere:
                        </label>
                        <p className={styles.confirmedValue}>
                          {service.description}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.serviceFormContainer}>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>Titlu Serviciu</label>
                        <input
                          type="text"
                          value={service.title}
                          onChange={(e) => {
                            const newServices = [...formData.services];
                            newServices[index].title = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              services: newServices,
                            }));
                          }}
                          className={styles.input}
                          placeholder="Titlu serviciu"
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>
                          Descriere Serviciu
                        </label>
                        <textarea
                          value={service.description}
                          onChange={(e) => {
                            const newServices = [...formData.services];
                            newServices[index].description = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              services: newServices,
                            }));
                          }}
                          className={styles.textarea}
                          rows={2}
                          placeholder="Descriere serviciu"
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            {formData.services.length < 6 && (
              <button
                type="button"
                onClick={addService}
                className={styles.addButton}
              >
                <Plus size={16} />
                Adaugă Serviciu
              </button>
            )}
          </div>

          {/* Available Providers Section */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon}>
                <Tag size={24} />
              </div>
              <h3 className={styles.sectionTitle}>Prestatori Valabili</h3>
            </div>

            <p className={styles.sectionDescription}>
              Selectează județul unde sunt disponibili prestatori pentru această
              categorie (doar un singur județ)
            </p>

            <div className={styles.countiesGrid}>
              {ROMANIAN_COUNTIES.map((county) => (
                <label
                  key={county}
                  className={`${styles.checkboxLabel} ${
                    formData.prestatoriValabili === county ? styles.checked : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="prestatoriValabili"
                    checked={formData.prestatoriValabili === county}
                    onChange={() => handleCountyToggle(county)}
                    className={styles.radio}
                  />
                  <span className={styles.countyName}>{county}</span>
                </label>
              ))}
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
              <X size={16} />
              Anulează
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className={styles.loadingSpinner}></div>
                  Se salvează...
                </>
              ) : (
                <>
                  <Save size={16} />
                  {isEditing ? "Actualizează Categoria" : "Creează Categoria"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
