import { IProduct } from './product.interface'

export interface IOption {
	id: string
	title: string
	value: string
	product: IProduct
}

export interface IOptionCreate extends Pick<IOption, 'title' | 'value'> {
	productId?: string
}

export interface IOptionUpdate extends Partial<IOptionCreate> {}
