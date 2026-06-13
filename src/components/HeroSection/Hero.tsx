import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/Categories";
import CategoryCard from "@/components/CategoryCard/Category";

export default function Hero() {
    return (
        <section
            className="
                relative h-[781px] bg-cover bg-center bg-no-repeat
                bg-[url('/bgmob.webp')]
                md:bg-[url('/herobg.webp')]
            "
        >
            <div className="max-w-[1400px] mx-auto flex flex-col-reverse md:flex-col items-start px-[clamp(16px,calc(0.21875*(100vw-640px)+16px),100px)] pt-10 md:pt-30">
                {/* рамка + текст */}
                <div className="flex items-center justify-start relative md:mt-0 mt-10">
                    <Image
                        src="/title.svg"
                        alt="title frame"
                        width={522}
                        height={287}
                        className="w-full max-w-[522px] h-auto"
                    />
                </div>

                {/* кнопки под блоком */}
                <div className="flex items-center justify-start gap-4 md:mt-20 mb-6 md:mb-0">
                    {/* связаться */}
                    <Link
                        href="/contacts"
                        className="inline-flex items-center justify-center px-6 h-[48px] rounded-[10px] bg-[#F0882B] text-white text-[16px] font-semibold hover:brightness-95 transition"
                    >
                        Связаться
                    </Link>
                    {/* каталог товаров */}
                    <Link
                        href="/catalog"
                        className="inline-flex items-center gap-3 px-4 h-[48px] rounded-[10px] border border-white/30 text-white text-[16px] font-normal  hover:bg-white/20 transition"
                    >
                        <span>Каталог товаров</span>
                        <Image src="/arrows.svg" alt="" width={24} height={24} />
                    </Link>
                </div>
            </div>

            <div className="mx-auto max-w-[1400px] md:w-full grid gap-5 md:gap-3 grid-cols-1 sm:grid-cols-1 md:grid-cols-3 px-5 md:px-25 pt-115 sm:pt-110 md:pt-35 ">
                {categories.map(c => (
                    <CategoryCard
                        key={c.id}
                        title={c.title}
                        href={c.href}
                        iconSrc={c.iconSrc}
                    />
                ))}
            </div>
        </section>
    );
}