'use client'

import { useState, useEffect } from 'react'
import { useGetSitemapSettings, useUpdateSitemapSettings } from '@/hooks/seo/useSitemapSettings'
import { ISitemapSettings } from '@/services/seo.service'

export const SitemapSettings = () => {
	const { data: settings, isLoading } = useGetSitemapSettings()
	const updateMutation = useUpdateSitemapSettings()

	const [formData, setFormData] = useState({
		baseUrl: '',
		includeProducts: true,
		includeCategories: true,
		excludedUrls: [] as string[],
	})

	const [newExcludedUrl, setNewExcludedUrl] = useState('')

	useEffect(() => {
		if (settings) {
			setFormData({
				baseUrl: settings.baseUrl || '',
				includeProducts: settings.includeProducts ?? true,
				includeCategories: settings.includeCategories ?? true,
				excludedUrls: settings.excludedUrls || [],
			})
		}
	}, [settings])

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (settings?.id) {
			updateMutation.mutate({
				id: settings.id,
				settings: formData,
			})
		}
	}

	const handleAddExcludedUrl = () => {
		if (newExcludedUrl.trim()) {
			setFormData(prev => ({
				...prev,
				excludedUrls: [...prev.excludedUrls, newExcludedUrl.trim()],
			}))
			setNewExcludedUrl('')
		}
	}

	const handleRemoveExcludedUrl = (index: number) => {
		setFormData(prev => ({
			...prev,
			excludedUrls: prev.excludedUrls.filter((_, i) => i !== index),
		}))
	}

	if (isLoading) {
		return <div className="text-center py-8">Загрузка...</div>
	}

	return (
		<div>
			<h2 className="text-2xl font-bold mb-4 text-black">Настройки Sitemap</h2>
			<p className="text-black mb-6">
				Настройте параметры генерации sitemap.xml для вашего сайта
			</p>

			<form onSubmit={handleSubmit} className="space-y-6">
				<div>
					<label className="block text-sm font-medium text-black mb-1">
						Базовый URL сайта
					</label>
					<input
						type="url"
						value={formData.baseUrl}
						onChange={e => setFormData(prev => ({ ...prev, baseUrl: e.target.value }))}
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-700 text-black"
						placeholder="https://dobrostroi25.ru"
						required
					/>
					<p className="text-xs text-gray-500 mt-1">
						Основной URL вашего сайта (используется для всех ссылок в sitemap)
					</p>
				</div>

				<div className="space-y-3">
					<h3 className="font-semibold text-black">Включить в sitemap</h3>

					<div className="flex items-center">
						<input
							type="checkbox"
							id="includeProducts"
							checked={formData.includeProducts}
							onChange={e =>
								setFormData(prev => ({ ...prev, includeProducts: e.target.checked }))
							}
							className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
						/>
						<label htmlFor="includeProducts" className="ml-2 text-sm text-black">
							Товары
						</label>
					</div>

					<div className="flex items-center">
						<input
							type="checkbox"
							id="includeCategories"
							checked={formData.includeCategories}
							onChange={e =>
								setFormData(prev => ({ ...prev, includeCategories: e.target.checked }))
							}
							className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
						/>
						<label htmlFor="includeCategories" className="ml-2 text-sm text-black">
							Категории
						</label>
					</div>
				</div>

				<div>
					<h3 className="font-semibold mb-2 text-black">Исключенные URL</h3>
					<p className="text-xs text-gray-500 mb-3">
						Добавьте URL страниц, которые не должны попадать в sitemap
					</p>

					<div className="flex gap-2 mb-3 text-black">
						<input
							type="text"
							value={newExcludedUrl}
							onChange={e => setNewExcludedUrl(e.target.value)}
							onKeyPress={e => {
								if (e.key === 'Enter') {
									e.preventDefault()
									handleAddExcludedUrl()
								}
							}}
							className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-600"
							placeholder="/some-page"
						/>
						<button
							type="button"
							onClick={handleAddExcludedUrl}
							className="px-4 py-2 bg-gray-200 text-black hover:bg-gray-300 rounded"
						>
							Добавить
						</button>
					</div>

					{formData.excludedUrls.length > 0 && (
						<div className="space-y-2 text-black">
							{formData.excludedUrls.map((url, index) => (
								<div
									key={index}
									className="flex items-center justify-between p-2 bg-gray-50 rounded"
								>
									<span className="text-sm">{url}</span>
									<button
										type="button"
										onClick={() => handleRemoveExcludedUrl(index)}
										className="text-red-600 hover:text-red-700 text-sm"
									>
										Удалить
									</button>
								</div>
							))}
						</div>
					)}
				</div>

				<div className="border-t pt-4">
					<button
						type="submit"
						disabled={updateMutation.isPending}
						className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
					>
						{updateMutation.isPending ? 'Сохранение...' : 'Сохранить настройки'}
					</button>
				</div>
			</form>

			<div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
				<h4 className="font-semibold text-blue-900 mb-2">Информация</h4>
				<ul className="text-sm text-blue-800 space-y-1">
					<li>• Sitemap доступен по адресу: <code className="bg-white px-1 rounded">{formData.baseUrl}/sitemap.xml</code></li>
					<li>• Изменения вступят в силу при следующей генерации sitemap</li>
					<li>• Рекомендуется отправить обновленный sitemap в Google Search Console и Яндекс.Вебмастер</li>
				</ul>
			</div>
		</div>
	)
}
