'use client'

import { Breadcrumbs } from '@/components/BusketPage/Breadcrumbs'
import { useEffect } from 'react'
import { CartItem } from '@/components/BusketPage/CartItem'
import { OrderForm } from '@/components/BusketPage/OrderForm'
import { useCart } from '@/components/BusketPage/CardContext'
import { productService } from '@/services/product.service'
import { useQuery } from '@tanstack/react-query'
import { IProduct } from '@/shared/types/product.interface'
import { ProductCardDTO } from '@/shared/types/ProductCardDTO.interface'
import { MProductMeasure } from '@/shared/maps/product.map'

const convertToProductCardDTO = (product: IProduct, selectedColorId?: string): ProductCardDTO => {
	let colorName = 'Без цвета'

	if (selectedColorId && product.colors) {
		const selectedColor = product.colors.find(c => c.id === selectedColorId)
		if (selectedColor) {
			colorName = selectedColor.title
		}
	} else if (product.colors && product.colors.length > 0) {
		colorName = product.colors[0].title
	}

	return {
		id: product.id,
		title: product.title,
		slug: product.id,
		price: {
			value: product.price,
			currency: 'руб.',
			per: MProductMeasure[product.measure]
		},
		previewImage: {
			url: product.imageUrl[0] || '/placeholder.jpg',
			alt: product.title
		},
		inStock: product.quantity > 0,
		sorting: {
			type: product.category?.title || '',
			prise: product.price,
			color: colorName,
			shape: '',
			height: `${product.height}`,
			appointment: ''
		},
		popularity: '0'
	}
}

export default function CartPage() {
	const { items: cartItems, updateQuantity, updateArea, removeItem } = useCart()
	useEffect(() => {
		window.dispatchEvent(
			new CustomEvent('cart:update', {
				detail: cartItems.length
			})
		)
	}, [cartItems])

	const { data: allProducts = [], isLoading } = useQuery({
		queryKey: ['products-all'],
		queryFn: () => productService.getAllProducts()
	})

	useEffect(() => {
		if (!isLoading && allProducts.length > 0 && cartItems.length > 0) {
			const validProductIds = new Set(allProducts.map((p: IProduct) => p.id))
			const invalidItems = cartItems.filter(item => !validProductIds.has(item.productId))

			if (invalidItems.length > 0) {
				invalidItems.forEach(item => removeItem(item.productId))
			}
		}
	}, [allProducts, isLoading, cartItems, removeItem])

	const breadcrumbs = [
		{ label: 'Главная', href: '/' },
		{ label: 'Мой заказ', href: '/busket' }
	]

	const handleQuantityChange = (id: string, quantity: number) => {
		updateQuantity(id, quantity)
	}

	const handleAreaChange = (id: string, area: number) => {
		updateArea(id, area)
	}

	const handleRemove = (id: string) => {
		removeItem(id)
	}

	const totalPrice = cartItems.reduce((sum, item) => {
		const product = allProducts.find((p: IProduct) => p.id === item.productId)
		return sum + (product?.price || 0) * item.area
	}, 0)

	if (isLoading) {
		return (
			<div className="min-h-93 bg-white">
				<Breadcrumbs items={breadcrumbs} />
				<div className="container mx-auto px-4 py-8">
					<p className="text-center text-gray-600">Загрузка...</p>
				</div>
			</div>
		)
	}

	if (cartItems.length === 0) {
		return (
			<div className="min-h-93 bg-white">
				<Breadcrumbs items={breadcrumbs} />
				<div className="container mx-auto px-4 py-8">
					<h1 className="text-3xl text-black font-bold mb-8">МОЙ ЗАКАЗ</h1>
					<p className="text-center text-3xl text-black font-bold py-12">Корзина пуста</p>
				</div>
			</div>
		)
	}

	return (
		<div className="bg-white min-h-screen">
			<Breadcrumbs items={breadcrumbs} />
			<div className="container mx-auto px-4 py-8">

				<h1 className="text-3xl text-black font-bold mb-2">МОЙ ЗАКАЗ</h1>
				<div className="h-1 w-16 bg-orange-500 mb-8"></div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<div className="lg:col-span-2 space-y-4">
						{cartItems.map((item, index) => {
							const product = allProducts.find((p: IProduct) => p.id === item.productId)
							if (!product) return null
							const productDTO = convertToProductCardDTO(product, item.color)
							return (
								<CartItem
									key={`${item.productId}-${item.color || 'default'}-${index}`}
									product={productDTO}
									quantity={item.quantity}
									area={item.area}
									itemNumber={index + 1}
									selectedColor={item.color}
									onQuantityChange={handleQuantityChange}
									onAreaChange={handleAreaChange}
									onRemove={handleRemove}
								/>
							)
						})}

						<div className="bg-white border border-gray-200 rounded-lg p-6">
							<div className="flex justify-between items-center">
								<span className="text-xl text-black font-semibold">Итоговая стоимость:</span>
								<span className="text-2xl text-black font-bold">{totalPrice.toFixed(2)} руб.</span>
							</div>
							<p className="text-xs text-gray-500 mt-2">
								Цена и наличие товара, а также стоимость и условия доставки являются предварительными и
								будут уточнены в момент подтверждения заказа по телефону. Расчет выполнен по розничным
								ценам, цена с учетом скидки для оптовых покупателей будет уточнена и сообщена
								менеджером.
							</p>
						</div>
					</div>

					<div>
						<OrderForm totalPrice={totalPrice} />
					</div>
				</div>
			</div>
		</div>

	)
}
