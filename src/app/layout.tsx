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
  title: {
    default: "Kakamega Empowerment CBO - Empowering Communities, Advancing Rights, Transforming Lives",
    template: "%s | Kakamega Empowerment CBO",
  },
  description: "Kakamega Empowerment CBO empowers communities through advocacy, civic engagement, climate action, land rights protection, and social accountability initiatives that promote sustainable development and social cohesion.",
  keywords: [
    "Kakamega Empowerment",
    "community empowerment",
    "climate action",
    "land rights",
    "human rights",
    "governance",
    "civic engagement",
    "Kakamega County",
    "Kenya",
    "social justice",
    "environmental conservation",
    "tree planting",
    "community development"
  ],
  authors: [{ name: "Kakamega Empowerment CBO" }],
  creator: "Kakamega Empowerment CBO",
  publisher: "Kakamega Empowerment CBO",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://kakamega-empowerment.org",
    title: "Kakamega Empowerment CBO - Empowering Communities, Advancing Rights, Transforming Lives",
    description: "Kakamega Empowerment CBO empowers communities through advocacy, civic engagement, climate action, land rights protection, and social accountability initiatives.",
    siteName: "Kakamega Empowerment CBO",
    images: [
      {
        url: "/kakamega-empowerment-logo-transparent.png",
        width: 1200,
        height: 630,
        alt: "Kakamega Empowerment CBO Logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Kakamega Empowerment CBO",
    description: "Empowering communities through advocacy, civic engagement, climate action, land rights protection, and social accountability.",
    images: [
      {
        url: "/kakamega-empowerment-logo-transparent.png"
      }
    ]
  },
  icons: {
    icon: "/kakamega-empowerment-logo-transparent.png",
    shortcut: "/kakamega-empowerment-logo-transparent.png",
    apple: "/kakamega-empowerment-logo-transparent.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-KE" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-gray-900 dark:bg-slate-900 dark:text-slate-100">
        {children}
      </body>
    </html>
  );
}
