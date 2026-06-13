'use client'

import React from 'react'
import { Breadcrumbs } from '@/components/BusketPage/Breadcrumbs'
import { ContactItem } from '@/components/ContactPage/ContactItem'
import { YandexMap } from '@/components/ContactPage/YandexMap'

export default function ContactsPage() {
	const breadcrumbs = [
		{ label: 'Главная', href: '/' },
		{ label: 'Контакты', href: '/contacts' }
	]


	return (
		<div className="min-h-screen bg-white">
			<Breadcrumbs items={breadcrumbs} />
			
			<div className="container mx-auto px-4 md:px-6 py-8">
				{/* Заголовок */}
				<div className="mb-10 max-w-[720px]">
					<h1 className="text-3xl md:text-4xl text-black font-bold mb-2">
						КОНТАКТНАЯ ИНФОРМАЦИЯ
					</h1>
					<div className="border-b-4 border-[#FF7A00] w-12"></div>
				</div>

				{/* Контент: контакты и карта */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
					{/* Левая колонка - Контактная информация */}
					<div className="flex flex-col">
						<ContactItem
							iconSrc="/location.svg"
							label="Адрес завода"
							value="Приморский край, г.о. Владивостокский, г. Владивосток, ул Шошина, Дом 6, офис 3"
						/>
						
						<ContactItem
							iconSrc="/phone.svg"
							label="Телефон"
							value="+7 (902) 487-28-77"
						/>
						
						<ContactItem
							iconSrc="/mail.svg"
							label="Электронная почта"
							value="2105850@bk.ru"
						/>
						
						<ContactItem
							iconSrc="/clock.svg"
							label="Часы работы"
							value="Пн-Пт: 8:00 - 18:00, Сб: 9:00 - 15:00"
						/>
					</div>

					{/* Правая колонка - Карта */}
					<div className="w-full">
						<YandexMap />
					</div>
				</div>
			</div>
		</div>
	)
}

