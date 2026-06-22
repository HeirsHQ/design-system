import { WorkflowStatus } from "./workflow";

export interface TenantScope {
  tenantId: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  version: number;
}

export type AppStatus = "draft" | "published" | "archived";

export interface AppDefinition extends TenantScope {
  id: string;
  slug: string;
  name: string;
  description?: string;
  icon?: string;
  status: AppStatus;
  screenIds: string[];
  screens: ScreenSchema[];
  homeScreenId?: string;
  homeScreen?: ScreenSchema;
  workflowIds: string[];
  reportIds: string[];
  settings: AppSettings;
  _count: {
    screens: number;
    workflows: number;
    reports: number;
  };
}

export interface AppSettings {
  theme?: "light" | "dark" | "system";
  primaryColor?: string;
  allowAnonymous?: boolean;
  submissionBehavior?: "redirect" | "message" | "reset";
  successMessage?: string;
  redirectUrl?: string;

  // Form
  multipleSubmissions?: boolean;
  editAfterSubmit?: boolean;
  showProgressBar?: boolean;
  saveDraft?: boolean;
  openAt?: string;
  closeAt?: string;
  confirmationEmail?: boolean;
  shuffleFields?: boolean;
  showSummary?: boolean;

  // List
  searchable?: boolean;
  filterable?: boolean;
  sortable?: boolean;
  pageSize?: 10 | 25 | 50 | 100;
  exportable?: boolean;
  inlineEdit?: boolean;
  bulkActions?: boolean;
  selectable?: boolean;

  // Detail
  editable?: boolean;
  showRelated?: boolean;
  showActivity?: boolean;

  // Dashboard
  refreshInterval?: number;
  dateRangePicker?: boolean;
  userCustomisable?: boolean;

  // Landing page
  seoTitle?: string;
  seoDescription?: string;
  customDomain?: string;
  analyticsId?: string;
  cookieBanner?: boolean;
  socialShareImage?: string;
}

export type ScreenLayout = "single-column" | "two-column" | "three-column" | "custom";
export type ScreenType = "form" | "list" | "detail" | "dashboard" | "landing" | "blank";

export interface ScreenSchema extends TenantScope {
  id: string;
  appId: string;
  app?: AppDefinition;
  name: string;
  slug: string;
  type: ScreenType;
  layout: ScreenLayout;
  position: number;
  widgets: WidgetNode[];
  datasource?: DatasourceBinding;
  conditions?: WidgetCondition[];
}

export type WidgetType =
  | "container"
  | "columns"
  | "section"
  | "divider"
  | "spacer"
  | "text-input"
  | "number-input"
  | "email-input"
  | "textarea"
  | "select"
  | "multi-select"
  | "checkbox"
  | "radio-group"
  | "date-picker"
  | "file-upload"
  | "rich-text"
  | "heading"
  | "paragraph"
  | "badge"
  | "image"
  | "stat-card"
  | "progress"
  | "table"
  | "list"
  | "chart"
  | "kanban"
  | "button"
  | "link"
  | "submit-button";

export interface WidgetBase {
  id: string;
  type: WidgetType;
  label?: string;
  colSpan?: number;
  hidden?: boolean;
  conditions?: WidgetCondition[];
  styles?: WidgetStyles;
}

export interface ContainerWidget extends WidgetBase {
  type: "container" | "columns" | "section";
  children: WidgetNode[];
  gridCols?: number;
  gap?: number;
}

export interface InputWidget extends WidgetBase {
  type:
    | "text-input"
    | "number-input"
    | "email-input"
    | "textarea"
    | "select"
    | "multi-select"
    | "checkbox"
    | "radio-group"
    | "date-picker"
    | "file-upload"
    | "rich-text";
  fieldKey: string;
  placeholder?: string;
  required?: boolean;
  readOnly?: boolean;
  defaultValue?: unknown;
  validation?: ValidationRule[];
  options?: { label: string; value: string }[];
  optionsSource?: DatasourceBinding;
}

export interface DisplayWidget extends WidgetBase {
  type: "heading" | "paragraph" | "badge" | "image" | "stat-card" | "progress" | "divider" | "spacer";
  content?: string;
  src?: string;
  variant?: string;
  bindTo?: string;
  datasource?: DatasourceBinding;
}

export interface ActionWidget extends WidgetBase {
  type: "button" | "link" | "submit-button";
  label: string;
  variant?: "default" | "outline" | "destructive" | "ghost";
  action?: WidgetAction;
  href?: string;
  disabled?: boolean | string;
  icon?: string;
  iconPosition?: "left" | "right";
}

export interface DataWidget extends WidgetBase {
  type: "table" | "list" | "chart" | "kanban";
  datasource: DatasourceBinding;
  columns?: TableColumn[];
  chartType?: "bar" | "line" | "pie" | "area";
  groupBy?: string;
}

export type WidgetNode = ContainerWidget | InputWidget | DisplayWidget | ActionWidget | DataWidget;

export type DatasourceType = "erp-entity" | "custom-api" | "static" | "form-submission";

export interface DatasourceBinding {
  type: DatasourceType;
  entity?: string;
  endpoint?: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: { key: string; value: string }[];
  responseKey?: string;
  filters?: FilterRule[];
  orderBy?: { field: string; direction: "asc" | "desc" }[];
  limit?: number;
  staticData?: unknown[];
}

export interface FilterRule {
  field: string;
  operator: "eq" | "neq" | "gt" | "gte" | "lt" | "lte" | "in" | "contains" | "starts-with";
  value: unknown;
}

export type TriggerType =
  | "form-submit"
  | "button-click"
  | "record-created"
  | "record-updated"
  | "record-deleted"
  | "scheduled"
  | "webhook"
  | "manual";

export type WorkflowNodeType =
  | "trigger"
  | "action-api"
  | "action-create-record"
  | "action-update-record"
  | "action-delete-record"
  | "action-send-email"
  | "action-send-notification"
  | "action-set-variable"
  | "condition"
  | "branch"
  | "loop"
  | "delay"
  | "end";

export interface WorkflowGraph extends TenantScope {
  id: string;
  appId: string;
  name: string;
  description?: string;
  trigger: WorkflowTrigger;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  status: WorkflowStatus;
  lastRunAt?: Date;
  runCount?: number;
}

export interface WorkflowTrigger {
  type: TriggerType;
  screenId?: string;
  widgetId?: string;
  entity?: string;
  schedule?: string;
  webhookSecret?: string;
}

export interface WorkflowNode {
  id: string;
  type: WorkflowNodeType;
  label: string;
  position: { x: number; y: number };
  config: Record<string, unknown>;
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  condition?: string;
}

export type ChartType = "bar" | "line" | "area" | "pie" | "donut" | "scatter" | "table";
export type ReportStatus = "draft" | "published";

export interface ReportSpec extends TenantScope {
  id: string;
  appId?: string;
  name: string;
  description?: string;
  datasource: DatasourceBinding;
  columns: ReportColumn[];
  filters: FilterRule[];
  groupBy?: string[];
  orderBy?: { field: string; direction: "asc" | "desc" }[];
  chart?: {
    type: ChartType;
    xKey: string;
    yKeys: string[];
    colorKey?: string;
  };
  status: ReportStatus;
}

export interface ReportColumn {
  key: string;
  label: string;
  type: "text" | "number" | "currency" | "date" | "boolean" | "badge";
  format?: string;
  aggregate?: "sum" | "count" | "avg" | "min" | "max";
  width?: number;
  hidden?: boolean;
  sortable?: boolean;
}

export type ConditionOperator =
  | "eq"
  | "neq"
  | "gt"
  | "gte"
  | "lt"
  | "lte"
  | "contains"
  | "not-contains"
  | "starts-with"
  | "ends-with"
  | "empty"
  | "not-empty"
  | "in"
  | "not-in";

export type ConditionAction = "show" | "hide" | "require" | "make-optional" | "enable" | "disable";

export interface ConditionRule {
  field: string;
  operator: ConditionOperator;
  value?: string;
}

export interface WidgetCondition {
  id: string;
  when: "all" | "any";
  rules: ConditionRule[];
  action: ConditionAction;
}

export interface ValidationRule {
  type: "required" | "min" | "max" | "min-length" | "max-length" | "pattern" | "email" | "url" | "custom";
  value?: unknown;
  message: string;
}

export interface TableColumn {
  key: string;
  label: string;
  type?: "text" | "number" | "currency" | "date" | "badge";
  sortable?: boolean;
  width?: number;
}

export interface WidgetStyles {
  padding?: string;
  margin?: string;
  background?: string;
  border?: string;
  borderRadius?: string;
  textColor?: string;
  fontSize?: string;
  fontWeight?: string;
  textAlign?: "left" | "center" | "right";
  height?: string;
  minHeight?: string;
  width?: string;
  maxWidth?: string;
  overflow?: "visible" | "hidden" | "auto" | "scroll";
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  aspectRatio?: string;
}

export interface WidgetAction {
  type:
    | "navigate"
    | "submit-form"
    | "trigger-workflow"
    | "open-modal"
    | "close-modal"
    | "set-variable"
    | "back"
    | "push"
    | "replace"
    | "reload";
  screenId?: string;
  url?: string;
  workflowId?: string;
  variable?: string;
  value?: unknown;
}

export interface AppDefinitionRow {
  id: string;
  tenant_id: string;
  slug: string;
  name: string;
  description: string | null;
  icon: string | null;
  status: AppStatus;
  version: number;
  definition: Pick<AppDefinition, "screenIds" | "homeScreenId" | "workflowIds" | "reportIds" | "settings">;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface ScreenSchemaRow {
  id: string;
  app_id: string;
  tenant_id: string;
  name: string;
  slug: string;
  type: ScreenType;
  version: number;
  definition: Pick<ScreenSchema, "layout" | "widgets" | "datasource" | "conditions">;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface WorkflowGraphRow {
  id: string;
  app_id: string;
  tenant_id: string;
  name: string;
  status: WorkflowStatus;
  version: number;
  definition: Pick<WorkflowGraph, "trigger" | "nodes" | "edges" | "description" | "lastRunAt" | "runCount">;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface ReportSpecRow {
  id: string;
  app_id: string | null;
  tenant_id: string;
  name: string;
  status: ReportStatus;
  version: number;
  definition: Pick<ReportSpec, "description" | "datasource" | "columns" | "filters" | "groupBy" | "orderBy" | "chart">;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface CreateAppDefinition {
  slug: string;
  name: string;
  description?: string;
  icon?: string;
  settings: AppSettings;
}

// ── API input types ────────────────────────────────────────────────────────────

export interface CreateAppInput {
  name: string;
  template: string;
  description?: string;
  icon?: string;
  settings?: Partial<AppSettings>;
  slug?: string;
}

export interface UpdateAppInput {
  name?: string;
  slug?: string;
  description?: string;
  icon?: string;
  homeScreenId?: string | null;
  settings?: Partial<AppSettings>;
}

export interface CreateScreenInput {
  name: string;
  type: ScreenType | (string & {});
  conditions?: WidgetCondition[] | null;
  datasource?: DatasourceBinding | null;
  layout?: ScreenLayout | (string & {});
  slug?: string;
  widgets?: WidgetNode[];
}

export type UpdateScreenInput = Partial<CreateScreenInput>;

export interface CreateWorkflowInput {
  name: string;
  description?: string;
  trigger: WorkflowTrigger;
  nodes?: WorkflowNode[];
  edges?: WorkflowEdge[];
  status?: WorkflowStatus;
}

export interface UpdateWorkflowInput {
  name?: string;
  description?: string;
  trigger?: WorkflowTrigger;
  nodes?: WorkflowNode[];
  edges?: WorkflowEdge[];
  status?: WorkflowStatus;
}

export interface CreateReportInput {
  name: string;
  description?: string;
  datasource: DatasourceBinding;
  columns?: ReportColumn[];
  filters?: FilterRule[];
  groupBy?: string[];
  orderBy?: { field: string; direction: "asc" | "desc" }[];
  chart?: ReportSpec["chart"];
}

export interface UpdateReportInput {
  name?: string;
  description?: string;
  datasource?: DatasourceBinding;
  columns?: ReportColumn[];
  filters?: FilterRule[];
  groupBy?: string[];
  orderBy?: { field: string; direction: "asc" | "desc" }[] | null;
  chart?: ReportSpec["chart"] | null;
  status?: ReportStatus;
}
