"use client";
import Image from "next/image";
import Link from "next/link";

export default function HeaderOfLogin() {
  return (
    <header className="w-full bg-white shadow-md border-b border-gray-200 font-inter">
      <div className="h-[60px] md:h-[80px] flex items-center px-4 sm:px-6 md:px-10 lg:px-[clamp(16px,0.21875*(100vw-640px)+16px,100px)]">
        <div className="w-full max-w-[1400px] mx-auto flex items-center justify-between gap-4 sm:gap-6">
          
          <Link
            href="/"
            className="cursor-pointer flex-shrink-0"
            aria-label="На главную">
            <div className="min-w-[120px] sm:min-w-[146px] flex items-center">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={180}
                height={39}
                style={{ height: 'auto' }}
                className="w-[120px] sm:w-[146px] md:w-[140px] lg:w-[180px]"
                priority
              />
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            
            <button type="button" className=" flex items-center justify-center h-9 sm:h-10 px-4 rounded-[6px] bg-[#F0882B] text-white font-inter font-semibold text-[13px] sm:text-[14px] leading-[24px] hover:bg-[#d87521] transition-colors ">
              Вход
            </button>

            <button type="button" className=" flex items-center justify-center h-9 sm:h-10 border border-[#E2E2E2] text-black font-inter font-semibold text-[13px] sm:text-[14px] leading-[24px] hover:bg-gray-50 transition-colors px-4 rounded-[6px]">
              Регистрация
            </button>

          </div>

        </div>
      </div>
    </header>
  );
}