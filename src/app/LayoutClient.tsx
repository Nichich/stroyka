'use client'

import Footer from '@/components/footer'
import Header from '@/components/header'
import { Providers } from '@/providers/provider'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function LayoutClient({
	children
}: {
	children: React.ReactNode
}) {
	const pathname = usePathname()

	const hideOnRoutesStartsWith = ['/auth', '/admin']

	const hide = hideOnRoutesStartsWith.some(prefix =>
		pathname.startsWith(prefix)
	)

	return (
		<Providers>
			{!hide && <Header />}
			{children}
			{!hide && <Footer />}
		</Providers>
	)
}
