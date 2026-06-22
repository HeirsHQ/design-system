import type { Department, Organization } from "./organization";

export type ActivityType = "scheduled" | "interview" | "task" | "follow-up" | "assessment" | "onboarding" | "other";
export type JobStatus = "open" | "closed" | "cancelled" | "pending" | "in progress";
export type ActivityPriority = "urgent" | "high" | "medium" | "low";
export type JobType = "full-time" | "part-time" | "contract";
export type MeetingType = "in-person" | "phone" | "video";
export type WorkType = "on-site" | "hybrid" | "remote";
export type ExperienceType =
  | "internship"
  | "entry-level"
  | "associate-level"
  | "mid-level"
  | "senior-level"
  | "management-level"
  | "director-level"
  | "executive-level";

export interface Job {
  id: string;
  title: string;
  description?: string;
  status: JobStatus;
  createdAt: Date;
  updatedAt: Date;
  openUntil: Date;
  jobType: JobType;
  workType: WorkType;
  experienceType: ExperienceType;
  responsibilities: string[];
  tags: string[];
  applications: JobApplication[];
  activities: JobActivity[];
  requirements: string[];
  location?: string;
  remote?: boolean;
  salaryMin?: number;
  salaryMax?: number;
  currency?: string;
  role?: string;
  department?: Department;
  company?: Organization;
  benefits?: string[];
  closedAt?: Date;
  views?: number;
}

export interface JobActivity {
  id: string;
  jobId: string;
  title: string;
  startDate: Date;
  endDate: Date;
  meetingType: MeetingType;
  location: string;
  meetingUrl: string;
  priority: ActivityPriority;
  type: ActivityType;
  createdAt: Date;
  description?: string;
  updatedAt?: Date;
}

export interface JobApplication {
  id: string;
  jobId: string;
  applicant: JobApplicant;
  status: string;
  pipeline: PipelineStageConfig;
  matchScore: number;
  source: string;
  appliedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApplicantExperience {
  title: string;
  company: string;
  period: string;
  description: string;
}

export interface ApplicantEducation {
  degree: string;
  institution: string;
  year: string;
}

export interface ApplicantCertification {
  name: string;
  year: string;
}

export interface JobApplicant {
  id: string;
  name: string;
  email: string;
  phone?: string;
  resume: string;
  coverLetter?: string;
  appliedAt: Date;
  skills: string[];
  location: string;
  summary?: string;
  experience?: ApplicantExperience[];
  education?: ApplicantEducation[];
  certifications?: ApplicantCertification[];
}

export interface PipelineStageConfig {
  id: string;
  title: string;
  slug: string;
  color: string;
  notifications: {
    enabled: boolean;
    recipients: string[];
  };
  approval: {
    required: boolean;
    approvers: string[];
  };
  automation: {
    autoMoveAfterDays?: number;
    sendEmailTemplate?: string;
  };
}

export interface ApplyDto {
  fullName: string;
  email: string;
  phoneNumber: string;
  location: string;
  linkedInUrl: string;
  summary: string;
  skills: string[];
  coverLetter: string;
  resumeFile: File | null;
}

export interface CreateJobDto {
  title: string;
  description?: string;
  openUntil?: Date;
  jobType: JobType | (string & {});
  workType: WorkType | (string & {});
  experienceType: ExperienceType | (string & {});
  responsibilities?: string[];
  tags?: string[];
  location?: string;
  remote?: boolean;
  salaryFrequency?: string;
  salaryMin?: number;
  salaryMax?: number;
  currency?: string;
  role?: string;
  departmentId?: string;
  companyId?: string;
  requirements?: string[];
  benefits?: string[];
}

export interface CreateActivityDto {
  jobId: string;
  title: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  meetingType: MeetingType | (string & {});
  location: string;
  meetingUrl: string;
  priority: ActivityPriority | (string & {});
  type: ActivityType | (string & {});
  description?: string;
}

export interface JobTemplate {
  id: string;
  title: string;
  department: Department;
  jobType: JobType;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface Pipeline {
  id: string;
  name: string;
  description: string;
  stages: PipelineStageConfig[];
  department: Department;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export type ApprovalStatus = "pending" | "approved" | "rejected";

export interface ApprovalComment {
  id: string;
  authorName: string;
  text: string;
  createdAt: Date;
}

export interface ApprovalRequest {
  id: string;
  candidateId: string;
  applicationId: string;
  jobId: string;
  pipelineId: string;
  stageId: string;
  fromStageId: string;
  requestedBy: string;
  assignedTo: string[];
  status: ApprovalStatus;
  comments: ApprovalComment[];
  createdAt: Date;
  resolvedAt?: Date;
  resolvedBy?: string;
}

export interface CandidateExperience {
  title: string;
  company: string;
  startDate: string;
  endDate?: string;
  description: string;
}

export interface CandidateEducation {
  degree: string;
  institution: string;
  year: number;
}

export interface CandidateCertification {
  name: string;
  year: number;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  summary?: string;
  resume: string;
  matchScore: number;
  coverLetter?: string;
  avatar?: string;
  skills: string[];
  experience: CandidateExperience[];
  education: CandidateEducation[];
  certifications: CandidateCertification[];
  status: string;
  appliedAt: Date;
  currentStageId: string;
  previousStageId?: string;
  pipelineId?: string;
  jobId: string;
  job: Job;
  applicationId: string;
  approvalStatus?: ApprovalStatus;
  activeApprovalId?: string;
  tags?: string[];
  notes?: string;
  rating?: number;
  source?: string;
}

export interface StageHistoryEntry {
  stageId: string;
  stageName: string;
  enteredAt: Date;
  exitedAt?: Date;
  action: "moved" | "approved" | "rejected" | "auto-moved";
  performedBy: string;
  notes?: string;
}

export interface PipelineInstance {
  id: string;
  pipelineId: string;
  candidateId: string;
  jobId: string;
  currentStageId: string;
  stageHistory: StageHistoryEntry[];
  startedAt: Date;
  completedAt?: Date;
  status: "active" | "completed" | "rejected";
}

export interface CreatePipelineDto {
  name: string;
  departmentId: string;
  stages: PipelineStageConfig[];
  isActive: boolean;
  description?: string;
}
