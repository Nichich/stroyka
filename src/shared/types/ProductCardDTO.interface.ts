export interface ColorMap {
	name: string;
	hex: string;
}

interface Filters {
	type: string;
	prise: number;
	color: string;
	shape: string;
	height: string;
	appointment: string;
}

interface PriceDTO {
	value: number;
	currency: string;
	per: string;
}

interface PreviewImageDTO {
	url: string;
	alt: string;
}

export interface ProductCardDTO {
	id: string;
	slug: string;
	title: string;
	previewImage: PreviewImageDTO;
	price: PriceDTO;
	inStock: boolean;
	sorting: Filters;
	popularity: string;
}
