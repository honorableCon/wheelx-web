import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import JsonLd from "./components/JsonLd";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://wheelx.app'),
  title: {
    default: "WheelX - Elevate Your Ride | La communauté des motards",
    template: "%s | WheelX",
  },
  description: "WheelX est l'application mobile pour les motards. Navigation GPS optimisée moto, suivi de groupe en temps réel, organisation d'événements, carnet d'entretien et communauté mondiale de riders.",
  keywords: ["moto", "motard", "application", "GPS", "navigation", "communauté", "événements moto", "entretien moto", "WheelX", "road trip moto"],
  authors: [{ name: "WheelX Team" }],
  creator: "WheelX",
  publisher: "WheelX Inc.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "WheelX - Elevate Your Ride",
    description: "Rejoignez la communauté WheelX. Navigation GPS moto, suivi de groupe, SOS et événements. Disponible sur iOS et Android.",
    url: 'https://wheelx.app',
    siteName: 'WheelX',
    images: [
      {
        url: '/og-image.jpg', // Make sure this exists or will exist
        width: 1200,
        height: 630,
        alt: 'WheelX App Interface',
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WheelX - Elevate Your Ride",
    description: "L'application ultime pour les motards. Navigation, Communauté, Sécurité.",
    creator: "@wheelx_app",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${outfit.variable} ${inter.variable} antialiased`}>
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
