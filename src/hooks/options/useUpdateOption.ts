import { optionService } from '@/services/option.service'
import { IOptionUpdate } from '@/shared/types/option.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useUpdateOption() {
	const queryClient = useQueryClient()

	const { mutate: updateOption, isPending: isLoadingUpdate } = useMutation({
		mutationKey: ['update option'],
		mutationFn: ({
			optionId,
			data
		}: {
			optionId: string
			data: IOptionUpdate
		}) => optionService.update(optionId, data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['option']
			})
		},
		onError() {}
	})

	return useMemo(
		() => ({ updateOption, isLoadingUpdate }),
		[updateOption, isLoadingUpdate]
	)
}
