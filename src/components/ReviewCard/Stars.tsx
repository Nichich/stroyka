import Image from 'next/image'
import React from 'react'

interface StarsProps {
	rating: number
	max?: number
}

const Stars: React.FC<StarsProps> = ({ rating, max = 5 }) => (
	<div className="flex">
		{[...Array(max)].map((_, i) => (
			<Image
				key={i}
				src={i < rating ? '/star-1.svg' : '/star-2.svg'}
				alt={i < rating ? 'Заполненная звезда' : 'Пустая звезда'}
				width={24}
				height={24}
				className="mx-0.5"
			/>
		))}
	</div>
)

export default Stars
