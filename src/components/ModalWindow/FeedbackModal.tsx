"use client";

import { FC, useState, FormEvent } from "react";
import { useCreateFeedback } from "@/hooks/feedback/useCreateFeedback";

type FeedbackModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
};

export const FeedbackModal: FC<FeedbackModalProps> = ({
    isOpen,
    onClose,
    title = "ОБРАТНАЯ СВЯЗЬ",
}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [agree, setAgree] = useState(false);
    const [success, setSuccess] = useState(false);

    const { createFeedback, isLoadingCreate } = useCreateFeedback();

    if (!isOpen) return null;

    const isValid =
        name.trim() !== "" &&
        email.trim() !== "" &&
        phone.trim() !== "" &&
        message.trim() !== "" &&
        agree;

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isValid || isLoadingCreate) return;

        createFeedback(
            {
                name: name.trim(),
                email: email.trim(),
                phone: phone.trim(),
                text: message.trim(),
            },
            {
                onSuccess: () => {
                    setName("");
                    setEmail("");
                    setPhone("");
                    setMessage("");
                    setAgree(false);
                    setSuccess(true);
                    setTimeout(() => {
                        setSuccess(false);
                        onClose();
                    }, 2000);
                },
                onError: (error) => {
                    console.error("Ошибка при отправке обратной связи:", error);
                },
            }
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* затемнение фона */}
            <div
                className="absolute inset-0 bg-black/40"
                onClick={onClose}
            />

          {/* сама модалка */}
            <div className="relative z-10 w-full max-w-[353px] md:max-w-[420px] bg-white rounded-2xl p-8 shadow-xl">
                <div className="flex justify-between items-start mb-6">
                    <h2 className="text-2xl font-bold uppercase text-black">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-2xl leading-none hover:opacity-70 text-black"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>
                {/* форма */}
                <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* имя */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[16px] font-semibold text-black" htmlFor="name">
                            Имя
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Имя"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full h-[40px] rounded-[10px] border border-gray-200 px-4 text-[16px] text-black placeholder:text-gray-400 focus:outline-none focus:border-[#F0882B]"
                        />
                    </div>

                    {/* электронная почта */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[16px] font-semibold text-black" htmlFor="email">
                            Электронная почта
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-[40px] rounded-[10px] border border-gray-200 px-4 text-[16px] text-black placeholder:text-gray-400 focus:outline-none focus:border-[#F0882B]"
                        />
                    </div>

                    {/* телефон */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[16px] font-semibold text-black" htmlFor="phone">
                            Телефон
                        </label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="+ 7 (___) ___ __ __"
                            required
                            pattern="^(\+7\d{10}|8\d{10})$"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full h-[40px] rounded-[10px] border border-gray-200 px-4 text-[16px] text-black placeholder:text-gray-400 focus:outline-none focus:border-[#F0882B]"
                        />
                    </div>

                    {/* текст обращения */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[16px] font-semibold text-black" htmlFor="message">
                            Текст вашего обращения
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            placeholder="..."
                            required
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full min-h-[70px] rounded-[10px] border border-gray-200 px-4 py-3 text-[16px] text-black placeholder:text-gray-400 resize-none focus:outline-none focus:border-[#F0882B]"
                        />
                    </div>

                    {/* чекбокс */}
                    <div className="flex items-start gap-2">
                        <input
                            id="agree"
                            name="agree"
                            type="checkbox"
                            required
                            checked={agree}
                            onChange={(e) => setAgree(e.target.checked)}
                            className="mt-1 w-4 h-4 border border-gray-300 rounded"
                        />
                        <label htmlFor="agree" className="text-[12px] leading-snug text-black">
                            Нажимая «Отправить», вы соглашаетесь с условиями политики конфиденциальности
                        </label>
                    </div>

                    {/* кнопка отправки */}
                    <div className="flex justify-end pt-2">
                        <button
                            type="submit"
                            disabled={!isValid || isLoadingCreate}
                            className={`px-8 h-[40px] rounded-[10px] text-white text-[16px] font-semibold transition
                                ${
                                    isValid && !isLoadingCreate
                                        ? "bg-[#F0882B] hover:brightness-95"
                                        : "bg-gray-300 cursor-not-allowed"
                                }`}
                        >
                            {isLoadingCreate ? "Отправка..." : "Отправить"}
                        </button>
                    </div>
                </form>
            </div>
            {success && (
                <div className="absolute bottom-4 right-4 z-50 rounded-lg bg-white border border-green-400 text-green-700 shadow-lg px-4 py-3 text-sm max-w-xs">
                    Сообщение успешно отправлено
                </div>
            )}
        </div>
    );
};