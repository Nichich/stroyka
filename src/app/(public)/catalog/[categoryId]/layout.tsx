import type { Metadata } from 'next'
import { categoryService } from '@/services/category.service'
import { ICategory } from '@/shared/types/category.interface'

export async function generateMetadata({
	params,
}: {
	params: Promise<{ categoryId: string }>
}): Promise<Metadata> {
	const { categoryId } = await params

	try {
		const categories = await categoryService.getAll()
		const category = categories.find((c: ICategory) => c.id === categoryId)

		if (!category) {
			return {
				title: 'Категория не найдена - Добрострой 25',
				description: 'Запрашиваемая категория не найдена в каталоге',
			}
		}

		return {
			title: `${category.title} - каталог и цены в Добрострой 25 Владивосток`,
			description: `${category.title} от производителя Добрострой 25. Цены производителя, все типоразмеры в наличии, доставка по Владивостоку и Приморскому краю.`,
			keywords: `${category.title} Владивосток, купить ${category.title}, цены на ${category.title}`,
			openGraph: {
				title: `${category.title} - Добрострой 25`,
				description: `Каталог ${category.title} от производителя`,
				type: 'website',
				locale: 'ru_RU',
			},
		}
	} catch (error) {
		return {
			title: 'Каталог продукции - Добрострой 25',
			description: 'Тротуарная плитка, блоки и бордюры от производителя',
		}
	}
}

export default function CategoryLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return <>{children}</>
}
