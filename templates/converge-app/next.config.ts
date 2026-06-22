import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client", "@prisma/adapter-pg"],
  images: {
    remotePatterns: [
      { hostname: "*.amazonaws.com", protocol: "https" },
      { hostname: "*.unsplash.com", protocol: "https" },
    ],
  },
  rewrites: async () => {
    const routes = [
      {
        source: "/api/identity/:path*",
        destination: process.env.IDENTITY_SERVICE,
      },
      {
        source: "/api/employee/:path*",
        destination: process.env.EMPLOYEE_SERVICE,
      },
      {
        source: "/api/finance/:path*",
        destination: process.env.FINANCE_SERVICE,
      },
      {
        source: "/api/leave/:path*",
        destination: process.env.LEAVE_SERVICE,
      },
      {
        source: "/api/notification/:path*",
        destination: process.env.NOTIFICATION_SERVICE,
      },
      {
        source: "/api/organization/:path*",
        destination: process.env.ORGANIZATION_SERVICE,
      },
      {
        source: "/api/payroll/:path*",
        destination: process.env.PAYROLL_SERVICE,
      },
      {
        source: "/api/questionnaire/:path*",
        destination: process.env.QUESTIONNAIRE_SERVICE,
      },
      {
        source: "/api/tenant/:path*",
        destination: process.env.TENANT_SERVICE,
      },
      {
        source: "/api/workflow/:path*",
        destination: process.env.WORKFLOW_SERVICE,
      },
    ];
    return routes.filter((r): r is { source: string; destination: string } => !!r.destination);
  },
};

export default nextConfig;
