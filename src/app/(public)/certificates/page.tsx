'use client'

import React from 'react'
import { Breadcrumbs } from '@/components/BusketPage/Breadcrumbs'
import { CertificateAccordion } from '@/components/Certificates/CertificateAccordion'
import { certificates } from '@/data/certificates'

export default function CertificatesPage() {
	const breadcrumbs = [
		{ label: 'Главная', href: '/' },
		{ label: 'Сертификаты', href: '/certificates' }
	]

	return (
		<div className="min-h-screen bg-white">
			<Breadcrumbs items={breadcrumbs} />
			
			<div className="container mx-auto px-4 md:px-6 py-8 pb-20 max-w-[1400px]">
				<div className="mb-8">
					<h1 className="text-3xl md:text-4xl text-black font-bold mb-2">
						СЕРТИФИКАТЫ
					</h1>
					<div className="border-b-4 border-[#FF7A00] w-12 mb-4"></div>
					<div className="border-b border-gray-300"></div>
				</div>

				<div className="max-w-4xl">
					{certificates.length > 0 ? (
						certificates.map((certificate) => (
							<CertificateAccordion
								key={certificate.id}
								certificate={certificate}
							/>
						))
					) : (
						<p className="text-gray-600 text-center py-12">
							Сертификаты будут добавлены в ближайшее время
						</p>
					)}
				</div>
			</div>
		</div>
	)
}

