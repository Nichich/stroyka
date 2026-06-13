import { productService } from '@/services/product.service'
import { IProductUpdate } from '@/shared/types/product.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useUpdateProduct() {
	const queryClient = useQueryClient()

	const { mutateAsync: updateProduct, isPending: isLoadingUpdate } = useMutation({
		mutationKey: ['update product'],
		mutationFn: ({
			productId,
			data
		}: {
			productId: string
			data: IProductUpdate
		}) => productService.update(productId, data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['product']
			})
			queryClient.invalidateQueries({
				queryKey: ['products-all-admin']
			})
			queryClient.invalidateQueries({
				queryKey: ['products-all']
			})
		}
	})

	return useMemo(
		() => ({ updateProduct, isLoadingUpdate }),
		[updateProduct, isLoadingUpdate]
	)
}
