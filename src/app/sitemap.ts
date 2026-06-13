import { MetadataRoute } from 'next'
import { productService } from '@/services/product.service'
import { categoryService } from '@/services/category.service'
import { SERVER_URL } from '@/config/api.config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	let baseUrl = 'https://dobrostroi25.ru'
	let includeProducts = true
	let includeCategories = true
	let excludedUrls: string[] = []

	try {
		const response = await fetch(`${SERVER_URL}/seo/sitemap/settings`, {
			cache: 'no-store',
		})

		if (response.ok) {
			const settings = await response.json()
			baseUrl = settings.baseUrl || baseUrl
			includeProducts = settings.includeProducts ?? true
			includeCategories = settings.includeCategories ?? true
			excludedUrls = settings.excludedUrls || []
		}
	} catch (error) {
		console.error('Error fetching sitemap settings:', error)
	}

	const allStaticPages: MetadataRoute.Sitemap = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: 'daily' as const,
			priority: 1,
		},
		{
			url: `${baseUrl}/catalog`,
			lastModified: new Date(),
			changeFrequency: 'daily' as const,
			priority: 0.9,
		},
		{
			url: `${baseUrl}/about`,
			lastModified: new Date(),
			changeFrequency: 'monthly' as const,
			priority: 0.8,
		},
		{
			url: `${baseUrl}/delivery`,
			lastModified: new Date(),
			changeFrequency: 'monthly' as const,
			priority: 0.7,
		},
		{
			url: `${baseUrl}/contacts`,
			lastModified: new Date(),
			changeFrequency: 'monthly' as const,
			priority: 0.7,
		},
		{
			url: `${baseUrl}/reviews`,
			lastModified: new Date(),
			changeFrequency: 'weekly' as const,
			priority: 0.6,
		},
		{
			url: `${baseUrl}/certificates`,
			lastModified: new Date(),
			changeFrequency: 'monthly' as const,
			priority: 0.5,
		},
	]

	const staticPages = allStaticPages.filter(page => !excludedUrls.some(excluded => page.url.includes(excluded)))

	try {
		let productPages: MetadataRoute.Sitemap = []
		let categoryPages: MetadataRoute.Sitemap = []

		if (includeProducts) {
			const products = await productService.getAllProducts()
			productPages = products
				.filter((product: any) => !product.isHidden)
				.map((product: any) => ({
					url: `${baseUrl}/products/${product.id}`,
					lastModified: new Date(product.updatedAt || product.createdAt),
					changeFrequency: 'weekly' as const,
					priority: 0.8,
				}))
				.filter(page => !excludedUrls.some(excluded => page.url.includes(excluded)))
		}

		if (includeCategories) {
			const categories = await categoryService.getAll()
			categoryPages = categories
				.map((category: any) => ({
					url: `${baseUrl}/catalog/${category.id}`,
					lastModified: new Date(),
					changeFrequency: 'daily' as const,
					priority: 0.9,
				}))
				.filter(page => !excludedUrls.some(excluded => page.url.includes(excluded)))
		}

		return [...staticPages, ...categoryPages, ...productPages]
	} catch (error) {
		console.error('Error generating sitemap:', error)
		return staticPages
	}
}
