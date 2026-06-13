import { Admin } from "@/shared/admin/admin.interface";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props{
  admin: Admin
  onLogout?: () => void
}

const HeaderOfMain: React.FC<Props> = ({admin, onLogout}) => {
  return (
    <header className="w-full bg-white shadow-md border-b border-gray-200 font-inter">
      <div className="h-[60px] w-full md:h-[80px] flex items-center px-4 sm:px-6 md:px-10 lg:px-[20]">
        <div className="w-full mx-auto flex items-center justify-between gap-4 sm:gap-6">
          
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

            <div className="flex gap-[5px] items-center">
              <span className="text-black ">{admin.name}</span>
              <Image src="/admin_logo.svg" alt="admin" width={30} height={30} style={{ width: 'auto', height: 'auto' }} />
            </div>
            
            <button
              type="button"
              onClick={onLogout}
              className=" flex items-center gap-[20px] h-9 sm:h-10 border border-[#E2E2E2] text-black font-inter font-semibold text-[13px] sm:text-[14px] leading-[24px] hover:bg-gray-50 transition-colors px-4 rounded-[6px] ">
              <span>Выход</span>
              <Image src="/log-out.svg" alt="logout" width={20} height={20} style={{ width: 'auto', height: 'auto' }} />
            </button>

          </div>

        </div>
      </div>
    </header>
  );
}

export default HeaderOfMain;