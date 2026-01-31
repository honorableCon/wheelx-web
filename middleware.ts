import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale } from './navigation';

const intlMiddleware = createMiddleware({
    locales,
    defaultLocale,
    localePrefix: 'always'
});

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check for private routes - they now start with /locale/private
    // Or if the user hits /private directly, it will be redirected to /locale/private by intlMiddleware first?
    // Actually, intlMiddleware should run first to get the locale context.

    const response = intlMiddleware(request);

    // After intlMiddleware, if it's a redirect, return it
    if (response.status === 307 || response.status === 308) {
        return response;
    }

    // Manual check for /private routes (with or without locale)
    const isPrivatePage = locales.some(locale => pathname.startsWith(`/${locale}/private`)) || pathname.startsWith('/private');

    if (isPrivatePage) {
        const token = request.cookies.get('wheelx_admin_token')?.value || request.cookies.get('wheelx_token')?.value;
        if (!token) {
            // Strip locale from pathname for the redirect parameter
            const segments = pathname.split('/');
            const possibleLocale = segments[1];
            const isLocale = locales.includes(possibleLocale as any);
            const redirectPath = isLocale ? '/' + segments.slice(2).join('/') : pathname;
            const fullRedirect = redirectPath + request.nextUrl.search;

            const locale = locales.find(l => pathname.startsWith(`/${l}`)) || defaultLocale;
            const loginUrl = new URL(`/${locale}/auth/login`, request.url);
            loginUrl.searchParams.set('redirect', fullRedirect);
            return NextResponse.redirect(loginUrl);
        }
    }

    return response;
}

export const config = {
    // Skip all internal paths (_next, etc.)
    matcher: ['/((?!_next|api|.*\\..*).*)'],
};
