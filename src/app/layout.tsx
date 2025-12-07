import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Dibya Ranjan Dwibedy | Professional Photographer in Rourkela, Odisha",
  description: "Portfolio of Dibya Ranjan Dwibedy (DRD Clicks), a professional photographer based in Rourkela, Odisha. Specializing in nature, portrait, and event photography.",
  keywords: ["Photographer", "Rourkela", "Odisha", "Dibya Ranjan Dwibedy", "DRD Clicks", "Portfolio", "Photography", "Wedding Photographer", "Event Photographer"],
  authors: [{ name: "Dibya Ranjan Dwibedy" }],
  creator: "Dibya Ranjan Dwibedy",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://drdclicks.com",
    title: "Dibya Ranjan Dwibedy | Photographer Rourkela",
    description: "Capturing souls and stories. Professional photography services in Rourkela, Odisha by Dibya Ranjan Dwibedy.",
    siteName: "DRD Clicks",
  },
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
