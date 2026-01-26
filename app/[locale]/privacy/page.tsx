"use client";

import { useTranslations } from "next-intl";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PrivacyPage() {
    const t = useTranslations("Privacy");

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
                            <h2 className="text-2xl font-bold mb-4 text-white">{t("sections.data.title")}</h2>
                            <p className="text-gray-400 leading-relaxed">
                                {t("sections.data.content")}
                            </p>
                        </section>

                        <section className="bg-wheelx-dark border border-gray-800 p-8 rounded-3xl">
                            <h2 className="text-2xl font-bold mb-4 text-white">{t("sections.sharing.title")}</h2>
                            <p className="text-gray-400 leading-relaxed">
                                {t("sections.sharing.content")}
                            </p>
                        </section>

                        <section className="bg-wheelx-dark border border-gray-800 p-8 rounded-3xl">
                            <h2 className="text-2xl font-bold mb-4 text-white">{t("sections.security.title")}</h2>
                            <p className="text-gray-400 leading-relaxed">
                                {t("sections.security.content")}
                            </p>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
