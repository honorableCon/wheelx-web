"use client";
import { useTranslations } from "next-intl";

export default function Referral() {
    const t = useTranslations("Referral");

    const steps = [
        {
            key: "step1",
            number: "01",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-wheelx-yellow">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                </svg>
            ),
        },
        {
            key: "step2",
            number: "02",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-wheelx-yellow">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                </svg>
            ),
        },
        {
            key: "step3",
            number: "03",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-wheelx-yellow">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
            ),
        },
    ] as const;

    const tiers = [
        {
            key: "bronze",
            color: "from-amber-700 to-amber-500",
            textColor: "text-amber-300",
            borderColor: "border-amber-600/30",
            bgColor: "bg-amber-900/20",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-8 h-8 text-amber-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172" />
                </svg>
            ),
        },
        {
            key: "silver",
            color: "from-slate-400 to-slate-300",
            textColor: "text-slate-300",
            borderColor: "border-slate-500/30",
            bgColor: "bg-slate-800/30",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-8 h-8 text-slate-300">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-.702 3.142 3.745 3.745 0 01-3.142.702 3.745 3.745 0 01-3.068 1.593 3.745 3.745 0 01-3.068-1.593 3.745 3.745 0 01-3.142-.702 3.745 3.745 0 01-.702-3.142A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 01.702-3.142 3.745 3.745 0 013.142-.702A3.745 3.745 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.745 3.745 0 013.142.702 3.745 3.745 0 01.702 3.142A3.745 3.745 0 0121 12z" />
                </svg>
            ),
        },
        {
            key: "gold",
            color: "from-wheelx-yellow to-amber-400",
            textColor: "text-wheelx-yellow",
            borderColor: "border-wheelx-yellow/30",
            bgColor: "bg-wheelx-yellow/10",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-8 h-8 text-wheelx-yellow">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
                </svg>
            ),
        },
    ] as const;

    return (
        <section id="referral" className="py-24 bg-gradient-to-b from-wheelx-black via-wheelx-dark to-wheelx-black relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-wheelx-yellow/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-wheelx-yellow/20 to-transparent"></div>
            <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-wheelx-yellow/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

            <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-wheelx-yellow/10 border border-wheelx-yellow/20 rounded-full px-4 py-1.5 mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-wheelx-yellow">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                        </svg>
                        <span className="text-xs text-wheelx-yellow font-medium uppercase tracking-wider">{t("badge")}</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                        {t("title")}<span className="bg-gradient-to-r from-wheelx-yellow to-wheelx-red bg-clip-text text-transparent">{t("titleAccent")}</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        {t("description")}
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left: How it works steps */}
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-8">{t("howTitle")}</h3>
                        <div className="space-y-6">
                            {steps.map(({ key, number, icon }) => (
                                <div key={key} className="flex items-start gap-5 group">
                                    <div className="relative shrink-0">
                                        <div className="w-14 h-14 bg-wheelx-yellow/10 border border-wheelx-yellow/20 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-wheelx-yellow/20 transition-all duration-300">
                                            {icon}
                                        </div>
                                        <span className="absolute -top-2 -right-2 w-5 h-5 bg-wheelx-yellow rounded-full flex items-center justify-center text-[10px] font-black text-wheelx-black">
                                            {number}
                                        </span>
                                    </div>
                                    <div className="pt-1">
                                        <h4 className="text-white font-bold text-lg mb-1">{t(`steps.${key}.title`)}</h4>
                                        <p className="text-gray-400 leading-relaxed">{t(`steps.${key}.desc`)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Tier rewards */}
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-8">{t("tiers.title")}</h3>
                        <div className="space-y-4">
                            {tiers.map(({ key, textColor, borderColor, bgColor, icon }) => (
                                <div key={key} className={`${bgColor} border ${borderColor} rounded-2xl p-6 flex items-center gap-5 hover:scale-[1.02] transition-transform duration-300`}>
                                    <span>{icon}</span>
                                    <div>
                                        <p className={`font-black text-lg ${textColor}`}>{t(`tiers.${key}.name`)}</p>
                                        <p className="text-gray-400 text-sm">{t(`tiers.${key}.desc`)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        <div className="mt-8 p-6 bg-wheelx-yellow/5 border border-wheelx-yellow/20 rounded-2xl text-center">
                            <p className="text-gray-300 text-sm">{t("cta")}</p>
                            <div className="flex gap-3 justify-center mt-4">
                                <a
                                    href="https://apps.apple.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-wheelx-yellow text-wheelx-black font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-wheelx-yellow/90 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                                    </svg>
                                    App Store
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
