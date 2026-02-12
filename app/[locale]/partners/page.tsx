import NavbarWrapper from "../components/NavbarWrapper";
import Footer from "../components/Footer";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import PartnersContent from "./PartnersContent";

// Generate SEO-friendly metadata
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "PartnersPage" });

    return {
        title: t("meta.title"),
        description: t("meta.description"),
        openGraph: {
            title: t("meta.title"),
            description: t("meta.description"),
            type: "website",
            locale: locale,
            siteName: "WheelX",
        },
        alternates: {
            canonical: `https://wheelx.bike/${locale}/partners`,
            languages: {
                en: "https://wheelx.bike/en/partners",
                fr: "https://wheelx.bike/fr/partners",
                es: "https://wheelx.bike/es/partners",
                it: "https://wheelx.bike/it/partners",
            },
        },
    };
}

export default function PartnersPage() {
    return (
        <div className="min-h-screen font-sans bg-wheelx-black text-white">
            <NavbarWrapper />
            <PartnersContent />
            <Footer />
        </div>
    );
}
