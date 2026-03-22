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
  metadataBase: new URL("https://rummys.online"),
  title: {
    default: "rummys.online - Rummy APK Download",
    template: "%s | rummys.online",
  },
  description:
    "Download top rummy, teen patti, ludo, and poker APKs on rummys.online. Discover bonus offers, fast withdrawal apps, and trusted gaming platforms in one place.",
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
  authors: [{ name: "rummys.online" }],
  creator: "rummys.online",
  publisher: "rummys.online",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://rummys.online",
    siteName: "rummys.online",
    title: "rummys.online - Rummy APK Download",
    description:
      "Download the best rummy and gaming apps on rummys.online with bonus offers and fast withdrawal options.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "rummys.online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "rummys.online - Rummy APK Download",
    description:
      "Download the best rummy and gaming apps on rummys.online with bonus offers.",
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
