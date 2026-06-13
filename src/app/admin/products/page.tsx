'use client'

import { DeleteProductModal } from '@/components/Admin/DeleteProduct'
import { useCreateCategory } from '@/hooks/categories/useCreateCategory'
import { useDeleteCategory } from '@/hooks/categories/useDeleteCategory'
import { useGetCategories } from '@/hooks/categories/useGetCategories'
import { useDeleteProduct } from '@/hooks/products/useDeleteProduct'
import { useUpdateProduct } from '@/hooks/products/useUpdateProduct'
import { productService } from '@/services/product.service'
import { ICategory } from '@/shared/types/category.interface'
import { EProductStatus, IProduct } from '@/shared/types/product.interface'
import { MProductMeasure } from '@/shared/maps/product.map'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { CreateCategoryModal } from './create/CreateCategoryModal'

export default function ProductsPage() {
	const [activeCategory, setActiveCategory] = useState<string>('all')
	const [search, setSearch] = useState('')
	const [deleteModalOpen, setDeleteModalOpen] = useState(false)
	const [deleteCategoryModalOpen, setDeleteCategoryModalOpen] = useState(false)
	const [productToDelete, setProductToDelete] = useState<IProduct | null>(null)
	const [categoryToDelete, setCategoryToDelete] = useState<ICategory | null>(null)
	const [createCategoryModalOpen, setCreateCategoryModalOpen] = useState(false)

	const { createCategory, isLoadingCreate: isCreatingCategory } = useCreateCategory()
	const { categories = [] } = useGetCategories()
	const { data: products = [], isLoading: isLoadingProducts } = useQuery({
		queryKey: ['products-all-admin'],
		queryFn: () => productService.getAllProducts()
	})
	const { deleteProduct } = useDeleteProduct()
	const { deleteCategory } = useDeleteCategory()
	const { updateProduct } = useUpdateProduct()

	const filteredProducts = useMemo(() => {
		return products.filter((p: IProduct) => {
			const byCategory =
				activeCategory === 'all' ? true : p.category?.id === activeCategory
			const bySearch = p.title.toLowerCase().includes(search.toLowerCase())
			return byCategory && bySearch
		})
	}, [activeCategory, search, products])

	const handleOpenDelete = (product: IProduct) => {
		setProductToDelete(product)
		setDeleteModalOpen(true)
	}

	const handleOpenDeleteCategory = (category: ICategory) => {
		setCategoryToDelete(category)
		setDeleteCategoryModalOpen(true)
	}

	const handleCreateCategory = (title: string) => {
		createCategory(
			{ title },
			{
				onSuccess: () => {
					setCreateCategoryModalOpen(false)
				},
				onError: error => {
					console.error('Ошибка при создании категории:', error)
				}
			}
		)
	}

	const handleConfirmDelete = () => {
		if (!productToDelete) return

		deleteProduct(productToDelete.id, {
			onSuccess: () => {
				setDeleteModalOpen(false)
				setProductToDelete(null)
			},
			onError: error => {
				console.error('Ошибка при удалении товара:', error)
			}
		})
	}

	const handleConfirmDeleteCategory = () => {
		if (!categoryToDelete) return

		deleteCategory(categoryToDelete.id, {
			onSuccess: () => {
				setDeleteCategoryModalOpen(false)
				setCategoryToDelete(null)
				if (activeCategory === categoryToDelete.id) {
					setActiveCategory('all')
				}
			},
			onError: error => {
				console.error('Ошибка при удалении категории:', error)
			}
		})
	}

	const handleToggleHideProduct = (product: IProduct) => {
		updateProduct({
			productId: product.id,
			data: {
				isHidden: !product.isHidden
			}
		})
	}

	const getProductStatusBadge = (product: IProduct) => {
		if (product.status === EProductStatus.OUT_OF_STOCK) {
			return { text: 'Нет в наличии', className: 'bg-red-600' }
		}
		if (product.status === EProductStatus.ON_ORDER) {
			return { text: 'Под заказ', className: 'bg-gray-700' }
		}
		if (product.status === EProductStatus.IN_STOCK || product.quantity > 0) {
			return { text: 'В наличии', className: 'bg-emerald-600' }
		}
		return { text: 'Под заказ', className: 'bg-gray-700' }
	}

	if (isLoadingProducts) {
		return (
			<div className='min-h-screen bg-[#F5F5F7] flex items-center justify-center'>
				<div className='text-gray-600'>Загрузка...</div>
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-[#F5F5F7]'>
			<main className='mx-auto max-w-[1400px] px-6 py-10'>
				<div className='mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
					<h1 className='text-3xl font-semibold text-black'>ТОВАРЫ</h1>

					<div className='flex gap-3 flex-wrap md:flex-nowrap'>
						<Link
							className='flex items-center justify-center gap-2 rounded-lg bg-[#F0882B] text-white font-semibold w-[173px] h-[50px]'
							href={'/admin/products/create'}
						>
							Создать товар
							<span className=''>+</span>
						</Link>
						<button
							type='button'
							onClick={() => setCreateCategoryModalOpen(true)}
							className='flex items-center justify-center gap-2 rounded-lg border border-[#F0882B] text-[#F0882B] font-semibold hover:bg-[#F0882B]/5 w-[212px] h-[50px]'
						>
							Создать категорию
							<span>+</span>
						</button>
					</div>
				</div>

				<div className='mb-6 flex items-center gap-3 flex-wrap'>
					<button
						onClick={() => setActiveCategory('all')}
						className={`px-5 py-2 rounded-full text-sm border transition ${
							activeCategory === 'all'
								? 'bg-[#F0882B] border-[#F0882B] text-white'
								: 'bg-white text-black border-slate-200 hover:border-slate-300'
						}`}
					>
						Все товары ({products.length})
					</button>

					{categories.map((c: ICategory) => {
						const categoryCount = products.filter(
							(p: IProduct) => p.category?.id === c.id
						).length

						return (
							<div key={c.id} className='relative group'>
								<button
									onClick={() => setActiveCategory(c.id)}
									className={`px-5 py-2 rounded-full text-sm border transition ${
										activeCategory === c.id
											? 'bg-[#F0882B] border-[#F0882B] text-white'
											: 'bg-white text-black border-slate-200 hover:border-slate-300'
									}`}
								>
									{c.title} ({categoryCount})
								</button>
								<button
									onClick={() => handleOpenDeleteCategory(c)}
									className='absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition text-xs'
									title='Удалить категорию'
								>
									×
								</button>
							</div>
						)
					})}
				</div>

				<div className='mb-8 flex items-center rounded-lg border bg-white px-4 py-2 shadow-sm'>
					<input
						type='text'
						placeholder='Поиск по названию...'
						value={search}
						onChange={e => setSearch(e.target.value)}
						className='flex-1 text-black text-sm outline-none'
					/>
					<svg
						className='w-5 h-5 text-slate-400'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
						viewBox='0 0 24 24'
					>
						<circle cx='11' cy='11' r='7'></circle>
						<line x1='16.6' y1='16.6' x2='21' y2='21'></line>
					</svg>
				</div>

				<div className='grid md:grid-cols-2 xl:grid-cols-3 gap-6 text-black'>
					{filteredProducts.map((p: IProduct) => {
						const primaryImage = p.imageUrl?.[0] || '/placeholder.jpg'
						const statusBadge = getProductStatusBadge(p)

						return (
							<article
								key={p.id}
								className='rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm flex flex-col'
							>
								<div className='relative aspect-[4/3] bg-slate-100'>
									<img
										src={primaryImage}
										alt={p.title}
										className='w-full h-full object-cover'
									/>

									<div className={`absolute left-3 top-3 px-3 py-1 rounded-full text-white text-xs font-semibold ${statusBadge.className}`}>
										{statusBadge.text}
									</div>

									{p.isHidden && (
										<div className='absolute right-3 top-3 px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-semibold'>
											СКРЫТ
										</div>
									)}
								</div>

								<div className='p-5 flex flex-col gap-4 flex-1'>
									<h2 className='text-base font-semibold'>{p.title}</h2>

									<div className='text-sm text-slate-600 leading-relaxed'>
										Высота: <span className='font-medium'>{p.height} мм</span>
										<br />
										Количество:{' '}
										<span className='font-medium'>
											{p.quantity} {MProductMeasure[p.measure]}
										</span>
										<br />
										Цена:{' '}
										<span className='font-medium'>
											{p.price} ₽/{MProductMeasure[p.measure]}
										</span>
										<br />
										Категория:{' '}
										<span className='font-medium'>
											{p.category?.title || 'Не указана'}
										</span>
									</div>

									<Link
										href={`/admin/products/update/${p.id}`}
										className='mt-auto flex items-center justify-center gap-2 rounded-lg bg-[#F0882B] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#d97316]'
									>
										Редактировать
									</Link>

									<div className='grid grid-cols-2 gap-3'>
										<button
											onClick={() => handleToggleHideProduct(p)}
											className={`text-xs flex items-center justify-between px-4 py-2 border rounded-lg hover:bg-slate-50 ${
												p.isHidden ? 'text-orange-600 border-orange-300 bg-orange-50' : 'text-slate-700'
											}`}
										>
											{p.isHidden ? 'Показать' : 'Скрыть'}
											<svg
												className='w-4 h-4'
												fill='none'
												viewBox='0 0 24 24'
												stroke='currentColor'
											>
												{p.isHidden ? (
													<path d='M3 10a13.4 13.4 0 0 0 3 2.2M21 10a13.4 13.4 0 0 1-3 2.2m-5 5.3V20m-2-2.5L10 20m4 0 1-2.5M2 2l20 20' strokeWidth='2' strokeLinecap='round' />
												) : (
													<>
														<path d='M12 5C7 5 3.1 8.1 2 12c1.1 3.9 5 7 10 7s8.9-3.1 10-7c-1.1-3.9-5-7-10-7Z' />
														<path d='M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z' />
													</>
												)}
											</svg>
										</button>

										<button
											onClick={() => handleOpenDelete(p)}
											className='text-xs flex items-center justify-between px-4 py-2 border border-red-300 rounded-lg text-red-600 hover:bg-red-50'
										>
											Удалить
											<svg
												className='w-4 h-4'
												fill='none'
												viewBox='0 0 24 24'
												stroke='currentColor'
											>
												<path d='M6 7h12M10 11v6M14 11v6M9 7l1-3h4l1 3M6 7l1 13h10l1-13' />
											</svg>
										</button>
									</div>
								</div>
							</article>
						)
					})}
				</div>

				{filteredProducts.length === 0 && (
					<p className='text-center text-slate-500 mt-10'>
						Нет товаров по выбранным фильтрам
					</p>
				)}
			</main>

			<DeleteProductModal
				open={deleteModalOpen}
				productName={productToDelete?.title}
				onClose={() => setDeleteModalOpen(false)}
				onConfirm={handleConfirmDelete}
			/>

			<DeleteProductModal
				open={deleteCategoryModalOpen}
				productName={categoryToDelete?.title}
				onClose={() => setDeleteCategoryModalOpen(false)}
				onConfirm={handleConfirmDeleteCategory}
			/>

			<CreateCategoryModal
				isOpen={createCategoryModalOpen}
				onClose={() => setCreateCategoryModalOpen(false)}
				onCreate={handleCreateCategory}
				isLoading={isCreatingCategory}
			/>
		</div>
	)
}
