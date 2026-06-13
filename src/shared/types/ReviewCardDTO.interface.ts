export interface ReviewCardDTO {
	id: string;
	author: string;
	city: string;
	rating: number;
	text: string;
	type: 'private' | 'dealer' | 'company'
}