// components/OrderForm/OrderForm.tsx
'use client';

import React, { useState } from 'react';
import { useCreateOrder } from '@/hooks/orders/useCreateOrder';
import { useCart } from './CardContext';

interface OrderFormData {
	name: string;
	email: string;
	phone: string;
	address: string;
	comment: string;
	agreeToPrivacy: boolean;
}

interface OrderFormProps {
	totalPrice: number;
}

export const OrderForm: React.FC<OrderFormProps> = ({ totalPrice }) => {
	const { createOrder, isLoadingCreate } = useCreateOrder();
	const { clearCart } = useCart();
	const [success, setSuccess] = useState(false);
	const [formData, setFormData] = useState<OrderFormData>({
		name: '',
		email: '',
		phone: '',
		address: '',
		comment: '',
		agreeToPrivacy: false,
	});

	const [errors, setErrors] = useState<Partial<OrderFormData>>({});

	const validateForm = (): boolean => {
		const newErrors: Partial<OrderFormData> = {};

		if (!formData.name.trim()) {
			newErrors.name = 'Обязательное поле';
		}
		if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
			newErrors.email = 'Некорректный email';
		}
		if (!formData.phone.match(/^\+?[0-9\s\(\)\-]{10,}$/)) {
			newErrors.phone = 'Некорректный номер телефона';
		}
		if (!formData.address.trim()) {
			newErrors.address = 'Обязательное поле';
		}
		if (!formData.agreeToPrivacy) {
			newErrors.agreeToPrivacy = true as any;
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (validateForm()) {
			createOrder(
				{
					name: formData.name.trim(),
					email: formData.email.trim(),
					phone: formData.phone.trim(),
					address: formData.address.trim(),
					summary: totalPrice,
					text: formData.comment.trim() || undefined,
				},
				{
					onSuccess: () => {
						setFormData({
							name: '',
							email: '',
							phone: '',
							address: '',
							comment: '',
							agreeToPrivacy: false,
						});
						setSuccess(true);
						clearCart();
						setTimeout(() => {
							setSuccess(false);
						}, 3000);
					},
					onError: (error) => {
						console.error('Ошибка при создании заказа:', error);
					}
				}
			);
		}
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value, type } = e.target;
		const checked = (e.target as HTMLInputElement).checked;

		setFormData({
			...formData,
			[name]: type === 'checkbox' ? checked : value,
		});
	};

	return (
		<div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-4">
			<h2 className="text-2xl font-bold text-black mb-6">ОФОРМЛЕНИЕ ЗАКАЗА</h2>

			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block text-sm text-gray-500 font-medium mb-2">Имя</label>
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						placeholder="Имя"
						className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
							errors.name ? 'border-red-500' : 'border-gray-300'
						}`}
					/>
				</div>

				<div>
					<label className="block text-sm text-gray-500 font-medium mb-2">Электронная почта</label>
					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						placeholder="Email"
						className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
							errors.email ? 'border-red-500' : 'border-gray-300'
						}`}
					/>
				</div>

				<div>
					<label className="block text-sm text-gray-500 font-medium mb-2">Телефон</label>
					<input
						type="tel"
						name="phone"
						value={formData.phone}
						onChange={handleChange}
						placeholder="+ 7 (___) ___ __ __"
						className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
							errors.phone ? 'border-red-500' : 'border-gray-300'
						}`}
					/>
				</div>

				<div>
					<label className="block text-sm text-gray-500 font-medium mb-2">Доставка</label>
					<input
						type="text"
						name="address"
						value={formData.address}
						onChange={handleChange}
						placeholder="Адрес доставки"
						className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
							errors.address ? 'border-red-500' : 'border-gray-300'
						}`}
					/>
					<p className="text-xs text-gray-500 mt-1">
						Если вам нужна доставка, введите название населенного пункта и области
					</p>
				</div>

				<div>
					<label className="block text-sm text-gray-500 font-medium mb-2">Комментарий</label>
					<textarea
						name="comment"
						value={formData.comment}
						onChange={handleChange}
						placeholder="..."
						rows={4}
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
					/>
				</div>

				<div className="flex items-start gap-2">
					<input
						type="checkbox"
						name="agreeToPrivacy"
						checked={formData.agreeToPrivacy}
						onChange={handleChange}
						className="mt-1"
					/>
					<label className="text-xs text-gray-600">
						Нажимая «Отправить», вы соглашаетесь с условиями политики конфиденциальности
					</label>
				</div>

				<div className="border-t pt-4 mt-6">
					<div className="flex justify-between items-center mb-4">
						<span className="text-lg text-black font-semibold">Итоговая стоимость:</span>
						<span className="text-2xl text-black font-bold">{totalPrice.toFixed(2)} руб.</span>
					</div>

					<p className="text-xs text-gray-500 mb-4">
						Цена и наличие товара, а также стоимость и условия доставки являются предварительными и будут уточнены в момент подтверждения заказа по телефону. Расчет выполнен по розничным ценам, цена с учетом скидки для оптовых покупателей будет уточнена и сообщена менеджером.
					</p>

					<button
						type="submit"
						disabled={!formData.agreeToPrivacy || isLoadingCreate}
						className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition disabled:opacity-70 disabled:cursor-not-allowed"
					>
						{isLoadingCreate ? 'Отправка...' : 'Оформить заявку'}
					</button>
				</div>
			</form>

			{success && (
				<div className="mt-4 rounded-lg bg-white border border-green-400 text-green-700 shadow-lg px-4 py-3 text-sm">
					Заказ успешно оформлен! Корзина очищена.
				</div>
			)}
		</div>
	);
};
