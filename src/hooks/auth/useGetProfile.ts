import { authService } from '@/services/auth.service'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useGetProfile() {
	const { data: profile, isLoading } = useQuery({
		queryKey: ['profile'],
		queryFn: () => authService.getProfile(),
		staleTime: 0,
		gcTime: 0
	})

	return useMemo(
		() => ({
			profile,
			isLoading
		}),
		[profile, isLoading]
	)
}
