'use client'
import { PUBLIC_URL } from '@/config/url.config'
import { useGetCategories } from '@/hooks/categories/useGetCategories'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useCart } from './BusketPage/CardContext'
import { FeedbackModal } from './ModalWindow/FeedbackModal'

export default function Header() {
	const rawPathname = usePathname()
	const { categories, isLoading } = useGetCategories()
	const pathname = rawPathname ?? ''
	const [openMenu, setOpenMenu] = useState<string | null>(null)
	const [copied, setCopied] = useState(false)
	const [mobileOpen, setMobileOpen] = useState(false)
	const [mCatalogOpen, setMCatalogOpen] = useState(false)
	const [mFactoryOpen, setMFactoryOpen] = useState(false)
	const [isFeedbackOpen, setIsFeedbackOpen] = useState(false)
	const [cartCount, setCartCount] = useState(0)
	const { items: cartItems } = useCart()

	const isCatalogActive = pathname.startsWith('/catalog')
	const isDeliveryActive = pathname === '/delivery'
	const factoryRoutes = [
		'/about',
		'/reviews',
		'/certificates',
		'/contacts'
	] as const
	const isFactoryActive = factoryRoutes.some(r => pathname.startsWith(r))

	const active = 'text-[#F0882B]'
	const idle = 'text-black hover:text-[#F0882B]'

	useEffect(() => {
		if (mobileOpen) {
			setMCatalogOpen(true)
			if (typeof window !== 'undefined' && window.innerWidth <= 767) {
				document.body.style.overflow = 'hidden'
			}
		} else {
			setMCatalogOpen(false)
			setMFactoryOpen(false)
			if (typeof window !== 'undefined') {
				document.body.style.overflow = ''
			}
		}

		return () => {
			if (typeof window !== 'undefined') {
				document.body.style.overflow = ''
			}
		}
	}, [mobileOpen])

	useEffect(() => {
		setMobileOpen(false)
	}, [pathname])

	useEffect(() => {
		setCartCount(cartItems.length)
	}, [cartItems])

	const toggleMenu = (menu: string) => {
		setOpenMenu(prev => (prev === menu ? null : menu))
	}

	const closeMenu = () => {
		setOpenMenu(null)
	}

	return (
		<header className='w-full bg-white shadow-md h-[60px] md:h-[80px] flex items-center px-[clamp(16px,calc(0.21875*(100vw-640px)+16px),100px)] md:px-[50px] lg:px-[clamp(16px,calc(0.21875*(100vw-640px)+16px),100px)] border-b border-gray-200 font-inter'>
			<div className='w-full max-w-[1400px] mx-auto flex items-center justify-between gap-6 relative'>
				<Link
					href='/'
					className='cursor-pointer flex-shrink-0'
					aria-label='На главную'
				>
					<div className='min-w-[146px] md:min-w-[150px] flex items-center'>
						<Image
							src='/logo.svg'
							alt='Logo'
							width={180}
							height={39}
							style={{ height: 'auto' }}
							className='w-[146px] md:w-[140px] lg:w-[180px]'
							priority
						/>
					</div>
				</Link>

				{/* моб иконки */}
				{!mobileOpen && (
					<div className='flex items-center gap-1 md:hidden ml-auto'>
						<div className='relative'>
							<button
								onClick={() => {
									navigator.clipboard.writeText(
										'+7 (902) 487-28-77'
									)
									setCopied(true)
									setTimeout(() => setCopied(false), 1500)
								}}
								aria-label='Скопировать номер'
								className='p-2 rounded hover:bg-gray-100 focus:outline-none'
							>
								<Image
									src='/phonemob.svg'
									alt='Телефон'
									width={24}
									height={24}
									priority
								/>
							</button>
							{copied && (
								<div
									className='absolute left-0 top-full mt-2 z-[1000] whitespace-nowrap px-3 py-1 rounded-md bg-black text-white/90 text-[12px] shadow-lg'
									role='status'
									aria-live='polite'
								>
									Номер скопирован
								</div>
							)}
						</div>

						<Link
							href='/busket'
							aria-label='Мой заказ'
							className='relative p-2 rounded hover:bg-gray-100 focus:outline-none'
						>
							<Image
								src='/basket.svg'
								alt='Мой заказ'
								width={24}
								height={24}
								priority
							/>
							{cartCount > 0 && (
								<span className='absolute -top-1 -right-1 min-w-[16px] h-[16px] px-[4px] flex items-center justify-center rounded-full bg-[#F0882B] text-white text-[10px] font-bold leading-none'>
									{cartCount}
								</span>
							)}
						</Link>
					</div>
				)}

				{/* бургер */}
				<button
					onClick={() => setMobileOpen(v => !v)}
					aria-label='Открыть меню'
					aria-expanded={mobileOpen}
					aria-controls='mobile-menu'
					className='md:hidden p-2 rounded hover:bg-gray-100 focus:outline-none'
				>
					{mobileOpen ? (
						<svg
							className='w-6 h-6'
							viewBox='0 0 24 24'
							fill='none'
							stroke='#000'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						>
							<line x1='18' y1='6' x2='6' y2='18' />
							<line x1='6' y1='6' x2='18' y2='18' />
						</svg>
					) : (
						<svg
							className='w-6 h-6'
							viewBox='0 0 24 24'
							fill='none'
							stroke='#000'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						>
							<line x1='3' y1='6' x2='21' y2='6' />
							<line x1='3' y1='12' x2='21' y2='12' />
							<line x1='3' y1='18' x2='21' y2='18' />
						</svg>
					)}
				</button>

				{/* меню десктоп */}
				<nav className='hidden md:block'>
					<ul className='flex items-center md:gap-[20px] lg:gap-[40px]'>
						<li className='relative'>
							<button
								onClick={() => toggleMenu('catalog')}
								className={`text-[12px] lg:text-[14px] xl:text-[16px] font-Inter font-semibold tracking-normal transition-colors inline-flex items-center gap-2 ${
									isCatalogActive ? active : idle
								}`}
								aria-haspopup='menu'
								aria-expanded={openMenu === 'catalog'}
							>
								<span>КАТАЛОГ</span>
								<svg
									className={`w-[17px] h-[17px] transition-transform duration-200 ${
										openMenu === 'catalog'
											? '-rotate-90'
											: 'rotate-0'
									}`}
									viewBox='0 0 24 24'
									fill='none'
									stroke='#000'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
									aria-hidden='true'
								>
									<polyline points='6 9 12 15 18 9' />
								</svg>
							</button>
							{/* дроп каталог */}
							{openMenu === 'catalog' && categories && (
								<div
									className='absolute left-0 top-full mt-2 bg-white shadow-lg rounded-md py-2 min-w-[240px] z-50'
									onMouseLeave={closeMenu}
								>
									{categories.map(category => (
										<div key={category.id}>
											<Link
												href={PUBLIC_URL.category(
													category.id
												)} // → /{category.id}
												className='px-4 py-2 flex justify-between items-center text-[12px] lg:text-[14px] font-semibold leading-5 tracking-normal text-black hover:bg-gray-50'
												onClick={closeMenu}
											>
												<span>{category.title}</span>
												<svg
													className='w-[14px] h-[14px] stroke-[#000]'
													viewBox='0 0 24 24'
													fill='none'
													strokeWidth='2'
													strokeLinecap='round'
													strokeLinejoin='round'
													aria-hidden='true'
												>
													<polyline points='9 6 15 12 9 18' />
												</svg>
											</Link>
											{category.id !==
												categories[
													categories.length - 1
												].id && (
												<div className='h-px bg-gray-200' />
											)}
										</div>
									))}
								</div>
							)}
						</li>

						<li>
							<Link
								href='/delivery'
								className={`text-[12px] lg:text-[14px] xl:text-[16px] font-bold tracking-normal transition-colors ${
									isDeliveryActive ? active : idle
								}`}
								onClick={closeMenu}
							>
								ДОСТАВКА
							</Link>
						</li>

						<li className='relative'>
							<button
								onClick={() => toggleMenu('factory')}
								className={`text-[12px] lg:text-[14px] xl:text-[16px] font-bold tracking-normal transition-colors inline-flex items-center gap-2 ${
									isFactoryActive ? active : idle
								}`}
								aria-haspopup='menu'
								aria-expanded={openMenu === 'factory'}
							>
								<span>ЗАВОД</span>
								<svg
									className={`w-[17px] h-[17px] transition-transform duration-200 ${
										openMenu === 'factory'
											? '-rotate-90'
											: 'rotate-0'
									}`}
									viewBox='0 0 24 24'
									fill='none'
									stroke='#000'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
									aria-hidden='true'
								>
									<polyline points='6 9 12 15 18 9' />
								</svg>
							</button>
							{/* дроп завод */}
							{openMenu === 'factory' && (
								<div
									className='absolute left-0 top-full mt-2 bg-white shadow-lg rounded-md py-2 min-w-[240px] z-50'
									onMouseLeave={closeMenu}
								>
									<Link
										href='/about'
										className='block px-4 py-2 text-[12px] lg:text-[14px] font-semibold leading-5 tracking-normal text-black hover:bg-gray-50'
										onClick={closeMenu}
									>
										О заводе
									</Link>
									<div className='h-px bg-gray-200' />
									<Link
										href='/reviews'
										className='block px-4 py-2 text-[12px] lg:text-[14px] font-semibold leading-5 tracking-normal text-black hover:bg-gray-50'
										onClick={closeMenu}
									>
										Отзывы
									</Link>
									<div className='h-px bg-gray-200' />
									<Link
										href='/contacts'
										className='block px-4 py-2 text-[12px] lg:text-[14px] font-semibold leading-5 tracking-normal text-black hover:bg-gray-50'
										onClick={closeMenu}
									>
										Контакты
									</Link>
								</div>
							)}
						</li>
					</ul>
				</nav>

				{/* меню мобилка */}
				{mobileOpen && (
					<div
						id='mobile-menu'
						className='fixed inset-0 md:hidden bg-white z-[100] overflow-y-auto'
					>
						<div className='flex items-center justify-between px-6 py-3 border-b'>
							<Link
								href='/'
								className='cursor-pointer flex-shrink-0'
								aria-label='На главную'
							>
								<div className='min-w-[146px] flex items-center'>
									<Image
										src='/logo.svg'
										alt='Logo'
										width={146}
										height={32}
										style={{ height: 'auto' }}
										className='w-[146px]'
										priority
									/>
								</div>
							</Link>
							<button
								onClick={() => setMobileOpen(false)}
								aria-label='Закрыть меню'
								className='p-2 rounded hover:bg-gray-100 focus:outline-none'
							>
								<svg
									className='w-6 h-6'
									viewBox='0 0 24 24'
									fill='none'
									stroke='#000'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								>
									<line x1='18' y1='6' x2='6' y2='18' />
									<line x1='6' y1='6' x2='18' y2='18' />
								</svg>
							</button>
						</div>
						<div className='px-6 py-7 text-[14px] font-inter'>
							<div className='space-y-7'>
								<div className='relative'>
									<button
										onClick={() => {
											navigator.clipboard.writeText(
												'+7 (902) 487-28-77'
											)
											setCopied(true)
											setTimeout(
												() => setCopied(false),
												1500
											)
										}}
										className='w-full flex items-center gap-3 text-black'
									>
										<Image
											src='/phone.svg'
											alt='Телефон'
											width={16}
											height={16}
										/>
										<span className='text-[14px] font-semibold'>
											+7 (902) 487-28-77
										</span>
									</button>
									{copied && (
										<div
											className='absolute left-0 top-full mt-2 z-[1000] whitespace-nowrap px-3 py-1 rounded-md bg-black text-white/90 text-[12px] shadow-lg'
											role='status'
											aria-live='polite'
										>
											Номер скопирован
										</div>
									)}
								</div>

								<Link
									href='/busket'
									className='w-full flex items-center gap-3 text-black'
								>
									<Image
										src='/basketmenu.svg'
										alt='Мой заказ'
										width={20}
										height={20}
									/>
									<span className='text-[14px] font-bold'>
										МОЙ ЗАКАЗ
									</span>
								</Link>
							</div>

							{/* моб каталог */}
							<div className='pt-6'>
								<div
									className={`w-full flex items-center gap-3 ${
										isCatalogActive
											? 'text-[#F0882B]'
											: 'text-black'
									}`}
								>
									<Image
										src='/catalog.svg'
										alt='Каталог'
										width={20}
										height={20}
									/>
									<span className='text-[14px] font-semibold'>
										КАТАЛОГ
									</span>
								</div>
								<div className='border-t border-gray-200' />
								<div className='pl-9 py-2 space-y-4'>
									{categories?.map(category => (
										<Link
											key={category.id}
											href={PUBLIC_URL.category(
												category.id
											)}
											className='block text-black font-medium text-[16px] hover:text-[#F0882B]'
											onClick={() => setMobileOpen(false)}
										>
											{category.title}
										</Link>
									))}
								</div>
							</div>

							{/* моб доставка */}
							<div className='pt-2'>
								<Link
									href='/delivery'
									className={`w-full flex items-center gap-3 pt-2 ${
										isDeliveryActive
											? 'text-[#F0882B]'
											: 'text-black'
									} hover:text-[#F0882B]`}
									onClick={() => setMobileOpen(false)}
								>
									<Image
										src='/delivery.svg'
										alt='Доставка'
										width={24}
										height={24}
									/>
									<span className='text-[14px] font-semibold'>
										ДОСТАВКА
									</span>
								</Link>
							</div>

							<div className='border-t border-gray-200 mt-3' />

							{/* моб завод */}
							<div className='py-2 pb-5'>
								<div
									className={`w-full flex items-center gap-3 py-2 ${
										isFactoryActive
											? 'text-[#F0882B]'
											: 'text-black'
									}`}
								>
									<Image
										src='/factorymob.svg'
										alt='Завод'
										width={20}
										height={20}
									/>
									<span className='text-[14px] font-bold'>
										ЗАВОД
									</span>
								</div>
								<div className='border-t border-gray-200' />
								<div className='pl-9 py-2 space-y-4'>
									<Link
										href='/about'
										className='block text-black font-medium text-[16px] hover:text-[#F0882B]'
										onClick={() => {
											setMobileOpen(false)
										}}
									>
										О заводе
									</Link>
									<Link
										href='/reviews'
										className='block text-black font-medium text-[16px] hover:text-[#F0882B]'
										onClick={() => {
											setMobileOpen(false)
										}}
									>
										Отзывы
									</Link>
									<Link
										href='/contacts'
										className='block text-black font-medium text-[16px] hover:text-[#F0882B]'
										onClick={() => {
											setMobileOpen(false)
										}}
									>
										Контакты
									</Link>
								</div>
							</div>

							<button
								type='button'
								onClick={() => {
									setMobileOpen(false)
									setIsFeedbackOpen(true)
								}}
								className='w-[164px] flex items-center justify-between gap-2 px-4 py-3 border border-gray-200 rounded-[10px]'
							>
								<span className='text-[14px] font-semibold text-[#2E3233]'>
									Написать нам
								</span>
								<Image
									src='/message.svg'
									alt='Написать'
									width={20}
									height={20}
								/>
							</button>

							<div className='space-y-4 pt-5 pb-2'>
								<div className='flex items-start gap-3'>
									<Image
										src='/mail.svg'
										alt='Почта'
										width={16}
										height={16}
										className='mt-0.5'
									/>
									<a
										href='mailto:info@gmail.com'
										className='text-black'
									>
										2105850@bk.ru
									</a>
								</div>
								<div className='flex items-start gap-3'>
									<Image
										src='/location.svg'
										alt='Адрес'
										width={16}
										height={16}
										className='mt-0.5'
									/>
									<p className='text-black leading-5'>
										Приморский край, г.о. Владивостокский,
										<br />
										г. Владивосток, ул Шошина, Дом 6, офис 3
									</p>
								</div>
								<div className='flex items-start gap-3'>
									<Image
										src='/clock.svg'
										alt='Время'
										width={16}
										height={16}
										className='mt-0.5'
									/>
									<p className='text-black'>
										Пн-Пт: 9:00–18:00
									</p>
								</div>
							</div>
						</div>
					</div>
				)}

				{/* кнопка контакты */}
				<button
					type='button'
					onClick={() => setIsFeedbackOpen(true)}
					className='hidden md:flex items-center justify-center text-center px-5 gap-2 min-w-[95px] lg:min-w-[125px] md:h-[50px] lg:w-[208px] lg:h-[40px] border border-gray-200 rounded-[10px] text-[#2E3233] text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] font-semibold hover:bg-gray-50 transition-colors'
				>
					<span>Написать нам</span>
					<Image
						src='/message.svg'
						alt='message'
						width={24}
						height={24}
						priority
					/>
				</button>

				<div className='hidden md:flex items-center gap-[40px]'>
					<div className='relative'>
						<button
							onClick={() => {
								navigator.clipboard.writeText(
									'+7 (902) 487-28-77'
								)
								setCopied(true)
								setTimeout(() => setCopied(false), 1500)
							}}
							className='flex items-center gap-2 text-[12px] lg:text-[14px] font-semibold text-black hover:text-[#F0882B] transition-colors'
						>
							<Image
								src='/phone.svg'
								alt='message'
								width={16}
								height={16}
								priority
							/>
							<span>+7 (902) 487-28-77</span>
						</button>
						{copied && (
							<div
								className='absolute left-0 top-full mt-2 z-[1000] whitespace-nowrap px-3 py-1 rounded-md bg-black text-white/90 text-[12px] shadow-lg'
								role='status'
								aria-live='polite'
							>
								Номер скопирован
							</div>
						)}
					</div>

					<Link
						href='/busket'
						aria-label='Мой заказ'
						className='relative flex items-center p-2 hover:text-[#F0882B] transition-colors'
					>
						<div className='min-w-[24px] min-h-[24px] flex items-center justify-center'>
							<Image
								src='/basket.svg'
								alt='Мой заказ'
								width={24}
								height={24}
								priority
								className='min-w-[24px] min-h-[24px]'
							/>
						</div>

						{cartCount > 0 && (
							<span className='absolute -top-1 -right-1 min-w-[16px] h-[16px] px-[4px] flex items-center justify-center rounded-full bg-[#F0882B] text-white text-[10px] font-bold leading-none'>
								{cartCount}
							</span>
						)}
					</Link>
				</div>
			</div>
			<FeedbackModal
				isOpen={isFeedbackOpen}
				onClose={() => setIsFeedbackOpen(false)}
			/>
		</header>
	)
}
