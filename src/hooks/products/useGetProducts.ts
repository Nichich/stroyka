import { productService } from '@/services/product.service'
import { IQueryProduct } from '@/shared/types/product.interface'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'

export function useGetProducts(query?: IQueryProduct) {
	const params = useParams<{ categoryId: string }>()
	const { data: products, isLoading } = useQuery({
		queryKey: ['product', params.categoryId, query], // ← важно: включить query в ключ!
		queryFn: () => productService.getAll(params.categoryId, query),
		enabled: !!params.categoryId // ← не делать запрос, если categoryId нет
	})

	return useMemo(
		() => ({
			products,
			isLoading
		}),
		[products, isLoading]
	)
}
