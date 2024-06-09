'use client';

import { createContext, useContext, useState } from 'react';

interface Product {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    qty: number;
}

interface Order {
    id: string;
    items: Product[];
    total: number;
}

interface OrderContextType {
    orders: Order[];
    addOrder: (order: Order) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
    const [orders, setOrders] = useState<Order[]>([
        {
            id: '101',
            items: [
                {
                    id: '1',
                    name: 'Alices adventures in wonderland',
                    price: 8,
                    qty: 2,
                    imageUrl: '/images/alices-adventures-in-wonderlandr.jpg'
                },
                {
                    id: '2',
                    name: 'The world of Ice and Fire by R.R Martin',
                    price: 11,
                    qty: 1,
                    imageUrl: '/images/GOT_ice_and_fire.jpg'
                },
            ],
            total: 27
        }
    ]);

    const addOrder = (order: Order) => {
        setOrders((prevOrders) => [...prevOrders, order]);
    };

    return (
        <OrderContext.Provider value={{ orders, addOrder }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrder = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error('useOrder must be used within an OrderProvider');
    }
    return context;
};
