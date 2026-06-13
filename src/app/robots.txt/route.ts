import { SERVER_URL } from '@/config/api.config'

export async function GET() {
	try {
		const response = await fetch(`${SERVER_URL}/seo/robots`, {
			cache: 'no-store',
		})

		if (!response.ok) {
			return new Response(getDefaultRobotsTxt(), {
				headers: {
					'Content-Type': 'text/plain',
				},
			})
		}

		const data = await response.json()

		return new Response(data.content, {
			headers: {
				'Content-Type': 'text/plain',
			},
		})
	} catch (error) {
		return new Response(getDefaultRobotsTxt(), {
			headers: {
				'Content-Type': 'text/plain',
			},
		})
	}
}

function getDefaultRobotsTxt(): string {
	return `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /admin/*
Disallow: /auth
Disallow: /api/

User-agent: Yandex
Allow: /
Disallow: /admin/
Disallow: /admin/*
Disallow: /auth
Disallow: /api/

User-agent: Googlebot
Allow: /
Disallow: /admin/
Disallow: /admin/*
Disallow: /auth
Disallow: /api/

Sitemap: https://dobrostroi25.ru/sitemap.xml`
}
