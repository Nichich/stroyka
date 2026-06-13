import Link from 'next/link'
import React from 'react'

interface BreadcrumbItem {
	label: string;
	href: string;
}

interface BreadcrumbsProps {
	items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
	return (
		<nav className="flex items-center gap-2 text-sm text-[#B3B3B3] mb-6 border-b border-gray-200 w-full py-4 px-4">
			<div className="flex gap-2 mx-[5%]">
				{items.map((item, index) => (
					<div key={index} className="flex items-center gap-2">
						{index > 0 && <span>/</span>}
						{index === items.length - 1 ? (
							<span className="text-[#B3B3B3] font-medium">{item.label}</span>
						) : (
							<Link href={item.href} className="hover:text-orange-500 transition">
								{item.label}
							</Link>
						)}
					</div>
				))}
			</div>
		</nav>
	)
}
