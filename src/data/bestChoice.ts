import { IBestChoice } from '@/shared/types/BestChoice.interface'

export const bestChoice: IBestChoice = {
	id: 'm1',
	firstTitle: 'ЧТО ДЕЛАЕТ НАШ ПРОДУКТ ',
	orangeTitle: 'ЛУЧШИМ ',
	endTitle: 'ВЫБОРОМ?',
	image: '/kerpich.png',
	descriptionRight: [
		{
			title: 'Выгодные условия',
			description: 'Рассрочка для партнеров',
			descriptionBot: '',
			svg: '/smile.svg'
		},
		{
			title: 'Стабильное качество',
			description: 'Собственное производство',
			descriptionBot: 'Соответствие ГОСТ',
			svg: '/like.svg'
		}
	],
	descriptionLeft: [
		{
			title: 'Прочность и надежность',
			description: 'Срок службы от 25 лет.',
			descriptionBot: ' Выдерживает нагрузки до 100 тонн/м²',
			svg: '/shield.svg'
		},
		{
			title: 'Разнообразие решений',
			description: 'Более 50 моделей плитки и бордюров',
			descriptionBot: '',
			svg: '/lupa.svg'
		}
	]
}
