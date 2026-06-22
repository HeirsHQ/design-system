export type DashboardItemStatus = "NEGATIVE" | "NEUTRAL" | "POSITIVE";
export type ReportDateRange = "Last7Days" | "Last30Days" | "Last3Months";

export interface DashboardItem {
  value: number;
  deltaPercent: number;
  deltaAbsolute: number;
  trend: DashboardItemStatus;
  status: DashboardItemStatus;
}
