import { productService } from '@/services/product.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useDeleteProduct() {
	const queryClient = useQueryClient()

	const { mutate: deleteProduct, isPending } = useMutation({
		mutationKey: ['delete product'],
		mutationFn: (productId: string) => productService.delete(productId),
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
		},
		onError() {}
	})

	return useMemo(
		() => ({ deleteProduct, isPending }),
		[deleteProduct, isPending]
	)
}
