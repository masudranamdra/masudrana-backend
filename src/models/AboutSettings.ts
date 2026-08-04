import mongoose, { Schema, Document } from 'mongoose';

export interface IAboutSettings extends Document {
  // Page Styling
  theme: string;
  globalAnimation: string; // e.g. 'fade', 'slide', 'scale'
  containerWidth: string; // e.g. 'max-w-7xl'
  sectionGap: string; // e.g. 'gap-16'
  borderRadius: string; // e.g. 'rounded-2xl'
  boxShadow: string;
  typography: string;
  
  // SEO
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  seoOgImage: string;
  canonicalUrl: string;
  
  // Section Visibility Toggles
  showStory: boolean;
  showEducation: boolean;
  showExperience: boolean;
  showSkills: boolean;
  showServices: boolean;
  showGallery: boolean;
  showFAQ: boolean;
  showTestimonials: boolean;
  showProjects: boolean;
  showLifestyle: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const AboutSettingsSchema = new Schema<IAboutSettings>(
  {
    theme: { type: String, default: 'dark' },
    globalAnimation: { type: String, default: 'fade' },
    containerWidth: { type: String, default: 'max-w-7xl' },
    sectionGap: { type: String, default: 'gap-16' },
    borderRadius: { type: String, default: 'rounded-2xl' },
    boxShadow: { type: String, default: 'shadow-xl' },
    typography: { type: String, default: 'font-sans' },

    seoTitle: { type: String, default: 'About Me | Professional Portfolio' },
    seoDescription: { type: String, default: 'Learn more about my professional journey, skills, and lifestyle.' },
    seoKeywords: { type: String, default: 'portfolio, about, skills, developer' },
    seoOgImage: { type: String, default: '' },
    canonicalUrl: { type: String, default: '' },

    showStory: { type: Boolean, default: true },
    showEducation: { type: Boolean, default: true },
    showExperience: { type: Boolean, default: true },
    showSkills: { type: Boolean, default: true },
    showServices: { type: Boolean, default: true },
    showGallery: { type: Boolean, default: true },
    showFAQ: { type: Boolean, default: true },
    showTestimonials: { type: Boolean, default: true },
    showProjects: { type: Boolean, default: true },
    showLifestyle: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.AboutSettings || mongoose.model<IAboutSettings>('AboutSettings', AboutSettingsSchema);
