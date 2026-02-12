"use client";
import { useTranslations } from "next-intl";
import { useState, FormEvent } from "react";

// Icon components
const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
);

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

const HelmetIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
);

const ShieldIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
);

const partnerCategories = [
    { key: "stations", icon: GasStationIcon, color: "amber" },
    { key: "garages", icon: WrenchIcon, color: "orange" },
    { key: "equipment", icon: HelmetIcon, color: "cyan" },
    { key: "insurance", icon: ShieldIcon, color: "red" }
];

export default function PartnersContent() {
    const t = useTranslations("PartnersPage");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        category: "",
        message: ""
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/contact-partner", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitted(true);
                setFormData({ name: "", email: "", company: "", category: "", message: "" });
            } else {
                const data = await response.json();
                setError(data.error || "Failed to send message");
            }
        } catch (err) {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-gradient-to-b from-wheelx-black via-wheelx-dark to-wheelx-black relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-wheelx-yellow/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-wheelx-red/10 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-5xl mx-auto px-6 md:px-8 lg:px-12 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 bg-wheelx-yellow/10 border border-wheelx-yellow/20 rounded-full px-4 py-2 mb-6">
                        <span className="w-2 h-2 bg-wheelx-yellow rounded-full animate-pulse"></span>
                        <span className="text-sm text-wheelx-yellow font-medium uppercase tracking-wider">{t("hero.badge")}</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6">
                        {t("hero.title")}
                        <span className="block bg-gradient-to-r from-wheelx-yellow to-wheelx-red bg-clip-text text-transparent">
                            {t("hero.titleAccent")}
                        </span>
                    </h1>

                    <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
                        {t("hero.description")}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="#contact"
                            className="bg-gradient-to-br from-wheelx-yellow to-wheelx-yellow-dark text-wheelx-black font-bold text-lg px-8 py-4 rounded-full shadow-xl shadow-wheelx-yellow/20 hover:-translate-y-1 transition-all"
                        >
                            {t("hero.ctaPrimary")}
                        </a>
                        <a
                            href="#benefits"
                            className="bg-transparent border-2 border-wheelx-metal text-white font-bold text-lg px-8 py-4 rounded-full hover:border-wheelx-yellow hover:text-wheelx-yellow hover:-translate-y-1 transition-all"
                        >
                            {t("hero.ctaSecondary")}
                        </a>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section id="benefits" className="py-24 bg-wheelx-black">
                <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                            {t("benefits.title")}
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            {t("benefits.description")}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {["visibility", "engagement", "data", "support", "integration", "growth"].map((benefit) => (
                            <div
                                key={benefit}
                                className="bg-wheelx-dark border border-wheelx-gray rounded-2xl p-6 hover:border-wheelx-yellow/30 transition-all duration-300"
                            >
                                <div className="w-12 h-12 bg-wheelx-yellow/10 border border-wheelx-yellow/20 rounded-xl flex items-center justify-center mb-4 text-wheelx-yellow">
                                    <CheckIcon />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">
                                    {t(`benefits.items.${benefit}.title`)}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {t(`benefits.items.${benefit}.description`)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-24 bg-wheelx-dark">
                <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                            {t("categories.title")}
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            {t("categories.description")}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {partnerCategories.map((category) => (
                            <div
                                key={category.key}
                                className={`bg-gradient-to-br from-${category.color}-500/10 to-wheelx-black border border-${category.color}-500/20 rounded-3xl p-8 hover:border-${category.color}-500/40 transition-all duration-500`}
                            >
                                <div className={`w-16 h-16 bg-${category.color}-500/10 border border-${category.color}-500/20 rounded-2xl flex items-center justify-center mb-6 text-${category.color}-400`}>
                                    <category.icon />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">
                                    {t(`categories.items.${category.key}.title`)}
                                </h3>
                                <p className="text-gray-400 mb-4 leading-relaxed">
                                    {t(`categories.items.${category.key}.description`)}
                                </p>
                                <ul className="space-y-2">
                                    {["one", "two", "three"].map((num) => (
                                        <li key={num} className="flex items-start gap-2 text-gray-400 text-sm">
                                            <span className={`text-${category.color}-400 mt-0.5`}>•</span>
                                            {t(`categories.items.${category.key}.benefits.${num}`)}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section id="contact" className="py-24 bg-wheelx-black">
                <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-12">
                    <div className="bg-gradient-to-br from-wheelx-yellow/10 via-wheelx-dark to-wheelx-red/10 border border-wheelx-yellow/20 rounded-3xl p-8 md:p-12">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                                {t("contact.title")}
                            </h2>
                            <p className="text-gray-400 text-lg">
                                {t("contact.description")}
                            </p>
                        </div>

                        {submitted ? (
                            <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-8 text-center">
                                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-green-400">
                                    <CheckIcon />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">{t("contact.success.title")}</h3>
                                <p className="text-gray-400">{t("contact.success.message")}</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-white font-semibold mb-2">{t("contact.form.name")}</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-wheelx-dark border border-wheelx-gray rounded-xl px-4 py-3 text-white focus:outline-none focus:border-wheelx-yellow transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-white font-semibold mb-2">{t("contact.form.email")}</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-wheelx-dark border border-wheelx-gray rounded-xl px-4 py-3 text-white focus:outline-none focus:border-wheelx-yellow transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-white font-semibold mb-2">{t("contact.form.company")}</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.company}
                                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                            className="w-full bg-wheelx-dark border border-wheelx-gray rounded-xl px-4 py-3 text-white focus:outline-none focus:border-wheelx-yellow transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-white font-semibold mb-2">{t("contact.form.category")}</label>
                                        <select
                                            required
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full bg-wheelx-dark border border-wheelx-gray rounded-xl px-4 py-3 text-white focus:outline-none focus:border-wheelx-yellow transition-colors"
                                        >
                                            <option value="">{t("contact.form.selectCategory")}</option>
                                            <option value="Gas Stations">{t("categories.items.stations.title")}</option>
                                            <option value="Garages & Services">{t("categories.items.garages.title")}</option>
                                            <option value="Equipment Shops">{t("categories.items.equipment.title")}</option>
                                            <option value="Insurance Providers">{t("categories.items.insurance.title")}</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-white font-semibold mb-2">{t("contact.form.message")}</label>
                                    <textarea
                                        required
                                        rows={5}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full bg-wheelx-dark border border-wheelx-gray rounded-xl px-4 py-3 text-white focus:outline-none focus:border-wheelx-yellow transition-colors resize-none"
                                    ></textarea>
                                </div>

                                {error && (
                                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-center">
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-br from-wheelx-yellow to-wheelx-yellow-dark text-wheelx-black font-bold text-lg px-8 py-4 rounded-full shadow-xl shadow-wheelx-yellow/20 hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                                >
                                    {loading ? t("contact.form.sending") : t("contact.form.submit")}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
