import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import MotionObserver from "../components/MotionObserver";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Jannsen Agustin | Engineering Projects",
    template: "%s | Jannsen Agustin",
  },
  description:
    "Explore Atlas, Jannsen Agustin's containerized Splunk observability lab, alongside verified enterprise Splunk experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <MotionObserver />
      </body>
    </html>
  );
}
