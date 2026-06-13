import { orderService } from '@/services/order.service'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useGetOrders() {
	const { data: orders, isLoading } = useQuery({
		queryKey: ['order'],
		queryFn: () => orderService.getAll()
	})

	return useMemo(
		() => ({
			orders,
			isLoading
		}),
		[orders, isLoading]
	)
}
