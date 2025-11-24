export interface CVData {
  personal: PersonalInfo;
  summary: string;
  experience: Experience[];
  skills: Skills;
  education: Education[];
  projects?: Project[];
  certifications?: Certification[];
  languages?: Language[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone?: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string; // YYYY-MM format
  endDate: string | null; // null for current position
  description: string;
  achievements: string[];
  skills: string[];
  visibility?: string[]; // e.g., ["all"], ["senior", "tech-lead"], ["frontend"]
}

export interface Skills {
  technical: SkillCategory[];
  soft?: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string | null;
  description?: string;
  achievements?: string[];
  visibility?: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  url?: string;
  github?: string;
  startDate?: string;
  endDate?: string | null;
  technologies: string[];
  highlights: string[];
  visibility?: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  url?: string;
  visibility?: string[];
}

export interface Language {
  name: string;
  proficiency: "Native" | "Fluent" | "Professional" | "Intermediate" | "Basic";
}

// Helper type for filtering
export type VisibilityFilter = "all" | string;
