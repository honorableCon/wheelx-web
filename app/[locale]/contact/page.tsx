"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
);

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
);

const ChatIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.023c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
    </svg>
);

export default function ContactPage() {
    const t = useTranslations("Contact");
    const [isScrolled, setIsScrolled] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        // Placeholder for form submission logic
    };

    return (
        <div className="min-h-screen bg-wheelx-black text-white font-sans">
            <Navbar isScrolled={true} />

            <main className="pt-32 pb-24 px-6 md:px-8 lg:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
                            {t("title")}<span className="text-wheelx-yellow">{t("titleAccent")}</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            {t("description")}
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-5 gap-12 items-start">
                        {/* Contact Info */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="bg-wheelx-dark border border-gray-800 p-8 rounded-3xl">
                                <h2 className="text-2xl font-bold mb-8 text-white">{t("info.title")}</h2>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 group">
                                        <div className="w-12 h-12 bg-wheelx-yellow/10 rounded-xl flex items-center justify-center text-wheelx-yellow group-hover:bg-wheelx-yellow group-hover:text-wheelx-black transition-colors">
                                            <MailIcon />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">{t("info.email")}</p>
                                            <p className="text-lg font-semibold">hello@wheelx.bike</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 group">
                                        <div className="w-12 h-12 bg-wheelx-yellow/10 rounded-xl flex items-center justify-center text-wheelx-yellow group-hover:bg-wheelx-yellow group-hover:text-wheelx-black transition-colors">
                                            <ChatIcon />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">{t("info.follow")}</p>
                                            <div className="flex gap-4 mt-1">
                                                <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
                                                <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
                                                <a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative element or secondary info */}
                            <div className="bg-gradient-to-br from-wheelx-yellow/20 to-transparent border border-wheelx-yellow/10 p-8 rounded-3xl">
                                <p className="text-gray-300 italic">
                                    "WheelX is more than an app, it's a shared passion for the road. We read every message."
                                </p>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-3">
                            <div className="bg-wheelx-dark border border-gray-800 p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
                                {submitted ? (
                                    <div className="py-12 text-center">
                                        <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                        </div>
                                        <h3 className="text-2xl font-bold mb-2">{t("form.success")}</h3>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-400 ml-1">{t("form.name")}</label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                                                        <UserIcon />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        required
                                                        className="w-full bg-wheelx-black border border-gray-800 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-wheelx-yellow transition-colors placeholder:text-gray-600"
                                                        placeholder="John Doe"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-400 ml-1">{t("form.email")}</label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                                                        <MailIcon />
                                                    </div>
                                                    <input
                                                        type="email"
                                                        required
                                                        className="w-full bg-wheelx-black border border-gray-800 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-wheelx-yellow transition-colors placeholder:text-gray-600"
                                                        placeholder="john@example.com"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-400 ml-1">{t("form.message")}</label>
                                            <textarea
                                                required
                                                rows={5}
                                                className="w-full bg-wheelx-black border border-gray-800 rounded-2xl py-4 px-4 focus:outline-none focus:border-wheelx-yellow transition-colors placeholder:text-gray-600 resize-none"
                                                placeholder="..."
                                            ></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full bg-gradient-to-r from-wheelx-yellow to-wheelx-yellow-dark text-wheelx-black font-black text-lg py-5 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-wheelx-yellow/20"
                                        >
                                            {t("form.send")}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
