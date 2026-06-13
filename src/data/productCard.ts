import {
	ColorMap,
	ProductCardDTO
} from '@/shared/types/ProductCardDTO.interface'

export const colorMap: ColorMap[] = [
	{ name: 'Бежевый', hex: '#CDAA71' },
	{ name: 'Серый', hex: '#B7B7B7' },
	{ name: 'Красный', hex: '#D94040' },
	{ name: 'Черный', hex: '#000000' },
	{ name: 'Коричневый', hex: '#765C31' },
	{ name: 'Синий', hex: '#4A90E2' }
]

export const getColorHex = (colorName: string): string => {
	const color = colorMap.find(
		c => c.name.toLowerCase() === colorName.toLowerCase()
	)
	return color?.hex || '#B7B7B7'
}

export const products: ProductCardDTO[] = [
	{
		id: '1',
		slug: 'block-1',
		title: 'Блок строительный',
		previewImage: { url: '/test.jpg', alt: 'Блок' },
		price: { value: 2675, currency: 'руб.', per: 'м²' },
		inStock: true,
		sorting: {
			type: 'Блоки',
			prise: 2675,
			color: 'Красный',
			shape: 'Классика',
			height: '40',
			appointment: 'Пешеходная зона'
		},
		popularity: '1'
	},
	{
		id: '2',
		slug: 'border-1',
		title: 'Бордюр тротуарный',
		previewImage: { url: '/test.jpg', alt: 'Бордюр' },
		price: { value: 1500, currency: 'руб.', per: 'м' },
		inStock: true,
		sorting: {
			type: 'Бордюры',
			prise: 1500,
			color: 'Черный',
			shape: 'Бавария',
			height: '60',
			appointment: 'Грузовые авто'
		},
		popularity: '1'
	},
	{
		id: '3',
		slug: 'tile-1',
		title: 'Плитка тротуарная классика',
		previewImage: { url: '/test.jpg', alt: 'Плитка' },
		price: { value: 3200, currency: 'руб.', per: 'м²' },
		inStock: true,
		sorting: {
			type: 'Тротуарная плитка',
			prise: 3200,
			color: 'Серый',
			shape: 'Классика',
			height: '80',
			appointment: 'Пешеходная зона'
		},
		popularity: '3'
	},
	{
		id: '4',
		slug: 'block-2',
		title: 'Блок пустотелый',
		previewImage: { url: '/test.jpg', alt: 'Блок' },
		price: { value: 2800, currency: 'руб.', per: 'м²' },
		inStock: false,
		sorting: {
			type: 'Блоки',
			prise: 2800,
			color: 'Коричневый',
			shape: 'Новый город',
			height: '100',
			appointment: 'Легковые авто'
		},
		popularity: '100'
	},
	{
		id: '5',
		slug: 'tile-2',
		title: 'Плитка тротуарная волна',
		previewImage: { url: '/test.jpg', alt: 'Плитка волна' },
		price: { value: 3500, currency: 'руб.', per: 'м²' },
		inStock: true,
		sorting: {
			type: 'Тротуарная плитка',
			prise: 3500,
			color: 'Синий',
			shape: 'Старый город',
			height: '40',
			appointment: 'Пешеходная зона'
		},
		popularity: '2'
	},
	{
		id: '6',
		slug: 'border-2',
		title: 'Бордюр садовый',
		previewImage: { url: '/test.jpg', alt: 'Бордюр' },
		price: { value: 800, currency: 'руб.', per: 'м' },
		inStock: true,
		sorting: {
			type: 'Бордюры',
			prise: 800,
			color: 'Красный',
			shape: 'Мюнхен',
			height: '40',
			appointment: 'Грузовые авто'
		},
		popularity: '4'
	},
	{
		id: '7',
		slug: 'block-3',
		title: 'Блок керамический',
		previewImage: { url: '/test.jpg', alt: 'Блок керам' },
		price: { value: 4200, currency: 'руб.', per: 'м²' },
		inStock: true,
		sorting: {
			type: 'Блоки',
			prise: 4200,
			color: 'Коричневый',
			shape: 'Бавария',
			height: '60',
			appointment: 'Легковые авто'
		},
		popularity: '10'
	},
	{
		id: '8',
		slug: 'tile-3',
		title: 'Плитка тротуарная волна',
		previewImage: { url: '/test.jpg', alt: 'Плитка волна' },
		price: { value: 3500, currency: 'руб.', per: 'м²' },
		inStock: true,
		sorting: {
			type: 'Тротуарная плитка',
			prise: 3500,
			color: 'Синий',
			shape: 'Старый город',
			height: '40',
			appointment: 'Пешеходная зона'
		},
		popularity: '2'
	},
	{
		id: '9',
		slug: 'tile-4',
		title: 'Плитка тротуарная волна',
		previewImage: { url: '/test.jpg', alt: 'Плитка волна' },
		price: { value: 3500, currency: 'руб.', per: 'м²' },
		inStock: true,
		sorting: {
			type: 'Тротуарная плитка',
			prise: 3500,
			color: 'Синий',
			shape: 'Старый город',
			height: '40',
			appointment: 'Пешеходная зона'
		},
		popularity: '2'
	},
	{
		id: '10',
		slug: 'tile-5',
		title: 'Плитка тротуарная волна',
		previewImage: { url: '/test.jpg', alt: 'Плитка волна' },
		price: { value: 3500, currency: 'руб.', per: 'м²' },
		inStock: true,
		sorting: {
			type: 'Тротуарная плитка',
			prise: 3500,
			color: 'Синий',
			shape: 'Старый город',
			height: '40',
			appointment: 'Пешеходная зона'
		},
		popularity: '2'
	},
	{
		id: '11',
		slug: 'tile-6',
		title: 'Плитка тротуарная волна',
		previewImage: { url: '/test.jpg', alt: 'Плитка волна' },
		price: { value: 3500, currency: 'руб.', per: 'м²' },
		inStock: true,
		sorting: {
			type: 'Тротуарная плитка',
			prise: 3500,
			color: 'Синий',
			shape: 'Старый город',
			height: '40',
			appointment: 'Пешеходная зона'
		},
		popularity: '2'
	},
	{
		id: '12',
		slug: 'tile-7',
		title: 'Плитка тротуарная волна',
		previewImage: { url: '/test.jpg', alt: 'Плитка волна' },
		price: { value: 3500, currency: 'руб.', per: 'м²' },
		inStock: true,
		sorting: {
			type: 'Тротуарная плитка',
			prise: 3500,
			color: 'Синий',
			shape: 'Старый город',
			height: '40',
			appointment: 'Пешеходная зона'
		},
		popularity: '2'
	},
	{
		id: '13',
		slug: 'tile-8',
		title: 'Плитка тротуарная волна',
		previewImage: { url: '/test.jpg', alt: 'Плитка волна' },
		price: { value: 3500, currency: 'руб.', per: 'м²' },
		inStock: true,
		sorting: {
			type: 'Тротуарная плитка',
			prise: 3500,
			color: 'Синий',
			shape: 'Старый город',
			height: '40',
			appointment: 'Пешеходная зона'
		},
		popularity: '2'
	},
	{
		id: '14',
		slug: 'tile-9',
		title: 'Плитка тротуарная волна',
		previewImage: { url: '/test.jpg', alt: 'Плитка волна' },
		price: { value: 3500, currency: 'руб.', per: 'м²' },
		inStock: true,
		sorting: {
			type: 'Тротуарная плитка',
			prise: 3500,
			color: 'Синий',
			shape: 'Старый город',
			height: '40',
			appointment: 'Пешеходная зона'
		},
		popularity: '2'
	},
	{
		id: '15',
		slug: 'tile-10',
		title: 'Плитка тротуарная волна',
		previewImage: { url: '/test.jpg', alt: 'Плитка волна' },
		price: { value: 3500, currency: 'руб.', per: 'м²' },
		inStock: true,
		sorting: {
			type: 'Тротуарная плитка',
			prise: 3500,
			color: 'Синий',
			shape: 'Старый город',
			height: '40',
			appointment: 'Пешеходная зона'
		},
		popularity: '2'
	},
	{
		id: '16',
		slug: 'tile-11',
		title: 'Плитка тротуарная волна',
		previewImage: { url: '/test.jpg', alt: 'Плитка волна' },
		price: { value: 3500, currency: 'руб.', per: 'м²' },
		inStock: true,
		sorting: {
			type: 'Тротуарная плитка',
			prise: 3500,
			color: 'Синий',
			shape: 'Старый город',
			height: '40',
			appointment: 'Пешеходная зона'
		},
		popularity: '2'
	},
	{
		id: '17',
		slug: 'tile-12',
		title: 'Плитка тротуарная волна',
		previewImage: { url: '/test.jpg', alt: 'Плитка волна' },
		price: { value: 3500, currency: 'руб.', per: 'м²' },
		inStock: true,
		sorting: {
			type: 'Тротуарная плитка',
			prise: 3500,
			color: 'Синий',
			shape: 'Старый город',
			height: '40',
			appointment: 'Пешеходная зона'
		},
		popularity: '2'
	},
	{
		id: '18',
		slug: 'tile-13',
		title: 'Плитка тротуарная волна',
		previewImage: { url: '/test.jpg', alt: 'Плитка волна' },
		price: { value: 3500, currency: 'руб.', per: 'м²' },
		inStock: true,
		sorting: {
			type: 'Тротуарная плитка',
			prise: 3500,
			color: 'Синий',
			shape: 'Старый город',
			height: '40',
			appointment: 'Пешеходная зона'
		},
		popularity: '2'
	},
	{
		id: '19',
		slug: 'tile-14',
		title: 'Плитка тротуарная волна',
		previewImage: { url: '/test.jpg', alt: 'Плитка волна' },
		price: { value: 3500, currency: 'руб.', per: 'м²' },
		inStock: true,
		sorting: {
			type: 'Тротуарная плитка',
			prise: 3500,
			color: 'Синий',
			shape: 'Старый город',
			height: '40',
			appointment: 'Пешеходная зона'
		},
		popularity: '2'
	},
	{
		id: '20',
		slug: 'tile-15',
		title: 'Плитка тротуарная волна',
		previewImage: { url: '/test.jpg', alt: 'Плитка волна' },
		price: { value: 3500, currency: 'руб.', per: 'м²' },
		inStock: true,
		sorting: {
			type: 'Тротуарная плитка',
			prise: 3500,
			color: 'Синий',
			shape: 'Старый город',
			height: '40',
			appointment: 'Пешеходная зона'
		},
		popularity: '2'
	},
	{
		id: '21',
		slug: 'tile-16',
		title: 'Плитка тротуарная волна',
		previewImage: { url: '/test.jpg', alt: 'Плитка волна' },
		price: { value: 3500, currency: 'руб.', per: 'м²' },
		inStock: true,
		sorting: {
			type: 'Тротуарная плитка',
			prise: 3500,
			color: 'Синий',
			shape: 'Старый город',
			height: '40',
			appointment: 'Пешеходная зона'
		},
		popularity: '2'
	},
	{
		id: '22',
		slug: 'tile-17',
		title: 'Плитка тротуарная волна',
		previewImage: { url: '/test.jpg', alt: 'Плитка волна' },
		price: { value: 3500, currency: 'руб.', per: 'м²' },
		inStock: true,
		sorting: {
			type: 'Тротуарная плитка',
			prise: 3500,
			color: 'Синий',
			shape: 'Старый город',
			height: '40',
			appointment: 'Пешеходная зона'
		},
		popularity: '2'
	},
	{
		id: '23',
		slug: 'tile-18',
		title: 'Плитка тротуарная волна',
		previewImage: { url: '/test.jpg', alt: 'Плитка волна' },
		price: { value: 3500, currency: 'руб.', per: 'м²' },
		inStock: true,
		sorting: {
			type: 'Тротуарная плитка',
			prise: 3500,
			color: 'Синий',
			shape: 'Старый город',
			height: '40',
			appointment: 'Пешеходная зона'
		},
		popularity: '2'
	},
	{
		id: '24',
		slug: 'tile-19',
		title: 'Плитка тротуарная волна',
		previewImage: { url: '/test.jpg', alt: 'Плитка волна' },
		price: { value: 3500, currency: 'руб.', per: 'м²' },
		inStock: true,
		sorting: {
			type: 'Тротуарная плитка',
			prise: 3500,
			color: 'Синий',
			shape: 'Старый город',
			height: '40',
			appointment: 'Пешеходная зона'
		},
		popularity: '2'
	},
	{
		id: '25',
		slug: 'tile-20',
		title: 'Плитка тротуарная волна',
		previewImage: { url: '/test.jpg', alt: 'Плитка волна' },
		price: { value: 3500, currency: 'руб.', per: 'м²' },
		inStock: true,
		sorting: {
			type: 'Тротуарная плитка',
			prise: 3500,
			color: 'Синий',
			shape: 'Старый город',
			height: '40',
			appointment: 'Пешеходная зона'
		},
		popularity: '2'
	},
	{
		id: '26',
		slug: 'tile-21',
		title: 'Плитка тротуарная волна',
		previewImage: { url: '/test.jpg', alt: 'Плитка волна' },
		price: { value: 3500, currency: 'руб.', per: 'м²' },
		inStock: true,
		sorting: {
			type: 'Тротуарная плитка',
			prise: 3500,
			color: 'Синий',
			shape: 'Старый город',
			height: '40',
			appointment: 'Пешеходная зона'
		},
		popularity: '2'
	},
	{
		id: '27',
		slug: 'tile-22',
		title: 'Плитка тротуарная волна',
		previewImage: { url: '/test.jpg', alt: 'Плитка волна' },
		price: { value: 3500, currency: 'руб.', per: 'м²' },
		inStock: true,
		sorting: {
			type: 'Тротуарная плитка',
			prise: 3500,
			color: 'Синий',
			shape: 'Старый город',
			height: '40',
			appointment: 'Пешеходная зона'
		},
		popularity: '2'
	},
	{
		id: '28',
		slug: 'tile-23',
		title: 'Плитка тротуарная волна',
		previewImage: { url: '/test.jpg', alt: 'Плитка волна' },
		price: { value: 3500, currency: 'руб.', per: 'м²' },
		inStock: true,
		sorting: {
			type: 'Тротуарная плитка',
			prise: 3500,
			color: 'Синий',
			shape: 'Старый город',
			height: '40',
			appointment: 'Пешеходная зона'
		},
		popularity: '2'
	},
	{
		id: '29',
		slug: 'tile-24',
		title: 'Плитка тротуарная волна',
		previewImage: { url: '/test.jpg', alt: 'Плитка волна' },
		price: { value: 3500, currency: 'руб.', per: 'м²' },
		inStock: true,
		sorting: {
			type: 'Тротуарная плитка',
			prise: 3500,
			color: 'Синий',
			shape: 'Старый город',
			height: '40',
			appointment: 'Пешеходная зона'
		},
		popularity: '2'
	},
	{
		id: '30',
		slug: 'tile-25',
		title: 'Плитка тротуарная волна',
		previewImage: { url: '/test.jpg', alt: 'Плитка волна' },
		price: { value: 3500, currency: 'руб.', per: 'м²' },
		inStock: true,
		sorting: {
			type: 'Тротуарная плитка',
			prise: 3500,
			color: 'Синий',
			shape: 'Старый город',
			height: '40',
			appointment: 'Пешеходная зона'
		},
		popularity: '2'
	}
]
