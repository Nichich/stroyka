'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/BusketPage/Breadcrumbs'

export default function AboutPage() {
	const [videoEnabled, setVideoEnabled] = useState(false)
	const breadcrumbs = [
		{ label: 'Главная', href: '/' },
		{ label: 'О заводе', href: '/about' }
	]

	return (
		<div className=" bg-white">
			<Breadcrumbs items={breadcrumbs} />
			
			<div className="container mx-auto px-4 md:px-6 py-8 pb-80 max-w-[1400px]">
				{/* Заголовок */}
				<div className="mb-20">
					<h1 className="text-3xl md:text-4xl text-black font-bold mb-2">
						О ЗАВОДЕ
					</h1>
					<div className="border-b-4 border-[#FF7A00] w-12"></div>
				</div>

				{/* Контент: текст слева, видео справа */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
					{/* Левая колонка - Текст и кнопки */}
					<div className="flex flex-col">
						{/* Логотип */}
						<div className="mb-6">
							<Image
								src="/logo.svg"
								alt="Добрострой 25"
								width={300}
								height={80}
								style={{ height: 'auto' }}
								priority
							/>
						</div>

						{/* Описательный текст */}
						<p className="text-base md:text-lg text-black leading-relaxed mb-8">
							Мы работаем для того, чтобы люди в нашей стране воплощали любые мечты о красивых и уютных садах, дворах и общественных пространствах. Мы помогаем создавать превосходные ландшафтные решения, стремящиеся к идеалу функциональности и эстетики.
						</p>

						{/* Кнопки */}
						<div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
							{/* Связаться */}
							<Link
								href="/contacts"
								className="inline-flex items-center justify-center px-6 h-[48px] rounded-[10px] bg-[#F0882B] text-white text-[16px] font-semibold hover:brightness-95 transition"
							>
								Связаться
							</Link>
							{/* Каталог товаров */}
							<Link
								href="/catalog"
								className="inline-flex items-center gap-3 px-4 h-[48px] rounded-[10px] border border-gray-300 text-black text-[16px] font-normal hover:bg-gray-50 transition"
							>
								<span>Каталог товаров</span>
								<Image src="/arrows.svg" alt="" width={24} height={24} />
							</Link>
						</div>
					</div>

					{/* здесь будет видео */}
					
				</div>
			</div>
		</div>
	)
}

