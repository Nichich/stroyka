import { categoryService } from '@/services/category.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useDeleteCategory() {
	const queryClient = useQueryClient()

	const { mutate: deleteCategory, isPending } = useMutation({
		mutationKey: ['delete category'],
		mutationFn: (categoryId: string) => categoryService.delete(categoryId),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['category']
			})
		},
		onError() {}
	})

	return useMemo(
		() => ({ deleteCategory, isPending }),
		[deleteCategory, isPending]
	)
}
