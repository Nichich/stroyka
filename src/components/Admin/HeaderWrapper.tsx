'use client'

import { useGetProfile } from '@/hooks/auth/useGetProfile'
import { authService } from '@/services/auth.service'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import HeaderOfMain from './HeaderOfMain'

export default function HeaderWrapper() {
	const { profile } = useGetProfile()
	const router = useRouter()
	const queryClient = useQueryClient()

	const handleLogout = async () => {
		try {
			await authService.logout()
			queryClient.invalidateQueries({ queryKey: ['profile'] })
			queryClient.clear()
			router.push('/auth')
		} catch (error) {
			console.error('Ошибка при выходе:', error)
		}
	}

	if (!profile) {
		return (
			<HeaderOfMain
				admin={{ name: 'Загрузка...', login: '', password: '' }}
				onLogout={handleLogout}
			/>
		)
	}

	return (
		<HeaderOfMain
			admin={{ name: profile.name, login: profile.email, password: '' }}
			onLogout={handleLogout}
		/>
	)
}
