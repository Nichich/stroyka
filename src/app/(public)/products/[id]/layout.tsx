import type { Metadata } from 'next'
import { productService } from '@/services/product.service'
import { IProduct } from '@/shared/types/product.interface'

export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string }>
}): Promise<Metadata> {
	const { id } = await params

	try {
		const products = await productService.getAllProducts()
		const product = products.find((p: IProduct) => p.id === id)

		if (!product) {
			return {
				title: 'Товар не найден - Добрострой 25',
				description: 'Запрашиваемый товар не найден в каталоге',
			}
		}

		return {
			title: `${product.title} ${product.height} мм - купить в Добрострой 25 Владивосток`,
			description: `${product.title} ${product.height} мм по цене ${product.price} руб. Производство и продажа тротуарной плитки во Владивостоке. Доставка по Приморскому краю.`,
			keywords: `${product.title}, ${product.category?.title || 'плитка'}, купить ${product.title} Владивосток`,
			openGraph: {
				title: `${product.title} ${product.height} мм`,
				description: `Цена ${product.price} руб. Производство Добрострой 25`,
				type: 'website',
				locale: 'ru_RU',
				images: product.imageUrl?.[0] ? [{ url: product.imageUrl[0] }] : [],
			},
		}
	} catch (error) {
		return {
			title: 'Товар - Добрострой 25',
			description: 'Тротуарная плитка, блоки и бордюры от производителя',
		}
	}
}

export default function ProductLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return <>{children}</>
}
