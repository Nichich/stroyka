import { categoryService } from '@/services/category.service'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useGetCategories() {
	const { data: categories, isLoading } = useQuery({
		queryKey: ['category'],
		queryFn: () => categoryService.getAll()
	})

	return useMemo(
		() => ({
			categories,
			isLoading
		}),
		[categories, isLoading]
	)
}
