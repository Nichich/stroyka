import { colorService } from '@/services/color.service'
import { IColorCreate } from '@/shared/types/color.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useCreateColor() {
	const queryClient = useQueryClient()

	const { mutate: createColor, isPending: isLoadingCreate } = useMutation({
		mutationKey: ['create color'],
		mutationFn: (data: IColorCreate) => colorService.create(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['color']
			})
		},
		onError() {}
	})

	return useMemo(
		() => ({ createColor, isLoadingCreate }),
		[createColor, isLoadingCreate]
	)
}
