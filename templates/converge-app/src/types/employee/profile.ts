export interface NextOfKin {
  name: string;
  relationship: string;
  phone: string;
  email: string;
  address: string;
}

export interface Referre {
  id: string;
  category: string;
  name: string;
  email: string;
  phone: string;
  profession: string;
  address: string;
}

export interface Training {
  id: string;
  institution: string;
  certification: string;
  acquiredAt: Date;
  expiresAt: Date;
}

export interface WorkExperience {
  id: string;
  company: string;
  jobTitle: string;
  reasonForLeaving: string;
  startDate: Date;
  endDate: Date;
  exitSalary: string;
}

export interface Education {
  id: string;
  schoolType: string;
  country: string;
  institution: string;
  degreeType: string;
  degreeClass: string;
}

export interface Dependant {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email: string;
  address: string;
  dateOfBirth: Date;
  profession: string;
}

export interface Language {
  id: string;
  name: string;
  speaking: string;
  writing: string;
  reading: string;
}

export interface Skill {
  id: string;
  name: string;
  level: string;
}

export type CreateEducationDto = Omit<Education, "id">;
export type CreateNextOfKinDto = Omit<NextOfKin, "id">;
export type CreateReferreDto = Omit<Referre, "id">;
export type CreateTrainingDto = Omit<Training, "id">;
export type CreateWorkExperienceDto = Omit<WorkExperience, "id">;
export type CreateDependantDto = Omit<Dependant, "id">;
export type CreateLanguageDto = Omit<Language, "id">;
export type CreateSkillDto = Omit<Skill, "id">;
