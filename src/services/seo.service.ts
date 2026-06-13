import { axiosClassic, axiosWithAuth } from '@/shared/api/api.interceptors'

export interface ISeoSettings {
	id: string
	pageKey: string
	title?: string
	description?: string
	keywords?: string
	ogTitle?: string
	ogDescription?: string
	ogImage?: string
	robots?: string
	canonical?: string
	createdAt: string
	updatedAt: string
}

export interface IRobotsTxt {
	id: string
	content: string
	isActive: boolean
	createdAt: string
	updatedAt: string
}

export interface ISitemapSettings {
	id: string
	baseUrl: string
	includeProducts: boolean
	includeCategories: boolean
	excludedUrls: string[]
	createdAt: string
	updatedAt: string
}

export const seoService = {
	// SEO Settings
	async getAllSeoSettings() {
		const { data } = await axiosWithAuth.get<ISeoSettings[]>('/seo/settings')
		return data
	},

	async getSeoSettings(pageKey: string) {
		const { data } = await axiosWithAuth.get<ISeoSettings>(`/seo/settings/${pageKey}`)
		return data
	},

	async upsertSeoSettings(settings: Partial<ISeoSettings>) {
		const { data } = await axiosWithAuth.post<ISeoSettings>('/seo/settings', settings)
		return data
	},

	async deleteSeoSettings(pageKey: string) {
		const { data } = await axiosWithAuth.delete(`/seo/settings/${pageKey}`)
		return data
	},

	// Robots.txt
	async getActiveRobotsTxt() {
		const { data } = await axiosClassic.get<IRobotsTxt>('/seo/robots')
		return data
	},

	async getAllRobotsTxt() {
		const { data } = await axiosWithAuth.get<IRobotsTxt[]>('/seo/robots/all')
		return data
	},

	async createRobotsTxt(content: string, isActive: boolean = true) {
		const { data } = await axiosWithAuth.post<IRobotsTxt>('/seo/robots', {
			content,
			isActive,
		})
		return data
	},

	async updateRobotsTxt(id: string, content: string, isActive: boolean) {
		const { data } = await axiosWithAuth.put<IRobotsTxt>(`/seo/robots/${id}`, {
			content,
			isActive,
		})
		return data
	},

	async deleteRobotsTxt(id: string) {
		const { data } = await axiosWithAuth.delete(`/seo/robots/${id}`)
		return data
	},

	// Sitemap Settings
	async getSitemapSettings() {
		const { data } = await axiosWithAuth.get<ISitemapSettings>('/seo/sitemap/settings')
		return data
	},

	async updateSitemapSettings(id: string, settings: Partial<ISitemapSettings>) {
		const { data } = await axiosWithAuth.put<ISitemapSettings>(
			`/seo/sitemap/settings/${id}`,
			settings
		)
		return data
	},
}
