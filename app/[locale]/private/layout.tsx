"use client";

import { useState } from "react";
import type { Metadata } from "next";
import Sidebar from "./components/Sidebar";
import { ToastProvider } from "./providers";

export default function PrivateLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <ToastProvider>
            <div className="flex min-h-screen bg-slate-100 text-slate-900 font-sans">
                {/* Mobile overlay */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-40 md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
                
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                
                <div className="flex-1 flex flex-col max-h-screen overflow-hidden">
                    {/* Mobile header with hamburger */}
                    <div className="md:hidden bg-white border-b border-slate-200 p-4 flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="p-2 hover:bg-slate-100 rounded-lg"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <h1 className="text-lg font-bold">WheelX <span className="text-yellow-500">ADMIN</span></h1>
                    </div>
                    
                    <div className="flex-1 overflow-auto">
                        {children}
                    </div>
                </div>
            </div>
        </ToastProvider>
    );
}
