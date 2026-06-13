import { colorService } from '@/services/color.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useDeleteColor() {
	const queryClient = useQueryClient()

	const { mutate: deleteColor, isPending } = useMutation({
		mutationKey: ['delete color'],
		mutationFn: (colorId: string) => colorService.delete(colorId),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['color']
			})
		},
		onError() {}
	})

	return useMemo(
		() => ({ deleteColor, isPending }),
		[deleteColor, isPending]
	)
}
