import { API_URL } from '@/config/api.config'
import { axiosClassic, axiosWithAuth } from '@/shared/api/api.interceptors'
import { IFeedback, IFeedbackCreate } from '@/shared/types/feedback.interface'

class FeedbackService {
	async create(data: IFeedbackCreate) {
		const { data: createdFeedback } = await axiosClassic<IFeedback>({
			url: API_URL.feedback(),
			method: 'POST',
			data
		})
		return createdFeedback
	}

	async getAll() {
		const { data } = await axiosWithAuth<IFeedback[]>({
			url: API_URL.feedback(),
			method: 'GET'
		})
		return data
	}
}

export const feedbackService = new FeedbackService()
