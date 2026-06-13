'use client'

import { AddToCartModal } from '@/components/BusketPage/AddToCardModal'
import { useCart } from '@/components/BusketPage/CardContext'
import { EProductMeasure, EProductStatus, IProduct } from '@/shared/types/product.interface'
import { MProductMeasure } from '@/shared/maps/product.map'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

interface ProductCardProps {
	product: IProduct
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const { addItem } = useCart()

	const handleAddToCart = (quantity: number, area: number) => {
		const colorId = product.colors?.[0]?.id
		addItem(product.id, quantity, area, colorId)
	}

	const getProductStatus = () => {
		if (product.status === EProductStatus.OUT_OF_STOCK) {
			return { text: 'Нет в наличии', className: 'bg-red-600' }
		}
		if (product.status === EProductStatus.ON_ORDER) {
			return { text: 'Под заказ', className: 'bg-gray-700' }
		}
		if (product.status === EProductStatus.IN_STOCK || product.quantity > 0) {
			return { text: 'В наличии', className: 'bg-[#3AA542]' }
		}
		return { text: 'Под заказ', className: 'bg-gray-700' }
	}

	const status = getProductStatus()
	const previewImageUrl = product.imageUrl?.[0] || '/placeholder.jpg'
	const measureLabel = MProductMeasure[product.measure] || 'ед.'

	return (
		<>
			<div className='max-w-72 max-h-104 bg-[#FAFAFA] rounded-xl p-4 shadow-lg border border-[#DBDBDB]'>
				<Link href={`/products/${product.id}`}>
					<div className='relative rounded-lg overflow-hidden mb-4 aspect-square'>
						<Image
							src={previewImageUrl}
							alt={product.title}
							width={270}
							height={270}
							className='w-full h-full object-cover rounded-lg'
						/>
						<div
							className={`absolute top-2 right-2 px-3 py-1 text-xs rounded-2xl shadow text-white ${status.className}`}
							suppressHydrationWarning
						>
							{status.text}
						</div>
					</div>
				</Link>

				<div className='mb-6'>
					<Link href={`/products/${product.id}`}>
						<h3 className='text-base font-semibold text-black mb-1 line-clamp-2'>
							{product.title}
						</h3>
					</Link>

					{/* Цена */}
					<p className='text-sm text-black mb-1'>
						{product.price.toLocaleString('ru-RU')} ₽
						<span className='text-xs'> / {measureLabel}</span>
					</p>

					{/* Высота (если актуально) */}
					{product.measure !== EProductMeasure.THING && (
						<p className='text-xs text-gray-600 mt-1'>
							Высота: {product.height} мм
						</p>
					)}

					<button
						onClick={() => setIsModalOpen(true)}
						disabled={product.status === EProductStatus.OUT_OF_STOCK}
						className='w-full bg-orange-400 hover:bg-orange-500 transition text-white py-2 rounded flex items-center justify-center font-medium mt-3 disabled:bg-gray-300 disabled:cursor-not-allowed'
						type='button'
					>
						{product.status === EProductStatus.OUT_OF_STOCK ? 'Нет в наличии' : 'Купить'}
					</button>
				</div>
			</div>

			{isModalOpen && (
				<AddToCartModal
					product={product}
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					onAddToCart={handleAddToCart}
				/>
			)}
		</>
	)
}
