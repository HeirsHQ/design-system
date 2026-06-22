import type { Pagination } from "@/types/app";

export interface Employee {
  id: string;
  employeeCode: string;
  name: string;
  email: string;
  departmentId: string | null;
  departmentName: string | null;
  unitId: string | null;
  unitName: string | null;
  jobTitle: string;
  joinDate: Date;
  status: string;
}

export interface CreateEmployeeDto {
  personalInfo: {
    staffId: string;
    title: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    personalEmail: string;
    officeEmail: string;
    gender: string;
    dateOfBirth: Date | undefined;
    placeOfBirth: string;
    nationality: string;
    religion: string;
    stateOfOrigin: string;
    maritalStatus: string;
    weddingAnniversary?: Date | undefined;
    mothersMaidenName: string;
    taxId: string;
    nin: string;
    houseAddress: string;
    pictureUrl?: string;
    workEmail: string;
    hireDate: Date | undefined;
  };
  emergencyContact: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    relationship: string;
  };
  userId: string;
  isUser: boolean;
}

export interface EmployeeListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: string;
  departmentId?: string;
  jobTitle?: string;
  joinDate?: string;
}

export interface ListEmployeeResponse {
  data: {
    items: Employee[];
  } & Pagination;
}

export interface EmployeeSummaryResponse {
  data: {
    totalEmployees: number;
    activeEmployees: number;
    suspendedEmployees: number;
    averageTenureYears: number;
    deltas: {
      totalEmployees: string;
      activeEmployees: string;
      suspendedEmployees: string;
      averageTenureYears: string;
    };
  };
}
