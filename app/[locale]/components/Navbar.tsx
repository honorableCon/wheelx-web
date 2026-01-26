"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

const MenuIconSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);

const CloseIconSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export default function Navbar({ isScrolled }: { isScrolled: boolean }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const t = useTranslations("Navbar");

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/10 backdrop-blur-md border-b border-white/10 py-3" : "bg-transparent py-5"}`}>
            <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 flex items-center justify-between">
                <a href="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-wheelx-yellow to-wheelx-yellow-dark flex items-center justify-center overflow-hidden">
                        <img src="/logo.png" alt="WheelX Logo" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xl font-bold text-white">WheelX</span>
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    <a href="#features" className="text-gray-400 hover:text-white transition-colors">{t("features")}</a>
                    <a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">{t("howItWorks")}</a>
                    <a href="#faq" className="text-gray-400 hover:text-white transition-colors">{t("faq")}</a>

                    <div className="flex items-center gap-4 ml-4">
                        <LanguageSwitcher />
                        <a href="#download" className="bg-gradient-to-br from-wheelx-yellow to-wheelx-yellow-dark text-wheelx-black font-semibold py-2 px-5 rounded-full shadow-lg shadow-wheelx-yellow/20 hover:-translate-y-0.5 transition-all text-sm flex items-center gap-2">
                            {t("download")}
                        </a>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white p-2"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <CloseIconSvg /> : <MenuIconSvg />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-wheelx-dark/95 backdrop-blur-xl mt-2 mx-4 rounded-2xl p-6 animate-slide-up border border-white/10">
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-400 text-sm">Language</span>
                            <LanguageSwitcher />
                        </div>
                        <a href="#features" className="text-white text-lg" onClick={() => setMobileMenuOpen(false)}>{t("features")}</a>
                        <a href="#how-it-works" className="text-white text-lg" onClick={() => setMobileMenuOpen(false)}>{t("howItWorks")}</a>
                        <a href="#faq" className="text-white text-lg" onClick={() => setMobileMenuOpen(false)}>{t("faq")}</a>
                        <a href="#download" className="bg-wheelx-yellow text-wheelx-black font-bold py-3 text-center rounded-xl mt-2" onClick={() => setMobileMenuOpen(false)}>
                            {t("download")}
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
}
