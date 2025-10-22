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
    required: true,
  },
  workingImage: {
    type: String,
    required: true,
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
      required: true,
    },
    paragraphs: [
      {
        type: String,
        required: true,
      },
    ],
  },
  professionalContent: {
    title: {
      type: String,
      required: true,
    },
    paragraphs: [
      {
        type: String,
        required: true,
      },
    ],
  },
  seo: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
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
