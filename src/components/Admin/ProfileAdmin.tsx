'use client'

import { Admin } from "@/shared/admin/admin.interface";
import { count } from "console";
import { ConfirmDeleteModal } from "./DeleteAdmin";
import React from "react";

interface Props{
  admin: Admin;
}


const ProfilePage: React.FC<Props> = ({admin}) =>{

    const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);

    const handleDeleteAccount = () => {
        console.log("Удаляем аккаунт");
        setIsDeleteOpen(false);
    };

    return(
        <div className="text-black p-[40px]">

            <div className="">
                <span className=" font-inter font-semibold text-[24px] leading-[100%] tracking-[-0.02em]">Мой профиль</span>
                <div className="max-w-[1000px] w-full border-b-[2px] border-[#DBDBDB] mt-[30px]"></div>
            </div>

            <div className="max-w-[1000px] w-full border-[1px] border-[#DBDBDB] mt-[70px] p-[20px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                <div className="flex flex-col gap-4">
                    <span>Логин</span>
                    <span >{admin.login}</span>
                </div>

                <div className="flex flex-col gap-4">
                    <span>Пароль</span>
                    <span >{admin.password}</span>
                </div>

                <div className="flex flex-col gap-4">
                    <span>Имя</span>
                    <span >{admin.name}</span>
                </div>

                <button className="border-[1px] rounded-[6px]" onClick={() => setIsDeleteOpen(true)}>
                    Удалить аккаунт
                </button>

                <ConfirmDeleteModal
                    open={isDeleteOpen}
                    onClose={() => setIsDeleteOpen(false)}
                    onConfirm={handleDeleteAccount}
                />
                

            </div>
            
        </div>
    )
}

export default ProfilePage;