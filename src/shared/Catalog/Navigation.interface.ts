interface LinkList {
	linkTitle: string;
	url: string;
}

export interface INavigation {
	id: string;
	title: string;
	links: LinkList[];
}