'use client'

import { useState } from 'react'
import { MetaTagsManager } from '@/components/Admin/Seo/MetaTagsManager'
import { RobotsTxtEditor } from '@/components/Admin/Seo/RobotsTxtEditor'
import { SitemapSettings } from '@/components/Admin/Seo/SitemapSettings'

type Tab = 'meta' | 'robots' | 'sitemap'

export default function SeoPage() {
	const [activeTab, setActiveTab] = useState<Tab>('meta')

	return (
		<div className="p-6">
			<h1 className="text-3xl font-bold mb-6 text-black">SEO Управление</h1>

			{/* Табы */}
			<div className="flex gap-4 mb-6 border-b border-gray-200">
				<button
					onClick={() => setActiveTab('meta')}
					className={`px-4 py-2 font-medium transition-colors ${
						activeTab === 'meta'
							? 'text-blue-600 border-b-2 border-blue-600'
							: 'text-gray-600 hover:text-gray-900'
					}`}
				>
					Meta теги
				</button>
				<button
					onClick={() => setActiveTab('robots')}
					className={`px-4 py-2 font-medium transition-colors ${
						activeTab === 'robots'
							? 'text-blue-600 border-b-2 border-blue-600'
							: 'text-gray-600 hover:text-gray-900'
					}`}
				>
					robots.txt
				</button>
				<button
					onClick={() => setActiveTab('sitemap')}
					className={`px-4 py-2 font-medium transition-colors ${
						activeTab === 'sitemap'
							? 'text-blue-600 border-b-2 border-blue-600'
							: 'text-gray-600 hover:text-gray-900'
					}`}
				>
					Sitemap
				</button>
			</div>

			{/* Контент */}
			<div className="bg-white rounded-lg shadow-sm p-6">
				{activeTab === 'meta' && <MetaTagsManager />}
				{activeTab === 'robots' && <RobotsTxtEditor />}
				{activeTab === 'sitemap' && <SitemapSettings />}
			</div>
		</div>
	)
}
