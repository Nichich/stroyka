import { feedbackService } from '@/services/feedback.service'
import { IFeedbackCreate } from '@/shared/types/feedback.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useCreateFeedback() {
	const queryClient = useQueryClient()

	const { mutate: createFeedback, isPending: isLoadingCreate } = useMutation({
		mutationKey: ['create feedback'],
		mutationFn: (data: IFeedbackCreate) => feedbackService.create(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['feedback']
			})
		},
		onError() {}
	})

	return useMemo(
		() => ({ createFeedback, isLoadingCreate }),
		[createFeedback, isLoadingCreate]
	)
}
