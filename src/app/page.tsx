import { sliders } from '@/data/Slider'
import Slider from '@/components/Slider/Slider'
import BestChoice from '@/components/BestChoise/BestChoice'
import { bestChoice } from '@/data/bestChoice'
import Advantages from '@/components/Advantages/Advantages'
import { advantages } from '@/data/Advantages'
import CatalogSection from '@/components/CatalogSection/CatalogSection'
import { catalogSection } from '@/data/CatalogSection'
import Hero from '@/components/HeroSection/Hero'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Добрострой 25 - Тротуарная плитка, блоки и бордюры во Владивостоке',
	description: 'Производство и продажа тротуарной плитки, стеновых блоков и бордюров во Владивостоке. Цены производителя, все типоразмеры в наличии. Доставка по Приморскому краю.',
	keywords: 'тротуарная плитка Владивосток, бордюры Владивосток, стеновые блоки, производство плитки, цены на плитку',
	openGraph: {
		title: 'Добрострой 25 - Тротуарная плитка, блоки и бордюры',
		description: 'Производство и продажа тротуарной плитки, стеновых блоков и бордюров во Владивостоке',
		type: 'website',
		locale: 'ru_RU',
	}
}

export default function Home() {
	return (
		<div className="bg-white min-h-screen">
			<Hero/>
			<Advantages item={advantages}/>
			{sliders.map((slider, idx) => (
				<div key={slider.id}>
					<Slider slider={slider} />
					{idx === 0 && (
						<BestChoice item={bestChoice} />
					)}
				</div>
			))}
			<CatalogSection item={catalogSection}/>
		</div>
	)
}
