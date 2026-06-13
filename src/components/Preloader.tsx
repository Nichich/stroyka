'use client'

import React, { useState, useEffect, FC } from 'react'

interface PreloaderProps {
	message?: string
	companyName?: string
	duration?: number
}

/**
 * Полноэкранный прелоадер с анимацией плиток для строительной компании
 * Автоматически скрывается через указанное время с плавным fade-out
 */
const Preloader: FC<PreloaderProps> = ({
	message = 'ЗАГРУЖАЕМ КАТАЛОГИ ПЛИТКИ И БЛОКОВ…',
	companyName = 'ДОБРОСТРОЙ 25',
	duration = 2000
}) => {
	const [isVisible, setIsVisible] = useState(true)
	const [shouldRender, setShouldRender] = useState(true)

	useEffect(() => {
		// Автоматически скрываем прелоадер через указанное время
		const timer = setTimeout(() => {
			setIsVisible(false)
			// Удаляем из DOM после завершения fade-out анимации (1 секунда)
			setTimeout(() => {
				setShouldRender(false)
			}, 1000)
		}, duration)

		return () => clearTimeout(timer)
	}, [duration])

	// Предотвращаем скролл страницы во время показа прелоадера
	useEffect(() => {
		if (shouldRender) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}

		return () => {
			document.body.style.overflow = ''
		}
	}, [shouldRender])

	// Если прелоадер должен быть удалён, не рендерим его
	if (!shouldRender) {
		return null
	}

	return (
		<div
			className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-1000 ease-in-out ${
				isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
			}`}
			style={{
				background: 'linear-gradient(135deg, #485860 0%, #474747 50%, #2C2C2C 100%)'
			}}
		>
			{/* Контейнер с плитками */}
			<div className="relative mb-12">
				{/* Сетка плиток - 4x3 на десктопе, 2x3 на мобильных */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
					{/* Плитки с задержкой появления (stagger эффект) */}
					{Array.from({ length: 12 }).map((_, index) => (
						<div
							key={index}
							className="tile-animate"
							style={{
								animationDelay: `${index * 0.1}s`
							}}
						>
							<div
								className={`h-12 w-12 md:h-16 md:w-16 rounded-sm shadow-lg ${
									index % 3 === 0
										? 'bg-[#F8F2E7]' // Светло-бежевый
										: index % 3 === 1
											? 'bg-white' // Белый
											: 'bg-[#F38A1E]' // Оранжевый акцент
								} ${index === 5 ? 'tile-pulse' : ''}`}
							/>
						</div>
					))}
				</div>
			</div>

			{/* Текст компании */}
			<div className="text-center mb-6">
				<h1 className="text-2xl md:text-4xl font-bold text-white mb-2 tracking-wider uppercase">
					{companyName}
				</h1>
				<p className="text-sm md:text-base text-white/80 tracking-widest uppercase">
					{message}
				</p>
			</div>

			{/* Бордюр-прогресс-бар */}
			<div className="absolute bottom-0 left-0 right-0 h-1 bg-[#2C2C2C]">
				<div 
					className="border-progress h-full" 
					style={{
						background: 'linear-gradient(to right, #F38A1E, #F0882B, #F38A1E)'
					}}
				/>
			</div>
		</div>
	)
}

export default Preloader
