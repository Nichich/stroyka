import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { seoService, ISeoSettings } from '@/services/seo.service'

export const useGetAllSeoSettings = () => {
	return useQuery({
		queryKey: ['seo-settings-all'],
		queryFn: () => seoService.getAllSeoSettings(),
	})
}

export const useGetSeoSettings = (pageKey: string) => {
	return useQuery({
		queryKey: ['seo-settings', pageKey],
		queryFn: () => seoService.getSeoSettings(pageKey),
		enabled: !!pageKey,
	})
}

export const useUpsertSeoSettings = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (settings: Partial<ISeoSettings>) =>
			seoService.upsertSeoSettings(settings),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['seo-settings-all'] })
		},
	})
}

export const useDeleteSeoSettings = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (pageKey: string) => seoService.deleteSeoSettings(pageKey),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['seo-settings-all'] })
		},
	})
}
