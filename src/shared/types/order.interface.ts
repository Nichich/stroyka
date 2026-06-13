import { IProduct } from './product.interface'

export interface IOrder {
	id: string
	name: string
	email: string
	phone: string
	address: string
	summary: number
	text?: string
	products?: IProduct[]
}

export interface IOrderCreate extends Omit<IOrder, 'id'> {}
