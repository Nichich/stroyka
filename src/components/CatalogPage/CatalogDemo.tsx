import React from 'react'
import { ICatalogDemo } from '@/shared/Catalog/CatalogDemo.interface'
import { products } from '@/data/productCard'
import { ProductCard } from '@/components/ProductCard/ProductCard'

interface Props {
	item: ICatalogDemo
}

const CatalogDemo: React.FC<Props> = ({ item }) => (
	<div className="flex flex-col justify-center">
		<div className="flex flex-col md:flex-row items-center justify-center mb-10 w-full px-6  gap-4 md:gap-0">
			<p className="font-bold text-black text-center md:text-left text-2xl md:text-[40px] max-w-full md:max-w-[60%]">
				{item.title}
			</p>
			<div className="flex items-center flex-1 max-w-[700px] md:ml-7 w-full md:w-auto">
				<div className="hidden md:flex flex-1 bg-[#DBDBDB] h-[1px]"></div>
				<button
					className="border-2 border-[#DBDBDB] rounded-lg py-2 md:px-4 w-full md:w-auto text-black whitespace-nowrap hover:bg-gray-100 transition shrink-0"
				>
					{item.btnTitle}
				</button>
			</div>
		</div>
		<div className="flex flex-wrap max-w-[900px] justify-center items-center gap-2">
			{products.slice(0, 6).map((product, idx) => (
				<div key={product.id}>
					<ProductCard product={product} />
				</div>
			))}
		</div>
	</div>
)

export default CatalogDemo
