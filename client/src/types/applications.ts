export type ApplicationStatus =
  | "Interested"
  | "Applied"
  | "Screening"
  | "Interview"
  | "Offer"
  | "Rejected"
  | "Withdrawn";

export type WorkType =
  | "Remote"
  | "Hybrid"
  | "On-site";

export interface JobApplication {
  id: number;
  companyName: string;
  jobTitle: string;
  jobUrl?: string;
  dateApplied: string;
  status: ApplicationStatus;
  location?: string;
  workType?: WorkType;
  contactName?: string;
  contactEmail?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}