import { IFilter } from '@/shared/Catalog/Filter.interface'

export const filters: IFilter = {
	id: '1',
	available: [
		{ availables: 'В наличии' },
		{ availables: 'Под заказ' },
	],
	color: [
		{ colors: 'Бежевый', index: '#CDAA71' },
		{ colors: 'Серый', index: '#B7B7B7' },
		{ colors: 'Красный', index: '#D94040' },
		{ colors: 'Черный', index: '#000000' },
		{ colors: 'Коричневый', index: '#765C31' },
	],
	shape: [
		{ shapes: 'Бавария' },
		{ shapes: 'Классика' },
		{ shapes: 'Новый город' },
		{ shapes: 'Мюнхен' },
		{ shapes: 'Старый город' },
	],
	height: [
		{ heights: '40' },
		{ heights: '60' },
		{ heights: '80' },
		{ heights: '100' },
	],
	appointment: [
		{ appointments: 'Пешеходная зона' },
		{ appointments: 'Легковые авто' },
		{ appointments: 'Грузовые авто' },
	],
}
