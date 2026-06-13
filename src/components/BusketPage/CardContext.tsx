'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface CartItem {
	productId: string;
	quantity: number;
	area: number;
	color?: string;
}

interface CartContextType {
	items: CartItem[];
	addItem: (productId: string, quantity: number, area: number, color?: string) => void;
	removeItem: (productId: string) => void;
	updateQuantity: (productId: string, quantity: number) => void;
	updateArea: (productId: string, area: number) => void;
	clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'dobrostroi-cart';
const CART_TIMESTAMP_KEY = 'dobrostroi-cart-timestamp';
const CART_EXPIRY_HOURS = 24; // Корзина очищается через 24 часа

export const CartProvider = ({ children }: { children: ReactNode }) => {
	const [items, setItems] = useState<CartItem[]>([]);
	const [isInitialized, setIsInitialized] = useState(false);

	// Загружаем корзину из localStorage при монтировании
	useEffect(() => {
		try {
			const savedCart = localStorage.getItem(CART_STORAGE_KEY);
			const savedTimestamp = localStorage.getItem(CART_TIMESTAMP_KEY);

			if (savedCart && savedTimestamp) {
				const timestamp = parseInt(savedTimestamp, 10);
				const now = Date.now();
				const hoursPassed = (now - timestamp) / (1000 * 60 * 60);

				// Если корзина старше 24 часов, очищаем
				if (hoursPassed > CART_EXPIRY_HOURS) {
					localStorage.removeItem(CART_STORAGE_KEY);
					localStorage.removeItem(CART_TIMESTAMP_KEY);
					setItems([]);
				} else {
					setItems(JSON.parse(savedCart));
				}
			}
		} catch (error) {
			console.error('Ошибка загрузки корзины:', error);
			localStorage.removeItem(CART_STORAGE_KEY);
			localStorage.removeItem(CART_TIMESTAMP_KEY);
		}
		setIsInitialized(true);
	}, []);

	useEffect(() => {
		if (isInitialized) {
			try {
				if (items.length > 0) {
					localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
					localStorage.setItem(CART_TIMESTAMP_KEY, Date.now().toString());
				} else {
					localStorage.removeItem(CART_STORAGE_KEY);
					localStorage.removeItem(CART_TIMESTAMP_KEY);
				}
			} catch (error) {
				console.error('Ошибка сохранения корзины:', error);
			}
		}
	}, [items, isInitialized]);

	const addItem = (productId: string, quantity: number, area: number, color?: string) => {
		setItems((prev) => {
			const existing = prev.find((item) => item.productId === productId && item.color === color);
			if (existing) {
				return prev.map((item) =>
					item.productId === productId && item.color === color
						? { ...item, quantity: item.quantity + quantity, area: item.area + area }
						: item
				);
			}
			return [...prev, { productId, quantity, area, color }];
		});
	};

	const removeItem = (productId: string) => {
		setItems((prev) => prev.filter((item) => item.productId !== productId));
	};

	const updateQuantity = (productId: string, quantity: number) => {
		setItems((prev) =>
			prev.map((item) =>
				item.productId === productId ? { ...item, quantity } : item
			)
		);
	};

	const updateArea = (productId: string, area: number) => {
		setItems((prev) =>
			prev.map((item) =>
				item.productId === productId ? { ...item, area } : item
			)
		);
	};

	const clearCart = () => setItems([]);

	return (
		<CartContext.Provider
			value={{ items, addItem, removeItem, updateQuantity, updateArea, clearCart }}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => {
	const context = useContext(CartContext);
	if (!context) throw new Error('useCart must be used within CartProvider');
	return context;
};
