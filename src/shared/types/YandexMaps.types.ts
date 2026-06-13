// Типы для Яндекс.Карт API
declare global {
	interface Window {
		ymaps: {
			ready: (callback: () => void) => void
			Map: new (element: HTMLElement | string, state: any) => any
			Placemark: new (coordinates: [number, number], properties?: any, options?: any) => any
			geocode: (query: string) => Promise<any>
		}
	}
}

export {}

