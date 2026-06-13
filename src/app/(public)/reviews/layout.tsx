import type { Metadata } from 'next'
import { getSeoForPage, buildMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
	const seo = await getSeoForPage('reviews')

	return buildMetadata(seo, {
		title: 'Отзывы клиентов о тротуарной плитке - Добрострой 25 Владивосток',
		description: 'Отзывы наших клиентов о тротуарной плитке, блоках и бордюрах. Реальные мнения покупателей о качестве продукции и сервисе завода Добрострой 25.',
		keywords: 'отзывы о плитке, отзывы Добрострой 25, отзывы завод Владивосток',
	})
}

export default function ReviewsLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return <>{children}</>
}
