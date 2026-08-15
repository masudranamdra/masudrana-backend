import mongoose, { Schema, Document } from 'mongoose';

export interface IAboutGallery extends Document {
  category?: string;
  url?: string;
  publicId?: string;
  image?: {
    url?: string;
    publicId?: string;
  };
  title?: string;
  caption?: string;
  type?: string;
  order: number;
  visible: boolean;
  featured: boolean;
  isFeatured: boolean;
  isProtected: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AboutGallerySchema = new Schema<IAboutGallery>(
  {
    category: {
      type: String,
      default: 'Life',
    },
    url: {
      type: String,
      default: '',
    },
    publicId: {
      type: String,
      default: '',
    },
    image: {
      url: { type: String, default: '' },
      publicId: { type: String, default: '' },
    },
    title: { type: String, default: '' },
    caption: { type: String, default: '' },
    type: { type: String, default: 'image' },
    order: { type: Number, default: 0 },
    visible: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    isProtected: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.AboutGallery || mongoose.model<IAboutGallery>('AboutGallery', AboutGallerySchema);
