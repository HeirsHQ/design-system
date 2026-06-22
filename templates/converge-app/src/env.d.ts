export const requiredEnv = [
  "ALERT_SERVICE",
  "APPRAISAL_SERVICE",
  "ATTRITION_SERVICE",
  "DOCUMENTS_SERVICE",
  "EMPLOYEE_SERVICE",
  "GOAL_SERVICE",
  "IDENTITY_SERVICE",
  "KPI_TRACKING_SERVICE",
  "LEAVE_SERVICE",
  "NOTIFICATION_SERVICE",
  "ORGANIZATION_SERVICE",
  "PAYROLL_SERVICE",
  "QUESTIONNAIRE_SERVICE",
  "PERFORMANCE_SERVICE",
  "REVIEWS_SERVICE",
  "SEQUENCE_SERVICE",
  "TALENT_SERVICE",
  "TENANT_SERVICE",
  "WORKFLOW_SERVICE",

  // app env
  "DATABASE_URL",
  "NODE_ENV",
  "ENCRYPTION_SECRET",

  // external modules
  "NEXT_PUBLIC_CONVERGE_ACCOUNTING_URL",
  "NEXT_PUBLIC_CONVERGE_APP_BUILDER_URL",
  "NEXT_PUBLIC_CONVERGE_ASSETS_URL",
  "NEXT_PUBLIC_CONVERGE_BUDGET_URL",
  "NEXT_PUBLIC_CONVERGE_CRM_URL",
  "NEXT_PUBLIC_CONVERGE_INVENTORY_URL",
  "NEXT_PUBLIC_CONVERGE_LOANS_URL",
  "NEXT_PUBLIC_CONVERGE_PROCUREMENT_URL",
  "NEXT_PUBLIC_CONVERGE_SALES_URL",
] as const;

type RequiredEnv = (typeof requiredEnv)[number];

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Readonly<Record<RequiredEnv, string>> {
      readonly ALERT_SERVICE: string;
      readonly APPRAISAL_SERVICE: string;
      readonly EMPLOYEE_SERVICE: string;
      readonly DOCUMENTS_SERVICE: string;
      readonly GOAL_SERVICE: string;
      readonly IDENTITY_SERVICE: string;
      readonly KPI_TRACKING_SERVICE: string;
      readonly LEAVE_SERVICE: string;
      readonly NOTIFICATION_SERVICE: string;
      readonly ORGANIZATION_SERVICE: string;
      readonly PAYROLL_SERVICE: string;
      readonly QUESTIONNAIRE_SERVICE: string;
      readonly PERFORMANCE_SERVICE: string;
      readonly REVIEWS_SERVICE: string;
      readonly SEQUENCE_SERVICE: string;
      readonly TALENT_SERVICE: string;
      readonly TENANT_SERVICE: string;
      readonly WORKFLOW_SERVICE: string;

      readonly DATABASE_URL: string;
      readonly ENCRYPTION_SECRET: string;
      NODE_ENV: "development" | "production" | "test";

      readonly COOKIE_DOMAIN?: string;

      readonly NEXT_PUBLIC_CONVERGE_ACCOUNTING_URL: string;
      readonly NEXT_PUBLIC_CONVERGE_APP_BUILDER_URL: string;
      readonly NEXT_PUBLIC_CONVERGE_ASSETS_URL: string;
      readonly NEXT_PUBLIC_CONVERGE_BUDGET_URL: string;
      readonly NEXT_PUBLIC_CONVERGE_CRM_URL: string;
      readonly NEXT_PUBLIC_CONVERGE_INVENTORY_URL: string;
      readonly NEXT_PUBLIC_CONVERGE_LOANS_URL: string;
      readonly NEXT_PUBLIC_CONVERGE_PROCUREMENT_URL: string;
      readonly NEXT_PUBLIC_CONVERGE_SALES_URL: string;
    }
  }
}

export {};
