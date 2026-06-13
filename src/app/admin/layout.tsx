import HeaderWrapper from '@/components/Admin/HeaderWrapper'
import { SERVER_URL } from '@/config/api.config'
import { EnumTokens } from '@/services/auth-token.service'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import type { ReactNode } from 'react'

export default async function AdminLayout({
	children
}: {
	children: ReactNode
}) {
	const cookieStore = cookies()
	const refreshToken = (await cookieStore).get(
		EnumTokens.REFRESH_TOKEN
	)?.value

	if (!refreshToken) {
		redirect('/auth')
	}

	const res = await fetch(SERVER_URL, {
		headers: {
			cookie: `refreshToken=${refreshToken}`
		}
	})

	if (res.status === 401) {
		redirect('/auth')
	}
	return (
		<div className='min-h-screen flex flex-col'>
			<HeaderWrapper />

			<div className='flex flex-1 flex-col md:flex-row'>
				<aside className='w-full md:w-[295px] border-b md:border-b-0 md:border-r bg-white pt-4 md:pt-6'>
					<nav className='flex flex-row md:flex-col gap-2 px-4 overflow-x-auto justify-center md:justify-start'>
						<Link
							href='/admin'
							className='py-[8px] px-[12px] flex items-center text-sm md:text-base text-black gap-2 hover:bg-[#F3F3F3] rounded-[6px] whitespace-nowrap'
						>
							<Image
								src='/home.svg'
								alt='home'
								width={20}
								height={20}
							/>
							Главная
						</Link>
						<Link
							href='/admin/profile'
							className='py-[8px] px-[12px] flex items-center text-sm md:text-base text-black gap-2 hover:bg-[#F3F3F3] rounded-[6px] whitespace-nowrap'
						>
							<Image
								src='/user-cog.svg'
								alt='home'
								width={20}
								height={20}
							/>
							Мой профиль
						</Link>
						<Link
							href='/admin/products'
							className='py-[8px] px-[12px] flex items-center text-sm md:text-base text-black gap-2 hover:bg-[#F3F3F3] rounded-[6px] whitespace-nowrap'
						>
							<Image
								src='/layers.svg'
								alt='home'
								width={20}
								height={20}
							/>
							Товары
						</Link>
						<Link
							href='/admin/seo'
							className='py-[8px] px-[12px] flex items-center text-sm md:text-base text-black gap-2 hover:bg-[#F3F3F3] rounded-[6px] whitespace-nowrap'
						>
							<Image
								src='/search.svg'
								alt='seo'
								width={20}
								height={20}
							/>
							SEO
						</Link>
					</nav>
				</aside>

				<main className='bg-white flex-1'>{children}</main>
			</div>
		</div>
	)
}
