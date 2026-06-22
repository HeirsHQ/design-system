export interface UnreadCountResponse {
  unreadCount: number;
}

export type NotificationSeverity = "Info" | "Success" | "Warning" | "Error" | "Critical";

export type NotificationType =
  | "Unknown"
  | "WorkflowApproval"
  | "HrLeave"
  | "PayrollRun"
  | "FinanceInvoice"
  | "SecurityPassword"
  | "SystemMaintenance";

export interface BellNotificationItem {
  id: string;
  title: string;
  summary: string;
  type: NotificationType;
  severity: NotificationSeverity;
  isRead: boolean;
  createdAt: string;
  actionUrl: string;
}

export interface BellNotificationsResponse {
  unreadCount: number;
  items: BellNotificationItem[];
}

export interface NotificationsResponse {
  items: BellNotificationItem[];
  page: number;
  size: number;
  totalCount: number;
  totalPages: number;
}

export interface NotificationsQueryParams {
  page?: number;
  size?: number;
  status?: string;
  type?: NotificationType;
  severity?: NotificationSeverity;
  from?: string;
  to?: string;
}
