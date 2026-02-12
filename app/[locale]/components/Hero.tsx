"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";

const AppleIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
);

const PlayStoreIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
    </svg>
);

const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
);

export default function Hero() {
    const t = useTranslations("Hero");

    return (
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.15)_0%,transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(239,68,68,0.1)_0%,transparent_40%),#0a0a0a]">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-32 w-96 h-96 bg-wheelx-yellow/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-wheelx-red/10 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-32 lg:py-0 w-full">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Content */}
                    <div className="text-center lg:text-left animate-fade-in flex flex-col items-center lg:items-start">
                        <div className="inline-flex items-center gap-2 bg-wheelx-dark border border-gray-700 rounded-full px-4 py-2 mb-6">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            <span className="text-sm text-gray-300">{t("availability")}</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-tight mb-6">
                            {t("title")}
                            <span className="block bg-gradient-to-r from-wheelx-yellow to-wheelx-red bg-clip-text text-transparent">
                                {t("ride")}
                            </span>
                        </h1>

                        <p className="text-lg sm:text-xl text-gray-400 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                            {t("description")}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full sm:w-auto">
                            <a href="https://apps.apple.com/app/wheelxi/id6757822107" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-br from-wheelx-yellow to-wheelx-yellow-dark text-wheelx-black font-semibold py-4 px-8 rounded-full shadow-lg shadow-wheelx-yellow/20 hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                                <AppleIcon />
                                {t("appStore")}
                            </a>
                            <div className="relative">
                                <span className="bg-transparent text-wheelx-metal border-2 border-wheelx-gray font-semibold py-4 px-8 rounded-full flex items-center justify-center gap-2 cursor-not-allowed opacity-50">
                                    <PlayStoreIcon />
                                    {t("googlePlay")}
                                </span>
                                <span className="absolute -top-2 -right-2 bg-wheelx-yellow text-wheelx-black text-[10px] font-bold px-2 py-0.5 rounded-full">Soon</span>
                            </div>
                        </div>

                        {/* Stats Preview */}
                        <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-gray-800 w-full max-w-md lg:max-w-none">
                            <div className="text-center lg:text-left">
                                <p className="text-2xl sm:text-3xl font-bold text-wheelx-yellow bg-gradient-to-br from-wheelx-yellow to-wheelx-red bg-clip-text text-transparent">50K+</p>
                                <p className="text-sm text-gray-500">{t("stats.riders")}</p>
                            </div>
                            <div className="text-center lg:text-left">
                                <p className="text-2xl sm:text-3xl font-bold text-wheelx-yellow bg-gradient-to-br from-wheelx-yellow to-wheelx-red bg-clip-text text-transparent">10K+</p>
                                <p className="text-sm text-gray-500">{t("stats.routes")}</p>
                            </div>
                            <div className="text-center lg:text-left">
                                <p className="text-2xl sm:text-3xl font-bold text-wheelx-yellow bg-gradient-to-br from-wheelx-yellow to-wheelx-red bg-clip-text text-transparent">5K+</p>
                                <p className="text-sm text-gray-500">{t("stats.events")}</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Phone Mockup with Real Screenshot */}
                    <div className="relative flex justify-center animate-float mt-12 lg:mt-0">
                        <div className="w-[280px] h-[580px] bg-wheelx-dark rounded-[50px] border-[6px] border-gray-800 relative overflow-hidden shadow-2xl shadow-black/50">
                            {/* Notch */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[28px] bg-gray-800 rounded-b-[20px] z-20"></div>
                            {/* Real App Screenshot */}
                            <Image
                                width={280}
                                height={580}
                                src="/images/home_app_screenshot.png"
                                alt="WheelX App Home Screen"
                                className="absolute inset-0 w-full h-full object-cover rounded-[44px]"
                            />
                        </div>

                        {/* Floating Cards */}
                        <div className="absolute -left-8 top-1/4 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 animate-slide-up hidden lg:block shadow-xl" style={{ animationDelay: "0.3s" }}>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center text-2xl">
                                    📍
                                </div>
                                <div>
                                    <p className="text-white font-semibold">{t("mockup.liveTracking")}</p>
                                    <p className="text-gray-400 text-sm">{t("mockup.ridersNearby")}</p>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -right-4 bottom-1/3 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 animate-slide-up hidden lg:block shadow-xl" style={{ animationDelay: "0.5s" }}>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center text-2xl">
                                    🛡️
                                </div>
                                <div>
                                    <p className="text-white font-semibold">{t("mockup.sosActive")}</p>
                                    <p className="text-gray-400 text-sm">{t("mockup.protection")}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <a href="#features" className="flex flex-col items-center gap-2 text-gray-500 hover:text-white transition-colors">
                    <span className="text-sm font-medium">{t("scroll")}</span>
                    <ChevronDownIcon />
                </a>
            </div>
        </section>
    );
}
