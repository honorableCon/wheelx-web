"use client";

import { useEffect, useState } from "react";
import { fetchCountries } from "../private/lib/api";

interface Country {
    code: string;
    name: string;
    currency: string;
}

interface CountrySelectorProps {
    selectedCountry: string;
    onChange: (country: string) => void;
}

export default function CountrySelector({ selectedCountry, onChange }: CountrySelectorProps) {
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCountries();
    }, []);

    const loadCountries = async () => {
        const data = await fetchCountries();
        if (Array.isArray(data)) {
            setCountries(data);
        }
        setLoading(false);
    };

    if (loading) return <div className="animate-pulse bg-slate-200 h-10 w-32 rounded-lg"></div>;

    return (
        <select
            value={selectedCountry}
            onChange={(e) => onChange(e.target.value)}
            className="h-10 px-4 rounded-lg border border-slate-200 bg-white text-sm font-medium hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors"
        >
            <option value="">All Countries</option>
            {countries.map((country) => (
                <option key={country.code} value={country.code}>
                    {country.name} ({country.code})
                </option>
            ))}
        </select>
    );
}
