'use client'

import React from 'react'
import { Breadcrumbs } from '@/components/BusketPage/Breadcrumbs'

export default function DeliveryPage() {
	const breadcrumbs = [
		{ label: 'Главная', href: '/' },
		{ label: 'Доставка', href: '/delivery' }
	]

	return (
		<div className="min-h-screen bg-white">
			<Breadcrumbs items={breadcrumbs} />
			
			<div className="container mx-auto px-4 md:px-6 py-8 max-w-[1400px]">
				{/* Заголовок */}
				<div className="mb-8">
					<h1 className="text-3xl md:text-4xl text-black font-bold mb-2">
						ДОСТАВКА
					</h1>
					<div className="border-b-4 border-[#FF7A00] w-12"></div>
				</div>

				{/* Стоимость доставки */}
				<div className="mb-12">
					<p className="text-base md:text-lg text-black mb-4">
						Стоимость доставки зависит от расстояния от завода в г. Владивосток:
					</p>
					
					{/* Таблица - прокручиваемая на мобильных */}
					<div className="overflow-x-auto -mx-4 md:mx-0">
						<div className="min-w-[800px] md:min-w-0 px-4 md:px-0">
							<table className="w-full border-collapse border border-gray-300 text-sm md:text-base">
								<thead>
									<tr className="bg-[#F0882B]">
										<th className="border border-gray-300 px-3 py-3 md:px-4 md:py-4 text-left font-semibold text-white bg-[#F0882B]">
											Расстояние от завода в г. Владивосток, км
										</th>
										{[...Array(10)].map((_, i) => (
											<th key={i} className="border border-gray-300 px-2 py-3 md:px-4 md:py-4 text-center font-semibold text-white bg-[#F0882B]">
												До 30
											</th>
										))}
										<th className="border border-gray-300 px-3 py-3 md:px-4 md:py-4 text-center font-semibold text-white bg-[#F0882B]">
											Свыше 130
										</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td className="border border-gray-300 px-3 py-3 md:px-4 md:py-4 font-semibold text-black">
											Стоимость с НДС, руб*
										</td>
										{[...Array(10)].map((_, i) => (
											<td key={i} className="border border-gray-300 px-2 py-3 md:px-4 md:py-4 text-center text-black">
												от 13 000
											</td>
										))}
										<td className="border border-gray-300 px-3 py-3 md:px-4 md:py-4 text-center text-black">
											90 руб/км
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>

					<p className="text-sm md:text-base text-gray-600 mt-4">
						*Указана стоимость за машину - 20 тонн длинномер или 10 тонн манипулятор. Тарифы не являются публичной офертой. Стоимость доставки зависит от нескольких факторов. Точную стоимость доставки уточняйте у менеджеров.
					</p>
				</div>

				{/* Две колонки для первых двух секций на десктопе */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
					{/* Общие условия доставки */}
					<div className="border border-gray-300 rounded-lg p-6">
						<h2 className="text-2xl md:text-3xl text-black font-bold mb-4">
							ОБЩИЕ УСЛОВИЯ ДОСТАВКИ
						</h2>
						<div className="border-b-4 border-[#FF7A00] w-12 mb-6"></div>

						{/* Оранжевый блок с вертикальной линией слева */}
						<div className="border-l-4 border-[#FF7A00] bg-[#FFF5E6] p-4 md:p-6 mb-6">
							<p className="text-base md:text-lg text-black font-semibold mb-2">
								Отгрузка осуществляется на условиях склада поставщика
							</p>
							<p className="text-base md:text-lg text-black font-semibold">
								Минимальная партия отгружаемой продукции - один поддон
							</p>
						</div>

						{/* Нормы разгрузки */}
						<div className="mb-6">
							<h3 className="text-xl md:text-2xl text-black font-bold mb-3">
								Нормы разгрузки
							</h3>
							<ul className="space-y-2 text-base md:text-lg text-black">
								<li>Норма разгрузки п/прицепа: 2,5 часа</li>
								<li>Сверхнормативный простой оплачивается по тарифу: 1000 руб./час</li>
							</ul>
						</div>

						{/* Максимальная загрузка автомобилей */}
						<div className="mb-6">
							<h3 className="text-xl md:text-2xl text-black font-bold mb-3">
								Максимальная загрузка автомобилей
							</h3>
							<ul className="space-y-2 text-base md:text-lg text-black">
								<li>Автомобиль без манипулятора: 10-14 поддонов (до 20 тонн)</li>
								<li>Автомобиль с манипулятором: 6 поддонов или 10 тонн</li>
							</ul>
						</div>

						{/* Особенности погрузки */}
						<div>
							<h3 className="text-xl md:text-2xl text-black font-bold mb-3">
								Особенности погрузки
							</h3>
							<p className="text-base md:text-lg text-black">
								Погрузка осуществляется строго на машины с боковой загрузкой
							</p>
						</div>
					</div>

					{/* Особые условия доставки */}
					<div className="border border-gray-300 rounded-lg p-6">
						<h2 className="text-2xl md:text-3xl text-black font-bold mb-4">
							ОСОБЫЕ УСЛОВИЯ ДОСТАВКИ
						</h2>
						<div className="border-b-4 border-[#FF7A00] w-12 mb-6"></div>

						{/* Доставка грузовым автомобилем */}
						<div className="mb-8">
							<h3 className="text-xl md:text-2xl text-black font-bold mb-3">
								Доставка грузовым автомобилем грузоподъемностью 20 тонн (фура)
							</h3>
							<ul className="space-y-2 text-base md:text-lg text-black">
								<li>Покупатель обязан обеспечить специальные средства разгрузки (кран, манипулятор, погрузчик)</li>
								<li>Норма разгрузки полностью загруженного автомобиля грузоподъемностью 20 тонн - 2,5 часа</li>
								<li>Сверхнормативный простой оплачивается согласно действующему тарифу на доставку товара</li>
							</ul>
						</div>

						{/* Доставка автомобилем с краном-манипулятором */}
						<div>
							<h3 className="text-xl md:text-2xl text-black font-bold mb-3">
								Доставка автомобилем с краном-манипулятором
							</h3>
							<ul className="space-y-2 text-base md:text-lg text-black">
								<li>Разгрузка производится только на открытую свободную площадку</li>
								<li>Разгрузка не производится через забор, в непосредственной близости от проводов линий электроснабжения и связи, внутрь зданий</li>
								<li>При разгрузке товара необходимо присутствие человека со стороны покупателя, который будет координировать водителя и крепить стропы</li>
							</ul>
						</div>
					</div>
				</div>

				{/* Передача товара и ответственность */}
				<div className="border border-gray-300 rounded-lg p-6 mb-8">
					<h2 className="text-2xl md:text-3xl text-black font-bold mb-4">
						ПЕРЕДАЧА ТОВАРА И ОТВЕТСТВЕННОСТЬ
					</h2>
					<div className="border-b-4 border-[#FF7A00] w-12 mb-6"></div>
					<p className="text-base md:text-lg text-black leading-relaxed">
						Моментом передачи товара Покупателю Продавцом является момент подписания товарной накладной. После этого поставка товара считается исполненной, а право собственности на товар, равно как и риск случайной порчи, утраты и гибели товара переходят к Покупателю.
					</p>
				</div>
			</div>
		</div>
	)
}

