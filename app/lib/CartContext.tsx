'use client'

import React, { createContext, useContext, useState, ReactNode, ReactElement } from 'react';

interface Product {
    id: string;
    name: string;
    price: number;
    qty?: number;
};

interface CartContextProps {
    cart: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateQty: (productId: string, qty: number) => void;
};

const CartContext = createContext<CartContextProps | undefined>(undefined);

function useCart(): CartContextProps {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}

interface CartProviderProps {
    children: ReactNode;
}

function CartProvider({ children }: CartProviderProps): ReactElement {
    const [cart, setCart] = useState<Product[]>([]);

    const addToCart = (product: Product) => {
        setCart((prevCart) => {
        const existingProduct = prevCart.find((item) => item.id === product.id);
        if (existingProduct) {
            return prevCart.map((item) =>
            item.id === product.id ? { ...item, qty: (item.qty || 0) + 1 } : item
            );
        }
        return [...prevCart, { ...product, qty: 1 }];
        });
    };

    const removeFromCart = (productId: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    const updateQty = (productId: string, qty: number) => {
        setCart((prevCart) =>
        prevCart.map((item) =>
            item.id === productId ? { ...item, qty } : item
        )
        );
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty }}>
        {children}
        </CartContext.Provider>
    );
}



export { CartContext, useCart, CartProvider }; // Fixed export statements
