"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export function useCountryFilter(defaultCountry = "") {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const country = useMemo(() => {
    const fromParams = searchParams?.get("country") || "";
    return fromParams || defaultCountry;
  }, [searchParams, defaultCountry]);

  const setCountry = useCallback(
    (next: string) => {
      const params = new URLSearchParams(searchParams?.toString());
      if (next) {
        params.set("country", next);
      } else {
        params.delete("country");
      }
      router.replace(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams]
  );

  return { country, setCountry } as const;
}
