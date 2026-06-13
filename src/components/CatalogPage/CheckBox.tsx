import React from "react";

type Props = {
	id: string;
	label: string;
	checked: boolean;
	onChange: (checked: boolean) => void;
};

export const CheckboxItem: React.FC<Props> = ({ id, label, checked, onChange }) => {
	const handleClick = (e: React.MouseEvent<HTMLLabelElement>) => {
		e.preventDefault();
		onChange(!checked);
	};

	return (
		<label 
			htmlFor={id} 
			className="flex items-center gap-3 cursor-pointer select-none touch-manipulation"
			onClick={handleClick}
		>
			<input
				id={id}
				type="checkbox"
				checked={checked}
				onChange={(e) => {
					e.stopPropagation();
					onChange(e.target.checked);
				}}
				className="peer sr-only"
			/>
			<span
				aria-hidden
				className="block size-[14px] rounded-[2px] border border-[#D1D5DB] bg-white
                   peer-checked:bg-[#FF7A00] peer-checked:border-[#FF7A00]
                   peer-focus-visible:ring-2 peer-focus-visible:ring-[#FFD1B0] transition-colors pointer-events-none"
			/>
			<span className="text-[16px] leading-6 text-[#1F2937] capitalize pointer-events-none">{label}</span>
		</label>
	);
};

