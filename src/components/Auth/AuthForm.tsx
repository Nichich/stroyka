'use client'

import { useAuthForm } from '@/app/auth/useAuthForm'

export default function AuthForm() {
	const { onSubmit, form, isPending } = useAuthForm()

	return (
		<div className='min-h-screen w-full bg-white flex justify-center items-center px-4 sm:px-6 md:px-8'>
			<form
				className='flex flex-col justify-between w-full max-w-sm md:max-w-md gap-8 rounded-[8px] border border-[#E5E7EB] shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-6 sm:p-8 bg-white'
				onSubmit={form.handleSubmit(onSubmit)} // ✅ Обработчик отправки
			>
				<div>
					<span className='font-inter font-bold text-[20px] leading-[100%] tracking-[-0.02em] uppercase text-black'>
						Вход
					</span>
					<div className='w-[70px] border-[2px] border-[#F0882B] mt-2 rounded-[12px] opacity-80' />
				</div>

				<div className='flex flex-col gap-5'>
					<div className='flex flex-col gap-2'>
						<label className='text-[#0F172A] font-inter font-medium text-[12px] leading-[20px]'>
							Логин
						</label>
						<input
							className='w-full h-10 rounded-[6px] border border-gray-300 px-3 text-sm text-black placeholder:text-[#A0A0A0] focus:border-black focus:outline-none'
							type='email'
							placeholder='Ваш логин'
							{...form.register('email')} // ✅ Привязка к форме
						/>
					</div>

					<div className='flex flex-col gap-2'>
						<label className='text-[#0F172A] font-inter font-medium text-[12px] leading-[20px]'>
							Пароль
						</label>
						<input
							className='w-full h-10 rounded-[6px] border border-gray-300 px-3 text-sm text-black placeholder:text-[#A0A0A0] focus:border-black focus:outline-none'
							type='password'
							placeholder='Ваш пароль'
							{...form.register('password')} // ✅ Привязка к форме
						/>
					</div>
				</div>

				<button
					type='submit'
					className='w-full h-10 flex items-center justify-center rounded-[6px] bg-[#F0882B] hover:bg-[#d87521] transition-colors'
					disabled={isPending}
				>
					<span className='text-white font-inter font-semibold text-[14px] leading-[24px] text-center'>
						Войти
					</span>
				</button>
			</form>
		</div>
	)
}
