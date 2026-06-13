import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { seoService, ISitemapSettings } from '@/services/seo.service'

export const useGetSitemapSettings = () => {
	return useQuery({
		queryKey: ['sitemap-settings'],
		queryFn: () => seoService.getSitemapSettings(),
	})
}

export const useUpdateSitemapSettings = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ id, settings }: { id: string; settings: Partial<ISitemapSettings> }) =>
			seoService.updateSitemapSettings(id, settings),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['sitemap-settings'] })
		},
	})
}
