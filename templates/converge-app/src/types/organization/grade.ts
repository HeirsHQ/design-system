export interface EmployeeGrade {
  id: string;
  name: string;
  salary: number;
  description: string;
  createdAt: Date;
}

export interface CreateEmployeeGradeDto {
  name: string;
  salary: number;
  description?: string;
}

export interface EmploymentType {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
}

export interface CreateEmploymentTypeDto {
  name: string;
  description?: string;
}

export interface UpdateEmploymentTypeDto {
  name: string;
  description?: string;
  isActive: boolean;
}

export interface EmployeeGroup {
  id: string;
  name: string;
  memberCount: number;
  departmentName?: string;
  managerName?: string;
  status: "active" | "inactive";
  createdAt: string;
}
