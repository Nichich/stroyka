import { optionService } from '@/services/option.service'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useGetOptions() {
	const { data: options, isLoading } = useQuery({
		queryKey: ['option'],
		queryFn: () => optionService.getAll()
	})

	return useMemo(
		() => ({
			options,
			isLoading
		}),
		[options, isLoading]
	)
}
