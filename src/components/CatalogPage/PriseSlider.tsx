"use client";

import * as Slider from "@radix-ui/react-slider";
import { useState } from "react";

type Props = {
	min?: number;
	max?: number;
	step?: number;
	initial?: [number, number];
	onChange?: (v: [number, number]) => void;
};

export default function PriceSlider({
										min = 0,
										max = 1_500_000,
										step = 1000,
										initial = [0, 1_500_000],
										onChange,
									}: Props) {
	const [val, setVal] = useState<[number, number]>(initial);
	const [from, to] = val;

	const handleCommit = (v: number[]) => {
		const next: [number, number] = [
			Math.max(min, Math.min(v[0], v[1])),
			Math.min(max, Math.max(v[0], v[1])),
		];
		setVal(next);
		onChange?.(next);
	};

	const onFromInput = (s: string) => {
		const n = parseFloat(s) || min;
		handleCommit([Math.min(n, to), to]);
	};
	const onToInput = (s: string) => {
		const n = parseFloat(s) || max;
		handleCommit([from, Math.max(n, from)]);
	};

	return (
		<div className="w-full">
			<div className="flex items-start gap-4 mb-4">
				<div className="flex-1">
					<div className="text-sm text-black mb-1.5">От</div>
					<input
						type="number"
						value={from}
						onChange={(e) => onFromInput(e.target.value)}
						className="w-full rounded-xl border border-gray-300 text-black px-4 py-3 text-lg outline-none focus:border-gray-400"
					/>
				</div>
				<div className="flex-1">
					<div className="text-sm text-black mb-1.5">До</div>
					<input
						type="number"
						value={to}
						onChange={(e) => onToInput(e.target.value)}
						className="w-full rounded-xl border border-gray-300 text-black px-4 py-3 text-lg outline-none focus:border-gray-400"
					/>
				</div>
			</div>

			<div className="px-1">
				<Slider.Root
					min={min}
					max={max}
					step={step}
					value={val}
					onValueChange={(v) => setVal(v as [number, number])}
					onValueCommit={handleCommit}
					className="relative flex w-full touch-none select-none items-center"
				>
					<Slider.Track className="relative h-1.5 w-full grow rounded-full bg-gray-200">
						<Slider.Range className="absolute h-full rounded-full bg-[#2C2F33]" />
					</Slider.Track>
					<Slider.Thumb className="block size-5 rounded-full border-[3px] border-[#2C2F33] bg-white shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300" />
					<Slider.Thumb className="block size-5 rounded-full border-[3px] border-[#2C2F33] bg-white shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300" />
				</Slider.Root>
			</div>
		</div>
	);
}
