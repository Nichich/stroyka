import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Корзина заказа - Добрострой 25',
	description: 'Оформление заказа тротуарной плитки, блоков и бордюров. Рассчитайте стоимость и оформите заказ с доставкой по Владивостоку.',
	keywords: 'заказ плитки, корзина, оформить заказ',
	openGraph: {
		title: 'Корзина заказа Добрострой 25',
		description: 'Оформление заказа продукции',
		type: 'website',
		locale: 'ru_RU',
	}
}

export default function BusketLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return <>{children}</>
}
