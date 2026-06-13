'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ImageSliderProps {
	images: { url: string; alt: string }[];
}

export const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
	const [activeIndex, setActiveIndex] = useState(0);

	return (
		<div className="flex flex-col gap-4">
			{/* Главное изображение */}
			<div className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden">
				<Image
					src={images[activeIndex].url}
					alt={images[activeIndex].alt}
					fill
					className="object-cover"
					priority
				/>
			</div>

			{/* Миниатюры */}
			<div className="flex gap-3 overflow-x-auto">
				{images.map((image, index) => (
					<button
						key={index}
						onClick={() => setActiveIndex(index)}
						className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden transition ${
							index === activeIndex
								? 'ring-2 ring-orange-500'
								: 'ring-1 ring-gray-300 hover:ring-gray-400'
						}`}
					>
						<Image
							src={image.url}
							alt={image.alt}
							fill
							className="object-cover"
						/>
					</button>
				))}
			</div>
		</div>
	);
};
