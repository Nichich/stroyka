import { ICatalogSection } from '@/shared/types/CatalogSection.interface'

export const catalogSection: ICatalogSection = {
	id: 'kk4',
	firstTitle: 'ПОЛНЫЙ ',
	orangeTitle: 'КАТАЛОГ ',
	endTitle: 'ПРОДУКЦИИ С АКТУАЛЬНЫМИ ЦЕНАМИ',
	imageUrl: '/catalog.jpg',
	downloadBtn: 'Скачать каталог',
	downloadSvg: 'download.svg',
	catalogBtn: 'Перейти в каталог на сайте',
	description: [
		{
			title: 'Все типоразмеры в налачии',
			svg: '/check-circle.svg'
		},
		{
			title: 'Технические характеристики',
			svg: '/check-circle.svg'
		},
		{
			title: 'Цены производителя',
			svg: '/check-circle.svg'
		},
		{
			title: 'Фото готовых объектов',
			svg: '/check-circle.svg'
		}
	]
}
