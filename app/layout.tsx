import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Navigation from "@/components/nav/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "rinrinx28 — Full-Stack Developer & DevOps Engineer",
  description:
    "Personal portfolio of rinrinx28. Full-Stack Developer specializing in Next.js, NestJS, and DevOps with Linux, Nginx, Docker, PostgreSQL, Redis, and RabbitMQ.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="bg-background text-foreground">
        {/* Fixed UI must live OUTSIDE the smooth-content transform */}
        <CustomCursor />
        <ScrollProgress />
        <Navigation />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
