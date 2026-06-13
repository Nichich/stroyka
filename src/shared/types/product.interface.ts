import { ICategory } from './category.interface'
import { IColor } from './color.interface'
import { IOption } from './option.interface'
import { IOrder } from './order.interface'

export enum EProductMeasure {
	THING = 'THING',
	SQMETERS = 'SQMETERS',
	PALLET = 'PALLET'
}

export enum EProductStatus {
	IN_STOCK = 'IN_STOCK',
	ON_ORDER = 'ON_ORDER',
	OUT_OF_STOCK = 'OUT_OF_STOCK'
}

export interface IProduct {
	id: string
	title: string
	quantity: number
	meters: number
	price: number
	measure: EProductMeasure
	imageUrl: string[]
	height: number
	palletArea?: number
	status?: EProductStatus
	isHidden?: boolean
	description?: string
	delivery?: string
	return?: string
	payment?: string
	useful?: string
	category: ICategory
	order?: IOrder
	colors?: IColor[]
	options?: IOption[]
}

export interface IProductCreate
	extends Omit<IProduct, 'id' | 'category' | 'order' | 'colors' | 'options' | 'imageUrl'> {
	categoryId: string
	orderId?: string
	colorIds?: string[]
	optionIds?: string[]
	images?: File[]
}

export interface IProductUpdate extends Partial<IProductCreate> {}

export interface IQueryProduct {
	quantity?: number
	price?: number
	colorIds?: string[]
	heights?: number[]
	minPrice?: number
	maxPrice?: number
	page?: number
	limit?: number
}
