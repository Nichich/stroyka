export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL as string

export const API_URL = {
	root: (url = '') => `${url ? url : ''}`,
	auth: (url = '') => API_URL.root(`/auth${url}`),
	category: (url = '') => API_URL.root(`/category${url}`),
	product: (url = '') => API_URL.root(`/product${url}`),
	color: (url = '') => API_URL.root(`/color${url}`),
	option: (url = '') => API_URL.root(`/option${url}`),
	order: (url = '') => API_URL.root(`/order${url}`),
	feedback: (url = '') => API_URL.root(`/feedback${url}`)
}
