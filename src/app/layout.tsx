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
  metadataBase: new URL("https://allrummyapps.com"),
  title: {
    default: "All Rummy Apps - Game Rummy Apk Download",
    template: "%s | All Rummy Apps",
  },
  description: "Download Game Rummy Apk and play 60+ games including Rummy, Teen Patti, Ludo, Poker. Get ₹100 instant signup bonus. Fast UPI withdrawal. Safe & secure platform.",
  keywords: [
    "rummy apk",
    "game rummy download",
    "rummy games",
    "teen patti",
    "ludo games",
    "poker games",
    "online rummy",
    "rummy app download",
    "free rummy games",
    "rummy cash games",
    "rummy app",
    "best rummy app",
    "rummy download",
    "play rummy online",
    "rummy india",
  ],
  authors: [{ name: "All Rummy Apps" }],
  creator: "All Rummy Apps",
  publisher: "All Rummy Apps",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://allrummyapps.com",
    siteName: "All Rummy Apps",
    title: "Game Rummy Apk Download - All Rummy Apps",
    description: "Download the best rummy and gaming apps. Get instant signup bonuses and play exciting games!",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "All Rummy Apps",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Game Rummy Apk Download - All Rummy Apps",
    description: "Download the best rummy and gaming apps. Get instant signup bonuses!",
    images: ["/og-image.jpg"],
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
  verification: {
    // Add your Google Search Console verification code here
    // google: "your-verification-code",
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport = {
  width: "device-width" as const,
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#2563eb",
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
