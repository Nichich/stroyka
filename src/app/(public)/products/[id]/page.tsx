'use client'

import React, { use, useState } from 'react'
import { ProductCard } from '@/components/ProductCard/ProductCard'
import { useCart } from '@/components/BusketPage/CardContext'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/BusketPage/Breadcrumbs'
import { ImageSlider } from '@/components/BusketPage/ImageSlider'
import { AddToCartModal } from '@/components/BusketPage/AddToCardModal'
import { productService } from '@/services/product.service'
import { useQuery } from '@tanstack/react-query'
import { EProductStatus, IProduct } from '@/shared/types/product.interface'
import { MProductMeasure } from '@/shared/maps/product.map'

export default function ProductPage({
	params
}: {
	params: Promise<{ id: string }>
}) {
	const resolvedParams = use(params)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedColor, setSelectedColor] = useState<string>('')
	const [activeTab, setActiveTab] = useState('delivery')
	const { addItem } = useCart()

	const { data: product, isLoading } = useQuery({
		queryKey: ['product', resolvedParams.id],
		queryFn: async () => {
			const allProducts = await productService.getAllProducts()
			return allProducts.find((p: IProduct) => p.id === resolvedParams.id)
		}
	})

	const palletArea = product?.palletArea || 18.432
	const [area, setArea] = useState(palletArea)
	const [inputValue, setInputValue] = useState<string>(palletArea.toString())

	const { data: allProducts = [] } = useQuery({
		queryKey: ['products-all'],
		queryFn: () => productService.getAllProducts()
	})

	const availableColors = React.useMemo(() => {
		if (!product || !product.colors || product.colors.length === 0) return []
		return product.colors
	}, [product])

	React.useEffect(() => {
		if (product && availableColors.length > 0) {
			setSelectedColor(availableColors[0].id)
		}
	}, [product, availableColors])

	React.useEffect(() => {
		if (product?.palletArea) {
			setArea(product.palletArea)
			setInputValue(product.palletArea.toString())
		}
	}, [product?.palletArea])

	React.useEffect(() => {
		setInputValue(area.toString())
	}, [area])

	if (isLoading) {
		return (
			<div className='min-h-screen bg-gray-50 flex items-center justify-center'>
				<div className='text-gray-600'>Загрузка...</div>
			</div>
		)
	}

	if (!product) {
		notFound()
	}

	const handleAreaInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setInputValue(value)
		const numValue = parseFloat(value)
		if (!isNaN(numValue) && numValue >= 0.001) {
			setArea(numValue)
		}
	}

	const handleAreaInputBlur = () => {
		const numValue = parseFloat(inputValue)
		if (!isNaN(numValue) && numValue >= 0.001) {
			setArea(numValue)
			setInputValue(numValue.toString())
		} else {
			setInputValue(area.toString())
		}
	}

	const previewImageUrl = product.imageUrl?.[0] || '/placeholder.jpg'
	const images = product.imageUrl && product.imageUrl.length > 0
		? product.imageUrl.map((url, index) => ({ url, alt: `${product.title} - фото ${index + 1}` }))
		: [
				{ url: previewImageUrl, alt: product.title },
				{ url: previewImageUrl, alt: product.title },
				{ url: previewImageUrl, alt: product.title }
		  ]

	const breadcrumbs = [
		{ label: 'Главная', href: '/' },
		{ label: 'Каталог', href: '/catalog' },
		{
			label: product.category?.title || 'Категория',
			href: `/catalog/${product.category?.id || ''}`
		},
		{
			label: `${product.title} ${product.height} мм`,
			href: `/products/${product.id}`
		}
	]

	const similarProducts = allProducts
		.filter((p: IProduct) => p.category?.id === product.category?.id && p.id !== product.id)
		.slice(0, 4)

	const handleAddToCart = (quantity: number, area: number) => {
		addItem(product.id, quantity, area, selectedColor)
	}

	const getProductStatus = () => {
		if (product.status === EProductStatus.OUT_OF_STOCK) {
			return { text: 'НЕТ В НАЛИЧИИ', className: 'bg-red-600' }
		}
		if (product.status === EProductStatus.ON_ORDER) {
			return { text: 'ПОД ЗАКАЗ', className: 'bg-gray-700' }
		}
		if (product.status === EProductStatus.IN_STOCK || product.quantity > 0) {
			return { text: 'В НАЛИЧИИ', className: 'bg-[#3AA542]' }
		}
		return { text: 'ПОД ЗАКАЗ', className: 'bg-gray-700' }
	}

	const statusInfo = getProductStatus()
	const totalPrice = product.price * area

	return (
		<div className='min-h-screen bg-gray-50'>
			<Breadcrumbs items={breadcrumbs} />
			<div className='container mx-auto px-4 py-6'>
				<Link
					href='/catalog'
					className='inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6'
				>
					<svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
						<path
							d='M12.5 15L7.5 10L12.5 5'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
					Назад
				</Link>

				<div className='hidden lg:grid lg:grid-cols-5 gap-8 bg-white rounded-lg p-8 mb-8'>
					<div className='lg:col-span-2'>
						<ImageSlider images={images} />
					</div>

					<div className='lg:col-span-3'>
						<span className={`inline-block text-white px-4 py-1.5 rounded-full text-sm font-medium mb-4 ${statusInfo.className}`}>
							{statusInfo.text}
						</span>

						<h1 className='text-3xl text-black font-bold mb-6'>
							{product.title} {product.height} мм
						</h1>

						<div className='grid grid-cols-2 gap-8 mb-8'>
							<div className='space-y-4'>
								<div>
									<span className='text-gray-600 text-sm block mb-1'>Высота:</span>
									<span className='font-semibold text-black text-lg'>
										{product.height} мм
									</span>
								</div>

								<div>
									<span className='text-gray-600 text-sm block mb-1'>Стоимость:</span>
									<span className='font-semibold text-black text-lg'>
										{totalPrice.toFixed(2)} руб.
									</span>
								</div>
							</div>

							<div className='space-y-4'>
								{availableColors.length > 0 && (
									<div>
										<span className='text-gray-600 text-sm block mb-2'>Цвет:</span>
										<div className='flex gap-2 flex-wrap'>
											{availableColors.map(color => (
												<button
													key={color.id}
													onClick={() => setSelectedColor(color.id)}
													className={`w-10 h-10 rounded border-2 transition ${
														color.id === selectedColor
															? 'border-orange-500 shadow-md'
															: 'border-gray-300 hover:border-gray-400'
													}`}
													style={{ backgroundColor: color.value }}
													title={color.title}
												/>
											))}
										</div>
									</div>
								)}

								<div>
									<span className='text-gray-600 text-sm block mb-1'>Цена:</span>
									<span className='font-bold text-black text-2xl'>
										{product.price.toFixed(2)} ₽/{MProductMeasure[product.measure]}
									</span>
								</div>
							</div>
						</div>

						<div className='border-t border-gray-200 my-6'></div>

						<div className='p-6 rounded-lg mb-6'>
							<div className='flex items-center justify-between gap-4'>
								<div className='flex items-center'>
									<button
										onClick={() => setArea(Math.max(0.001, area - 1))}
										className='w-12 h-12 flex items-center justify-center text-gray-600 bg-white border-1 border-gray-300 rounded hover:border-gray-400 hover:bg-gray-50 text-xl font-medium transition'
									>
										−
									</button>

									<div className='flex items-center'>
										<input
											type='number'
											value={inputValue}
											onChange={handleAreaInputChange}
											onBlur={handleAreaInputBlur}
											className='w-32 h-12 text-center text-xl text-black font-bold border-1 border-gray-300 focus:outline-none'
											step='0.001'
											min='0.001'
										/>
										<span className='w-12 h-12 flex items-center justify-center text-xl font-bold text-gray-700 border-1 border-gray-300'>
											м²
										</span>
									</div>

									<button
										onClick={() => setArea(area + 1)}
										className='w-12 h-12 flex items-center justify-center text-gray-600 bg-white border-1 border-gray-300 rounded hover:border-gray-400 hover:bg-gray-50 text-xl font-medium transition'
									>
										+
									</button>
								</div>

								<div className='flex items-center gap-3'>
									<span className='text-xl font-semibold text-gray-700'>Итого:</span>
									<span className='text-3xl text-black font-bold'>
										{totalPrice.toFixed(2)} руб.
									</span>
								</div>
							</div>

							<div className='mt-4 text-left max-w-55'>
								<p className='text-sm text-gray-600 mb-1'>1 поддон</p>
								<p className='text-xs text-gray-500'>
									ВНИМАНИЕ: Товар продается кратно поддону по {palletArea.toFixed(3)} кв.м
								</p>
							</div>
						</div>

						<button
							onClick={() => setIsModalOpen(true)}
							disabled={product.status === EProductStatus.OUT_OF_STOCK}
							className='w-55 bg-orange-500 text-white py-4 rounded-lg font-bold text-lg hover:bg-orange-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2'
						>
							{product.status === EProductStatus.OUT_OF_STOCK ? 'Нет в наличии' : 'Добавить в заказ'}
							{product.status !== EProductStatus.OUT_OF_STOCK && (
								<svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
									<path
										d='M10 5V15M5 10H15'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
									/>
								</svg>
							)}
						</button>
					</div>
				</div>

				<div className='lg:hidden bg-white rounded-lg mb-8'>
					<div className='p-4'>
						<ImageSlider images={images} />

						<span className={`inline-block text-white px-3 py-1 rounded-full text-xs font-medium mt-4 mb-2 ${statusInfo.className}`}>
							{statusInfo.text}
						</span>

						<h1 className='text-xl text-black font-bold mb-4'>
							{product.title} {product.height} мм
						</h1>

						<div className='grid grid-cols-2 gap-4 mb-4'>
							<div className='space-y-3'>
								<div>
									<span className='text-xs text-gray-600 block mb-1'>Высота:</span>
									<span className='font-semibold text-black'>{product.height} мм</span>
								</div>
								<div>
									<span className='text-xs text-gray-600 block mb-1'>Стоимость:</span>
									<span className='font-semibold text-black'>
										{totalPrice.toFixed(2)} руб.
									</span>
								</div>
							</div>

							<div className='space-y-3'>
								{availableColors.length > 0 && (
									<div>
										<span className='text-xs text-gray-600 block mb-2'>Цвет:</span>
										<div className='flex gap-1.5 flex-wrap'>
											{availableColors.map(color => (
												<button
													key={color.id}
													onClick={() => setSelectedColor(color.id)}
													className={`w-8 h-8 rounded border-2 transition ${
														color.id === selectedColor
															? 'border-orange-500 shadow-md'
															: 'border-gray-300'
													}`}
													style={{ backgroundColor: color.value }}
													title={color.title}
												/>
											))}
										</div>
									</div>
								)}
								<div>
									<span className='text-xs text-gray-600 block mb-1'>Цена:</span>
									<span className='font-bold text-black text-lg'>
										{product.price.toFixed(2)} ₽/{MProductMeasure[product.measure]}
									</span>
								</div>
							</div>
						</div>

						<div className='border-t border-gray-200 my-4'></div>

						<div className='bg-gray-50 p-4 rounded-lg mb-4'>
							<div className='flex flex-col gap-4'>
								<div className='flex items-center justify-center'>
									<button
										onClick={() => setArea(Math.max(0.001, area - 1))}
										className='w-10 h-10 flex items-center justify-center bg-white border-1 border-gray-300 rounded text-lg text-gray-700'
									>
										−
									</button>

									<div className='flex items-center'>
										<input
											type='number'
											value={inputValue}
											onChange={handleAreaInputChange}
											onBlur={handleAreaInputBlur}
											className='w-24 h-10 text-center py-2 text-black text-lg font-bold border-1 border-gray-300 focus:outline-none focus:border-orange-500'
											step='0.001'
											min='0.001'
										/>
										<span className='w-10 h-10 flex items-center justify-center text-xl font-bold text-gray-700 border-1 border-gray-300'>
											м²
										</span>
									</div>

									<button
										onClick={() => setArea(area + 1)}
										className='w-10 h-10 flex items-center justify-center bg-white border-1 border-gray-300 rounded text-lg text-gray-700'
									>
										+
									</button>
								</div>

								<div className='flex flex-col items-start text-left gap-1'>
									<p className='text-xs text-gray-600'>1 поддон</p>
									<p className='text-xs text-gray-500'>
										ВНИМАНИЕ: Товар продается кратно поддону по {palletArea.toFixed(3)} кв.м
									</p>
								</div>

								<div className='flex items-center justify-between pt-3 border-t'>
									<span className='text-lg text-gray-600 font-semibold'>Итого:</span>
									<span className='text-2xl text-black font-bold'>
										{totalPrice.toFixed(2)} руб.
									</span>
								</div>
							</div>
						</div>

						<button
							onClick={() => setIsModalOpen(true)}
							disabled={product.status === EProductStatus.OUT_OF_STOCK}
							className='w-full bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2'
						>
							{product.status === EProductStatus.OUT_OF_STOCK ? 'Нет в наличии' : 'Добавить в заказ'}
							{product.status !== EProductStatus.OUT_OF_STOCK && (
								<svg width='18' height='18' viewBox='0 0 20 20' fill='none'>
									<path
										d='M10 5V15M5 10H15'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
									/>
								</svg>
							)}
						</button>
					</div>
				</div>

				<div className='bg-white rounded-lg'>
					<div className='flex border-b mb-6 overflow-x-auto'>
						<button
							onClick={() => setActiveTab('description')}
							className={`px-6 py-3 font-medium whitespace-nowrap transition ${
								activeTab === 'description'
									? 'border-1 border-b-2 rounded-tl-lg border-orange-500 text-gray-600'
									: 'text-gray-600 hover:text-gray-900 bg-gray-100 rounded-tl-lg border-1 border-gray-400'
							}`}
						>
							Описание
						</button>
						<button
							onClick={() => setActiveTab('delivery')}
							className={`px-6 py-3 font-medium whitespace-nowrap transition ${
								activeTab === 'delivery'
									? 'border-1 border-b-2 border-orange-500 text-gray-600'
									: 'text-gray-600 hover:text-gray-900 bg-gray-100 border-1 border-gray-400'
							}`}
						>
							Доставка
						</button>
						<button
							onClick={() => setActiveTab('return')}
							className={`px-6 py-3 font-medium whitespace-nowrap transition ${
								activeTab === 'return'
									? 'border-1 border-b-2 border-orange-500 text-gray-600'
									: 'text-gray-600 hover:text-gray-900 bg-gray-100 border-1 border-gray-400'
							}`}
						>
							Возврат
						</button>
						<button
							onClick={() => setActiveTab('payment')}
							className={`px-6 py-3 font-medium whitespace-nowrap transition ${
								activeTab === 'payment'
									? 'border-1 border-b-2 border-orange-500 text-gray-600'
									: 'text-gray-600 hover:text-gray-900 bg-gray-100 border-1 border-gray-400'
							}`}
						>
							Способы оплаты
						</button>
						<button
							onClick={() => setActiveTab('useful')}
							className={`px-6 py-3 font-medium whitespace-nowrap transition ${
								activeTab === 'useful'
									? 'border-1 border-b-2 rounded-tr-lg border-orange-500 text-gray-600'
									: 'text-gray-600 hover:text-gray-900 bg-gray-100 rounded-tr-lg border-1 border-gray-400'
							}`}
						>
							Полезные материалы
						</button>
					</div>

					<div className='prose max-w-none p-6'>
						{activeTab === 'description' && (
							<div>
								<p className='text-gray-700 whitespace-pre-wrap'>
									{product.description || 'Качественная продукция для различных целей. Долговечность и надежность гарантированы.'}
								</p>
							</div>
						)}
						{activeTab === 'delivery' && (
							<div>
								<p className='text-gray-700 whitespace-pre-wrap'>
									{product.delivery || 'Информация о доставке'}
								</p>
							</div>
						)}
						{activeTab === 'return' && (
							<div>
								<p className='text-gray-700 whitespace-pre-wrap'>
									{product.return || 'Информация о возврате'}
								</p>
							</div>
						)}
						{activeTab === 'payment' && (
							<div>
								<p className='text-gray-700 whitespace-pre-wrap'>
									{product.payment || 'Информация о способах оплаты'}
								</p>
							</div>
						)}
						{activeTab === 'useful' && (
							<div>
								<p className='text-gray-700 whitespace-pre-wrap'>
									{product.useful || 'Полезные материалы'}
								</p>
							</div>
						)}
					</div>
				</div>

				<div>
					<div className='flex flex-col justify-center items-center w-full mt-10'>
						<div className='flex flex-col md:flex-row items-center justify-center mb-10 w-full gap-4 md:gap-0'>
							<p className='font-bold text-black text-center md:text-left text-[25px] md:text-[40px] max-w-full md:max-w-[60%]'>
								ПОХОЖИЕ ТОВАРЫ
							</p>
							<div className='flex items-center flex-1 max-w-[700px] md:ml-7 w-full md:w-auto'>
								<div className='flex flex-1 bg-[#DBDBDB] h-[1px]'></div>
								<Link href='/catalog'>
									<button className='hidden md:flex border-2 border-[#DBDBDB] rounded-lg py-2 md:px-4 w-full md:w-auto text-black whitespace-nowrap hover:bg-gray-100 transition shrink-0'>
										Перейти в каталог
									</button>
								</Link>
							</div>
						</div>
						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-[1400px]'>
							{similarProducts.map((p: IProduct) => (
								<ProductCard key={p.id} product={p} />
							))}
						</div>
						<Link href='/catalog' className='md:hidden mt-10 w-full'>
							<button className='border-2 border-[#DBDBDB] rounded-lg py-2 md:px-4 w-full md:w-auto text-black whitespace-nowrap hover:bg-gray-100 transition shrink-0'>
								Перейти в каталог
							</button>
						</Link>
					</div>
				</div>
			</div>

			<AddToCartModal
				product={product}
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onAddToCart={handleAddToCart}
				initialArea={area}
			/>
		</div>
	)
}
