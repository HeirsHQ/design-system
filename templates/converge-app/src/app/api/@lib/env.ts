import { z } from "zod";

const schema = z.object({
  ALERT_SERVICE: z.string(),
  APPRAISAL_SERVICE: z.string(),
  ATTRITION_SERVICE: z.string(),
  DOCUMENTS_SERVICE: z.string(),
  EMPLOYEE_SERVICE: z.string(),
  GOAL_SERVICE: z.string(),
  IDENTITY_SERVICE: z.string(),
  IMPORT_SERVICE: z.string(),
  KPI_TRACKING_SERVICE: z.string(),
  LEAVE_SERVICE: z.string(),
  NOTIFICATION_SERVICE: z.string(),
  ORGANIZATION_SERVICE: z.string(),
  PAYROLL_SERVICE: z.string(),
  QUESTIONNAIRE_SERVICE: z.string(),
  PERFORMANCE_SERVICE: z.string(),
  REVIEWS_SERVICE: z.string(),
  SEQUENCE_SERVICE: z.string(),
  TALENT_SERVICE: z.string(),
  TENANT_SERVICE: z.string(),
  WORKFLOW_SERVICE: z.string(),
  NODE_ENV: z.enum(["development", "production", "staging"]).default("development"),
  NEXT_PUBLIC_ENCRYPTION_SECRET: z.string().min(1),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  throw new Error(`Invalid environment configuration:\n${JSON.stringify(parsed.error.flatten().fieldErrors, null, 2)}`);
}

export const env = parsed.data;
