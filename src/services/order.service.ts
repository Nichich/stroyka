import { API_URL } from '@/config/api.config'
import { axiosClassic, axiosWithAuth } from '@/shared/api/api.interceptors'
import { IOrder, IOrderCreate } from '@/shared/types/order.interface'

class OrderService {
	async create(data: IOrderCreate) {
		const { data: createdOrder } = await axiosClassic<IOrder>({
			url: API_URL.order(),
			method: 'POST',
			data
		})
		return createdOrder
	}

	async getAll() {
		const { data } = await axiosWithAuth<IOrder[]>({
			url: API_URL.order(),
			method: 'GET'
		})
		return data
	}
}

export const orderService = new OrderService()
