"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FeedbackModal } from "./ModalWindow/FeedbackModal";

export default function Footer() {
    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

    return (
        <footer className="bg-[#F3F3F3] text-[#2E3233] pt-10 md:pt-20 pb-10">
            <div className="max-w-[1400px] mx-auto px-15 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10">
                <div className="space-y-4">
                    <Image src="/logo.svg" alt="Добрострой25" width={180} height={50} style={{ height: 'auto' }} />
                    <p className="text-sm leading-5">
                        Производство качественных<br />
                        вибропрессованных изделий на Дальнем Востоке
                    </p>
                    <button
                        type="button"
                        onClick={() => setIsFeedbackOpen(true)}
                        className="inline-flex items-center justify-between gap-2 px-4 py-2 border border-gray-300 rounded-[10px] w-[208px] h-[40px] hover:bg-gray-100 transition mt-2"
                    >
                        <span className="font-semibold text-[14px]">Написать нам</span>
                        <Image src="/message.svg" alt="Написать" width={24} height={24} />
                    </button>
                </div>

                <div>
                    <h3 className="font-bold mb-1">КАТАЛОГ</h3>
                    <div className="w-[24px] h-[3px] bg-[#F0882B] rounded-full mb-3"></div>
                    <ul className="space-y-2 text-[14px]">
                        <li><Link href="/catalog?type=Тротуарная плитка" className="hover:text-[#F0882B]">Тротуарная плитка</Link></li>
                        <li><Link href="/catalog?type=Бордюры" className="hover:text-[#F0882B]">Бордюры</Link></li>
                        <li><Link href="/catalog?type=Блоки" className="hover:text-[#F0882B]">Блоки</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold mb-1">
                        <span className="md:hidden">ИНФОРМАЦИЯ</span>
                        <span className="hidden md:inline">ЗАВОД</span>
                    </h3>
                    <div className="w-[24px] h-[3px] bg-[#F0882B] rounded-full mb-3"></div>
                    <ul className="space-y-2 text-[14px]">
                        <li><Link href="/about" className="hover:text-[#F0882B]">О заводе</Link></li>
                        <li><Link href="/delivery" className="hover:text-[#F0882B]">Доставка</Link></li>
                        <li><Link href="/reviews" className="hover:text-[#F0882B]">Отзывы</Link></li>
                        <li><Link href="/contacts" className="hover:text-[#F0882B]">Контакты</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold mb-1">КОНТАКТЫ</h3>
                    <div className="w-[24px] h-[3px] bg-[#F0882B] rounded-full mb-3"></div>
                    <ul className="space-y-3 text-[14px]">
                        <li className="flex items-center gap-2">
                            <Image src="/phone.svg" alt="Телефон" width={16} height={16} />
                            <span>+7 (902) 487-28-77</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Image src="/mail.svg" alt="Email" width={16} height={16} />
                            <span>2105850@bk.ru</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <Image src="/location.svg" alt="Адрес" width={16} height={16} />
                            <span>
                                Приморский край, г.о. Владивостокский,<br />г. Владивосток, ул Шошина, Дом 6, офис 3
                            </span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Image src="/clock.svg" alt="Время" width={16} height={16} />
                            <span>Пн–Пт: 9:00–18:00</span>
                        </li>
                    </ul>
                </div>
            </div>

                <div className="max-w-[1400px] mx-auto mt-8 md:mt-10 border-t border-gray-200 pt-4 px-6 text-[13px] text-gray-600">
                    ©2025 ООО «Добрострой 25». Все права защищены.
                </div>
            <FeedbackModal
                isOpen={isFeedbackOpen}
                onClose={() => setIsFeedbackOpen(false)}
            />
        </footer>
    );
}