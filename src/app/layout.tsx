import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { ClickSpark } from "@/components/click-spark";
import { siteMeta, spark, ui } from "@/content/site";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist-mono",
});

// No canonical here: the home page sets its own, and the 404 page must not inherit one.
export const metadata: Metadata = {
  metadataBase: new URL(siteMeta.url),
  title: siteMeta.title,
  description: siteMeta.description,
  openGraph: {
    type: "profile",
    title: siteMeta.title,
    description: siteMeta.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: siteMeta.title,
    description: siteMeta.description,
  },
  // Build marker: the deployed commit, so a live page can be matched to its source.
  other: {
    revision: process.env.GITHUB_SHA ?? "local",
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
};

// Props are typed explicitly (not LayoutProps) so `tsc --noEmit` passes before `next build` generates route types.
export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-bg font-sans text-ink">
        <a href="#main" className="skip-link font-mono text-meta">
          {ui.skipLink}
        </a>
        <div className="mx-auto max-w-page px-5 md:px-10">{children}</div>
        <ClickSpark frames={spark.frames} labels={spark.labels} suffix={spark.suffix} />
      </body>
    </html>
  );
}
