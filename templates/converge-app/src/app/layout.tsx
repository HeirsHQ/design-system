import { ThemeProvider } from "next-themes";
import { Mulish } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

import { AppProvider, ErrorBoundary, QueryProvider } from "@/components/providers";
import { Toaster } from "@heirshq/design-system";

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "{{APP_TITLE}}",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${mulish.variable} h-full scroll-smooth antialiased`} suppressHydrationWarning>
      <body className="flex min-h-full flex-col">
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="light">
            <QueryProvider>
              <AppProvider>
                {children}
                <Toaster position="top-right" />
              </AppProvider>
            </QueryProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
