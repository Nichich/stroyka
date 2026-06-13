'use client'

import React from 'react'
import { Filter, FilterState } from '@/components/CatalogPage/Filter'

interface MobileFilterModalProps {
	isOpen: boolean
	onClose: () => void
	filters: any
	onApplyFilters: (filters: FilterState) => void
	onResetFilters: () => void
}

export default function MobileFilterModal({
											  isOpen,
											  onClose,
											  filters,
											  onApplyFilters,
											  onResetFilters,
										  }: MobileFilterModalProps) {
	if (!isOpen) return null

	return (
		<div
			className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-center justify-center"
			onClick={onClose}
		>
			<div
				className="bg-white rounded-lg w-[90%] max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Header */}
				<div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
					<h2 className="text-xl font-bold text-black">ФИЛЬТРЫ</h2>
					<button
						onClick={onClose}
						className="p-2 hover:bg-gray-100 rounded-full transition"
						type="button"
						aria-label="Закрыть фильтры"
					>
						<svg
							className="w-6 h-6"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<line x1="18" y1="6" x2="6" y2="18" />
							<line x1="6" y1="6" x2="18" y2="18" />
						</svg>
					</button>
				</div>

				{/* Body - скроллируемая область */}
				<div className="flex-1 overflow-y-auto px-6 py-4">
					<div className="border-t pt-4">
						<Filter
							item={filters}
							onApplyFilters={onApplyFilters}
							onResetFilters={onResetFilters}
						/>
					</div>
				</div>

				{/* Footer с кнопками */}
				<div className="flex gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
					<button
						onClick={onResetFilters}
						className="flex-1 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-100 transition"
						type="button"
					>
						Сбросить
					</button>
					<button
						onClick={onClose}
						className="flex-1 py-3 bg-[#FF7A00] text-white rounded-lg font-semibold hover:bg-[#E56E00] transition"
						type="button"
					>
						Применить
					</button>
				</div>
			</div>
		</div>
	)
}
