import mongoose, { Schema, Document } from 'mongoose';

export interface ISocialLink {
  platform: string;
  url: string;
  icon?: string;
  label?: string;
}

export interface IAboutBasic extends Document {
  fullName: string;
  tagline: string;
  shortBio: string;
  coverImage: {
    url: string;
    publicId?: string;
  };
  profileImage: {
    url: string;
    publicId?: string;
  };
  floatingTechIcons: string[]; // e.g. URLs or icon class names
  mission: string;
  vision: string;
  careerObjective: string;
  resumeUrl: string;
  socialLinks: ISocialLink[];
  contactEmail: string;
  location: string;
  availability: string;
  createdAt: Date;
  updatedAt: Date;
}

const SocialLinkSchema = new Schema<ISocialLink>({
  platform: { type: String, required: true },
  url: { type: String, required: true },
  icon: { type: String },
  label: { type: String }
});

const AboutBasicSchema = new Schema<IAboutBasic>(
  {
    fullName: { type: String, default: 'John Doe' },
    tagline: { type: String, default: 'Full Stack Developer' },
    shortBio: { type: String, default: 'I build things.' },
    coverImage: {
      url: { type: String, default: '' },
      publicId: { type: String }
    },
    profileImage: {
      url: { type: String, default: '' },
      publicId: { type: String }
    },
    floatingTechIcons: { type: [String], default: [] },
    mission: { type: String, default: '' },
    vision: { type: String, default: '' },
    careerObjective: { type: String, default: '' },
    resumeUrl: { type: String, default: '' },
    socialLinks: { type: [SocialLinkSchema], default: [] },
    contactEmail: { type: String, default: '' },
    location: { type: String, default: '' },
    availability: { type: String, default: 'Available for freelance work' }
  },
  { timestamps: true }
);

export default mongoose.models.AboutBasic || mongoose.model<IAboutBasic>('AboutBasic', AboutBasicSchema);
