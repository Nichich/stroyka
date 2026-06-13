import { API_URL } from '@/config/api.config'
import { axiosWithAuth } from '@/shared/api/api.interceptors'
import {
	IOption,
	IOptionCreate,
	IOptionUpdate
} from '@/shared/types/option.interface'

class OptionService {
	async create(data: IOptionCreate) {
		const { data: createdOption } = await axiosWithAuth<IOption>({
			url: API_URL.option(),
			method: 'POST',
			data
		})
		return createdOption
	}

	async getAll() {
		const { data } = await axiosWithAuth<IOption[]>({
			url: API_URL.option(),
			method: 'GET'
		})
		return data
	}

	async update(id: string, data: IOptionUpdate) {
		const { data: updatedOption } = await axiosWithAuth<IOption>({
			url: API_URL.option(`/${id}`),
			method: 'PATCH',
			data
		})
		return updatedOption
	}

	async delete(id: string) {
		const { data: deletedOption } = await axiosWithAuth<IOption>({
			url: API_URL.option(`/${id}`),
			method: 'DELETE'
		})
		return deletedOption
	}
}

export const optionService = new OptionService()
