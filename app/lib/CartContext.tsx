'use client';

import { createContext, useContext, useState } from 'react';

interface Product {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    qty: number;
}

interface CartContextType {
    cart: Product[];
    addToCart: (product: Product) => void;
    updateQty: (productId: string, qty: number) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<Product[]>([]);

    const addToCart = (product: Product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((p) => p.id === product.id);
            if (existingProduct) {
                return prevCart.map((p) =>
                    p.id === product.id ? { ...p, qty: p.qty + product.qty } : p
                );
            }
            return [...prevCart, product];
        });
    };

    const updateQty = (productId: string, qty: number) => {
        setCart((prevCart) =>
            prevCart.map((p) =>
                p.id === productId ? { ...p, qty } : p
            )
        );
    };

    const removeFromCart = (productId: string) => {
        setCart((prevCart) => prevCart.filter((p) => p.id !== productId));
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, updateQty, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
