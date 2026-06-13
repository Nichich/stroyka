import { IBestChoice } from '@/shared/types/BestChoice.interface'
import Image from 'next/image'
import React from 'react'

interface Props {
	item: IBestChoice
}

const BestChoice: React.FC<Props> = ({ item }) => {
	return (
		<div className='bg-[#FFFFFF] py-8 md:py-16 w-full'>
			<div className='flex flex-col md:flex-row items-center justify-center'>
				<p className='font-bold text-black text-center text-[28px] md:text-[40px] w-full md:max-w-[40%] mx-auto'>
					<span>{item.firstTitle}</span>
					<span className='text-orange-400'>{item.orangeTitle}</span>
					<span>{item.endTitle}</span>
				</p>
			</div>
			<div className='flex flex-col md:flex-row items-center justify-center mt-8 md:mt-10 gap-6 md:gap-0'>
				<div className='order-2 md:order-1 flex flex-col w-full md:w-[320px] gap-6 items-center md:items-stretch'>
					{item.descriptionLeft.map((desc, idx) => (
						<div
							key={idx}
							className='flex flex-col-reverse md:flex-row items-center md:items-start gap-5 text-center md:text-right'
						>
							<div className='mb-2.5'>
								<h3 className='font-bold text-black text-xl'>
									{desc.title}
								</h3>
								<p className='text-black text-[13px] md:text-[14px]'>
									{desc.description}
								</p>
								<p className='text-black text-[13px] md:text-[14px]'>
									{desc.descriptionBot}
								</p>
							</div>
							<div className='flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-[#F3F3F3] rounded-full'>
								<Image
									src={desc.svg}
									alt={'Иконка'}
									width={24}
									height={24}
									className='mx-0.5'
								/>
							</div>
						</div>
					))}
				</div>
				<div className='order-1 md:order-2 flex items-center justify-center w-full md:w-[476px] h-[180px] md:h-[354px] my-6 md:my-0'>
					<Image
						src={item.image}
						alt={'кирпичи'}
						width={476}
						height={354}
						className='mx-auto'
						style={{
							objectFit: 'contain',
							width: '100%',
							height: '100%'
						}}
					/>
				</div>
				<div className='order-3 md:order-3 flex flex-col w-full md:w-[320px] gap-10 mt-6 items-center md:items-stretch'>
					{item.descriptionRight.map((desc, idx) => (
						<div
							key={idx}
							className='flex flex-col md:flex-row items-center md:items-start gap-5 text-center md:text-left'
						>
							<div className='flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-[#F3F3F3] rounded-full'>
								<Image
									src={desc.svg}
									alt={'Иконка'}
									width={24}
									height={24}
									className='mx-0.5'
								/>
							</div>
							<div className='mb-2.5'>
								<h3 className='font-bold text-black text-xl'>
									{desc.title}
								</h3>
								<p className='text-black text-[13px] md:text-[14px]'>
									{desc.description}
								</p>
								<p className='text-black text-[13px] md:text-[14px]'>
									{desc.descriptionBot}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default BestChoice
