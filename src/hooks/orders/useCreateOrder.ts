import { orderService } from '@/services/order.service'
import { IOrderCreate } from '@/shared/types/order.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useCreateOrder() {
	const queryClient = useQueryClient()

	const { mutate: createOrder, isPending: isLoadingCreate } = useMutation({
		mutationKey: ['create order'],
		mutationFn: (data: IOrderCreate) => orderService.create(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['order']
			})
		},
		onError() {}
	})

	return useMemo(
		() => ({ createOrder, isLoadingCreate }),
		[createOrder, isLoadingCreate]
	)
}
