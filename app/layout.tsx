import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Dormigen® | Advanced EBV Suppression & Immune Support",
    template: "%s | Dormigen®"
  },
  description: "Dormigen® is a research-driven nutraceutical system designed to induce EBV dormancy, stop flare-ups, and restore mitochondrial energy. Science-backed immune resilience.",
  keywords: ["EBV suppression", "Epstein-Barr Virus", "autoimmune support", "chronic fatigue relief", "viral dormancy", "immune system wellness", "Dormigen", "mitochondrial health"],
  authors: [{ name: "Dormigen® Team" }],
  creator: "Dormigen®",
  publisher: "Dormigen®",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.dormigen.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Dormigen® | Advanced EBV Suppression & Immune Support",
    description: "Induce EBV dormancy and restore immune stability. The research-driven approach to silencing the virus behind disease.",
    url: "https://www.dormigen.com",
    siteName: "Dormigen®",
    images: [
      {
        url: "/dormigen-logo.png",
        width: 800,
        height: 800,
        alt: "Dormigen® Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dormigen® | EBV Suppression System",
    description: "The science-backed protocol for viral dormancy and immune resilience.",
    images: ["/dormigen-logo.png"],
  },
  icons: {
    icon: [
      { url: "/dormigen-logo.png", sizes: "32x32", type: "image/png" },
      { url: "/dormigen-logo.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/dormigen-logo.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/dormigen-logo.png"],
  },
  manifest: "/site.webmanifest",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable} scroll-smooth`}>
      <head />
      <body className="antialiased bg-navy text-white selection:bg-medical selection:text-white">
        {children}
      </body>
    </html>
  );
}
