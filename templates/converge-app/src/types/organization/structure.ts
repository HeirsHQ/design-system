export interface Organization {
  id: string;
  name: string;
}

export type OrgStructureType = "unit" | "group" | "department";

export interface OrgStructureItem {
  Id: string;
  Code: string;
  Name: string;
  StructureType: string;
  ManagerId: string;
  ManagerName: string;
  ManagerEmail: string;
  EmployeeCount: number;
  Location: string;
  CreatedAt: string;
  UpdatedAt: string;
}

export interface OrgEntry {
  id: string;
  name: string;
  structureType: OrgStructureType;
  headName: string;
  headEmail: string;
  employeeCount: number;
  location: string;
  createdAt: string;
}

export interface BulkStructureActionRequest {
  action: "suspend" | "unsuspend" | "archive" | "unarchive" | "delete";
  items: Array<{ id: string; structureType: "Group" | "Department" | "Unit" }>;
}
