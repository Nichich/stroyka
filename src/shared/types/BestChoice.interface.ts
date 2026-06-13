interface DescriptionRight {
	title: string;
	description: string;
	descriptionBot: string;
	svg: string;
}

interface DescriptionLeft {
	title: string;
	description: string;
	descriptionBot: string;
	svg: string;
}

export interface IBestChoice {
	id: string;
	firstTitle: string;
	orangeTitle: string;
	endTitle: string;
	image: string;
	descriptionRight: DescriptionRight[];
	descriptionLeft: DescriptionLeft[];

}
