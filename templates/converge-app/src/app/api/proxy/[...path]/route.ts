import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

import { removeNullorUndefined } from "@/lib";
import { env } from "../../@lib/env";
import { ServiceKey } from "@/lib";

const services: Record<ServiceKey, string> = {
  alert: env.ALERT_SERVICE ?? "",
  "app-builder": "/api/v1",
  appraisal: env.APPRAISAL_SERVICE ?? "",
  attrition: env.ATTRITION_SERVICE ?? "",
  documents: env.DOCUMENTS_SERVICE ?? "",
  employee: env.EMPLOYEE_SERVICE ?? "",
  goal: env.GOAL_SERVICE ?? "",
  identity: env.IDENTITY_SERVICE ?? "",
  import: env.IMPORT_SERVICE ?? "",
  "kpi-tracking": env.KPI_TRACKING_SERVICE ?? "",
  leave: env.LEAVE_SERVICE ?? "",
  notification: env.NOTIFICATION_SERVICE ?? "",
  organization: env.ORGANIZATION_SERVICE ?? "",
  payroll: env.PAYROLL_SERVICE ?? "",
  performance: env.PERFORMANCE_SERVICE ?? "",
  questionnaire: env.QUESTIONNAIRE_SERVICE ?? "",
  reviews: env.REVIEWS_SERVICE ?? "",
  sequence: env.SEQUENCE_SERVICE ?? "",
  talent: env.TALENT_SERVICE ?? "",
  tenant: env.TENANT_SERVICE ?? "",
  workflow: env.WORKFLOW_SERVICE ?? "",
};

const handleProxy = async (request: NextRequest, method: "get" | "post" | "put" | "patch" | "delete") => {
  const pathParts = request.nextUrl.pathname.split("/").filter(Boolean);
  const proxyIndex = pathParts.indexOf("proxy");

  if (proxyIndex === -1 || proxyIndex + 2 > pathParts.length) {
    return NextResponse.json({ error: "Invalid proxy path" }, { status: 400 });
  }

  const serviceKey = pathParts[proxyIndex + 1] as ServiceKey;
  const targetPath = pathParts.slice(proxyIndex + 2).join("/");
  const serviceUrl = services[serviceKey];

  if (!serviceUrl) {
    return NextResponse.json({ error: "Unknown service" }, { status: 400 });
  }

  const searchParams = request.nextUrl.searchParams;
  // Prefer HttpOnly cookie (server-readable); fall back to forwarded Authorization header
  const cookieToken = request.cookies.get("ACCESS_TOKEN")?.value;
  const headerToken = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const rawToken = cookieToken ?? headerToken;
  const token = rawToken ? `Bearer ${rawToken}` : null;
  const companyId = request.cookies.get("COMPANY_ID")?.value ?? request.headers.get("Company-Id");
  const body = method !== "get" && method !== "delete" ? await request.json() : undefined;

  try {
    const response = await axios({
      method,
      url: `${serviceUrl}/${targetPath}`,
      data: body,
      params: removeNullorUndefined(searchParams),
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: token }),
        ...(companyId && { "Company-Id": companyId }),
        ...(serviceKey === "leave" && { "X-Api-Version": "1" }),
      },
    });

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(error.response.data, { status: error.response.status });
    }
    console.error("[proxy] unexpected error:", error);
    return NextResponse.json({ error: "Proxy request failed" }, { status: 500 });
  }
};

export async function GET(request: NextRequest) {
  return handleProxy(request, "get");
}

export async function POST(request: NextRequest) {
  return handleProxy(request, "post");
}

export async function PUT(request: NextRequest) {
  return handleProxy(request, "put");
}

export async function PATCH(request: NextRequest) {
  return handleProxy(request, "patch");
}

export async function DELETE(request: NextRequest) {
  return handleProxy(request, "delete");
}
