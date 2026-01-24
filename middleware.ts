import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Only protect /private routes
    if (request.nextUrl.pathname.startsWith('/private')) {
        const token = request.cookies.get('wheelx_admin_token')

        if (!token) {
            return NextResponse.redirect(new URL('/auth/login', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/private/:path*',
}
