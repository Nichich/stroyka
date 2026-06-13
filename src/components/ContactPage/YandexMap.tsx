'use client'

import React from 'react'

export const YandexMap: React.FC = () => {
	return (
		<div
			className="w-full h-[400px] md:h-[600px] rounded-lg overflow-hidden border border-gray-200"
			style={{ minHeight: '400px' }}
		>
			<iframe
				src="https://yandex.ru/map-widget/v1/?um=constructor%3Aa52a39f632b8e3bea035429dc90d201963ddc1cece9007fbda26478ae8cf7806&source=constructor"
				width="100%"
				height="100%"
				frameBorder="0"
				style={{ border: 0 }}
			/>
        </div>
	)
}
