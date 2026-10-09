import mongoose, { Schema, Document } from 'mongoose';

export interface ISemester {
  semesterNumber: number;
  status: 'Completed' | 'Running' | 'Upcoming';
  title?: string;
  shortDescription?: string;
}

export interface IActivity extends Document {
  title: string;
  description: string;
  date: string; // e.g. "Oct 2023 - Present"
  duration?: string; // e.g. "3 Months"
  category: string; // 'Work' | 'Education' | 'Course' | 'Award' | 'Project' | 'Diploma Education' | 'Secondary Education' | 'Online Professional Training' | 'Current Learning' | 'Other'
  icon: string; // Lucide icon name
  image?: {
    url: string;
    publicId?: string;
  };
  fullDetails?: string;
  order: number;
  
  // Generic flags
  isFeatured: boolean;
  isPublished: boolean;
  isCurrent: boolean;

  // Work specific
  companyName?: string;
  employmentType?: string;
  location?: string;
  responsibilities?: string[];
  technologies?: string[];
  companyWebsite?: string;

  // Education specific
  degree?: string;
  department?: string;
  field?: string;
  instituteName?: string;
  institution?: string;
  session?: string;
  year?: string;
  status?: string; // 'Completed' | 'Running' | 'Learning' | 'Upcoming'
  cgpa?: string;
  academicAchievements?: string[];
  showSemesters?: boolean;
  semesters?: ISemester[];

  // Course specific
  platform?: string;
  instructor?: string;
  completionDate?: string;
  skillsLearned?: string[];
  credentialLink?: string;

  createdAt: Date;
  updatedAt: Date;
}

const SemesterSchema = new Schema(
  {
    semesterNumber: { type: Number, required: true },
    status: { type: String, enum: ['Completed', 'Running', 'Upcoming'], default: 'Upcoming' },
    title: { type: String },
    shortDescription: { type: String },
  },
  { _id: false }
);

const ActivitySchema = new Schema<IActivity>(
  {
    title: { type: String, required: [true, 'Activity title is required'], trim: true },
    description: { type: String, required: [true, 'Activity description is required'] },
    date: { type: String, required: [true, 'Activity date range is required'], trim: true },
    duration: { type: String, trim: true },
    category: {
      type: String,
      default: 'Education',
    },
    icon: { type: String, required: [true, 'Icon name is required'], default: 'GraduationCap' },
    image: {
      url: { type: String, default: '' },
      publicId: { type: String },
    },
    fullDetails: { type: String },
    order: { type: Number, default: 0 },
    
    // Generic flags
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    isCurrent: { type: Boolean, default: false },

    // Work specific
    companyName: { type: String },
    employmentType: { type: String },
    location: { type: String },
    responsibilities: [{ type: String }],
    technologies: [{ type: String }],
    companyWebsite: { type: String },

    // Education specific
    degree: { type: String },
    department: { type: String },
    field: { type: String },
    instituteName: { type: String },
    institution: { type: String },
    session: { type: String },
    year: { type: String },
    status: { type: String },
    cgpa: { type: String },
    academicAchievements: [{ type: String }],
    showSemesters: { type: Boolean, default: false },
    semesters: [SemesterSchema],

    // Course specific
    platform: { type: String },
    instructor: { type: String },
    completionDate: { type: String },
    skillsLearned: [{ type: String }],
    credentialLink: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Activity || mongoose.model<IActivity>('Activity', ActivitySchema);

