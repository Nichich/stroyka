import { optionService } from '@/services/option.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useDeleteOption() {
	const queryClient = useQueryClient()

	const { mutate: deleteOption, isPending } = useMutation({
		mutationKey: ['delete option'],
		mutationFn: (optionId: string) => optionService.delete(optionId),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['option']
			})
		},
		onError() {}
	})

	return useMemo(
		() => ({ deleteOption, isPending }),
		[deleteOption, isPending]
	)
}
