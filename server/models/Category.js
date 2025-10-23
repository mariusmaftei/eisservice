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
