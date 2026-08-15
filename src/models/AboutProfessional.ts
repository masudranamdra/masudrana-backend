import mongoose, { Schema, Document } from 'mongoose';

export interface IStat {
  label: string;
  value: string;
  icon: string;
  description?: string;
  colorClass?: string;
}

export interface IAboutProfessional extends Document {
  professionalSummary: string;
  whoIAm: string;
  philosophy: string;
  coreValues: string[];
  currentFocus: string[];
  stats: IStat[];
  createdAt: Date;
  updatedAt: Date;
}

const StatSchema = new Schema<IStat>({
  label: { type: String, required: true },
  value: { type: String, required: true },
  icon: { type: String, required: true },
  description: { type: String },
  colorClass: { type: String }
});

const AboutProfessionalSchema = new Schema<IAboutProfessional>(
  {
    professionalSummary: {
      type: String,
      default: 'Experienced Full Stack Engineer with expertise in scalable web architectures, modern JavaScript frameworks, and database optimizations.'
    },
    whoIAm: {
      type: String,
      default: 'Passionate developer dedicated to engineering elegant, high-impact digital solutions.'
    },
    philosophy: {
      type: String,
      default: 'Clean code, continuous learning, and user-first software engineering.'
    },
    coreValues: {
      type: [String],
      default: ['Clean Architecture', 'User-Centric Design', 'Performance Optimization', 'Reliable Security']
    },
    currentFocus: {
      type: [String],
      default: ['Next.js 15 App Router', 'Express.js & Node APIs', 'TypeScript', 'MongoDB']
    },
    stats: {
      type: [StatSchema],
      default: [
        { label: 'Years Experience', value: '5+', icon: 'Briefcase', description: 'Building web applications', colorClass: 'text-indigo-500' },
        { label: 'Completed Projects', value: '30+', icon: 'FolderCode', description: 'For clients and enterprise', colorClass: 'text-emerald-500' },
        { label: 'Happy Clients', value: '20+', icon: 'Users', description: 'Worldwide satisfaction', colorClass: 'text-amber-500' }
      ]
    }
  },
  { timestamps: true }
);

export default mongoose.models.AboutProfessional || mongoose.model<IAboutProfessional>('AboutProfessional', AboutProfessionalSchema);
