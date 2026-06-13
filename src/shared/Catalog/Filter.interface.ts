interface Availability {
	availables: string;
}

interface Colors {
	colors: string;
	index: string;
}

interface Shapes {
	shapes: string;
}

interface Height {
	heights: string;
}

interface Appointment {
	appointments: string;
}

export interface IFilter {
	id: string;
	available: Availability[];
	color: Colors[];
	shape: Shapes[];
	height: Height[];
	appointment: Appointment[];
}
