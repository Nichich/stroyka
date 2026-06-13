'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ICertificate } from '@/shared/types/Certificate.interface'

interface CertificateAccordionProps {
	certificate: ICertificate
}

const isPdfFile = (url: string): boolean => {
	return url.toLowerCase().endsWith('.pdf')
}

const isImageFile = (url: string): boolean => {
	const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']
	return imageExtensions.some(ext => url.toLowerCase().endsWith(ext))
}

export const CertificateAccordion: React.FC<CertificateAccordionProps> = ({ certificate }) => {
	const [isOpen, setIsOpen] = useState(false)
	const isPdf = isPdfFile(certificate.fileUrl)
	const isImage = isImageFile(certificate.fileUrl)

	return (
		<div className="border border-gray-300 rounded-lg mb-4 overflow-hidden">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="w-full flex items-center justify-between py-4 px-4 md:px-6 text-left hover:bg-gray-50 transition-colors"
				aria-expanded={isOpen}
				aria-controls={`certificate-${certificate.id}`}
			>
				<span className="text-lg md:text-xl font-semibold text-black">
					{certificate.title}
				</span>
				<svg
					className={`w-6 h-6 text-gray-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					aria-hidden="true"
				>
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
				</svg>
			</button>
			
			{isOpen && (
				<div
					id={`certificate-${certificate.id}`}
					className="pb-6 pt-4 px-4 md:px-6 border-t border-gray-200"
				>
					<div className="relative w-full bg-gray-100 rounded-lg overflow-hidden">
						{isPdf ? (
							<iframe
								src={certificate.fileUrl}
								className="w-full h-[600px] md:h-[800px] border-0"
								title={certificate.title}
							/>
						) : isImage ? (
							<div className="relative w-full flex justify-center items-center bg-gray-100">
								<Image
									src={certificate.fileUrl}
									alt={certificate.title}
									width={1200}
									height={1600}
									className="w-full h-auto object-contain"
									unoptimized
								/>
							</div>
						) : (
							<div className="w-full h-[400px] flex items-center justify-center">
								<p className="text-gray-600">Формат файла не поддерживается для просмотра</p>
							</div>
						)}
					</div>
					<div className="mt-4 flex justify-center">
						<a
							href={certificate.fileUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 px-6 py-3 bg-[#F0882B] text-white rounded-[10px] font-semibold hover:brightness-95 transition"
						>
							<svg
								className="w-5 h-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
							</svg>
							Открыть в новой вкладке
						</a>
					</div>
				</div>
			)}
		</div>
	)
}

