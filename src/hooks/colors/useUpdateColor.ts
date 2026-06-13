import { colorService } from '@/services/color.service'
import { IColorUpdate } from '@/shared/types/color.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useUpdateColor() {
	const queryClient = useQueryClient()

	const { mutate: updateColor, isPending: isLoadingUpdate } = useMutation({
		mutationKey: ['update color'],
		mutationFn: ({
			colorId,
			data
		}: {
			colorId: string
			data: IColorUpdate
		}) => colorService.update(colorId, data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['color']
			})
		},
		onError() {}
	})

	return useMemo(
		() => ({ updateColor, isLoadingUpdate }),
		[updateColor, isLoadingUpdate]
	)
}
