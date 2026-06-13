import { colorService } from '@/services/color.service'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useGetColors() {
	const { data: colors, isLoading } = useQuery({
		queryKey: ['color'],
		queryFn: () => colorService.getAll()
	})

	return useMemo(
		() => ({
			colors,
			isLoading
		}),
		[colors, isLoading]
	)
}
