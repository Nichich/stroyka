import React from 'react'
import { INavigation } from '@/shared/Catalog/Navigation.interface'
import Link from 'next/link'
import Image from 'next/image'

interface Props {
	item: INavigation
}

const Navigation: React.FC<Props> = ({ item }) => (
	<div className="mx-10 md:mx-0">
		<p className="font-bold text-black text-3xl">{item.title}</p>
		<div className="border-2 border-orange-500 rounded-4xl w-17 mb-4"></div>
		{item.links.map((desc, idx) => (
			<Link key={idx} href={desc.url}
				  className="flex justify-between items-center w-full md:w-[350px] py-4 border-b border-[#E2E2E2]">
				<p className="text-black font-semibold text-[16px]">{desc.linkTitle}</p>
				<Image
					src="/arrow-black.svg"
					alt={'Иконка'}
					width={24}
					height={24}
					className="mx-0.5"
				/>
			</Link>
		))}
	</div>
)

export default Navigation
