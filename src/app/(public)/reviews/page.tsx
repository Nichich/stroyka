'use client'

import React from 'react'
import { Breadcrumbs } from '@/components/BusketPage/Breadcrumbs'
import Reviews from "@/components/Reviews/Reviews";

export default function ReviewsPage() {
	const breadcrumbs = [
		{ label: 'Главная', href: '/' },
		{ label: 'Отзывы', href: '/reviews' }
	]

	return (
		<div className="min-h-screen bg-white">
			<Breadcrumbs items={breadcrumbs} />
			<Reviews />
		</div>
	)
}