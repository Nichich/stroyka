import type { Metadata } from 'next'
import { getSeoForPage, buildMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
	const seo = await getSeoForPage('catalog')

	return buildMetadata(seo, {
		title: 'Каталог тротуарной плитки, блоков и бордюров - Добрострой 25',
		description: 'Полный каталог тротуарной плитки, стеновых блоков и бордюров. Цены производителя, все типоразмеры в наличии, фото готовых объектов. Доставка по Владивостоку.',
		keywords: 'каталог тротуарной плитки, купить плитку Владивосток, цены на плитку, каталог бордюров',
	})
}

export default function CatalogLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return <>{children}</>
}
