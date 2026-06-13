import { IAdvantages } from '@/shared/types/Advantages.interface'

export const advantages: IAdvantages = {
	id: 'mk4',
	firstTitle: 'НАШИ ',
	orangeTitle: 'КЛЮЧЕВЫЕ ',
	endTitle: 'ПРИЕМУЩЕСТВА',
	underTitle:
		'Мы выстроили производственный процесс таким образом, чтобы вы получали максимальную выгоду от сотрудничества',
	imageUrl: '/about.webp',
	description: [
		{
			title: 'Собственная лаборатория',
			description: 'Контроль качества на каждом этапе',
			svg: '/box.svg'
		},
		{
			title: 'Современные технологии',
			description: 'Новое оборудование ведущих российских производителей',
			svg: '/comp.svg'
		},
		{
			title: 'Стабильность',
			description: 'Мощности, обеспечивающие любые объемы и сроки',
			svg: '/stonks.svg'
		}
	]
}
