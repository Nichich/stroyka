import { feedbackService } from '@/services/feedback.service'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useGetFeedback() {
	const { data: feedback, isLoading } = useQuery({
		queryKey: ['feedback'],
		queryFn: () => feedbackService.getAll()
	})

	return useMemo(
		() => ({
			feedback,
			isLoading
		}),
		[feedback, isLoading]
	)
}
