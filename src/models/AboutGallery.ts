import mongoose, { Schema, Document } from 'mongoose';

export interface IAboutGallery extends Document {
  category: string; // e.g. Travel, Workspace, Certificates, Events
  image: {
    url: string;
    publicId?: string;
  };
  title?: string;
  order: number;
  visible: boolean;
  featured: boolean;
  isProtected: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AboutGallerySchema = new Schema<IAboutGallery>(
  {
    category: {
      type: String,
      required: [true, 'Gallery category is required'],
      default: 'Life',
    },
    image: {
      url: { type: String, required: [true, 'Image URL is required'] },
      publicId: { type: String },
    },
    title: { type: String, default: '' },
    order: { type: Number, default: 0 },
    visible: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
    isProtected: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.AboutGallery || mongoose.model<IAboutGallery>('AboutGallery', AboutGallerySchema);
