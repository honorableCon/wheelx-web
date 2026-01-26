import type { Metadata } from "next";
import Sidebar from "./components/Sidebar";

export const metadata: Metadata = {
    title: "WheelX Backoffice",
    robots: {
        index: false,
        follow: false,
    },
};

export default function PrivateLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-slate-100 text-slate-900 font-sans">
            <Sidebar />
            <div className="flex-1 max-h-screen overflow-auto">
                {children}
            </div>
        </div>
    );
}
