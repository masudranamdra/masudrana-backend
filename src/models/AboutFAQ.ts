import mongoose, { Schema, Document } from 'mongoose';

export interface IAboutFAQ extends Document {
  question: string;
  answer: string;
  category: string;
  order: number;
  visible: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AboutFAQSchema = new Schema<IAboutFAQ>(
  {
    question: { type: String, required: [true, 'Question is required'] },
    answer: { type: String, required: [true, 'Answer is required'] },
    category: { type: String, default: 'General' },
    order: { type: Number, default: 0 },
    visible: { type: Boolean, default: true },
    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.models.AboutFAQ || mongoose.model<IAboutFAQ>('AboutFAQ', AboutFAQSchema);
