import { categoryService } from '@/services/category.service'
import { ICategoryUpdate } from '@/shared/types/category.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useUpdateCategory() {
	const queryClient = useQueryClient()

	const { mutate: updateCategory, isPending: isLoadingUpdate } = useMutation({
		mutationKey: ['update category'],
		mutationFn: ({
			categoryId,
			data
		}: {
			categoryId: string
			data: ICategoryUpdate
		}) => categoryService.update(categoryId, data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['category']
			})
		},
		onError() {}
	})

	return useMemo(
		() => ({ updateCategory, isLoadingUpdate }),
		[updateCategory, isLoadingUpdate]
	)
}
