'use client'

import { getColorHex } from '@/data/productCard'
import { ProductCardDTO } from '@/shared/types/ProductCardDTO.interface'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

interface CartItemProps {
	product: ProductCardDTO
	quantity: number
	area: number
	itemNumber?: number
	selectedColor?: string
	onQuantityChange: (id: string, quantity: number) => void
	onAreaChange: (id: string, area: number) => void
	onRemove: (id: string) => void
}

export const CartItem: React.FC<CartItemProps> = ({
	product,
	quantity,
	area,
	itemNumber,
	selectedColor,
	onQuantityChange,
	onAreaChange,
	onRemove
}) => {
	const [inputValue, setInputValue] = useState<string>(area.toString())
	const totalPrice = product.price.value * area
	const colorHex = getColorHex(selectedColor || product.sorting.color)
	const colorName = selectedColor || product.sorting.color

	useEffect(() => {
		setInputValue(area.toString())
	}, [area])

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setInputValue(value)
	}

	const handleInputBlur = () => {
		const numValue = parseFloat(inputValue)
		if (!isNaN(numValue) && numValue >= 0.001) {
			onAreaChange(product.id, numValue)
		} else {
			setInputValue(area.toString())
		}
	}

	return (
		<div className='flex gap-4  bg-white p-6 rounded-lg border border-gray-200 relative'>
			<div className='flex md:flex-row sm:flex-row flex-col md:m-0 sm:m-0 m-auto gap-4'>
				<div>
					<button
						onClick={() => onRemove(product.id)}
						className='absolute top-4 right-4 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600'
					>
						<svg
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
						>
							<path
								d='M18 6L6 18M6 6l12 12'
								strokeWidth='2'
								strokeLinecap='round'
							/>
						</svg>
					</button>

					<div className='flex-shrink-0'>
						<span className='text-xl font-bold text-gray-900'>
							{itemNumber ?? 1}.
						</span>
					</div>

					<div className='relative w-32 h-32 flex-shrink-0 rounded overflow-hidden'>
						<Image
							src={product.previewImage.url}
							alt={product.previewImage.alt}
							fill
							className='object-cover'
						/>
					</div>
				</div>
				<div className='flex-1 min-w-0'>
					<h3 className='text-lg font-bold text-black mb-3'>
						{product.title}
					</h3>

					<div className='space-y-2'>
						<div className='flex items-center gap-2'>
							<span className='text-sm text-black'>Цвет:</span>
							<div
								className='w-6 h-6 rounded border border-gray-300'
								style={{ backgroundColor: colorHex }}
								title={colorName}
							></div>
						</div>

						<div className='flex items-center gap-2'>
							<span className='text-sm text-black'>
								Количество поддонов:
							</span>
							<span className='text-sm text-black font-medium'>
								{quantity}
							</span>
						</div>

						<div className='flex items-center gap-2'>
							<span className='text-sm text-black'>Цена:</span>
							<span className='text-sm text-black font-medium'>
								{product.price.value.toFixed(2)}{' '}
								{product.price.currency}/{product.price.per}
							</span>
						</div>
					</div>

					<div className='my-8 md:my-4 flex flex-col md:flex-row md:items-center items-start rounded'>
						<div className='flex items-center'>
							<button
								onClick={() =>
									onAreaChange(
										product.id,
										Math.max(0.001, area - 1)
									)
								}
								className='w-10 h-10 flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-gray-50 text-gray-700 font-medium'
							>
								−
							</button>

							<input
								type='number'
								value={inputValue}
								onChange={handleInputChange}
								onBlur={handleInputBlur}
								className='w-24 h-10 text-center py-2 border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-orange-500'
								step='0.001'
								min='0.001'
							/>

							<span className='w-10 h-10 flex items-center justify-center text-xl font-medium text-gray-700 border-1 border-gray-300'>
								м²
							</span>

							<button
								onClick={() =>
									onAreaChange(product.id, area + 1)
								}
								className='w-10 h-10 flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-gray-50 text-gray-700 font-medium'
							>
								+
							</button>
						</div>

						<div className='md:ml-auto mt-3 md:mt-0'>
							<span className='text-sm text-gray-600'>
								Итого:{' '}
							</span>
							<span className='text-lg font-bold text-gray-900'>
								{totalPrice.toFixed(2)} руб.
							</span>
						</div>
					</div>

					<p className='mt-2 text-xs text-gray-500'>
						Товар продается кратно поддону по 13.176 кв.м
					</p>
				</div>
			</div>
		</div>
	)
}
