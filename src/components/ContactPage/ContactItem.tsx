import Image from 'next/image'
import React from 'react'

interface ContactItemProps {
	iconSrc: string
	label: string
	value: string
}

export const ContactItem: React.FC<ContactItemProps> = ({ iconSrc, label, value }) => {
	return (
		<div className="flex items-start gap-4 mb-6">
			{/* Иконка в оранжевом кружке */}
			<div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FFF4E6] flex items-center justify-center">
				<Image
					src={iconSrc}
					alt={label}
					width={24}
					height={24}
					className="w-6 h-6"
				/>
			</div>
			
			{/* Текстовая информация */}
			<div className="flex flex-col">
				<span className="text-sm font-semibold text-gray-700 mb-1">{label}</span>
				<span className="text-base text-gray-900">{value}</span>
			</div>
		</div>
	)
}

