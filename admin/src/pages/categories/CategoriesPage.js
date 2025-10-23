import React, { useState, useEffect } from "react";
import styles from "./CategoriesPage.module.css";
import { categoryAPI } from "../../service/api";
import CategoryForm from "../../components/CategoryForm/CategoryForm";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Calendar,
  Tag,
  BarChart3,
} from "lucide-react";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterActive, setFilterActive] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await categoryAPI.getAll();
      setCategories(response.data);
      setError("");
    } catch (err) {
      setError("Eroare la încărcarea categoriilor");
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategory = () => {
    setEditingCategory(null);
    setShowForm(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleDeleteCategory = (category) => {
    setCategoryToDelete(category);
    setShowDeleteModal(true);
  };

  const confirmDeleteCategory = async () => {
    if (!categoryToDelete) return;

    try {
      setIsDeleting(true);
      await categoryAPI.delete(categoryToDelete._id);
      await fetchCategories();
      setShowDeleteModal(false);
      setCategoryToDelete(null);
    } catch (err) {
      setError("Eroare la ștergerea categoriei");
      console.error("Error deleting category:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const cancelDeleteCategory = () => {
    setShowDeleteModal(false);
    setCategoryToDelete(null);
    setIsDeleting(false);
  };

  const handleToggleStatus = async (categoryId) => {
    try {
      await categoryAPI.toggleStatus(categoryId);
      await fetchCategories();
    } catch (err) {
      setError("Eroare la schimbarea statusului categoriei");
      console.error("Error toggling category status:", err);
    }
  };

  const handleFormSave = () => {
    setShowForm(false);
    setEditingCategory(null);
    fetchCategories();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingCategory(null);
  };

  const filteredCategories = categories.filter((category) => {
    const matchesSearch =
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.slug.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterActive === "all" ||
      (filterActive === "active" && category.isActive) ||
      (filterActive === "inactive" && !category.isActive);

    return matchesSearch && matchesFilter;
  });

  if (showForm) {
    return (
      <div className={styles.categoriesPage}>
        <CategoryForm
          category={editingCategory}
          onSave={handleFormSave}
          onCancel={handleFormCancel}
          isEditing={!!editingCategory}
        />
      </div>
    );
  }

  return (
    <div className={styles.categoriesPage}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <h1 className={styles.mainTitle}>Gestionare Categorii</h1>
        <p className={styles.mainDescription}>
          Gestionează categoriile de servicii pentru platforma E.I.S.
        </p>
      </div>

      {/* Controls Section */}
      <div className={styles.controlsSection}>
        <div className={styles.controlsContainer}>
          <div className={styles.searchContainer}>
            <div className={styles.searchWrapper}>
              <Search size={20} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Caută categorii..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          </div>

          <div className={styles.filterContainer}>
            <div className={styles.filterWrapper}>
              <Filter size={20} className={styles.filterIcon} />
              <select
                value={filterActive}
                onChange={(e) => setFilterActive(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="all">Toate Categoriile</option>
                <option value="active">Doar Active</option>
                <option value="inactive">Doar Inactive</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleCreateCategory}
            className={styles.createButton}
          >
            <Plus size={20} />
            Creează Categorie Nouă
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className={styles.errorContainer}>
          <div className={styles.errorMessage}>
            {error}
            <button onClick={() => setError("")} className={styles.closeError}>
              ×
            </button>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <h2>Se încarcă categoriile...</h2>
        </div>
      ) : (
        <>
          {/* Categories Grid */}
          <div className={styles.categoriesSection}>
            <div className={styles.categoriesContainer}>
              {filteredCategories.length === 0 ? (
                <div className={styles.emptyState}>
                  <h3>Nu s-au găsit categorii</h3>
                  <p>
                    {searchTerm || filterActive !== "all"
                      ? "Încearcă să ajustezi criteriile de căutare sau filtrare"
                      : "Creează prima categorie pentru a începe"}
                  </p>
                  {!searchTerm && filterActive === "all" && (
                    <button
                      onClick={handleCreateCategory}
                      className={styles.createButton}
                    >
                      <Plus size={20} />
                      Creează Prima Categorie
                    </button>
                  )}
                </div>
              ) : (
                <div className={styles.categoriesGrid}>
                  {filteredCategories.map((category) => (
                    <div key={category._id} className={styles.categoryCard}>
                      <div className={styles.cardHeader}>
                        <div className={styles.categoryInfo}>
                          <h3 className={styles.categoryName}>
                            {category.displayName}
                          </h3>
                          <p className={styles.categorySlug}>
                            /{category.slug}
                          </p>
                        </div>
                        <div className={styles.statusBadge}>
                          <span
                            className={`${styles.status} ${
                              category.isActive
                                ? styles.active
                                : styles.inactive
                            }`}
                          >
                            {category.isActive ? "Activă" : "Inactivă"}
                          </span>
                        </div>
                      </div>

                      <div className={styles.cardContent}>
                        <p className={styles.categoryDescription}>
                          {category.shortDescription}
                        </p>

                        <div className={styles.categoryStats}>
                          <div className={styles.stat}>
                            <Tag size={16} />
                            <span className={styles.statValue}>
                              {category.services?.length || 0} servicii
                            </span>
                          </div>
                          <div className={styles.stat}>
                            <Calendar size={16} />
                            <span className={styles.statValue}>
                              {new Date(
                                category.createdAt
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className={styles.cardActions}>
                        <button
                          onClick={() => handleEditCategory(category)}
                          className={styles.editButton}
                        >
                          <Edit size={16} />
                          Editează
                        </button>
                        <button
                          onClick={() => handleToggleStatus(category._id)}
                          className={`${styles.toggleButton} ${
                            category.isActive
                              ? styles.deactivate
                              : styles.activate
                          }`}
                        >
                          {category.isActive ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                          {category.isActive ? "Dezactivează" : "Activează"}
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category)}
                          className={styles.deleteButton}
                        >
                          <Trash2 size={16} />
                          Șterge
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Statistics Section */}
          <div className={styles.statsSection}>
            <div className={styles.statsContainer}>
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <div className={styles.statIcon}>
                    <BarChart3 size={24} />
                  </div>
                  <div className={styles.statContent}>
                    <h4>Categorii Totale</h4>
                    <p className={styles.statNumber}>{categories.length}</p>
                  </div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statIcon}>
                    <Eye size={24} />
                  </div>
                  <div className={styles.statContent}>
                    <h4>Categorii Active</h4>
                    <p className={styles.statNumber}>
                      {categories.filter((c) => c.isActive).length}
                    </p>
                  </div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statIcon}>
                    <EyeOff size={24} />
                  </div>
                  <div className={styles.statContent}>
                    <h4>Categorii Inactive</h4>
                    <p className={styles.statNumber}>
                      {categories.filter((c) => !c.isActive).length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={cancelDeleteCategory}
        onConfirm={confirmDeleteCategory}
        title="Ștergere Categorie"
        message={`Ești sigur că vrei să ștergi categoria "${categoryToDelete?.displayName}"? Această acțiune nu poate fi anulată.`}
        confirmText="Șterge"
        cancelText="Anulează"
        type="danger"
        isLoading={isDeleting}
      />
    </div>
  );
};

export default CategoriesPage;
