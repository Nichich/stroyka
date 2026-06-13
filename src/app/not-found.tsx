import Image from "next/image"

export default function NotFound() {
    return (
        <div className="bg-[#FFFFFF] py-20 w-full ">
            <div className="flex flex-col md:flex-row items-center justify-center">
                <Image
                    alt="страница не найдена"
                    src="/page-not-found.svg"
                    width={256}
                    height={256}
                    className="h-64 w-64"
                />
                <div className="text-black max-w-xl md:ml-16 text-center md:text-left ">
                    <h1 className="text-7xl font-bold text-[#F0882B]">404</h1>
                    <div className="text-[24px] md:text-[32px] font-bold">
                        СТРАНИЦА НЕ НАЙДЕНА
                    </div>
                    <div
                        className="w-[70px] h-1 bg-[#F0882B] rounded-full mb-6 mt-2 mx-auto md:mx-0"
                    />
                    <div className="">
                        Извините, но страница, которую вы ищете, не существует.
                        <br></br>
                        Возможно, она была удалена или вы ввели неправильный адрес.
                        <br></br>
                        Пожалуйста, вернитесь на главную страницу или свяжитесь с нами, если вы считаете, что это ошибка.
                    </div>
                </div>

            </div>
        </div>
    )
}