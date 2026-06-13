import { productService } from '@/services/product.service'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'

export function useGetProductsByCategory() {
	const params = useParams<{ categoryId: string }>()
	const { data: products, isLoading } = useQuery({
		queryKey: ['product'],
		queryFn: () => productService.getAll(params.categoryId)
	})

	return useMemo(
		() => ({
			products,
			isLoading
		}),
		[products, isLoading]
	)
}
