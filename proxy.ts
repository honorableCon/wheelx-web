import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale } from './navigation';

const intlMiddleware = createMiddleware({
    locales,
    defaultLocale,
    localePrefix: 'always'
});

export function proxy(request: NextRequest) {
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
        const token = request.cookies.get('wheelx_admin_token');
        if (!token) {
            // Redirect to login with the current locale if possible
            const locale = locales.find(l => pathname.startsWith(`/${l}`)) || defaultLocale;
            return NextResponse.redirect(new URL(`/${locale}/auth/login`, request.url));
        }
    }

    return response;
}

export const config = {
    // Skip all internal paths (_next, etc.)
    matcher: ['/((?!_next|api|.*\\..*).*)'],
};
