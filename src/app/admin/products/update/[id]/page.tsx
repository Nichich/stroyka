'use client'

import { notFound } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { productService } from '@/services/product.service'
import { IProduct } from '@/shared/types/product.interface'
import EditProductForm from '@/components/Admin/updateProduct/EditProductForm'
import React from 'react'

export default function EditProductPage({
	params
}: {
	params: Promise<{ id: string }>
}) {
	const [resolvedParams, setResolvedParams] = React.useState<{ id: string } | null>(null)

	React.useEffect(() => {
		params.then(setResolvedParams)
	}, [params])

	const { data: products, isLoading } = useQuery({
		queryKey: ['products-all-admin'],
		queryFn: () => productService.getAllProducts(),
		enabled: !!resolvedParams
	})

	const product = React.useMemo(() => {
		if (!products || !resolvedParams) return null
		return products.find((p: IProduct) => p.id === resolvedParams.id)
	}, [products, resolvedParams])

	const formData = React.useMemo(() => {
		if (!product) return null
		const characteristics: any[] = [
			{
				id: 'height',
				name: 'Высота',
				value: String(product.height),
				unit: 'мм'
			}
		]

		if (product.colors && product.colors.length > 0) {
			product.colors.forEach((color, index) => {
				characteristics.push({
					id: `color-${index}`,
					name: 'Цвет',
					value: color.title,
					colorId: color.id
				})
			})
		}

		let priceUnit: 'per_piece' | 'per_m2' | 'per_pallet' = 'per_m2'
		if (product.measure === 'THING') {
			priceUnit = 'per_piece'
		} else if (product.measure === 'SQMETERS') {
			priceUnit = 'per_m2'
		} else if (product.measure === 'PALLET') {
			priceUnit = 'per_pallet'
		}

		return {
			id: product.id,
			name: product.title,
			categoryId: product.category?.id || '',
			quantityInStock: product.quantity,
			perPalletCount: product.meters,
			pricePerPallet: product.price,
			priceUnit: priceUnit,
			status: product.status,
			images: (product.imageUrl || []).map((url, index) => ({
				id: `img-${index}`,
				url,
				alt: product.title,
				isPrimary: index === 0
			})),
			characteristics,
			description: product.description,
			delivery: product.delivery,
			return: product.return,
			payment: product.payment,
			useful: product.useful
		}
	}, [product])

	if (isLoading || !resolvedParams) {
		return (
			<div className='min-h-screen bg-[#F5F5F7] flex items-center justify-center'>
				<div className='text-gray-600'>Загрузка...</div>
			</div>
		)
	}

	if (!product || !formData) {
		notFound()
	}

	return <EditProductForm initialProduct={formData} />
}
