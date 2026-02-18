"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchCurrentUser } from "./api";

// Map country names to ISO 3166-1 alpha-2 codes
export const countryNameToCode: Record<string, string> = {
  'senegal': 'SN',
  'france': 'FR',
  'italy': 'IT',
  'spain': 'ES',
  'germany': 'DE',
  'portugal': 'PT',
  'morocco': 'MA',
  'algeria': 'DZ',
  'tunisia': 'TN',
  'côte d\'ivoire': 'CI',
  'mali': 'ML',
  'burkina faso': 'BF',
  'benin': 'BJ',
  'togo': 'TG',
  'ghana': 'GH',
  'nigeria': 'NG',
  'cameroon': 'CM',
  'gabon': 'GA',
  'congo': 'CG',
};

function normalizeCountryCode(country: string): string {
  if (!country) return '';

  // Already a 2-letter code
  if (country.length === 2) return country.toUpperCase();

  // Convert full name to code
  const normalized = country.toLowerCase().trim();
  return countryNameToCode[normalized] || country.toUpperCase();
}

export function useCountryFilter(defaultCountry = "") {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [userCountry, setUserCountry] = useState<string>("");

  // Fetch user's country on mount
  useEffect(() => {
    if (!defaultCountry) {
      fetchCurrentUser().then((user) => {
        if (user?.country) {
          setUserCountry(normalizeCountryCode(user.country));
        }
      });
    }
  }, [defaultCountry]);

  const country = useMemo(() => {
    const fromParams = searchParams?.get("country") || "";
    if (fromParams) return normalizeCountryCode(fromParams);
    if (defaultCountry) return normalizeCountryCode(defaultCountry);
    return userCountry;
  }, [searchParams, defaultCountry, userCountry]);

  const setCountry = useCallback(
    (next: string) => {
      const params = new URLSearchParams(searchParams?.toString());
      const normalized = normalizeCountryCode(next);
      if (normalized) {
        params.set("country", normalized);
      } else {
        params.delete("country");
      }
      router.replace(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams]
  );

  return { country, setCountry } as const;
}
