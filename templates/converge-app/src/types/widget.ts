export type UserWidgetType =
  | "heirs-news"
  | "horizontal-metric"
  | "expenses"
  | "tasks"
  | "documents"
  | "database"
  | "heirs-calendar"
  | "adverts"
  | "event-card"
  | "recent-activities";

export type WidgetSection = "main" | "sidebar";
export type WidgetCategory = "information" | "data";

export interface DashboardWidget {
  instanceId: string;
  type: UserWidgetType;
  section: WidgetSection;
}

export interface WidgetCatalogItem {
  type: UserWidgetType;
  label: string;
  category: WidgetCategory;
  defaultSection: WidgetSection;
}

export interface UserWidget {
  id: string;
  label: string;
  widgetType: string;
}
