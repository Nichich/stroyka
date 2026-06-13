'use client'

import { useState } from 'react'
import { useGetAllSeoSettings, useUpsertSeoSettings, useDeleteSeoSettings } from '@/hooks/seo/useSeoSettings'
import { ISeoSettings } from '@/services/seo.service'
import { MetaTagsForm } from './MetaTagsForm'

export const MetaTagsManager = () => {
	const { data: settings = [], isLoading } = useGetAllSeoSettings()
	const upsertMutation = useUpsertSeoSettings()
	const deleteMutation = useDeleteSeoSettings()
	const [editingPageKey, setEditingPageKey] = useState<string | null>(null)

	const pageKeys = [
		{ key: 'home', label: 'Главная страница' },
		{ key: 'catalog', label: 'Каталог' },
		{ key: 'about', label: 'О компании' },
		{ key: 'delivery', label: 'Доставка' },
		{ key: 'contacts', label: 'Контакты' },
		{ key: 'reviews', label: 'Отзывы' },
		{ key: 'certificates', label: 'Сертификаты' },
	]

	const handleSave = (data: Partial<ISeoSettings>) => {
		upsertMutation.mutate(data, {
			onSuccess: () => setEditingPageKey(null),
		})
	}

	const handleDelete = (pageKey: string) => {
		if (confirm('Вы уверены, что хотите удалить SEO настройки для этой страницы?')) {
			deleteMutation.mutate(pageKey)
		}
	}

	if (isLoading) {
		return <div className="text-center py-8">Загрузка...</div>
	}

	return (
		<div>
			<h2 className="text-2xl font-bold mb-4 text-black">Управление Meta-тегами</h2>
			<p className="text-black mb-6">
				Настройте SEO параметры для каждой страницы сайта
			</p>

			<div className="space-y-4 text-black">
				{pageKeys.map(({ key, label }) => {
					const setting = settings.find((s: ISeoSettings) => s.pageKey === key)
					const isEditing = editingPageKey === key

					return (
						<div key={key} className="border rounded-lg p-4">
							<div className="flex justify-between items-center mb-2">
								<h3 className="text-lg font-semibold">{label}</h3>
								<div className="flex gap-2">
									{setting && !isEditing && (
										<button
											onClick={() => handleDelete(key)}
											className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
											disabled={deleteMutation.isPending}
										>
											Удалить
										</button>
									)}
									<button
										onClick={() => setEditingPageKey(isEditing ? null : key)}
										className="px-3 py-1 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded"
									>
										{isEditing ? 'Отмена' : setting ? 'Редактировать' : 'Добавить'}
									</button>
								</div>
							</div>

							{setting && !isEditing && (
								<div className="text-sm text-black space-y-1">
									{setting.title && <div><strong>Title:</strong> {setting.title}</div>}
									{setting.description && <div><strong>Description:</strong> {setting.description}</div>}
									{setting.keywords && <div><strong>Keywords:</strong> {setting.keywords}</div>}
								</div>
							)}

							{isEditing && (
								<MetaTagsForm
									pageKey={key}
									initialData={setting}
									onSave={handleSave}
									onCancel={() => setEditingPageKey(null)}
									isLoading={upsertMutation.isPending}
								/>
							)}
						</div>
					)
				})}
			</div>
		</div>
	)
}
