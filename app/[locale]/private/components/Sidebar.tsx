"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Map, Wrench, FileText, ArrowLeft, MessageSquare, Tent, Calendar, Bell, Activity } from "lucide-react";

const menuItems = [
    { name: "Dashboard", href: "/private/dashboard", icon: LayoutDashboard },
    { name: "Users", href: "/private/users", icon: Users },
    { name: "Groups", href: "/private/groups", icon: Tent },
    { name: "Posts", href: "/private/posts", icon: MessageSquare },
    { name: "Events", href: "/private/events", icon: Calendar },
    { name: "Active Rides", href: "/private/active-rides", icon: Activity },
    { name: "Ride History", href: "/private/rides", icon: Map },
    { name: "Garages", href: "/private/garages", icon: Wrench },
    { name: "Reports", href: "/private/reports", icon: FileText },
    { name: "Notifications", href: "/private/notifications", icon: Bell },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-slate-900 text-white p-6 hidden md:flex flex-col min-h-screen">
            <div className="mb-8">
                <h1 className="text-xl font-bold tracking-wider">
                    WHEELX <span className="text-yellow-500">ADMIN</span>
                </h1>
            </div>
            <nav className="flex flex-col gap-2 flex-1">
                {menuItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                                ? "bg-yellow-500 text-slate-900 font-medium shadow-lg shadow-yellow-500/20"
                                : "text-slate-400 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <Icon size={20} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="pt-6 border-t border-slate-700 flex flex-col gap-2">
                <Link
                    href="/"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                >
                    <ArrowLeft size={16} />
                    Back to Website
                </Link>
                <button
                    onClick={() => {
                        document.cookie = "wheelx_admin_token=; path=/; max-age=0";
                        document.cookie = "wheelx_token=; path=/; max-age=0";
                        window.location.href = "/auth/login";
                    }}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:text-red-300 transition-colors w-full text-left"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
