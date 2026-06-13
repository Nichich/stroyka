'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { Breadcrumbs } from '@/components/BusketPage/Breadcrumbs'
import { Filter, FilterState } from '@/components/CatalogPage/Filter'
import { SortDropdown, SortOption } from '@/components/CatalogPage/SortDropdown'
import { ProductCard } from '@/components/ProductCard/ProductCard'
import { filters } from '@/data/Catalog/Filter'
import { IProduct } from '@/shared/types/product.interface'
import { useGetColors } from '@/hooks/colors/useGetColors'
import { IFilter } from '@/shared/Catalog/Filter.interface'
import { productService } from '@/services/product.service'
import { useQuery } from '@tanstack/react-query'

const ITEMS_PER_PAGE = 12

export default function CatalogPage() {
	const router = useRouter()
	const searchParams = useSearchParams()

	const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
	const [sortBy, setSortBy] = useState<SortOption>(
		(searchParams.get('sort') as SortOption) || 'popularity'
	)
	const [currentPage, setCurrentPage] = useState(0)

	const { colors = [] } = useGetColors()

	const dynamicFilters = useMemo<IFilter>(() => {
		return {
			...filters,
			color: colors.map(c => ({
				colors: c.title,
				index: c.value
			}))
		}
	}, [colors])

	// --- 1. Извлекаем фильтры из URL ---
	const appliedFilters = useMemo<FilterState>(() => {
		const available = searchParams.getAll('available')
		const color = searchParams.getAll('color')
		const height = searchParams
			.getAll('height')
			.map(Number)
			.filter(n => !isNaN(n))
		const minPrice = Number(searchParams.get('minPrice') || 0)
		const maxPrice = Number(searchParams.get('maxPrice') || 1_500_000)

		return {
			available,
			color,
			height,
			priceRange: [minPrice, maxPrice]
		}
	}, [searchParams])

	// --- 2. Формируем query для API ---
	const query = useMemo(() => {
		const q: Record<string, any> = {}

		// Цвета → colorIds
		if (appliedFilters.color.length > 0) {
			q.colorIds = appliedFilters.color
		}

		// Высоты → heights
		if (appliedFilters.height.length > 0) {
			q.heights = appliedFilters.height
		}

		// Диапазон цен
		q.minPrice = appliedFilters.priceRange[0]
		q.maxPrice = appliedFilters.priceRange[1]

		// Сортировка
		if (sortBy === 'price-low') q.sort = 'price-asc'
		else if (sortBy === 'price-high') q.sort = 'price-desc'

		return q
	}, [appliedFilters, sortBy])

	const { data: products = [], isLoading } = useQuery({
		queryKey: ['products-all', query],
		queryFn: () => productService.getAllProducts(query)
	})

	const filteredProducts = useMemo(() => {
		return products.filter((p: IProduct) => !p.isHidden)
	}, [products])

	const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
	const visibleProducts = filteredProducts.slice(
		currentPage * ITEMS_PER_PAGE,
		(currentPage + 1) * ITEMS_PER_PAGE
	)
	const handleApplyFilters = useCallback(
		(newFilters: FilterState) => {
			const newParams = new URLSearchParams()

			// Сохраняем сортировку
			newParams.set('sort', sortBy)

			// Фильтры
			newFilters.available.forEach(v => newParams.append('available', v))
			newFilters.color.forEach(v => newParams.append('color', v))
			newFilters.height.forEach(v =>
				newParams.append('height', v.toString())
			)
			newParams.set('minPrice', newFilters.priceRange[0].toString())
			newParams.set('maxPrice', newFilters.priceRange[1].toString())

			router.replace(`?${newParams.toString()}`)
			setMobileFilterOpen(false)
		},
		[router, sortBy]
	)

	const handleResetFilters = () => {
		const newParams = new URLSearchParams()
		newParams.set('sort', sortBy)
		router.replace(`?${newParams.toString()}`)
	}

	const handleSortChange = (newSort: SortOption) => {
		setSortBy(newSort)
		const newParams = new URLSearchParams(window.location.search)
		newParams.set('sort', newSort)
		router.replace(`?${newParams.toString()}`)
	}

	const handlePageChange = (page: number) => {
		setCurrentPage(Math.max(0, Math.min(page, totalPages - 1)))
	}

	// --- 6. Breadcrumbs ---
	const breadcrumbs = [
		{ label: 'Главная', href: '/' },
		{ label: 'Каталог', href: '/catalog' }
	]

	// --- 7. Mobile UI ---
	useEffect(() => {
		const bodyStyle = document.body.style
		if (mobileFilterOpen && window.innerWidth <= 767) {
			bodyStyle.overflow = 'hidden'
			bodyStyle.position = 'fixed'
			bodyStyle.width = '100%'
		} else {
			bodyStyle.overflow = ''
			bodyStyle.position = ''
			bodyStyle.width = ''
		}

		return () => {
			bodyStyle.overflow = ''
			bodyStyle.position = ''
			bodyStyle.width = ''
		}
	}, [mobileFilterOpen])

	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && mobileFilterOpen) {
				setMobileFilterOpen(false)
			}
		}
		document.addEventListener('keydown', handleEsc)
		return () => document.removeEventListener('keydown', handleEsc)
	}, [mobileFilterOpen])

	const openMobileFilters = () => setMobileFilterOpen(true)

	if (isLoading) {
		return (
			<div className='bg-white min-h-screen flex items-center justify-center'>
				<div className='text-black'>Загрузка товаров...</div>
			</div>
		)
	}

	return (
		<div className='bg-white min-h-screen px-4 md:px-6'>
			<Breadcrumbs items={breadcrumbs} />

			<div className='flex flex-col md:flex-row justify-center items-start gap-6 mt-10'>
				{/* Левая панель: фильтры */}
				<div className='w-full md:w-[320px] flex-shrink-0 md:mb-20'>
					<h2 className='text-[24px] text-black font-bold'>
						Фильтры
					</h2>
					<div className='border-b-4 border-[#FF7A00] w-12 my-4'></div>

					<div className='hidden md:block'>
						<Filter
							item={dynamicFilters}
							onApplyFilters={handleApplyFilters}
							onResetFilters={handleResetFilters}
							initialFilters={appliedFilters}
						/>
					</div>
				</div>

				{/* Правая панель: товары */}
				<div className='flex-1 w-full max-w-[930px] 2xl:max-w-[1200px] mb-20'>
					{/* Заголовок и мобильные элементы */}
					<div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4'>
						<h1 className='text-[28px] text-black font-bold'>
							Все товары
						</h1>

						<div className='flex gap-3 w-full md:w-auto'>
							<button
								onClick={openMobileFilters}
								className='md:hidden w-full py-2 border border-gray-300 rounded-lg text-sm font-medium text-black'
							>
								Фильтры
							</button>
							<div className='w-full md:w-auto'>
								<SortDropdown
									value={sortBy}
									onChange={handleSortChange}
								/>
							</div>
						</div>
					</div>

					{/* Список товаров */}
					{visibleProducts.length > 0 ? (
						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 justify-items-center sm:justify-items-stretch'>
							{visibleProducts.map((product: IProduct) => (
								<ProductCard
									key={product.id}
									product={product}
								/>
							))}
						</div>
					) : (
						<div className='text-center text-gray-500 py-12'>
							Нет товаров, соответствующих выбранным фильтрам
						</div>
					)}

					{/* Пагинация */}
					{totalPages > 1 && (
						<div className='flex justify-center items-center gap-3 mt-8'>
							<button
								onClick={() => handlePageChange(0)}
								disabled={currentPage === 0}
								className='px-3 py-1 disabled:opacity-40 text-black'
							>
								«
							</button>
							{Array.from({ length: totalPages }).map((_, i) => (
								<button
									key={i}
									onClick={() => handlePageChange(i)}
									className={`w-10 h-10 rounded border ${
										i === currentPage
											? 'bg-[#FF7A00] text-white border-[#FF7A00]'
											: 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
									}`}
								>
									{i + 1}
								</button>
							))}
							<button
								onClick={() => handlePageChange(totalPages - 1)}
								disabled={currentPage === totalPages - 1}
								className='px-3 py-1 disabled:opacity-40 text-black'
							>
								»
							</button>
						</div>
					)}
				</div>
			</div>

			{/* Мобильные фильтры */}
			{mobileFilterOpen && (
				<div className='fixed inset-0 z-50 bg-white overflow-y-auto md:hidden'>
					<div className='p-6'>
						<div className='flex justify-between items-center mb-6'>
							<h2 className='text-lg font-bold text-black'>Фильтры</h2>
							<button
								onClick={() => setMobileFilterOpen(false)}
								className='text-2xl text-gray-500'
							>
								&times;
							</button>
						</div>
						<Filter
							item={dynamicFilters}
							onApplyFilters={handleApplyFilters}
							onResetFilters={handleResetFilters}
							initialFilters={appliedFilters}
						/>
					</div>
				</div>
			)}
		</div>
	)
}
