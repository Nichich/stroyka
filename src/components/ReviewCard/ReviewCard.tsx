import Stars from '@/components/ReviewCard/Stars'
import { ReviewCardDTO } from '@/shared/types/ReviewCardDTO.interface'
import React from 'react'

interface Props {
	review: ReviewCardDTO
}

const ReviewCard: React.FC<Props> = ({ review }) => (
	<div className='max-w-72 h-[344] bg-trasparent rounded-xl p-4 transition-shadow hover:shadow-lg border border-[#DBDBDB]'>
		<div className='mb-6 text-black'>
			<Stars rating={review.rating}></Stars>
		</div>
		<div className='mb-6'>
			<h3 className='text-base font-bold text-black mb-1'>
				{review.author}
			</h3>
			<h3 className='text-base font-bold text-black mb-1'>
				{review.city}
			</h3>
		</div>
		<h3 className='text-base font-medium text-black mb-1'>{review.text}</h3>
	</div>
)

export default ReviewCard
