export interface DashboardMetrics {
  TotalGroups: number;
  TotalDepartments: number;
  TotalUnits: number;
  TotalJobRoles: number;
  ActiveGroups: number;
  ActiveDepartments: number;
  ActiveUnits: number;
  SuspendedGroups: number;
  SuspendedDepartments: number;
  SuspendedUnits: number;
  ArchivedGroups: number;
  ArchivedDepartments: number;
  ArchivedUnits: number;
  TotalEmployees: number;
  ActiveEmployees: number;
  SuspendedEmployees: number;
  AverageTenureYears: number;
  EmployeeDeltas: {
    TotalEmployees: string;
    ActiveEmployees: string;
    SuspendedEmployees: string;
    AverageTenureYears: string;
  };
  EntityDeltas: {
    GroupsCreatedThisMonth: number;
    DepartmentsCreatedThisMonth: number;
    UnitsCreatedThisMonth: number;
    GroupsPercentChange: number;
    DepartmentsPercentChange: number;
    UnitsPercentChange: number;
  };
}
