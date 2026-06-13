'use client'

import { useState, useEffect } from 'react'
import { ISeoSettings } from '@/services/seo.service'

interface MetaTagsFormProps {
	pageKey: string
	initialData?: ISeoSettings
	onSave: (data: Partial<ISeoSettings>) => void
	onCancel: () => void
	isLoading?: boolean
}

export const MetaTagsForm = ({ pageKey, initialData, onSave, onCancel, isLoading }: MetaTagsFormProps) => {
	const [formData, setFormData] = useState({
		title: initialData?.title || '',
		description: initialData?.description || '',
		keywords: initialData?.keywords || '',
		ogTitle: initialData?.ogTitle || '',
		ogDescription: initialData?.ogDescription || '',
		ogImage: initialData?.ogImage || '',
		robots: initialData?.robots || '',
		canonical: initialData?.canonical || '',
	})

	useEffect(() => {
		if (initialData) {
			setFormData({
				title: initialData.title || '',
				description: initialData.description || '',
				keywords: initialData.keywords || '',
				ogTitle: initialData.ogTitle || '',
				ogDescription: initialData.ogDescription || '',
				ogImage: initialData.ogImage || '',
				robots: initialData.robots || '',
				canonical: initialData.canonical || '',
			})
		}
	}, [initialData])

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		onSave({
			pageKey,
			...formData,
		})
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFormData(prev => ({
			...prev,
			[e.target.name]: e.target.value,
		}))
	}

	return (
		<form onSubmit={handleSubmit} className="mt-4 space-y-4">
			<div>
				<label className="block text-sm font-medium text-black mb-1">
					Title
				</label>
				<input
					type="text"
					name="title"
					value={formData.title}
					onChange={handleChange}
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-600"
					placeholder="Заголовок страницы для поисковых систем"
				/>
			</div>

			<div>
				<label className="block text-sm font-medium text-black mb-1">
					Description
				</label>
				<textarea
					name="description"
					value={formData.description}
					onChange={handleChange}
					rows={3}
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-600"
					placeholder="Описание страницы для поисковых систем (150-160 символов)"
				/>
			</div>

			<div>
				<label className="block text-sm font-medium text-black mb-1">
					Keywords
				</label>
				<input
					type="text"
					name="keywords"
					value={formData.keywords}
					onChange={handleChange}
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-600"
					placeholder="Ключевые слова через запятую"
				/>
			</div>

			<div className="border-t pt-4">
				<h4 className="font-semibold mb-3 text-black">Open Graph (для социальных сетей)</h4>

				<div className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-black mb-1">
							OG Title
						</label>
						<input
							type="text"
							name="ogTitle"
							value={formData.ogTitle}
							onChange={handleChange}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-600"
							placeholder="Заголовок для социальных сетей"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-black mb-1">
							OG Description
						</label>
						<textarea
							name="ogDescription"
							value={formData.ogDescription}
							onChange={handleChange}
							rows={2}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-600"
							placeholder="Описание для социальных сетей"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-black mb-1">
							OG Image URL
						</label>
						<input
							type="text"
							name="ogImage"
							value={formData.ogImage}
							onChange={handleChange}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-600"
							placeholder="https://example.com/image.jpg"
						/>
					</div>
				</div>
			</div>

			<div className="border-t pt-4">
				<h4 className="font-semibold mb-3 text-black">Дополнительные настройки</h4>

				<div className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-black mb-1">
							Robots
						</label>
						<input
							type="text"
							name="robots"
							value={formData.robots}
							onChange={handleChange}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-600"
							placeholder="index, follow"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-black mb-1">
							Canonical URL
						</label>
						<input
							type="text"
							name="canonical"
							value={formData.canonical}
							onChange={handleChange}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-600"
							placeholder="https://example.com/page"
						/>
					</div>
				</div>
			</div>

			<div className="flex gap-3 pt-4">
				<button
					type="submit"
					disabled={isLoading}
					className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
				>
					{isLoading ? 'Сохранение...' : 'Сохранить'}
				</button>
				<button
					type="button"
					onClick={onCancel}
					className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
				>
					Отмена
				</button>
			</div>
		</form>
	)
}
