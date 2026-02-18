"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { LayoutDashboard, Users, Map, Wrench, FileText, ArrowLeft, MessageSquare, Tent, Calendar, Bell, Activity, Route, X, Globe } from "lucide-react";

const menuItems = [
    { key: "dashboard", href: "/private/dashboard", icon: LayoutDashboard },
    { key: "users", href: "/private/users", icon: Users },
    { key: "groups", href: "/private/groups", icon: Tent },
    { key: "posts", href: "/private/posts", icon: MessageSquare },
    { key: "events", href: "/private/events", icon: Calendar },
    { key: "routes", href: "/private/routes", icon: Route },
    { key: "activeRides", href: "/private/active-rides", icon: Activity },
    { key: "rideHistory", href: "/private/rides", icon: Map },
    { key: "insuranceRequests", href: "/private/insurance-requests", icon: FileText },
    { key: "garages", href: "/private/garages", icon: Wrench },
    { key: "reports", href: "/private/reports", icon: FileText },
    { key: "notifications", href: "/private/notifications", icon: Bell },
    { key: "countries", href: "/private/countries", icon: Globe },
];

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
    const pathname = usePathname();
    const t = useTranslations("Admin.sidebar");

    const sidebarContent = (
        <>
            <div className="mb-8 flex items-center justify-between">
                <h1 className="text-xl font-bold tracking-wider">
                    {t("title")} <span className="text-yellow-500">{t("admin")}</span>
                </h1>
                <button
                    onClick={onClose}
                    className="md:hidden p-2 hover:bg-white/10 rounded-lg"
                >
                    <X size={20} />
                </button>
            </div>
            <nav className="flex flex-col gap-2 flex-1 overflow-y-auto">
                {menuItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onClose}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                                isActive
                                    ? "bg-yellow-500 text-slate-900 font-medium shadow-lg shadow-yellow-500/20"
                                    : "text-slate-400 hover:text-white hover:bg-white/5"
                            }`}
                        >
                            <Icon size={20} />
                            {t(item.key)}
                        </Link>
                    );
                })}
            </nav>

            <div className="pt-6 border-t border-slate-700 flex flex-col gap-2">
                <Link
                    href="/"
                    onClick={onClose}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                >
                    <ArrowLeft size={16} />
                    {t("backToWebsite")}
                </Link>
                <button
                    onClick={() => {
                        document.cookie = "wheelx_admin_token=; path=/; max-age=0";
                        document.cookie = "wheelx_token=; path=/; max-age=0";

                        const segments = window.location.pathname.split('/');
                        const possibleLocale = segments[1];
                        const isLocale = ['en', 'fr', 'es', 'it', 'de', 'pt'].includes(possibleLocale);
                        const localePrefix = isLocale ? `/${possibleLocale}` : '';

                        window.location.href = `${localePrefix}/auth/login`;
                    }}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:text-red-300 transition-colors w-full text-left"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                    {t("signOut")}
                </button>
            </div>
        </>
    );

    return (
        <>
            {/* Desktop sidebar */}
            <aside className="hidden md:flex w-64 bg-slate-900 text-white p-6 flex-col min-h-screen">
                {sidebarContent}
            </aside>
            
            {/* Mobile sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white p-6 flex flex-col transform transition-transform duration-300 md:hidden ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {sidebarContent}
            </aside>
        </>
    );
}
