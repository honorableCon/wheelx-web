"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { fetchCountryConfigs, updateCountryFeatures } from "../lib/api";
import { useToast } from "../providers";

const FEATURE_LABELS: Record<string, { label: string; group: string }> = {
    mobileMoney: { label: "Mobile Money", group: "Payment" },
    orangeMoney: { label: "Orange Money", group: "Payment" },
    wave: { label: "Wave", group: "Payment" },
    stripe: { label: "Stripe", group: "Payment" },
    applePay: { label: "Apple Pay", group: "Payment" },
    googlePay: { label: "Google Pay", group: "Payment" },
    fuelPrices: { label: "Fuel Prices", group: "App" },
    garages: { label: "Garages", group: "App" },
    insurance: { label: "Insurance", group: "App" },
    marketplace: { label: "Marketplace", group: "App" },
    events: { label: "Events", group: "App" },
    groups: { label: "Groups", group: "App" },
    routes: { label: "Routes", group: "App" },
    leaderboard: { label: "Leaderboard", group: "App" },
    premium: { label: "Premium", group: "App" },
    territoryConquest: { label: "Territory Conquest", group: "Social" },
    clans: { label: "Clans", group: "Social" },
};

const GROUP_COLORS: Record<string, string> = {
    Payment: "text-blue-600",
    App: "text-emerald-600",
    Social: "text-purple-600",
};

type CountryConfig = {
    _id: string;
    code: string;
    name: string;
    flag: string;
    isActive: boolean;
    features: Record<string, boolean>;
};

export default function CountriesPage() {
    const [countries, setCountries] = useState<CountryConfig[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState<string | null>(null);
    const { showToast } = useToast();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const data = await fetchCountryConfigs();
            const list = Array.isArray(data) ? data : data?.data || [];
            setCountries(list);
        } catch {
            setCountries([]);
            showToast({ title: "Failed to load countries", variant: "error" });
        }
        setLoading(false);
    };

    const toggleFeature = async (country: CountryConfig, featureKey: string) => {
        const newValue = !country.features[featureKey];
        setSaving(`${country.code}-${featureKey}`);

        const success = await updateCountryFeatures(country.code, { [featureKey]: newValue });

        if (success) {
            setCountries((prev) =>
                prev.map((c) =>
                    c.code === country.code
                        ? { ...c, features: { ...c.features, [featureKey]: newValue } }
                        : c
                )
            );
            showToast({
                title: `${country.flag} ${country.name}: ${FEATURE_LABELS[featureKey]?.label} ${newValue ? "enabled" : "disabled"}`,
                variant: "success",
            });
        } else {
            showToast({ title: "Failed to update feature", variant: "error" });
        }
        setSaving(null);
    };

    const featureKeys = Object.keys(FEATURE_LABELS);

    return (
        <div className="p-8 space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-slate-900">Country Features</h1>
                <p className="text-slate-500">
                    Toggle features per country. Changes take effect immediately for app users.
                </p>
            </header>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                {loading ? (
                    <div className="py-20 text-center text-slate-400">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500" />
                        <p className="mt-4">Loading countries...</p>
                    </div>
                ) : countries.length === 0 ? (
                    <div className="py-20 text-center text-slate-400">
                        <p className="text-lg">No countries found.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="sticky left-0 bg-white z-10 min-w-[160px]">
                                        Country
                                    </TableHead>
                                    {featureKeys.map((key) => (
                                        <TableHead key={key} className="text-center min-w-[90px]">
                                            <div className="flex flex-col items-center gap-0.5">
                                                <span className={`text-[10px] font-medium ${GROUP_COLORS[FEATURE_LABELS[key].group]}`}>
                                                    {FEATURE_LABELS[key].group}
                                                </span>
                                                <span className="text-xs">{FEATURE_LABELS[key].label}</span>
                                            </div>
                                        </TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {countries.map((country) => (
                                    <TableRow key={country.code}>
                                        <TableCell className="sticky left-0 bg-white z-10 font-medium">
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg">{country.flag}</span>
                                                <div>
                                                    <div className="font-semibold">{country.name}</div>
                                                    <div className="text-xs text-slate-400">{country.code}</div>
                                                </div>
                                                {!country.isActive && (
                                                    <Badge variant="outline" className="text-xs text-red-500 border-red-200">
                                                        Inactive
                                                    </Badge>
                                                )}
                                            </div>
                                        </TableCell>
                                        {featureKeys.map((key) => {
                                            const isOn = country.features?.[key] ?? false;
                                            const isSaving = saving === `${country.code}-${key}`;
                                            return (
                                                <TableCell key={key} className="text-center">
                                                    <button
                                                        role="switch"
                                                        aria-checked={isOn}
                                                        aria-label={`${FEATURE_LABELS[key]?.label} for ${country.name}`}
                                                        onClick={() => toggleFeature(country, key)}
                                                        disabled={isSaving}
                                                        className={`
                                                            relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                                                            focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2
                                                            ${isSaving ? "opacity-50 cursor-wait" : "cursor-pointer"}
                                                            ${isOn ? "bg-green-500" : "bg-slate-300"}
                                                        `}
                                                    >
                                                        <span
                                                            className={`
                                                                inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform
                                                                ${isOn ? "translate-x-6" : "translate-x-1"}
                                                            `}
                                                        />
                                                    </button>
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </div>
        </div>
    );
}
