// src/components/CategoryCard.tsx
import Link from "next/link";
import Image from "next/image";

type Props = {
    title: string;
    href: string;
    iconSrc?: string;
};

export default function CategoryCard({ title, href, iconSrc, }: Props) {
    return (
        <Link
            href={href}
            className={[
                "group relative block rounded-[12px] bg-white",
                "border",
                "shadow-[0_4px_20px_rgba(0,0,0,0.15)]",
                "px-6 py-4 md:px-6 md:py-6 min-h-[130px]",
                "transition-colors",
                "transition-transform",
                "hover:scale-[1.02]",
                "hover:shadow-[0_6px_24px_rgba(0,0,0,0.18)]"
            ].join(" ")}
        >
            {/* оранжевая точка */}
            <span className="absolute left-4 top-4 block h-3 w-3 rounded-full bg-[#F0882B]" />
            {/* заголовок */}
            <h3 className="max-w-[16ch] font-semibold text-[#2E3233] text-[22px] leading-[1.15] md:text-[20px] lg:text-[] ml-4">
                {title}
            </h3>
            {/* иконка справа снизу */}
            {iconSrc && (
                <Image
                    src={iconSrc}
                    alt=""
                    width={66}
                    height={66}
                    style={{ width: 'auto', height: 'auto' }}
                    className="pointer-events-none absolute right-0 bottom-0 opacity-60"
                />
            )}
        </Link>
    );
}