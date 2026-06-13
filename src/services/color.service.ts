import { API_URL } from '@/config/api.config'
import { axiosWithAuth } from '@/shared/api/api.interceptors'
import {
	IColor,
	IColorCreate,
	IColorUpdate
} from '@/shared/types/color.interface'

class ColorService {
	async create(data: IColorCreate) {
		const { data: createdColor } = await axiosWithAuth<IColor>({
			url: API_URL.color(),
			method: 'POST',
			data
		})
		return createdColor
	}

	async getAll() {
		const { data } = await axiosWithAuth<IColor[]>({
			url: API_URL.color(),
			method: 'GET'
		})
		return data
	}

	async update(id: string, data: IColorUpdate) {
		const { data: updatedColor } = await axiosWithAuth<IColor>({
			url: API_URL.color(`/${id}`),
			method: 'PATCH',
			data
		})
		return updatedColor
	}

	async delete(id: string) {
		const { data: deletedColor } = await axiosWithAuth<IColor>({
			url: API_URL.color(`/${id}`),
			method: 'DELETE'
		})
		return deletedColor
	}
}

export const colorService = new ColorService()
