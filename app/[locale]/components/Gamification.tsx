"use client";
import { useTranslations } from "next-intl";

export default function Gamification() {
    const t = useTranslations("Gamification");

    const cards = [
        {
            key: "xp",
            color: "fuchsia",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-fuchsia-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
            ),
            gradient: "from-fuchsia-500/10",
            border: "border-fuchsia-500/20 hover:border-fuchsia-500/50",
            glow: "bg-fuchsia-500/10",
        },
        {
            key: "badges",
            color: "amber",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-amber-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-.702 3.142 3.745 3.745 0 01-3.142.702 3.745 3.745 0 01-3.068 1.593 3.745 3.745 0 01-3.068-1.593 3.745 3.745 0 01-3.142-.702 3.745 3.745 0 01-.702-3.142A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 01.702-3.142 3.745 3.745 0 013.142-.702A3.745 3.745 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.745 3.745 0 013.142.702 3.745 3.745 0 01.702 3.142A3.745 3.745 0 0121 12z" />
                </svg>
            ),
            gradient: "from-amber-500/10",
            border: "border-amber-500/20 hover:border-amber-500/50",
            glow: "bg-amber-500/10",
        },
        {
            key: "challenges",
            color: "violet",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-violet-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
            ),
            gradient: "from-violet-500/10",
            border: "border-violet-500/20 hover:border-violet-500/50",
            glow: "bg-violet-500/10",
        },
        {
            key: "duels",
            color: "red",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-red-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
                </svg>
            ),
            gradient: "from-red-500/10",
            border: "border-red-500/20 hover:border-red-500/50",
            glow: "bg-red-500/10",
        },
        {
            key: "streaks",
            color: "orange",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-orange-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
                </svg>
            ),
            gradient: "from-orange-500/10",
            border: "border-orange-500/20 hover:border-orange-500/50",
            glow: "bg-orange-500/10",
        },
        {
            key: "leaderboard",
            color: "yellow",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-yellow-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
                </svg>
            ),
            gradient: "from-yellow-500/10",
            border: "border-yellow-500/20 hover:border-yellow-500/50",
            glow: "bg-yellow-500/10",
        },
    ] as const;

    return (
        <section id="gamification" className="py-24 bg-wheelx-black relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-fuchsia-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-fuchsia-500/10 border border-fuchsia-500/20 rounded-full px-4 py-1.5 mb-6">
                        <span className="w-2 h-2 bg-fuchsia-400 rounded-full animate-pulse"></span>
                        <span className="text-xs text-fuchsia-300 font-medium uppercase tracking-wider">{t("badge")}</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                        {t("title")}<span className="bg-gradient-to-r from-fuchsia-400 to-violet-400 bg-clip-text text-transparent">{t("titleAccent")}</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        {t("description")}
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {cards.map(({ key, icon, gradient, border, glow }) => (
                        <div
                            key={key}
                            className={`group relative bg-gradient-to-br ${gradient} via-wheelx-dark to-wheelx-dark border ${border} rounded-3xl p-8 overflow-hidden transition-all duration-500`}
                        >
                            <div className={`absolute -top-10 -right-10 w-36 h-36 ${glow} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700`}></div>
                            <div className="relative z-10">
                                <div className={`w-14 h-14 ${glow} border ${border.split(" ")[0]} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                                    {icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{t(`${key}.title`)}</h3>
                                <p className="text-gray-400 leading-relaxed">{t(`${key}.desc`)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
