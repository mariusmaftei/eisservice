import { categoryAPI } from "./api";

// Category services with comprehensive CRUD operations
export const categoryServices = {
  // GET - Fetch all categories
  getAllCategories: async () => {
    try {
      const response = await categoryAPI.getAll();
      return {
        success: true,
        data: response.data || response,
        message: "Categoriile au fost încărcate cu succes",
      };
    } catch (error) {
      console.error("Error fetching categories:", error);
      return {
        success: false,
        data: null,
        message:
          error.response?.data?.message || "Eroare la încărcarea categoriilor",
      };
    }
  },

  // GET - Fetch single category by ID
  getCategoryById: async (id) => {
    try {
      const response = await categoryAPI.getById(id);
      return {
        success: true,
        data: response.data || response,
        message: "Categoria a fost încărcată cu succes",
      };
    } catch (error) {
      console.error("Error fetching category:", error);
      return {
        success: false,
        data: null,
        message:
          error.response?.data?.message || "Eroare la încărcarea categoriei",
      };
    }
  },

  // POST - Create new category
  createCategory: async (categoryData) => {
    try {
      // Validate required fields
      const requiredFields = [
        "slug",
        "name",
        "displayName",
        "shortDescription",
        "image",
      ];
      const missingFields = requiredFields.filter(
        (field) => !categoryData[field]
      );

      if (missingFields.length > 0) {
        return {
          success: false,
          data: null,
          message: `Câmpurile obligatorii lipsesc: ${missingFields.join(", ")}`,
        };
      }

      // Validate nested objects
      if (!categoryData.services || categoryData.services.length === 0) {
        return {
          success: false,
          data: null,
          message: "Trebuie să adaugi cel puțin un serviciu",
        };
      }

      if (
        !categoryData.whyChooseUs ||
        !categoryData.whyChooseUs.title ||
        !categoryData.whyChooseUs.paragraphs ||
        categoryData.whyChooseUs.paragraphs.length === 0
      ) {
        return {
          success: false,
          data: null,
          message: 'Conținutul "De ce să ne alegi" este obligatoriu',
        };
      }

      if (
        !categoryData.professionalContent ||
        !categoryData.professionalContent.title ||
        !categoryData.professionalContent.paragraphs ||
        categoryData.professionalContent.paragraphs.length === 0
      ) {
        return {
          success: false,
          data: null,
          message: "Conținutul profesional este obligatoriu",
        };
      }

      if (
        !categoryData.seo ||
        !categoryData.seo.title ||
        !categoryData.seo.description
      ) {
        return {
          success: false,
          data: null,
          message: "Informațiile SEO sunt obligatorii",
        };
      }

      const response = await categoryAPI.create(categoryData);
      return {
        success: true,
        data: response.data || response,
        message: "Categoria a fost creată cu succes",
      };
    } catch (error) {
      console.error("Error creating category:", error);
      return {
        success: false,
        data: null,
        message:
          error.response?.data?.message || "Eroare la crearea categoriei",
      };
    }
  },

  // PUT - Update existing category
  updateCategory: async (id, categoryData) => {
    try {
      // Validate required fields
      const requiredFields = [
        "slug",
        "name",
        "displayName",
        "shortDescription",
        "image",
      ];
      const missingFields = requiredFields.filter(
        (field) => !categoryData[field]
      );

      if (missingFields.length > 0) {
        return {
          success: false,
          data: null,
          message: `Câmpurile obligatorii lipsesc: ${missingFields.join(", ")}`,
        };
      }

      // Validate nested objects
      if (!categoryData.services || categoryData.services.length === 0) {
        return {
          success: false,
          data: null,
          message: "Trebuie să adaugi cel puțin un serviciu",
        };
      }

      if (
        !categoryData.whyChooseUs ||
        !categoryData.whyChooseUs.title ||
        !categoryData.whyChooseUs.paragraphs ||
        categoryData.whyChooseUs.paragraphs.length === 0
      ) {
        return {
          success: false,
          data: null,
          message: 'Conținutul "De ce să ne alegi" este obligatoriu',
        };
      }

      if (
        !categoryData.professionalContent ||
        !categoryData.professionalContent.title ||
        !categoryData.professionalContent.paragraphs ||
        categoryData.professionalContent.paragraphs.length === 0
      ) {
        return {
          success: false,
          data: null,
          message: "Conținutul profesional este obligatoriu",
        };
      }

      if (
        !categoryData.seo ||
        !categoryData.seo.title ||
        !categoryData.seo.description
      ) {
        return {
          success: false,
          data: null,
          message: "Informațiile SEO sunt obligatorii",
        };
      }

      const response = await categoryAPI.update(id, categoryData);
      return {
        success: true,
        data: response.data || response,
        message: "Categoria a fost actualizată cu succes",
      };
    } catch (error) {
      console.error("Error updating category:", error);
      return {
        success: false,
        data: null,
        message:
          error.response?.data?.message || "Eroare la actualizarea categoriei",
      };
    }
  },

  // DELETE - Delete category
  deleteCategory: async (id) => {
    try {
      if (!id) {
        return {
          success: false,
          data: null,
          message: "ID-ul categoriei este obligatoriu",
        };
      }

      const response = await categoryAPI.delete(id);
      return {
        success: true,
        data: response.data || response,
        message: "Categoria a fost ștearsă cu succes",
      };
    } catch (error) {
      console.error("Error deleting category:", error);
      return {
        success: false,
        data: null,
        message:
          error.response?.data?.message || "Eroare la ștergerea categoriei",
      };
    }
  },

  // PATCH - Toggle category status (active/inactive)
  toggleCategoryStatus: async (id) => {
    try {
      if (!id) {
        return {
          success: false,
          data: null,
          message: "ID-ul categoriei este obligatoriu",
        };
      }

      const response = await categoryAPI.toggleStatus(id);
      return {
        success: true,
        data: response.data || response,
        message: "Statusul categoriei a fost schimbat cu succes",
      };
    } catch (error) {
      console.error("Error toggling category status:", error);
      return {
        success: false,
        data: null,
        message:
          error.response?.data?.message ||
          "Eroare la schimbarea statusului categoriei",
      };
    }
  },

  // Utility functions
  validateCategoryData: (categoryData) => {
    const errors = [];

    // Basic validation
    if (!categoryData.slug) errors.push("Slug-ul este obligatoriu");
    if (!categoryData.name) errors.push("Numele este obligatoriu");
    if (!categoryData.displayName)
      errors.push("Numele de afișare este obligatoriu");
    if (!categoryData.shortDescription)
      errors.push("Descrierea scurtă este obligatorie");
    if (!categoryData.image) errors.push("Imaginea este obligatorie");

    // Services validation
    if (!categoryData.services || categoryData.services.length === 0) {
      errors.push("Trebuie să adaugi cel puțin un serviciu");
    } else {
      categoryData.services.forEach((service, index) => {
        if (!service.title)
          errors.push(`Titlul serviciului ${index + 1} este obligatoriu`);
        if (!service.description)
          errors.push(`Descrierea serviciului ${index + 1} este obligatorie`);
      });
    }

    // Why Choose Us validation
    if (!categoryData.whyChooseUs) {
      errors.push('Secțiunea "De ce să ne alegi" este obligatorie');
    } else {
      if (!categoryData.whyChooseUs.title)
        errors.push('Titlul secțiunii "De ce să ne alegi" este obligatoriu');
      if (
        !categoryData.whyChooseUs.paragraphs ||
        categoryData.whyChooseUs.paragraphs.length === 0
      ) {
        errors.push(
          'Trebuie să adaugi cel puțin un paragraf în secțiunea "De ce să ne alegi"'
        );
      }
    }

    // Professional Content validation
    if (!categoryData.professionalContent) {
      errors.push("Conținutul profesional este obligatoriu");
    } else {
      if (!categoryData.professionalContent.title)
        errors.push("Titlul conținutului profesional este obligatoriu");
      if (
        !categoryData.professionalContent.paragraphs ||
        categoryData.professionalContent.paragraphs.length === 0
      ) {
        errors.push(
          "Trebuie să adaugi cel puțin un paragraf în conținutul profesional"
        );
      }
    }

    // SEO validation
    if (!categoryData.seo) {
      errors.push("Informațiile SEO sunt obligatorii");
    } else {
      if (!categoryData.seo.title) errors.push("Titlul SEO este obligatoriu");
      if (!categoryData.seo.description)
        errors.push("Descrierea SEO este obligatorie");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  },

  // Generate slug from display name
  generateSlug: (displayName) => {
    return displayName
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
      .trim();
  },

  // Format category data for display
  formatCategoryForDisplay: (category) => {
    return {
      ...category,
      formattedCreatedAt: new Date(category.createdAt).toLocaleDateString(
        "ro-RO"
      ),
      formattedUpdatedAt: new Date(category.updatedAt).toLocaleDateString(
        "ro-RO"
      ),
      servicesCount: category.services?.length || 0,
      statusText: category.isActive ? "Activă" : "Inactivă",
    };
  },
};

export default categoryServices;
