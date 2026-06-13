'use client'

import { CheckboxItem } from '@/components/CatalogPage/CheckBox'
import { ColorCheckbox } from '@/components/CatalogPage/ColorCheckBox'
import PriceSlider from '@/components/CatalogPage/PriseSlider'
import { IFilter } from '@/shared/Catalog/Filter.interface'
import React, { useEffect, useMemo, useState } from 'react'

// --- Обновлённый тип ---
export interface FilterState {
	available: string[]
	color: string[]
	height: number[] // ← число!
	priceRange: [number, number]
}

interface Props {
	item: IFilter
	onApplyFilters?: (filters: FilterState) => void
	onResetFilters?: () => void
	autoApply?: boolean
	initialFilters?: FilterState
}

export const Filter: React.FC<Props> = ({
	item,
	onApplyFilters,
	onResetFilters,
	autoApply = false,
	initialFilters
}) => {
	const availableValues = useMemo(
		() => item.available.map(s => s.availables!).filter(Boolean),
		[item.available]
	)
	const colorItems = useMemo(
		() => item.color.filter(c => c.colors && c.colors.trim() && c.index),
		[item.color]
	)
	// Убрали shape, appointment — если не нужны
	const heightValues = useMemo(
		() =>
			item.height
				.map(s => Number(s.heights!)) // ← парсим сразу в число
				.filter(n => !isNaN(n)),
		[item.height]
	)

	const defaultFilters: FilterState = {
		available: [],
		color: [],
		height: [],
		priceRange: [0, 1_500_000]
	}

	const [tempFilters, setTempFilters] = useState<FilterState>(
		initialFilters || defaultFilters
	)

	useEffect(() => {
		if (initialFilters) {
			setTempFilters(initialFilters)
		}
	}, [initialFilters])

	const [showAllColors, setShowAllColors] = useState(false)
	const [showAllHeights, setShowAllHeights] = useState(false)

	const visibleColorItems = showAllColors
		? colorItems
		: colorItems.slice(0, 5)
	const visibleHeights = showAllHeights
		? heightValues
		: heightValues.slice(0, 4)

	// Автоприменение
	useEffect(() => {
		if (!autoApply) return
		onApplyFilters?.(tempFilters)
	}, [tempFilters, autoApply, onApplyFilters])

	// --- Обновлённый toggleFilter ---
	const toggleFilter = (
		key: keyof Omit<FilterState, 'priceRange'>,
		val: string | number,
		checked?: boolean
	) => {
		setTempFilters(prev => {
			const arr = prev[key] as (string | number)[]
			const shouldInclude =
				checked !== undefined ? checked : !arr.includes(val)
			let next: (string | number)[]
			if (shouldInclude) {
				next = arr.includes(val) ? arr : [...arr, val]
			} else {
				next = arr.filter(v => v !== val)
			}
			return { ...prev, [key]: next }
		})
	}

	const handlePriceChange = (v: [number, number]) => {
		setTempFilters(prev => ({ ...prev, priceRange: v }))
	}

	const handleApply = () => {
		onApplyFilters?.({
			available: [...tempFilters.available],
			color: [...tempFilters.color],
			height: [...tempFilters.height], // ← number[]
			priceRange: [...tempFilters.priceRange] as [number, number]
		})
	}

	const handleReset = () => {
		const empty: FilterState = {
			available: [],
			color: [],
			height: [],
			priceRange: [0, 1_500_000]
		}
		setTempFilters(empty)
		onResetFilters?.()
	}

	return (
		<div className='flex flex-col gap-8 w-full md:w-[320px] border border-gray-200 rounded-lg px-6 py-6'>
			{/* НАЛИЧИЕ */}
			<div className='flex flex-col gap-3'>
				<p className='font-semibold text-[16px] text-[#1F2937]'>
					НАЛИЧИЕ
				</p>
				{availableValues.map(val => (
					<CheckboxItem
						key={val}
						id={`available-${val}`}
						label={val}
						checked={tempFilters.available.includes(val)}
						onChange={checked =>
							toggleFilter('available', val, checked)
						}
					/>
				))}
			</div>

			<div className='border-1 border-gray-200 w-full'></div>

			{/* ЦЕНА */}
			<div className='flex flex-col gap-3'>
				<p className='font-semibold text-[16px] text-[#1F2937]'>ЦЕНА</p>
				<PriceSlider
					initial={tempFilters.priceRange}
					onChange={handlePriceChange}
				/>
			</div>

			<div className='border-1 border-gray-200 w-full'></div>

			{/* ЦВЕТ */}
			<div className='flex flex-col gap-3'>
				<p className='font-semibold text-[16px] text-[#1F2937]'>ЦВЕТ</p>
				{visibleColorItems.map(c => (
					<ColorCheckbox
						key={c.index}
						id={`color-${c.index}`}
						label={c.colors!}
						colorHex={c.index!}
						checked={tempFilters.color.includes(c.colors!)}
						onChange={checked =>
							toggleFilter('color', c.colors!, checked)
						}
					/>
				))}
				{colorItems.length > 5 && (
					<button
						type='button'
						onClick={() => setShowAllColors(s => !s)}
						className='self-start text-[14px] text-[#1F2937]'
					>
						{showAllColors ? 'Скрыть' : 'Показать все'}
					</button>
				)}
			</div>

			<div className='border-1 border-gray-200 w-full'></div>

			{/* ВЫСОТА */}
			<div className='flex flex-col gap-3'>
				<p className='font-semibold text-[16px] text-[#1F2937]'>
					ВЫСОТА
				</p>
				{visibleHeights.map(val => (
					<CheckboxItem
						key={val}
						id={`height-${val}`}
						label={`${val} мм`}
						checked={tempFilters.height.includes(val)}
						onChange={checked =>
							toggleFilter('height', val, checked)
						}
					/>
				))}
				{heightValues.length > 4 && (
					<button
						type='button'
						onClick={() => setShowAllHeights(s => !s)}
						className='self-start text-[14px] text-[#1F2937]'
					>
						{showAllHeights ? 'Скрыть' : 'Показать все'}
					</button>
				)}
			</div>

			<div className='border-1 border-gray-200 w-full'></div>

			{/* КНОПКИ */}
			<div className='flex gap-3'>
				<button
					type='button'
					onClick={handleReset}
					className='flex-1 py-3 border border-gray-300 rounded-lg text-[14px] text-black font-medium hover:bg-gray-50'
				>
					Сбросить
				</button>
				<button
					type='button'
					onClick={handleApply}
					className='flex-1 py-3 rounded-lg bg-[#FF7A00] text-white text-[14px] font-medium hover:bg-[#e46e00]'
				>
					Применить
				</button>
			</div>
		</div>
	)
}
