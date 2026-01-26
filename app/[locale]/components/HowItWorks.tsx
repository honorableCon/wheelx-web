"use client";
import { useTranslations } from "next-intl";

export default function HowItWorks() {
    const t = useTranslations("HowItWorks");

    const steps = [
        { step: "01", title: t("steps.step1.title"), desc: t("steps.step1.desc") },
        { step: "02", title: t("steps.step2.title"), desc: t("steps.step2.desc") },
        { step: "03", title: t("steps.step3.title"), desc: t("steps.step3.desc") },
    ];

    return (
        <section id="how-it-works" className="py-24 bg-[#111] relative overflow-hidden">
            {/* Asphalt Texture Effect */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>

            {/* Tire Tracks */}
            <div className="absolute top-0 left-10 w-24 h-full border-r-4 border-dashed border-gray-800/30 transform -skew-x-12"></div>
            <div className="absolute top-0 right-10 w-24 h-full border-l-4 border-dashed border-gray-800/30 transform -skew-x-12"></div>

            <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 relative z-10">
                <h2 className="text-4xl md:text-5xl font-black text-center text-white mb-4 uppercase tracking-tighter transform -skew-x-6">
                    {t("title")}<span className="text-wheelx-yellow inline-block border-b-4 border-wheelx-yellow">{t("titleAccent")}</span>{t("titleEnd")}
                </h2>
                <p className="text-center text-gray-400 max-w-2xl mx-auto mb-20 text-lg font-medium">
                    {t("description")}
                </p>

                <div className="grid md:grid-cols-3 gap-12 relative">
                    {/* Road Line Connector (Desktop) */}
                    <div className="hidden md:block absolute top-[60px] left-0 right-0 h-4 bg-[#1a1a1a] border-y-2 border-gray-700 -z-10 transform -skew-y-2"></div>
                    <div className="hidden md:block absolute top-[66px] left-0 right-0 h-0.5 border-t-2 border-dashed border-wheelx-yellow -z-10 transform -skew-y-2 opacity-80"></div>

                    {steps.map((item, index) => (
                        <div key={index} className="flex flex-col items-center group">
                            <div className="w-32 h-32 mb-8 relative flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                                {/* Tire Shape Background */}
                                <div className="absolute inset-0 bg-gray-900 rounded-full border-[6px] border-[#222] shadow-[0_0_20px_rgba(0,0,0,0.8)]"></div>
                                <div className="absolute inset-2 border-2 border-dashed border-gray-600 rounded-full animate-spin-slow" style={{ animationDuration: '10s' }}></div>

                                {/* Center Speedometer Style */}
                                <div className="absolute inset-4 bg-gradient-to-br from-gray-800 to-black rounded-full flex items-center justify-center border-2 border-gray-700">
                                    <span className="text-4xl font-black text-wheelx-yellow italic">{item.step}</span>
                                </div>
                            </div>

                            <div className="bg-[#1a1a1a] border-b-4 border-wheelx-yellow p-6 w-full transform transition-all duration-300 hover:-translate-y-2 hover:bg-[#222] skew-x-[-3deg]">
                                <h3 className="text-xl font-black text-white mb-2 uppercase italic tracking-wide skew-x-[3deg]">{item.title}</h3>
                                <p className="text-gray-400 text-sm skew-x-[3deg] font-medium">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
