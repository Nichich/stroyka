'use client'

import { useState, useEffect } from 'react'
import {
	useGetAllRobotsTxt,
	useCreateRobotsTxt,
	useUpdateRobotsTxt,
	useDeleteRobotsTxt,
} from '@/hooks/seo/useRobotsTxt'
import { IRobotsTxt } from '@/services/seo.service'

export const RobotsTxtEditor = () => {
	const { data: robotsList = [], isLoading } = useGetAllRobotsTxt()
	const createMutation = useCreateRobotsTxt()
	const updateMutation = useUpdateRobotsTxt()
	const deleteMutation = useDeleteRobotsTxt()

	const [content, setContent] = useState('')
	const [selectedRobots, setSelectedRobots] = useState<IRobotsTxt | null>(null)
	const [isEditing, setIsEditing] = useState(false)

	const activeRobots = robotsList.find((r: IRobotsTxt) => r.isActive)

	useEffect(() => {
		if (activeRobots && !isEditing) {
			setContent(activeRobots.content)
			setSelectedRobots(activeRobots)
		}
	}, [activeRobots, isEditing])

	const handleSave = () => {
		if (selectedRobots) {
			updateMutation.mutate(
				{
					id: selectedRobots.id,
					content,
					isActive: selectedRobots.isActive,
				},
				{
					onSuccess: () => setIsEditing(false),
				}
			)
		} else {
			createMutation.mutate(
				{ content, isActive: true },
				{
					onSuccess: () => setIsEditing(false),
				}
			)
		}
	}

	const handleActivate = (robots: IRobotsTxt) => {
		updateMutation.mutate({
			id: robots.id,
			content: robots.content,
			isActive: true,
		})
	}

	const handleDelete = (id: string) => {
		if (confirm('Вы уверены, что хотите удалить эту версию robots.txt?')) {
			deleteMutation.mutate(id)
		}
	}

	const defaultRobotsContent = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /admin/*
Disallow: /auth
Disallow: /api/

User-agent: Yandex
Allow: /
Disallow: /admin/
Disallow: /admin/*
Disallow: /auth
Disallow: /api/

User-agent: Googlebot
Allow: /
Disallow: /admin/
Disallow: /admin/*
Disallow: /auth
Disallow: /api/

Sitemap: https://dobrostroi25.ru/sitemap.xml`

	const handleReset = () => {
		setContent(defaultRobotsContent)
	}

	if (isLoading) {
		return <div className="text-center py-8">Загрузка...</div>
	}

	return (
		<div>
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-2xl font-bold text-black">Редактор robots.txt</h2>
				<div className="flex gap-2">
					<button
						onClick={handleReset}
						className="px-4 py-2 text-sm bg-gray-200 text-black hover:bg-gray-300 rounded"
					>
						Сбросить к стандартному
					</button>
					{isEditing ? (
						<>
							<button
								onClick={() => {
									setIsEditing(false)
									if (activeRobots) {
										setContent(activeRobots.content)
									}
								}}
								className="px-4 py-2 text-sm bg-gray-200 text-black hover:bg-gray-300 rounded"
							>
								Отмена
							</button>
							<button
								onClick={handleSave}
								disabled={createMutation.isPending || updateMutation.isPending}
								className="px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded disabled:opacity-50"
							>
								{createMutation.isPending || updateMutation.isPending
									? 'Сохранение...'
									: 'Сохранить'}
							</button>
						</>
					) : (
						<button
							onClick={() => setIsEditing(true)}
							className="px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded"
						>
							Редактировать
						</button>
					)}
				</div>
			</div>

			<div className="mb-6">
				<label className="block text-sm font-medium text-black mb-2">
					Содержимое robots.txt
					{activeRobots && (
						<span className="ml-2 text-xs text-green-600">(Активная версия)</span>
					)}
				</label>
				<textarea
					value={content}
					onChange={e => setContent(e.target.value)}
					disabled={!isEditing}
					rows={20}
					className="w-full px-3 py-2 border text-black border-gray-300 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 placeholder:text-gray-600"
					placeholder="User-agent: *&#10;Allow: /&#10;Disallow: /admin/"
				/>
			</div>

			{/* История версий */}
			{robotsList.length > 0 && (
				<div className="mt-8">
					<h3 className="text-lg font-semibold mb-4">История версий</h3>
					<div className="space-y-2">
						{robotsList.map((robots: IRobotsTxt) => (
							<div
								key={robots.id}
								className={`p-4 border rounded-lg ${
									robots.isActive ? 'border-green-500 bg-green-50' : 'border-gray-200'
								}`}
							>
								<div className="flex justify-between items-center">
									<div>
										<div className="flex items-center gap-2">
											<span className="text-sm font-medium">
												{new Date(robots.createdAt).toLocaleString('ru-RU')}
											</span>
											{robots.isActive && (
												<span className="px-2 py-1 text-xs bg-green-600 text-white rounded">
													Активная
												</span>
											)}
										</div>
										<div className="text-xs text-gray-500 mt-1">
											Обновлено: {new Date(robots.updatedAt).toLocaleString('ru-RU')}
										</div>
									</div>
									<div className="flex gap-2">
										{!robots.isActive && (
											<button
												onClick={() => handleActivate(robots)}
												disabled={updateMutation.isPending}
												className="px-3 py-1 text-sm bg-green-600 text-white hover:bg-green-700 rounded disabled:opacity-50"
											>
												Активировать
											</button>
										)}
										<button
											onClick={() => handleDelete(robots.id)}
											disabled={deleteMutation.isPending || robots.isActive}
											className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded disabled:opacity-50"
										>
											Удалить
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	)
}
