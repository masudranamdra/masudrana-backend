import mongoose, { Schema, Document } from 'mongoose';

export interface IGalleryItem {
  url: string;
  publicId?: string;
  caption?: string;
}

export interface IProject extends Document {
  title: string;
  subtitle?: string;
  description: string;
  fullDescription?: string;
  category: string;
  tags: string[];
  githubLink?: string;
  demoLink?: string;
  documentLink?: string;
  image: {
    url: string;
    publicId?: string;
  };
  gallery?: IGalleryItem[];
  documentDetails?: {
    text?: string;
    images?: string[];
  };
  activities?: string[];
  clientName?: string;
  timeline?: string;
  role?: string;
  isFeatured: boolean;
  featuredInAbout: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const GalleryItemSchema = new Schema<IGalleryItem>({
  url: { type: String, required: true },
  publicId: { type: String, default: '' },
  caption: { type: String, default: '' }
});

const ProjectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    subtitle: {
      type: String,
      default: '',
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
    },
    fullDescription: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      required: [true, 'Project category is required'],
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    githubLink: {
      type: String,
      trim: true,
      default: '',
    },
    demoLink: {
      type: String,
      trim: true,
      default: '',
    },
    documentLink: {
      type: String,
      trim: true,
      default: '',
    },
    image: {
      url: {
        type: String,
        required: [true, 'Project image URL is required'],
      },
      publicId: {
        type: String,
        default: '',
      },
    },
    gallery: {
      type: [GalleryItemSchema],
      default: [],
    },
    documentDetails: {
      text: { type: String, default: '' },
      images: { type: [String], default: [] },
    },
    activities: {
      type: [String],
      default: [],
    },
    clientName: { type: String, default: '' },
    timeline: { type: String, default: '' },
    role: { type: String, default: '' },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    featuredInAbout: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Indexing for faster search queries
ProjectSchema.index({ title: 'text', description: 'text', category: 'text', tags: 'text' });

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
