import { SERVER_URL } from '@/config/api.config'
import { Metadata } from 'next'

export interface SeoData {
	title?: string
	description?: string
	keywords?: string
	ogTitle?: string
	ogDescription?: string
	ogImage?: string
	robots?: string
	canonical?: string
}

export async function getSeoForPage(pageKey: string): Promise<SeoData | null> {
	try {
		const url = `${SERVER_URL}/seo/settings/${pageKey}`

		const response = await fetch(url, {
			cache: 'no-store',
		})

		if (!response.ok) {
			return null
		}

		const text = await response.text()

		if (!text || text.trim() === '') {
			return null
		}

		const data = JSON.parse(text)

		if (!data || Object.keys(data).length === 0) {
			return null
		}

		return data
	} catch (error) {
		console.error('[SEO] Error fetching SEO data:', error)
		return null
	}
}

export function buildMetadata(
	seo: SeoData | null,
	defaults: {
		title: string
		description: string
		keywords?: string
	}
): Metadata {
	const title = seo?.title || defaults.title
	const description = seo?.description || defaults.description
	const keywords = seo?.keywords || defaults.keywords

	const metadata: Metadata = {
		title,
		description,
		...(keywords && { keywords }),
	}

	if (seo?.robots) {
		metadata.robots = seo.robots
	}

	if (seo?.canonical) {
		metadata.alternates = {
			canonical: seo.canonical,
		}
	}

	if (seo?.ogTitle || seo?.ogDescription || seo?.ogImage) {
		metadata.openGraph = {
			title: seo.ogTitle || title,
			description: seo.ogDescription || description,
			...(seo.ogImage && { images: [seo.ogImage] }),
		}
	}

	return metadata
}
