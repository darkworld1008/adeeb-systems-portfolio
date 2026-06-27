export interface TechnicalCore {
  id: string;
  name: string;
  percentage: number;
  subroutines: string[];
  coreId: string;
}

export interface OperationalAsset {
  id: string;
  label: string;
  securityLevel: string;
  title: string;
  description: string;
  badges: string[];
  imagePath: string;
  actionText: string;
  actionType: "url" | "deploy" | "clone";
  actionTarget: string;
}

export interface ConsoleLine {
  timestamp: string;
  text: string;
  type: "system" | "kernel" | "user" | "success" | "warning" | "error";
}

export interface EducationDetail {
  degree: string;
  institution: string;
  university: string;
  graduationYear: string;
  cgpa: string;
  location: string;
}

export interface LanguageDetail {
  name: string;
  fluency: string;
}

export interface InternshipDetail {
  id: string;
  role: string;
  company: string;
  location: string;
  duration: string;
  bullets: string[];
  status: string;
}

export interface CertificationDetail {
  name: string;
  provider: string;
  idCode?: string;
}

