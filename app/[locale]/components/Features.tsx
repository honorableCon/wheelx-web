"use client";
import { useTranslations } from "next-intl";

export default function Features() {
    const t = useTranslations("Features");

    return (
        <section id="features" className="py-24 bg-wheelx-black relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-wheelx-yellow/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                        {t("title")}<span className="bg-gradient-to-r from-wheelx-yellow to-wheelx-red bg-clip-text text-transparent">{t("titleAccent")}</span>{t("titleEnd")}
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        {t("description")}
                    </p>
                </div>

                {/* === BENTO GRID === */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-5">

                    {/* ──────────── GPS NAVIGATION — Hero card (wide) ──────────── */}
                    <div className="lg:col-span-7 group relative bg-gradient-to-br from-amber-500/10 via-wheelx-dark to-wheelx-dark border border-amber-500/20 rounded-3xl p-8 lg:p-10 overflow-hidden hover:border-amber-500/40 transition-all duration-500 min-h-[280px]">
                        {/* Decorative map grid */}
                        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
                            <svg width="100%" height="100%">
                                <defs>
                                    <pattern id="mapGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#mapGrid)" />
                            </svg>
                        </div>
                        {/* Glow */}
                        <div className="absolute -top-20 -right-20 w-60 h-60 bg-amber-500/15 rounded-full blur-3xl group-hover:bg-amber-500/25 transition-all duration-700"></div>
                        {/* Decorative route line */}
                        <svg className="absolute bottom-0 right-0 w-64 h-40 opacity-10 group-hover:opacity-20 transition-opacity" viewBox="0 0 200 120" fill="none">
                            <path d="M10 100 Q50 20, 100 60 T190 20" stroke="#fbbf24" strokeWidth="3" strokeDasharray="8 4" fill="none" />
                            <circle cx="10" cy="100" r="5" fill="#fbbf24" />
                            <circle cx="190" cy="20" r="5" fill="#ef4444" />
                        </svg>
                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 mb-4">
                                <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
                                <span className="text-xs text-amber-300 font-medium uppercase tracking-wider">Core Feature</span>
                            </div>
                            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">{t("items.gps.title")}</h3>
                            <p className="text-gray-400 max-w-md text-base leading-relaxed">{t("items.gps.desc")}</p>
                        </div>
                    </div>

                    {/* ──────────── VOICE CHAT ──────────── */}
                    <div className="lg:col-span-5 group relative bg-gradient-to-br from-cyan-500/10 via-wheelx-dark to-wheelx-dark border border-cyan-500/20 rounded-3xl p-8 overflow-hidden hover:border-cyan-500/40 transition-all duration-500 min-h-[280px]">
                        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all duration-700"></div>
                        {/* Sound wave decoration */}
                        <div className="absolute bottom-6 right-6 flex items-end gap-1 opacity-20 group-hover:opacity-40 transition-opacity">
                            {[20, 35, 15, 40, 25, 45, 30, 20, 35, 15, 40, 28].map((h, i) => (
                                <div
                                    key={i}
                                    className="w-1.5 bg-cyan-400 rounded-full"
                                    style={{
                                        height: `${h}px`,
                                        animation: `pulse 1.5s ease-in-out ${i * 0.1}s infinite alternate`,
                                    }}
                                ></div>
                            ))}
                        </div>
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-cyan-500/15 border border-cyan-500/20 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-cyan-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{t("items.voiceChat.title")}</h3>
                            <p className="text-gray-400 leading-relaxed">{t("items.voiceChat.desc")}</p>
                        </div>
                    </div>

                    {/* ──────────── REAL-TIME TRACKING ──────────── */}
                    <div className="lg:col-span-4 group relative bg-gradient-to-br from-green-500/10 via-wheelx-dark to-wheelx-dark border border-green-500/20 rounded-3xl p-8 overflow-hidden hover:border-green-500/40 transition-all duration-500 min-h-[260px]">
                        <div className="absolute -top-16 -right-16 w-40 h-40 bg-green-500/10 rounded-full blur-3xl group-hover:bg-green-500/20 transition-all duration-700"></div>
                        {/* Animated ping dots */}
                        <div className="absolute top-8 right-8 opacity-30 group-hover:opacity-50 transition-opacity">
                            <div className="relative">
                                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                            </div>
                        </div>
                        <div className="absolute bottom-12 right-16 opacity-20 group-hover:opacity-40 transition-opacity">
                            <div className="relative">
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ animationDelay: "0.5s" }}></div>
                            </div>
                        </div>
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-green-500/15 border border-green-500/20 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-green-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{t("items.tracking.title")}</h3>
                            <p className="text-gray-400 leading-relaxed">{t("items.tracking.desc")}</p>
                        </div>
                    </div>

                    {/* ──────────── GROUPS — Featured (wide) ──────────── */}
                    <div className="lg:col-span-8 group relative bg-gradient-to-br from-violet-500/10 via-wheelx-dark to-wheelx-dark border border-violet-500/20 rounded-3xl p-8 lg:p-10 overflow-hidden hover:border-violet-500/40 transition-all duration-500 min-h-[260px]">
                        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-violet-500/10 rounded-full blur-3xl group-hover:bg-violet-500/20 transition-all duration-700"></div>
                        {/* Avatar group decoration */}
                        <div className="absolute top-8 right-8 flex -space-x-3 opacity-25 group-hover:opacity-50 transition-opacity">
                            {["#fbbf24", "#ef4444", "#8b5cf6", "#06b6d4", "#10b981"].map((color, i) => (
                                <div
                                    key={i}
                                    className="w-10 h-10 rounded-full border-2 border-wheelx-dark flex items-center justify-center text-sm font-bold"
                                    style={{ backgroundColor: color + "30", color: color }}
                                >
                                    {["R", "M", "K", "A", "J"][i]}
                                </div>
                            ))}
                        </div>
                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-3 py-1 mb-4">
                                <span className="text-xs text-violet-300 font-medium uppercase tracking-wider">Community</span>
                            </div>
                            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">{t("items.groups.title")}</h3>
                            <p className="text-gray-400 max-w-lg text-base leading-relaxed">{t("items.groups.desc")}</p>
                        </div>
                    </div>

                    {/* ──────────── DISCOVER ──────────── */}
                    <div className="lg:col-span-5 group relative bg-gradient-to-br from-emerald-500/10 via-wheelx-dark to-wheelx-dark border border-emerald-500/20 rounded-3xl p-8 overflow-hidden hover:border-emerald-500/40 transition-all duration-500 min-h-[240px]">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all duration-700"></div>
                        {/* Globe decoration */}
                        <svg className="absolute bottom-4 right-4 w-24 h-24 opacity-10 group-hover:opacity-20 transition-opacity" viewBox="0 0 100 100" fill="none">
                            <circle cx="50" cy="50" r="40" stroke="#10b981" strokeWidth="1" />
                            <ellipse cx="50" cy="50" rx="20" ry="40" stroke="#10b981" strokeWidth="0.7" />
                            <line x1="10" y1="50" x2="90" y2="50" stroke="#10b981" strokeWidth="0.7" />
                            <line x1="50" y1="10" x2="50" y2="90" stroke="#10b981" strokeWidth="0.7" />
                        </svg>
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-emerald-500/15 border border-emerald-500/20 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-emerald-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{t("items.discover.title")}</h3>
                            <p className="text-gray-400 leading-relaxed">{t("items.discover.desc")}</p>
                        </div>
                    </div>

                    {/* ──────────── MARKETPLACE ──────────── */}
                    <div className="lg:col-span-7 group relative bg-gradient-to-br from-orange-500/10 via-wheelx-dark to-wheelx-dark border border-orange-500/20 rounded-3xl p-8 overflow-hidden hover:border-orange-500/40 transition-all duration-500 min-h-[240px]">
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl group-hover:bg-orange-500/20 transition-all duration-700"></div>
                        {/* Price tags decoration */}
                        <div className="absolute top-6 right-6 flex flex-col gap-2 opacity-15 group-hover:opacity-30 transition-opacity">
                            <div className="bg-orange-400/20 border border-orange-400/30 rounded-lg px-3 py-1 text-orange-300 text-xs font-mono">€ 249</div>
                            <div className="bg-orange-400/20 border border-orange-400/30 rounded-lg px-3 py-1 text-orange-300 text-xs font-mono ml-4">€ 89</div>
                        </div>
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-orange-500/15 border border-orange-500/20 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-orange-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{t("items.marketplace.title")}</h3>
                            <p className="text-gray-400 leading-relaxed">{t("items.marketplace.desc")}</p>
                        </div>
                    </div>

                    {/* ──────────── SOS SAFETY — Featured (wide) ──────────── */}
                    <div className="lg:col-span-7 group relative bg-gradient-to-br from-red-500/10 via-wheelx-dark to-wheelx-dark border border-red-500/20 rounded-3xl p-8 lg:p-10 overflow-hidden hover:border-red-500/40 transition-all duration-500 min-h-[240px]">
                        <div className="absolute -top-16 -right-16 w-56 h-56 bg-red-500/10 rounded-full blur-3xl group-hover:bg-red-500/20 transition-all duration-700"></div>
                        {/* Shield decoration */}
                        <svg className="absolute bottom-4 right-8 w-28 h-32 opacity-[0.06] group-hover:opacity-[0.12] transition-opacity" viewBox="0 0 100 120" fill="none">
                            <path d="M50 5 L90 25 L90 60 Q90 95 50 115 Q10 95 10 60 L10 25 Z" stroke="#ef4444" strokeWidth="2" fill="#ef4444" fillOpacity="0.1" />
                            <path d="M40 60 L48 70 L65 48" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                        </svg>
                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-3 py-1 mb-4">
                                <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
                                <span className="text-xs text-red-300 font-medium uppercase tracking-wider">Safety</span>
                            </div>
                            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">{t("items.sos.title")}</h3>
                            <p className="text-gray-400 max-w-lg text-base leading-relaxed">{t("items.sos.desc")}</p>
                        </div>
                    </div>

                    {/* ──────────── Row 4: Community, Events, Garage ──────────── */}

                    {/* COMMUNITY */}
                    <div className="lg:col-span-5 group relative bg-wheelx-dark border border-wheelx-gray rounded-3xl p-8 overflow-hidden hover:border-pink-500/30 transition-all duration-500 min-h-[220px]">
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-pink-500/10 border border-pink-500/20 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-pink-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{t("items.community.title")}</h3>
                            <p className="text-gray-400 leading-relaxed">{t("items.community.desc")}</p>
                        </div>
                    </div>

                    {/* EVENTS */}
                    <div className="lg:col-span-5 group relative bg-wheelx-dark border border-wheelx-gray rounded-3xl p-8 overflow-hidden hover:border-blue-500/30 transition-all duration-500 min-h-[220px]">
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                        {/* Mini calendar decoration */}
                        <div className="absolute top-6 right-6 opacity-15 group-hover:opacity-30 transition-opacity">
                            <div className="w-12 h-14 rounded-lg border border-blue-400/30 overflow-hidden">
                                <div className="h-4 bg-blue-400/20 flex items-center justify-center">
                                    <span className="text-[8px] text-blue-300 font-bold">SAT</span>
                                </div>
                                <div className="flex items-center justify-center h-10">
                                    <span className="text-lg text-blue-300 font-bold">15</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-blue-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{t("items.events.title")}</h3>
                            <p className="text-gray-400 leading-relaxed">{t("items.events.desc")}</p>
                        </div>
                    </div>

                    {/* GARAGE */}
                    <div className="lg:col-span-7 group relative bg-wheelx-dark border border-wheelx-gray rounded-3xl p-8 overflow-hidden hover:border-indigo-500/30 transition-all duration-500 min-h-[220px]">
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                        {/* Speedometer decoration */}
                        <svg className="absolute bottom-4 right-4 w-16 h-16 opacity-10 group-hover:opacity-25 transition-opacity" viewBox="0 0 60 60" fill="none">
                            <path d="M10 50 A30 30 0 0 1 50 50" stroke="#818cf8" strokeWidth="3" strokeLinecap="round" fill="none" />
                            <line x1="30" y1="48" x2="42" y2="28" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-indigo-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{t("items.garage.title")}</h3>
                            <p className="text-gray-400 leading-relaxed">{t("items.garage.desc")}</p>
                        </div>
                    </div>

                    {/* ──────────── MAINTENANCE — Full width bottom ──────────── */}
                    <div className="lg:col-span-12 group relative bg-gradient-to-r from-wheelx-dark via-wheelx-gray/20 to-wheelx-dark border border-wheelx-gray rounded-3xl p-8 overflow-hidden hover:border-wheelx-yellow/30 transition-all duration-500">
                        <div className="absolute inset-0 bg-gradient-to-r from-wheelx-yellow/5 via-transparent to-wheelx-yellow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
                            <div className="w-14 h-14 bg-wheelx-yellow/10 border border-wheelx-yellow/20 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-wheelx-yellow">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L3 4.5l1.5-1.5 3 1.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">{t("items.maintenance.title")}</h3>
                                <p className="text-gray-400 leading-relaxed">{t("items.maintenance.desc")}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <style jsx>{`
                @keyframes pulse {
                    0% { transform: scaleY(0.5); }
                    100% { transform: scaleY(1.2); }
                }
            `}</style>
        </section>
    );
}
