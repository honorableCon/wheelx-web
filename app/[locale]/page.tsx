import NavbarWrapper from "./components/NavbarWrapper";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Partners from "./components/Partners";
import HowItWorks from "./components/HowItWorks";
import Stats from "./components/Stats";
import FAQ from "./components/FAQ";
import DownloadCTA from "./components/DownloadCTA";
import Footer from "./components/Footer";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

// Generate SEO-friendly metadata on the server
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      locale: locale,
      siteName: "WheelX",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "WheelX - Motorcycle Community App",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/og-image.png"],
    },
    alternates: {
      canonical: `https://wheelx.bike/${locale}`,
      languages: {
        en: "https://wheelx.bike/en",
        fr: "https://wheelx.bike/fr",
        es: "https://wheelx.bike/es",
        it: "https://wheelx.bike/it",
      },
    },
  };
}

/**
 * Server Component Homepage - optimized for SEO
 * All interactive elements are encapsulated in Client Components
 */
export default function Home() {
  return (
    <div className="min-h-screen font-sans bg-wheelx-black text-white">
      <NavbarWrapper />
      <Hero />
      <Features />
      <HowItWorks />
      <Stats />
      <Partners />
      <FAQ />
      <DownloadCTA />
      <Footer />
    </div>
  );
}
