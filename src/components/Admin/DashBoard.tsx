import { ProductCategory } from '@/shared/admin/products.interface'

interface Props {
	product: ProductCategory[]
}

const DashBoardPage: React.FC<Props> = ({ product }) => {
	const total = product.reduce((acc, c) => acc + c.count, 0)

	return (
		<div className='text-black p-[40px]'>
			<div className=''>
				<span className=' font-inter font-semibold text-[24px] leading-[100%] tracking-[-0.02em]'>
					ГЛАВНАЯ ПАНЕЛЬ
				</span>
				<div className='max-w-[1000px] w-full border-b-[2px] border-[#DBDBDB] mt-[30px]'></div>
			</div>

			<div className='max-w-[1000px] w-full border-[1px] border-[#DBDBDB] mt-[70px] p-[20px]'>
				<div className='mb-5'>
					<span>Информация о товарах</span>
					<div className='max-w-[700px] w-full border-b-[2px] border-[#DBDBDB] mt-[10px]'></div>
				</div>

				<span>Общее количество товаров: {total}</span>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
					{product.map(c => (
						<div className='flex flex-col ' key={c.id}>
							<div className='border-[#DBDBDB] border-1 bg-[#F0882B] text-white p-3'>
								{c.name}
							</div>

							<div className='border-[#DBDBDB] border-1 text-black p-3'>
								{c.count}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default DashBoardPage
