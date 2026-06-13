'use client'
import { useMemo, useState } from 'react'

import { reviews } from '../../data/reviewCard'
import type { ReviewCardDTO } from '../../shared/types/ReviewCardDTO.interface'
import ReviewCard from '../ReviewCard/ReviewCard'

type ReviewFilter = 'all' | 'private' | 'dealer'

const ITEMS_PER_PAGE = 8

export default function Reviews() {
	const [activeFilter, setActiveFilter] = useState<ReviewFilter>('all')
	const [currentPage, setCurrentPage] = useState(1)

	const filteredReviews = useMemo(() => {
		if (activeFilter === 'all') return reviews
		return reviews.filter(review => review.type === activeFilter)
	}, [activeFilter])

	const totalPages = Math.max(
		1,
		Math.ceil(filteredReviews.length / ITEMS_PER_PAGE)
	)

	const currentItems = useMemo(() => {
		const start = (currentPage - 1) * ITEMS_PER_PAGE
		const end = start + ITEMS_PER_PAGE
		return filteredReviews.slice(start, end)
	}, [filteredReviews, currentPage])

	const handleFilterChange = (filter: ReviewFilter) => {
		setActiveFilter(filter)
		setCurrentPage(1)
	}

	const handlePageChange = (page: number) => {
		if (page < 1 || page > totalPages) return
		setCurrentPage(page)
	}

	const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

	return (
		<section className='w-full min-h-screen bg-white py-10 md:py-14 lg:py-16'>
			<div className='mx-auto max-w-[1400px] px-4 md:px-25 2xl:px-0'>
				{/* Заголовок и фильтры */}
				<div className='flex justify-center'>
					<div className='mb-8 w-[331px] md:w-full flex flex-col items-start text-left gap-4 md:flex-row md:items-center md:justify-between md:text-left'>
						<div className='flex flex-col items-start'>
							<h1 className='text-black text-[32px] md:text-[36px] font-bold tracking-tight'>
								ОТЗЫВЫ
							</h1>
							<div className='w-[72px] h-[6px] bg-[#F0882B] rounded-md md:ml-0 mt-2'></div>
						</div>
						<div className='inline-flex items-center gap-2 rounded-[10px] bg-[#FFF] p-1'>
							<button
								type='button'
								onClick={() => handleFilterChange('all')}
								className={`h-[40px] rounded-[8px] px-4 text-sm font-semibold transition border border-[#DBDBDB] ${
									activeFilter === 'all'
										? 'bg-[#F0882B] text-white shadow-sm'
										: 'bg-white text-[#2E2E2E] hover:bg-[#FFF4EB]'
								}`}
							>
								Все
							</button>

							<button
								type='button'
								onClick={() => handleFilterChange('private')}
								className={`h-[40px] rounded-[8px] px-4 text-sm font-semibold transition border border-[#DBDBDB] ${
									activeFilter === 'private'
										? 'bg-[#F0882B] text-white shadow-sm'
										: 'bg-white text-[#2E2E2E] hover:bg-[#FFF4EB]'
								}`}
							>
								Частные клиенты
							</button>

							<button
								type='button'
								onClick={() => handleFilterChange('dealer')}
								className={`h-[40px] rounded-[8px] px-4 text-sm font-semibold transition border border-[#DBDBDB] ${
									activeFilter === 'dealer'
										? 'bg-[#F0882B] text-white shadow-sm'
										: 'bg-white text-[#2E2E2E] hover:bg-[#FFF4EB]'
								}`}
							>
								Дилеры
							</button>
						</div>
					</div>
				</div>
				<div className='w-[331px] md:w-full mx-auto h-px bg-[#E0E0E0] mb-8'></div>

				{/* Сетка карточек: 4×2, 2×4, 1×8 */}
				<div className='grid grid-cols-1 gap-5 place-items-center md:place-items-center md:grid-cols-2 lg:grid-cols-4 md:gap-6'>
					{currentItems.map((review: ReviewCardDTO) => (
						<div
							key={review.id}
							className='bg-white rounded-[12px]'
						>
							<ReviewCard review={review} />
						</div>
					))}
				</div>

				{/* Пагинация */}
				{totalPages > 1 && (
					<div className='mt-10 flex items-center justify-center gap-2'>
						<button
							type='button'
							onClick={() => handlePageChange(currentPage - 1)}
							disabled={currentPage === 1}
							className={`flex h-9 w-9 items-center justify-center rounded-[8px] text-2xl transition ${
								currentPage === 1
									? 'text-[#BDBDBD] cursor-default'
									: 'text-[#4F4F4F] hover:bg-[#F5F5F5]'
							}`}
						>
							«
						</button>

						{pageNumbers.map(page => (
							<button
								key={page}
								type='button'
								onClick={() => handlePageChange(page)}
								className={`flex h-9 min-w-9 items-center justify-center rounded-[8px] border text-sm font-medium transition ${
									page === currentPage
										? 'border-[#F0882B] bg-[#F0882B] text-white shadow-sm'
										: 'border-[#E0E0E0] bg-white text-[#4F4F4F] hover:bg-[#F5F5F5]'
								}`}
							>
								{page}
							</button>
						))}

						<button
							type='button'
							onClick={() => handlePageChange(currentPage + 1)}
							disabled={currentPage === totalPages}
							className={`flex h-9 w-9 items-center justify-center rounded-[8px] text-2xl transition ${
								currentPage === totalPages
									? 'text-[#BDBDBD] cursor-default'
									: 'text-[#4F4F4F] hover:bg-[#F5F5F5]'
							}`}
						>
							»
						</button>
					</div>
				)}
			</div>
		</section>
	)
}
