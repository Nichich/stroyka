import { EProductMeasure, EProductStatus } from '../types/product.interface'

export const MProductMeasure: Record<EProductMeasure, string> = {
	[EProductMeasure.PALLET]: 'руб./поддон',
	[EProductMeasure.SQMETERS]: 'руб./м2',
	[EProductMeasure.THING]: 'руб./шт.'
}

export const MProductStatus: Record<EProductStatus, string> = {
	[EProductStatus.IN_STOCK]: 'В наличии',
	[EProductStatus.ON_ORDER]: 'Под заказ',
	[EProductStatus.OUT_OF_STOCK]: 'Нет в наличие'
}
