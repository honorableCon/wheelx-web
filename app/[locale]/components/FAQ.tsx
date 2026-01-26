"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
);

export default function FAQ() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const t = useTranslations("FAQ");

    // We can't easily map over a JSON array in next-intl without getMessages or similar
    // For simplicity, I'll use a fixed length since I know there are 5 FAQs
    const faqIndices = [0, 1, 2, 3, 4];

    return (
        <section id="faq" className="py-24 bg-wheelx-black">
            <div className="max-w-3xl mx-auto px-6 md:px-8">
                <h2 className="text-4xl md:text-5xl font-black text-center text-white mb-4">
                    {t("title")}<span className="text-wheelx-yellow">{t("titleAccent")}</span>
                </h2>
                <p className="text-center text-gray-400 max-w-2xl mx-auto mb-16 text-lg">
                    {t("description")}
                </p>

                <div className="space-y-4">
                    {faqIndices.map((index) => (
                        <div
                            key={index}
                            className="border border-gray-800 rounded-2xl overflow-hidden bg-wheelx-dark/50"
                        >
                            <button
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                            >
                                <span className="text-white font-semibold pr-4 text-lg">{t(`items.${index}.question`)}</span>
                                <span className={`text-wheelx-yellow transition-transform duration-300 ${openFaq === index ? "rotate-180" : ""}`}>
                                    <ChevronDownIcon />
                                </span>
                            </button>
                            <div className={`transition-all duration-300 ease-in-out ${openFaq === index ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}>
                                <p className="px-6 pb-6 text-gray-400 leading-relaxed text-base">{t(`items.${index}.answer`)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
