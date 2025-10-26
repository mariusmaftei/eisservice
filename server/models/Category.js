import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  // Category Information Section (Informații pentru Categorie)
  categoryInformation: {
    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    displayName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      default: "",
    },
    shortDescription: {
      type: String,
      required: true,
      trim: true,
    },
    providerCount: {
      type: Number,
      required: false,
      default: 0,
      min: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    // Main category image
    imageUrl: {
      type: String,
      required: false,
    },
    imageFileName: {
      type: String,
      required: false,
    },
  },

  // Page Title Section (Titlul continului)
  pageMainTitle: {
    pageTitle: {
      type: String,
      required: false,
      trim: true,
      default: "",
    },
    pageSubtitle: {
      type: String,
      required: false,
      trim: true,
      default: "",
    },
  },

  // Professional Content Section (Conținut Profesional)
  professionalContent: {
    title: {
      type: String,
      required: false,
      default: "",
    },
    paragraphs: [
      {
        type: String,
        required: false,
      },
    ],
    // Image for professional content
    imageUrl: {
      type: String,
      required: false,
    },
    imageFileName: {
      type: String,
      required: false,
    },
  },

  // Why Choose Us Section (De ce să ne Alegi)
  whyChooseUs: {
    title: {
      type: String,
      required: false,
      default: "",
    },
    paragraphs: [
      {
        type: String,
        required: false,
      },
    ],
    // Why choose us specific image
    whyChooseUsImageUrl: {
      type: String,
      required: false,
    },
    whyChooseUsImageFileName: {
      type: String,
      required: false,
    },
  },

  // About Us Section (Despre noi)
  aboutUs: {
    title: {
      type: String,
      required: false,
      default: "",
    },
    description: {
      type: String,
      required: false,
      default: "",
    },
  },

  // Services
  services: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],

  // SEO Metadata Section (Informații SEO)
  seoMetadata: {
    title: {
      type: String,
      required: false,
      default: "",
    },
    description: {
      type: String,
      required: false,
      default: "",
    },
    keywords: [
      {
        type: String,
      },
    ],
    ogTitle: {
      type: String,
      required: false,
      default: "",
    },
    ogDescription: {
      type: String,
      required: false,
      default: "",
    },
    ogImage: {
      type: String,
      required: false,
      default: "https://eisservice.ro/og-image.jpg",
    },
    twitterTitle: {
      type: String,
      required: false,
      default: "",
    },
    twitterDescription: {
      type: String,
      required: false,
      default: "",
    },
    twitterImage: {
      type: String,
      required: false,
      default: "https://eisservice.ro/og-image.jpg",
    },
    canonicalUrl: {
      type: String,
      required: false,
      default: "",
    },
    structuredData: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
      default: null,
    },
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
categorySchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create indexes for better performance
categorySchema.index({ "categoryInformation.isActive": 1 });
// Add unique index for slug (slug is nested in categoryInformation)
categorySchema.index({ "categoryInformation.slug": 1 }, { unique: true });

const Category = mongoose.model("Category", categorySchema);

export default Category;
