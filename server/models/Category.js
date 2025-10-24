import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
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
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  imageFileName: {
    type: String,
    required: false,
  },
  whyChooseUsImage: {
    type: String,
    required: false,
  },
  whyChooseUsImageUrl: {
    type: String,
    required: false,
  },
  whyChooseUsImageFileName: {
    type: String,
    required: false,
  },
  workingImage: {
    type: String,
    required: false,
  },
  workingImageUrl: {
    type: String,
    required: false,
  },
  workingImageFileName: {
    type: String,
    required: false,
  },
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
  },
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
  },
  seo: {
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
// Note: slug already has unique: true which creates an index
categorySchema.index({ isActive: 1 });

const Category = mongoose.model("Category", categorySchema);

export default Category;
