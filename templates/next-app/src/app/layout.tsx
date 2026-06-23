import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";

const mulish = Mulish({ variable: "--font-mulish", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "{{APP_TITLE}}",
  description: "",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${mulish.variable} antialiased`} suppressHydrationWarning>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
