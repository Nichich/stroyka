import { EnumTokens } from '@/services/auth-token.service'
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
	const hasRefreshToken = request.cookies.has(EnumTokens.REFRESH_TOKEN)
	const { pathname } = request.nextUrl

	if (pathname.startsWith('/admin') && !hasRefreshToken) {
		return NextResponse.redirect(new URL('/auth', request.url))
	}

	if (pathname.startsWith('/auth') && hasRefreshToken) {
		return NextResponse.redirect(new URL('/admin', request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/admin/:path*', '/auth']
}
