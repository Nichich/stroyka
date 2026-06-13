import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'

import { ADMIN_URL, PUBLIC_URL } from '@/config/url.config'
import { authService } from '@/services/auth.service'
import { IAuthForm } from '@/shared/types/auth.interface'

export function useAuthForm() {
	const router = useRouter()
	const queryClient = useQueryClient()

	const form = useForm<IAuthForm>({
		mode: 'onChange',
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const { mutate, isPending } = useMutation({
		mutationKey: ['auth user'],
		mutationFn: (data: IAuthForm) => authService.login(data),
		onSuccess: async () => {
			try {
				form.reset()
				queryClient.clear()

				router.replace(ADMIN_URL.home())
			} catch (err) {
				console.error(err)
				router.replace(PUBLIC_URL.home())
			}
		},
		onError(error) {
			if (error.message) {
			} else {
			}
		}
	})

	const onSubmit: SubmitHandler<IAuthForm> = data => {
		mutate(data)
	}
	return { onSubmit, form, isPending }
}
