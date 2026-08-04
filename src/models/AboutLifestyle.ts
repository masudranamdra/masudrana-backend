import mongoose, { Schema, Document } from 'mongoose';

export interface ILifestyleItem {
  id?: string;
  name: string;
  description?: string;
  icon?: string;
  order: number;
  visible: boolean;
}

export interface IAboutLifestyle extends Document {
  funFacts: ILifestyleItem[];
  dailyRoutine: ILifestyleItem[];
  hobbies: ILifestyleItem[];
  interests: ILifestyleItem[];
  favoriteQuotes: ILifestyleItem[];
  books: ILifestyleItem[];
  inspirations: ILifestyleItem[];
  goals: ILifestyleItem[];
  codingPhilosophy: string;
  developmentPrinciples: ILifestyleItem[];
  softSkills: ILifestyleItem[];
  services: ILifestyleItem[];
  createdAt: Date;
  updatedAt: Date;
}

const LifestyleItemSchema = new Schema<ILifestyleItem>({
  name: { type: String, required: true },
  description: { type: String },
  icon: { type: String },
  order: { type: Number, default: 0 },
  visible: { type: Boolean, default: true },
});

const AboutLifestyleSchema = new Schema<IAboutLifestyle>(
  {
    funFacts: { type: [LifestyleItemSchema], default: [] },
    dailyRoutine: { type: [LifestyleItemSchema], default: [] },
    hobbies: { type: [LifestyleItemSchema], default: [] },
    interests: { type: [LifestyleItemSchema], default: [] },
    favoriteQuotes: { type: [LifestyleItemSchema], default: [] },
    books: { type: [LifestyleItemSchema], default: [] },
    inspirations: { type: [LifestyleItemSchema], default: [] },
    goals: { type: [LifestyleItemSchema], default: [] },
    codingPhilosophy: { type: String, default: '' },
    developmentPrinciples: { type: [LifestyleItemSchema], default: [] },
    softSkills: { type: [LifestyleItemSchema], default: [] },
    services: { type: [LifestyleItemSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.AboutLifestyle || mongoose.model<IAboutLifestyle>('AboutLifestyle', AboutLifestyleSchema);
