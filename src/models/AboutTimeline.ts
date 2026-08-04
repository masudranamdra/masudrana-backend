import mongoose, { Schema, Document } from 'mongoose';

export interface IAboutTimeline extends Document {
  category: 'story' | 'education' | 'experience' | 'journey' | 'career';
  title: string;
  subtitle?: string; // institution or company
  dateRange: string;
  description: string;
  icon?: string;
  order: number;
  visible: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AboutTimelineSchema = new Schema<IAboutTimeline>(
  {
    category: {
      type: String,
      enum: ['story', 'education', 'experience', 'journey', 'career'],
      required: true,
    },
    title: { type: String, required: true },
    subtitle: { type: String },
    dateRange: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String },
    order: { type: Number, default: 0 },
    visible: { type: Boolean, default: true },
    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.models.AboutTimeline || mongoose.model<IAboutTimeline>('AboutTimeline', AboutTimelineSchema);
