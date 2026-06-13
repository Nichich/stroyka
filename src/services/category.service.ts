import { API_URL } from '@/config/api.config'
import { axiosWithAuth } from '@/shared/api/api.interceptors'
import {
	ICategory,
	ICategoryCreate,
	ICategoryUpdate
} from '@/shared/types/category.interface'

class CategoryService {
	async create(data: ICategoryCreate) {
		const { data: createCategory } = await axiosWithAuth<ICategory>({
			url: API_URL.category(`/`),
			method: 'POST',
			data
		})
		return createCategory
	}

	async getAll() {
		const { data } = await axiosWithAuth<ICategory[]>({
			url: API_URL.category(`/`),
			method: 'GET'
		})
		return data
	}

	async update(id: string, data: ICategoryUpdate) {
		const { data: updatedCategory } = await axiosWithAuth<ICategory>({
			url: API_URL.category(`/${id}`),
			method: 'PATCH',
			data
		})
		return updatedCategory
	}

	async delete(id: string) {
		const { data: deletedCategory } = await axiosWithAuth<ICategory>({
			url: API_URL.category(`/${id}`),
			method: 'DELETE'
		})
		return deletedCategory
	}
}

export const categoryService = new CategoryService()
