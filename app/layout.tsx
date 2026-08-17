import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import CloudflareAnalytics from "../components/analytics/CloudflareAnalytics";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jannsenagustin.github.io/resumeops/"),
  title: {
    default: "Project Atlas | Engineering Console",
    template: "%s | Project Atlas",
  },
  description:
    "Project Atlas is an Engineering Console documenting architecture, evidence, validation, infrastructure, and engineering decisions.",
  openGraph: {
    title: "Project Atlas | Engineering Console",
    description: "An Engineering Console documenting architecture, evidence, validation, infrastructure, and engineering decisions.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Project Atlas | Engineering Console",
    description: "An Engineering Console documenting architecture, evidence, validation, infrastructure, and engineering decisions.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <CloudflareAnalytics />
      </body>
    </html>
  );
}
