import { productService } from '@/services/product.service'
import { IProductCreate } from '@/shared/types/product.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useCreateProduct() {
	const queryClient = useQueryClient()

	const { mutate: createProduct, isPending: isLoadingCreate } = useMutation({
		mutationKey: ['create product'],
		mutationFn: ({
			categoryId,
			data
		}: {
			categoryId: string
			data: IProductCreate
		}) => productService.create(categoryId, data),
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
		() => ({ createProduct, isLoadingCreate }),
		[createProduct, isLoadingCreate]
	)
}
