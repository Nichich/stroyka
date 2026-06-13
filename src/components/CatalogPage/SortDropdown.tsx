"use client";

import React, { useState, useRef, useEffect } from "react";

export type SortOption = "popularity" | "price-high" | "price-low";

interface Props {
	value: SortOption;
	onChange: (value: SortOption) => void;
}

const sortOptions = [
	{
		value: "popularity" as const,
		label: "Сначала популярное"
	},
	{
		value: "price-high" as const,
		label: "Сначала дорогое"
	},
	{
		value: "price-low" as const,
		label: "Сначала дешевле"
	},
];

export const SortDropdown: React.FC<Props> = ({ value, onChange }) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const currentOption = sortOptions.find((opt) => opt.value === value);
	
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleSelect = (option: SortOption) => {
		onChange(option);
		setIsOpen(false);
	};

	return (
		<div ref={dropdownRef} className="relative inline-block min-w-[160px]">
			{/* Кнопка */}
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className="w-full px-4 py-2.5 pr-10
          border border-[#E5E7EB] rounded-lg text-[14px]
          font-normal text-[#1F2937] bg-white cursor-pointer transition-all duration-200
          hover:border-[#9CA3AF] focus:outline-none focus:border-[#FF7A00] focus:ring-2 focus:ring-[#FF7A00]/20 text-left
        "
			>
				{currentOption?.label}

				<div className={`absolute right-3 top-1/2 -translate-y-1/2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
					<svg
						width="12"
						height="8"
						viewBox="0 0 12 8"
						fill="none"
					>
						<path
							d="M1 1.5L6 6.5L11 1.5"
							stroke="#6B7280"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</div>
			</button>

			{isOpen && (
				<div className="
          absolute
          top-full
          left-0
          right-0
          mt-2
          py-2
          bg-white
          border border-[#E5E7EB]
          rounded-lg
          shadow-lg
          z-50
          overflow-hidden
        ">
					{sortOptions.map((option) => (
						<button
							key={option.value}
							type="button"
							onClick={() => handleSelect(option.value)}
							className={`
                w-full
                px-4 py-2.5
                text-left
                text-[14px]
                transition-colors
                duration-150
                ${
								option.value === value
									? 'bg-[#FF7A00] text-white font-medium'
									: 'text-[#1F2937] hover:bg-[#F3F4F6]'
							}
              `}
						>
							{option.label}
						</button>
					))}
				</div>
			)}
		</div>
	);
};
