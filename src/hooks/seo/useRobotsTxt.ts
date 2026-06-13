import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { seoService, IRobotsTxt } from '@/services/seo.service'

export const useGetActiveRobotsTxt = () => {
	return useQuery({
		queryKey: ['robots-txt-active'],
		queryFn: () => seoService.getActiveRobotsTxt(),
	})
}

export const useGetAllRobotsTxt = () => {
	return useQuery({
		queryKey: ['robots-txt-all'],
		queryFn: () => seoService.getAllRobotsTxt(),
	})
}

export const useCreateRobotsTxt = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ content, isActive }: { content: string; isActive?: boolean }) =>
			seoService.createRobotsTxt(content, isActive),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['robots-txt-all'] })
			queryClient.invalidateQueries({ queryKey: ['robots-txt-active'] })
		},
	})
}

export const useUpdateRobotsTxt = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ id, content, isActive }: { id: string; content: string; isActive: boolean }) =>
			seoService.updateRobotsTxt(id, content, isActive),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['robots-txt-all'] })
			queryClient.invalidateQueries({ queryKey: ['robots-txt-active'] })
		},
	})
}

export const useDeleteRobotsTxt = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (id: string) => seoService.deleteRobotsTxt(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['robots-txt-all'] })
			queryClient.invalidateQueries({ queryKey: ['robots-txt-active'] })
		},
	})
}
