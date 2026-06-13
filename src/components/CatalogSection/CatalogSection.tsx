import { ICatalogSection } from '@/shared/types/CatalogSection.interface'
import Link from 'next/link'
import React from 'react'

interface Props {
	item: ICatalogSection
}

const CatalogSection: React.FC<Props> = ({ item }) => {
	return (
		<div className='bg-[#FFFFFF] py-8 md:py-32 w-full'>
			<div className='flex flex-col items-center md:hidden'>
				<p className='font-bold text-black text-center text-[28px] leading-tight'>
					<span>{item.firstTitle}</span>
					<span className='text-orange-400'>{item.orangeTitle}</span>
					<span>{item.endTitle}</span>
				</p>
			</div>
			<div className='flex flex-col items-center md:flex-row justify-center gap-10 mt-8 md:mt-0 w-full'>
				{/* <div className="border-black border-2 rounded-xl p-1">
     <Image
      src={item.imageUrl}
      alt={'Каталог'}
      width={350}
      height={600}
      className="rounded-xl"
     />
    </div> */}
				<div className='flex flex-col items-center w-full md:w-auto px-4 md:px-0 max-w-[80vh]'>
					<div className='hidden md:flex flex-col items-start justify-start'>
						<p className='font-bold text-black text-center text-[40px] leading-tight'>
							<span>{item.firstTitle}</span>
							<span className='text-orange-400'>
								{item.orangeTitle}
							</span>
							<span>{item.endTitle}</span>
						</p>
					</div>
					{/* <div className="hidden md:block border-2 border-orange-400 rounded-2xl w-20 mt-4 mb-8"></div> */}
					{/* <div className="md:ml-0 ml-[100px]">
      {item.description.map((desc, idx) => (
       <div key={idx} className="flex items-center justify-start gap-5 mt-7">
        <div className="flex items-center justify-center">
         <Image
          src={desc.svg}
          alt={'Иконка'}
          width={24}
          height={24}
         />
        </div>
        <div className="text-left">
         <h3 className="font-bold text-black text-xl">{desc.title}</h3>
        </div>
       </div>
      ))}
     </div> */}
					<div className='flex flex-col md:flex-row items-center md:items-center justify-start gap-5 mt-12 w-full md:w-auto'>
						<button className='w-full md:w-auto py-2 px-4 bg-orange-400 hover:bg-orange-500 transition text-white font-bold rounded-lg flex items-center justify-center gap-2'>
							{item.downloadBtn}
						</button>
						<Link
							href='/catalog'
							className='w-full md:w-auto border-2 border-[#DBDBDB] rounded-lg py-2 px-4 text-center text-black whitespace-nowrap hover:bg-gray-100 transition'
						>
							{item.catalogBtn}
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CatalogSection

// import { IAdvantages } from '@/shared/Advantages.interface'
// import React from 'react'
// import Image from 'next/image'
// import { ICatalogSection } from '@/shared/CatalogSection.interface'

// interface Props {
//  item: ICatalogSection
// }
// const CatalogSection: React.FC<Props> = ({ item }) => {
//  return (
//   <div className="bg-[#FFFFFF] py-8 md:py-16 w-full">
//    <div className="flex flex-col items-center md:hidden">
//     <p className="font-bold text-black text-center text-[28px] leading-tight">
//      <span>{item.firstTitle}</span>
//      <span className="text-orange-400">{item.orangeTitle}</span>
//      <span>{item.endTitle}</span>
//     </p>
//    </div>
//    <div className="flex flex-col items-center md:flex-row justify-center gap-10 mt-8 md:mt-0 w-full">
//     <div className="border-black border-2 rounded-xl p-1">
//      <Image
//       src={item.imageUrl}
//       alt={'Каталог'}
//       width={350}
//       height={600}
//       className="rounded-xl"
//      />
//     </div>
//     <div className="flex flex-col items-start w-full md:w-auto px-4 md:px-0 max-w-[80vh]">
//      <div className="hidden md:flex flex-col items-start justify-start">
//       <p className="font-bold text-black text-left text-[40px] leading-tight">
//        <span>{item.firstTitle}</span>
//        <span className="text-orange-400">{item.orangeTitle}</span>
//        <span>{item.endTitle}</span>
//       </p>
//      </div>
//      <div className="hidden md:block border-2 border-orange-500 rounded-2xl w-20 mt-4 mb-8"></div>
//      <div className="md:ml-0 ml-[100px]">
//       {item.description.map((desc, idx) => (
//        <div key={idx} className="flex items-center justify-start gap-5 mt-7">
//         <div className="flex items-center justify-center">
//          <Image
//           src={desc.svg}
//           alt={'Иконка'}
//           width={24}
//           height={24}
//          />
//         </div>
//         <div className="text-left">
//          <h3 className="font-bold text-black text-xl">{desc.title}</h3>
//         </div>
//        </div>
//       ))}
//      </div>
//      <div
//       className="flex flex-col md:flex-row items-center md:items-center justify-start gap-5 mt-12 w-full md:w-auto">
//       <button
//        className="w-full md:w-auto py-2 px-4 bg-orange-400 hover:bg-orange-500 transition text-white font-bold rounded-lg flex items-center justify-center gap-2">
//        {item.downloadBtn}
//       </button>
//       <button
//        className="w-full md:w-auto border-2 border-[#DBDBDB] rounded-lg py-2 px-4 text-black whitespace-nowrap hover:bg-gray-100 transition"
//       >
//        {item.catalogBtn}
//       </button>
//      </div>
//     </div>
//    </div>
//   </div>
//  )
// }

// export default CatalogSection
