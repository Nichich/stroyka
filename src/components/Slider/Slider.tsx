'use client'

import { ProductCard } from '@/components/ProductCard/ProductCard'
import ReviewCard from '@/components/ReviewCard/ReviewCard'
import { reviews } from '@/data/reviewCard'
import { ReviewCardDTO } from '@/shared/types/ReviewCardDTO.interface'
import { ISlider } from '@/shared/types/Slider.interface'
import { IProduct } from '@/shared/types/product.interface'
import { productService } from '@/services/product.service'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'

interface Props {
	slider: ISlider
}

function getCardsPerPage(): number {
	if (typeof window !== 'undefined') {
		if (window.innerWidth < 640) return 1
		if (window.innerWidth < 1024) return 2
	}
	return 4
}

const Slider: React.FC<Props> = ({ slider }) => {
	const [currentPage, setCurrentPage] = useState(0)
	const [cardsPerPage, setCardsPerPage] = useState(4)

	const { data: products = [], isLoading } = useQuery({
		queryKey: ['products-all'],
		queryFn: () => productService.getAllProducts()
	})

	const filteredProducts = useMemo(() => {
		return products.filter((p: IProduct) => !p.isHidden)
	}, [products])

	useEffect(() => {
		setCardsPerPage(getCardsPerPage())

		const onResize = () => setCardsPerPage(getCardsPerPage())
		window.addEventListener('resize', onResize)
		return () => window.removeEventListener('resize', onResize)
	}, [])

	const cardKind = slider.cards ?? 'product'
	const items = cardKind === 'product' ? filteredProducts : reviews.slice(0, 9)
	const totalPages = Math.ceil(items.length / cardsPerPage)
	const currentItems = items.slice(
		currentPage * cardsPerPage,
		(currentPage + 1) * cardsPerPage
	)

	if (isLoading && cardKind === 'product') {
		return (
			<div className='bg-[#FAFAFA] py-20 w-full flex items-center justify-center'>
				<div className='text-gray-600'>Загрузка...</div>
			</div>
		)
	}

	return (
		<div className='bg-[#FAFAFA] py-20 w-full'>
			<div className='flex flex-col md:flex-row items-center justify-center mb-10 w-full px-6  gap-4 md:gap-0'>
				<p className='font-bold text-black text-center md:text-left text-2xl md:text-[40px] max-w-full md:max-w-[40%]'>
					<span>{slider.firstTitle}</span>
					<span className='text-orange-400'>
						{slider.orangeTitle}
					</span>
					<span>{slider.endTitle}</span>
				</p>
				<div className='hidden md:flex items-center flex-1 max-w-[500px] ml-8'>
					<div className='flex-1 bg-[#DBDBDB] h-[1px]'></div>
					<Link href={slider.btnLink}>
						<button className='border-2 border-[#DBDBDB] rounded-lg py-2 px-4 text-black whitespace-nowrap hover:bg-gray-100 transition shrink-0'>
							{slider.btnTitle}
						</button>
					</Link>
				</div>
			</div>
			<div className='flex flex-col lg:flex-row items-center lg:items-start w-full lg:max-w-[1400px] mx-auto'>
				<div className='flex flex-col items-center w-full mx-auto'>
					<div
						className={`grid w-full gap-4 mb-8 px-2 max-w-6xl justify-items-center place-items-center ${
							cardsPerPage === 1
								? 'grid-cols-1'
								: cardsPerPage === 2
								? 'grid-cols-2'
								: 'grid-cols-4'
						}`}
					>
						{slider.cards === 'product'
							? (currentItems as IProduct[]).map(
									product => (
										<ProductCard
											key={product.id}
											product={product}
										/>
									)
							  )
							: (currentItems as ReviewCardDTO[]).map(review => (
									<ReviewCard
										key={review.id}
										review={review}
									/>
							  ))}
					</div>
					<div className='flex flex-col md:flex-row items-center justify-between mt-2 w-full max-w-6xl px-2'>
						<div className='flex w-full items-center justify-between md:justify-start lg:justify-center'>
							<div className='flex gap-[clamp(4px,2.5vw,8px)] md:gap-2 mb-2 xs:mb-0 justify-start w-full flex-1 min-w-0 pr-2'>
								{Array.from({ length: totalPages }).map(
									(_, idx) => (
										<button
											key={idx}
											onClick={() => setCurrentPage(idx)}
											className={`h-[6px] md:h-2 w-[clamp(12px,6vw,24px)] md:w-6 rounded-full transition-all ${
												idx === currentPage
													? 'bg-orange-500'
													: 'bg-gray-300 hover:bg-gray-400'
											}`}
											aria-label={`Страница ${idx + 1}`}
										/>
									)
								)}
							</div>
							<button
								onClick={() =>
									setCurrentPage(
										prev => (prev + 1) % totalPages
									)
								}
								className='flex items-center justify-center w-10 h-10 bg-[#F3F3F3] rounded-4xl text-gray-400 hover:text-gray-600 transition md:ml-4 shrink-0'
								aria-label='Следующая страница'
							>
								<Image
									src={'/arrow-right.svg'}
									alt={'стрелка'}
									width={24}
									height={24}
									className='mx-0.5'
								/>
							</button>
						</div>

						<Link
							href={slider.btnLink}
							className='md:hidden mt-4 md:mt-0 mr-[clamp(16px,5vw,60px)]'
						>
							<button className='w-full border-2 border-[#DBDBDB] rounded-lg py-2 px-4 text-black whitespace-nowrap hover:bg-gray-100 transition'>
								{slider.btnTitle}
							</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Slider
