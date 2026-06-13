'use client'

import { IProduct } from '@/shared/types/product.interface'
import React, { useState } from 'react'

interface AddToCartModalProps {
	product: IProduct
	isOpen: boolean
	onClose: () => void
	onAddToCart: (quantity: number, area: number) => void
	initialArea?: number
}

export const AddToCartModal: React.FC<AddToCartModalProps> = ({
	product,
	isOpen,
	onClose,
	onAddToCart,
	initialArea
}) => {
	const palletArea = product.palletArea || 18.432
	const defaultArea = initialArea || palletArea

	const [area, setArea] = useState(defaultArea)
	const [inputValue, setInputValue] = useState<string>(defaultArea.toString())
	const [pallets, setPallets] = useState(1)

	React.useEffect(() => {
		if (isOpen) {
			const areaToSet = initialArea || palletArea
			setArea(areaToSet)
			setInputValue(areaToSet.toString())
		}
	}, [isOpen, initialArea, palletArea])

	const totalPrice = product.price * area

	if (!isOpen) return null

	const handleAddToCart = () => {
		const numValue = parseFloat(inputValue)
		if (!isNaN(numValue) && numValue >= 0.001) {
			onAddToCart(pallets, numValue)
			onClose()
		}
	}

	const handleAreaChange = (newArea: number) => {
		setArea(newArea)
		setInputValue(newArea.toString())
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setInputValue(value)
		const numValue = parseFloat(value)
		if (!isNaN(numValue) && numValue >= 0.001) {
			setArea(numValue)
		}
	}

	const handleInputBlur = () => {
		const numValue = parseFloat(inputValue)
		if (!isNaN(numValue) && numValue >= 0.001) {
			setArea(numValue)
			setInputValue(numValue.toString())
		} else {
			setInputValue(area.toString())
		}
	}

	return (
		<div className='fixed inset-0 flex items-center justify-center z-50 p-4'>
			<div
				className='absolute inset-0 bg-black opacity-50'
				onClick={onClose}
			></div>

			<div className='bg-white rounded-lg max-w-md w-full p-6 relative z-10'>
				<button
					onClick={onClose}
					className='absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600'
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

				<h2 className='text-2xl font-bold text-gray-900 mb-6'>
					ВАШ ЗАКАЗ
				</h2>

				<div className='space-y-4 mb-6'>
					<div className='flex justify-between items-center'>
						<span className='text-gray-600'>Количество:</span>
						<span className='text-lg text-black font-bold'>
							{area.toFixed(3)} м²
						</span>
					</div>

					<div className='flex justify-between items-center'>
						<span className='text-gray-600'>
							Количество поддонов:
						</span>
						<span className='text-lg text-black font-bold'>
							{pallets}
						</span>
					</div>

					<div className='flex justify-between items-center'>
						<span className='text-gray-600'>На сумму:</span>
						<span className='text-lg text-black font-bold'>
							{totalPrice.toFixed(2)} руб.
						</span>
					</div>
				</div>

				<div className='p-4 rounded mb-4'>
					<div className='flex items-center justify-center mb-3'>
						<button
							onClick={() =>
								handleAreaChange(Math.max(0.001, area - 1))
							}
							className='w-10 h-10 flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-gray-50 text-xl font-medium text-gray-700'
						>
							−
						</button>

						<div className='flex items-center '>
							<input
								type='number'
								value={inputValue}
								onChange={handleInputChange}
								onBlur={handleInputBlur}
								className='w-32 h-10 text-center py-2 text-lg font-medium border border-gray-300 rounded focus:outline-none text-black'
								step='0.001'
								min='0.001'
							/>
							<span className='w-10 h-10 flex items-center justify-center text-xl font-bold text-gray-700 border-1 border-gray-300'>
								м²
							</span>
						</div>

						<button
							onClick={() => handleAreaChange(area + 1)}
							className='w-10 h-10 flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-gray-50 text-xl font-medium text-gray-700'
						>
							+
						</button>
					</div>

					<p className='text-xs text-gray-500 text-center'>
						{pallets} поддон
					</p>
					<p className='text-xs text-gray-500 text-center'>
						ВНИМАНИЕ: Товар продается кратно поддону по {palletArea.toFixed(3)}{' '}
						кв.м
					</p>
				</div>

				<div className='border-t pt-4 mb-6'>
					<div className='flex justify-between items-center'>
						<span className='text-xl text-gray-500 font-semibold'>
							Итого:
						</span>
						<span className='text-2xl text-black font-bold'>
							{totalPrice.toFixed(2)} руб.
						</span>
					</div>
				</div>
				<div className='flex gap-3'>
					<button
						onClick={onClose}
						className='flex-1 py-3 text-orange-500 font-semibold rounded hover:bg-orange-50 transition'
					>
						Отменить
					</button>
					<button
						onClick={handleAddToCart}
						className='flex-1 py-3 bg-orange-500 text-white font-semibold rounded hover:bg-orange-600 transition'
					>
						Добавить в заказ
					</button>
				</div>
			</div>
		</div>
	)
}
