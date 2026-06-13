interface Description {
	title: string;
	svg: string;
}

export interface ICatalogSection {
	id: string;
	firstTitle: string;
	orangeTitle: string;
	endTitle: string;
	imageUrl: string;
	description: Description[];
	downloadBtn: string;
	downloadSvg: string;
	catalogBtn: string;
}