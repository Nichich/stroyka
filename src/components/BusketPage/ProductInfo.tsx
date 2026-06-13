import React from 'react'

interface ProductInfoProps {
	description: string;
	characteristics: { label: string; value: string }[];
}

export const ProductInfo: React.FC<ProductInfoProps> = ({
															description,
															characteristics,
														}) => {
	return (
		<div className="bg-white rounded-lg p-6 shadow-sm">
			<h2 className="text-2xl font-bold mb-4">Описание</h2>
			<p className="text-gray-700 mb-6">{description}</p>

			<h3 className="text-xl font-bold mb-4">Характеристики</h3>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{characteristics.map((item, index) => (
					<div key={index} className="flex justify-between border-b pb-2">
						<span className="text-gray-600">{item.label}:</span>
						<span className="font-medium">{item.value}</span>
					</div>
				))}
			</div>
		</div>
	);
};
