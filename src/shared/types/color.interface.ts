import { IProduct } from './product.interface'

export interface IColor {
	id: string
	title: string
	value: string
	products?: IProduct[]
}

export interface IColorCreate extends Pick<IColor, 'title'> {
	value?: string
	productId?: string
}

export interface IColorUpdate extends Partial<IColorCreate> {}
