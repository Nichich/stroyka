import { IAdvantages } from '@/shared/types/Advantages.interface'
import Image from 'next/image'
import React from 'react'

interface Props {
	item: IAdvantages
}

const Advantages: React.FC<Props> = ({ item }) => {
	return (
		<div className='bg-[#FFFFFF] pt-160 pb-8 md:py-60 w-full px-25'>
			<div className='flex flex-col items-center md:hidden'>
				<p className='font-bold text-black text-center text-[28px] md:text-[24px] lg:text-[28px] leading-tight'>
					<span>{item.firstTitle}</span>
					<span className='text-orange-400'>{item.orangeTitle}</span>
					<span className='block'>{item.endTitle}</span>
				</p>
				<span className='text-black text-[13px] mt-4 text-center max-w-md'>
					{item.underTitle}
				</span>
			</div>
			<div className='flex flex-col items-center md:flex-row justify-center gap-10 mt-8 md:mt-0'>
				<Image
					src={item.imageUrl}
					alt={'Работник года'}
					width={430}
					height={600}
					className='hidden md:block mx-0.5'
				/>
				<div>
					<div className='md:flex flex-col items-start justify-start hidden md:flex-col'>
						<p className='font-bold text-black text-left text-[40px] md:text-[32px] lg:text-[40px] leading-tight'>
							<span>{item.firstTitle}</span>
							<span className='text-orange-400'>
								{item.orangeTitle}
							</span>
							<span className='block'>{item.endTitle}</span>
						</p>
						<span className='text-black text-[14px] mt-4 text-left max-w-md'>
							{item.underTitle}
						</span>
					</div>

					{item.description.map((desc, idx) => (
						<div
							key={idx}
							className='flex flex-col items-center text-center md:flex-row md:items-center md:text-left justify-start gap-5 mt-12'
						>
							<div className='flex items-center justify-center w-16 h-16 md:w-12 md:h-12 bg-[#F3F3F3] rounded-4xl mx-auto md:mx-0'>
								<Image
									src={desc.svg}
									alt={'Иконка'}
									width={28}
									height={28}
									className='mx-0.5'
								/>
							</div>
							<div className='mb-2.5 md:text-left text-center'>
								<h3 className='font-bold text-black text-xl'>
									{desc.title}
								</h3>
								<p className='text-black text-[14px]'>
									{desc.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default Advantages
