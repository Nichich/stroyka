import type { Metadata } from 'next'
import { getSeoForPage, buildMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
	const seo = await getSeoForPage('about')

	return buildMetadata(seo, {
		title: 'О заводе Добрострой 25 - Производство тротуарной плитки во Владивостоке',
		description: 'Завод Добрострой 25 - современное производство тротуарной плитки, блоков и бордюров во Владивостоке. Собственное производство, контроль качества, цены производителя.',
		keywords: 'завод тротуарной плитки, производство плитки Владивосток, о компании Добрострой',
	})
}

export default function AboutLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return <>{children}</>
}
