import type { Metadata } from 'next'
import { getSeoForPage, buildMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
	const seo = await getSeoForPage('delivery')

	return buildMetadata(seo, {
		title: 'Доставка тротуарной плитки и блоков - Добрострой 25 Владивосток',
		description: 'Доставка тротуарной плитки, бордюров и блоков по Владивостоку и Приморскому краю. Оперативная доставка, выгодные условия, расчет стоимости доставки.',
		keywords: 'доставка плитки Владивосток, доставка бордюров, доставка стройматериалов',
	})
}

export default function DeliveryLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return <>{children}</>
}
