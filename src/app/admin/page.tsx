'use client'

import DashBoardPage from '@/components/Admin/DashBoard'
import { useGetCategories } from '@/hooks/categories/useGetCategories'
import { useMemo } from 'react'

export default function MainAdminPage() {
	const { categories, isLoading } = useGetCategories()

	const adaptedCategories = useMemo(() => {
		if (!categories) return []
		return categories.map(cat => ({
			id: cat.id,
			name: cat.title,
			count: cat.products?.length || 0
		}))
	}, [categories])

	if (isLoading) {
		return (
			<div className='text-black p-[40px]'>
				<div className='text-center'>Загрузка...</div>
			</div>
		)
	}

	return (
		<>
			<DashBoardPage product={adaptedCategories} />
		</>
	)
}
