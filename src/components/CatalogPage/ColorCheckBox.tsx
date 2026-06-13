import React from "react";

type Props = {
	id: string;
	label: string;
	colorHex: string;
	checked: boolean;
	onChange: (checked: boolean) => void;
};

export const ColorCheckbox: React.FC<Props> = ({ id, label, colorHex, checked, onChange }) => {
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
				className="block size-7 rounded-sm border-2 transition-colors peer-checked:border-[#FF7A00] peer-checked:border-[3px] border-transparent pointer-events-none"
				style={{ backgroundColor: colorHex }}
			/>
			<span className="text-[16px] leading-6 text-[#1F2937] capitalize pointer-events-none">{label}</span>
		</label>
	);
};
