'use client'

import { CartProvider } from '@/components/BusketPage/CardContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, Suspense, useState } from 'react'

export function Providers({ children }: { children: ReactNode }) {
	const [queryClient] = useState(
		new QueryClient({
			defaultOptions: {
				queries: {
					refetchOnWindowFocus: false
				}
			}
		})
	)
	return (
		<QueryClientProvider client={queryClient}>
			<Suspense fallback={null}>
				<CartProvider>{children}</CartProvider>
			</Suspense>
		</QueryClientProvider>
	)
}
