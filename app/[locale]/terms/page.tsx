"use client";

import { useTranslations } from "next-intl";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TermsPage() {
    const t = useTranslations("Terms");

    return (
        <div className="min-h-screen bg-wheelx-black text-white font-sans">
            <Navbar isScrolled={true} />

            <main className="pt-32 pb-24 px-6 md:px-8 lg:px-12">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-black mb-4">
                            {t("title")}<span className="text-wheelx-yellow">{t("titleAccent")}</span>
                        </h1>
                        <p className="text-gray-500 font-medium">
                            {t("lastUpdated")}
                        </p>
                    </div>

                    <div className="space-y-12">
                        <section className="bg-wheelx-dark border border-gray-800 p-8 rounded-3xl">
                            <h2 className="text-2xl font-bold mb-4 text-white">{t("sections.acceptance.title")}</h2>
                            <p className="text-gray-400 leading-relaxed">
                                {t("sections.acceptance.content")}
                            </p>
                        </section>

                        <section className="bg-wheelx-dark border border-gray-800 p-8 rounded-3xl">
                            <h2 className="text-2xl font-bold mb-4 text-white">{t("sections.usage.title")}</h2>
                            <p className="text-gray-400 leading-relaxed">
                                {t("sections.usage.content")}
                            </p>
                        </section>

                        <section className="bg-wheelx-dark border border-gray-800 p-8 rounded-3xl border-l-4 border-l-wheelx-yellow">
                            <h2 className="text-2xl font-bold mb-4 text-white">{t("sections.safety.title")}</h2>
                            <p className="text-gray-400 leading-relaxed">
                                {t("sections.safety.content")}
                            </p>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
