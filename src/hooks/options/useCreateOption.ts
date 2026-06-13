import { optionService } from '@/services/option.service'
import { IOptionCreate } from '@/shared/types/option.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useCreateOption() {
	const queryClient = useQueryClient()

	const { mutate: createOption, isPending: isLoadingCreate } = useMutation({
		mutationKey: ['create option'],
		mutationFn: (data: IOptionCreate) => optionService.create(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['option']
			})
		},
		onError() {}
	})

	return useMemo(
		() => ({ createOption, isLoadingCreate }),
		[createOption, isLoadingCreate]
	)
}
