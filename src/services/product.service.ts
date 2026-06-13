import { API_URL } from '@/config/api.config'
import { axiosWithAuth } from '@/shared/api/api.interceptors'
import {
	IProduct,
	IProductCreate,
	IProductUpdate,
	IQueryProduct
} from '@/shared/types/product.interface'

class ProductService {
	async create(categoryId: string, data: IProductCreate) {
		const formData = new FormData()

		formData.append('title', data.title)
		formData.append('quantity', String(data.quantity))
		formData.append('meters', String(data.meters))
		formData.append('price', String(data.price))
		formData.append('measure', data.measure)
		formData.append('height', String(data.height))

		if (data.palletArea !== undefined) {
			formData.append('palletArea', String(data.palletArea))
		}

		if (data.orderId) {
			formData.append('orderId', data.orderId)
		}

		if (data.status) {
			formData.append('status', data.status)
		}

		if (data.isHidden !== undefined) {
			formData.append('isHidden', String(data.isHidden))
		}

		if (data.description) {
			formData.append('description', data.description)
		}

		if (data.delivery) {
			formData.append('delivery', data.delivery)
		}

		if (data.return) {
			formData.append('return', data.return)
		}

		if (data.payment) {
			formData.append('payment', data.payment)
		}

		if (data.useful) {
			formData.append('useful', data.useful)
		}

		if (data.colorIds && data.colorIds.length > 0) {
			data.colorIds.forEach((id: string) => formData.append('colorIds', id))
		}

		if (data.optionIds && data.optionIds.length > 0) {
			data.optionIds.forEach((id: string) => formData.append('optionIds', id))
		}

		if (data.images && data.images.length > 0) {
			data.images.forEach((file: File) => formData.append('images', file))
		}

		const { data: createdProduct } = await axiosWithAuth<IProduct>({
			url: API_URL.product(`/${categoryId}`),
			method: 'POST',
			data: formData,
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
		return createdProduct
	}

	async getAll(categoryId: string, query?: IQueryProduct) {
		const { data } = await axiosWithAuth<IProduct[]>({
			url: API_URL.product(`/${categoryId}`),
			method: 'GET',
			params: query
		})
		return data
	}

	async getAllProducts(query?: IQueryProduct) {
		const { data } = await axiosWithAuth<IProduct[]>({
			url: API_URL.product(''),
			method: 'GET',
			params: query
		})
		return data
	}

	async getByCategory(categoryId: string) {
		const { data } = await axiosWithAuth<IProduct[]>({
			url: API_URL.product(`/${categoryId}`),
			method: 'GET'
		})
		return data
	}

	async update(id: string, data: IProductUpdate) {
		const formData = new FormData()

		if (data.title) formData.append('title', data.title)
		if (data.quantity !== undefined) formData.append('quantity', String(data.quantity))
		if (data.meters !== undefined) formData.append('meters', String(data.meters))
		if (data.price !== undefined) formData.append('price', String(data.price))
		if (data.measure) formData.append('measure', data.measure)
		if (data.height !== undefined) formData.append('height', String(data.height))
		if (data.palletArea !== undefined) formData.append('palletArea', String(data.palletArea))
		if (data.categoryId) formData.append('categoryId', data.categoryId)
		if (data.status) formData.append('status', data.status)
		if (data.isHidden !== undefined) formData.append('isHidden', String(data.isHidden))

		if (data.description !== undefined) formData.append('description', data.description)
		if (data.delivery !== undefined) formData.append('delivery', data.delivery)
		if (data.return !== undefined) formData.append('return', data.return)
		if (data.payment !== undefined) formData.append('payment', data.payment)
		if (data.useful !== undefined) formData.append('useful', data.useful)

		if (data.colorIds && data.colorIds.length > 0) {
			data.colorIds.forEach((id: string) => formData.append('colorIds', id))
		}

		if (data.optionIds && data.optionIds.length > 0) {
			data.optionIds.forEach((id: string) => formData.append('optionIds', id))
		}

		const { data: updatedProduct } = await axiosWithAuth<IProduct>({
			url: API_URL.product(`/${id}`),
			method: 'PATCH',
			data: formData,
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
		return updatedProduct
	}

	async updateImages(id: string, deleteImageUrls: string[], newImages: File[]) {
		const formData = new FormData()

		if (deleteImageUrls.length > 0) {
			deleteImageUrls.forEach((url: string) => formData.append('deleteImageUrls', url))
		}

		if (newImages.length > 0) {
			newImages.forEach((file: File) => formData.append('newImages', file))
		}

		const { data: updatedProduct } = await axiosWithAuth<IProduct>({
			url: API_URL.product(`/${id}/images`),
			method: 'PATCH',
			data: formData,
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
		return updatedProduct
	}

	async deleteImages(id: string, imageUrls: string[]) {
		const { data: updatedProduct } = await axiosWithAuth<IProduct>({
			url: API_URL.product(`/${id}/images`),
			method: 'DELETE',
			data: { imageUrls }
		})
		return updatedProduct
	}

	async delete(id: string) {
		const { data: deletedProduct } = await axiosWithAuth<IProduct>({
			url: API_URL.product(`/${id}`),
			method: 'DELETE'
		})
		return deletedProduct
	}
}

export const productService = new ProductService()
