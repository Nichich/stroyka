import { API_URL } from '@/config/api.config'

import { axiosClassic, axiosWithAuth } from '@/shared/api/api.interceptors'
import { IAuthForm, IAuthResponse } from '@/shared/types/auth.interface'
import { removeFromStorage, saveTokenStorage } from './auth-token.service'

export interface IProfile {
	name: string
	email: string
}

class AuthService {
	async login(data: IAuthForm) {
		const { name, ...res } = data
		data = res

		const response = await axiosClassic<IAuthResponse>({
			url: API_URL.auth(`/login`),
			method: 'POST',
			data
		})

		if (response.data.accessToken)
			saveTokenStorage(response.data.accessToken)

		return response
	}

	async getNewTokens() {
		const response = await axiosClassic<IAuthResponse>({
			url: API_URL.auth('/refresh'),
			method: 'POST'
		})

		if (response.data.accessToken)
			saveTokenStorage(response.data.accessToken)

		return response
	}

	async logout() {
		const response = await axiosClassic<IAuthResponse>({
			url: API_URL.auth('/logout'),
			method: 'POST'
		})

		if (response.data) removeFromStorage()

		return response
	}

	async getProfile() {
		const { data } = await axiosWithAuth<IProfile[]>({
			url: API_URL.auth('/profile'),
			method: 'GET'
		})

		return data[0]
	}
}

export const authService = new AuthService()
