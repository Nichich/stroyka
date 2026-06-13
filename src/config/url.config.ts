export const APP_URL = process.env.NEXT_PUBLIC_APP_URL as string

export const PUBLIC_URL = {
	home: () => '/',
	auth: () => '/auth',
	category: (categoryId = '') => `/catalog/${categoryId}`
}

export const ADMIN_URL = {
	home: () => '/admin'
}
