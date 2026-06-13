import { IProduct } from './product.interface'

export interface ICategory {
	id: string
	title: string
	products?: IProduct[]
}

export interface ICategoryCreate extends Pick<ICategory, 'title'> {}

export interface ICategoryUpdate extends Pick<ICategory, 'title'> {
	productIds?: string[]
}
