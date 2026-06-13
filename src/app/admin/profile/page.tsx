'use client'

import ProfilePage from "@/components/Admin/ProfileAdmin";
import { useGetProfile } from '@/hooks/auth/useGetProfile';


export default function MainAdminPage(){
    const { profile, isLoading } = useGetProfile()

    if (isLoading) {
        return (
            <div className='text-black p-[40px]'>
                <div className='text-center'>Загрузка...</div>
            </div>
        )
    }

    if (!profile) {
        return (
            <div className='text-black p-[40px]'>
                <div className='text-center'>Профиль не найден</div>
            </div>
        )
    }

    return(
        <>
           <ProfilePage admin={{ name: profile.name, login: profile.email, password: '' }}/>
        </>
    )
}