import { categoryService } from '@/services/category.service'
import { ICategoryCreate } from '@/shared/types/category.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useCreateCategory() {
	const queryClient = useQueryClient()

	const { mutate: createCategory, isPending: isLoadingCreate } = useMutation({
		mutationKey: ['create category'],
		mutationFn: (data: ICategoryCreate) => categoryService.create(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['category']
			})
		},
		onError() {}
	})

	return useMemo(
		() => ({ createCategory, isLoadingCreate }),
		[createCategory, isLoadingCreate]
	)
}
