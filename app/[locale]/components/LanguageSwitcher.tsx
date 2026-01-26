"use client";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/navigation";
import { locales } from "@/navigation";

const flags: Record<string, string> = {
    en: "🇺🇸",
    fr: "🇫🇷",
    es: "🇪🇸",
    it: "🇮🇹"
};

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const toggleLanguage = (newLocale: string) => {
        router.replace(pathname, { locale: newLocale });
    };

    return (
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full p-1">
            {locales.map((l) => (
                <button
                    key={l}
                    onClick={() => toggleLanguage(l)}
                    className={`w-8 h-8 flex items-center justify-center rounded-full transition-all ${locale === l
                            ? "bg-wheelx-yellow text-wheelx-black shadow-lg shadow-wheelx-yellow/20"
                            : "text-white/60 hover:text-white hover:bg-white/10"
                        }`}
                    title={l.toUpperCase()}
                >
                    <span className="text-sm uppercase font-bold">{l}</span>
                </button>
            ))}
        </div>
    );
}
