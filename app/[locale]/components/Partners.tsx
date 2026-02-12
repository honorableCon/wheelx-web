"use client";
import { useTranslations } from "next-intl";

// SVG Icons for each category
const GasStationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
    </svg>
);

const WrenchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
    </svg>
);



const ShopIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
    </svg>
);

const ShieldIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
);

const partnerCategories = [
    {
        key: "stations",
        icon: GasStationIcon,
        gradient: "from-amber-500/10 to-wheelx-dark",
        border: "border-amber-500/20",
        iconBg: "bg-amber-500/10",
        iconBorder: "border-amber-500/20",
        iconColor: "text-amber-400",
        hover: "hover:border-amber-500/40"
    },
    {
        key: "garages",
        icon: WrenchIcon,
        gradient: "from-orange-500/10 to-wheelx-dark",
        border: "border-orange-500/20",
        iconBg: "bg-orange-500/10",
        iconBorder: "border-orange-500/20",
        iconColor: "text-orange-400",
        hover: "hover:border-orange-500/40"
    },
    {
        key: "equipment",
        icon: ShopIcon,
        gradient: "from-cyan-500/10 to-wheelx-dark",
        border: "border-cyan-500/20",
        iconBg: "bg-cyan-500/10",
        iconBorder: "border-cyan-500/20",
        iconColor: "text-cyan-400",
        hover: "hover:border-cyan-500/40"
    },
    {
        key: "insurance",
        icon: ShieldIcon,
        gradient: "from-red-500/10 to-wheelx-dark",
        border: "border-red-500/20",
        iconBg: "bg-red-500/10",
        iconBorder: "border-red-500/20",
        iconColor: "text-red-400",
        hover: "hover:border-red-500/40"
    }
];

export default function Partners() {
    const t = useTranslations("Partners");

    return (
        <section className="py-24 bg-wheelx-black relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-wheelx-yellow/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-wheelx-red/5 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-wheelx-dark border border-wheelx-yellow/20 rounded-full px-4 py-2 mb-4">
                        <span className="w-2 h-2 bg-wheelx-yellow rounded-full animate-pulse"></span>
                        <span className="text-sm text-wheelx-yellow font-medium uppercase tracking-wider">{t("badge")}</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                        {t("title")}
                        <span className="block bg-gradient-to-r from-wheelx-yellow to-wheelx-red bg-clip-text text-transparent">
                            {t("titleAccent")}
                        </span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        {t("description")}
                    </p>
                </div>

                {/* Partner Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {partnerCategories.map((category) => (
                        <div
                            key={category.key}
                            className={`group relative bg-gradient-to-br ${category.gradient} border ${category.border} rounded-2xl p-6 ${category.hover} transition-all duration-500`}
                        >
                            <div className={`w-16 h-16 ${category.iconBg} border ${category.iconBorder} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${category.iconColor}`}>
                                <category.icon />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                {t(`categories.${category.key}.title`)}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {t(`categories.${category.key}.description`)}
                            </p>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-br from-wheelx-yellow/10 via-wheelx-dark to-wheelx-red/10 border border-wheelx-yellow/20 rounded-3xl p-8 md:p-12 text-center">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        {t("cta.title")}
                    </h3>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                        {t("cta.description")}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/partners#contact"
                            className="bg-gradient-to-br from-wheelx-yellow to-wheelx-yellow-dark text-wheelx-black font-bold text-lg px-8 py-4 rounded-full shadow-xl shadow-wheelx-yellow/20 hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                            </svg>
                            {t("cta.button")}
                        </a>
                        <a
                            href="/partners"
                            className="bg-transparent border-2 border-wheelx-metal text-white font-bold text-lg px-8 py-4 rounded-full hover:border-wheelx-yellow hover:text-wheelx-yellow hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
                        >
                            {t("cta.learnMore")}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
