'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

    type PropsOrders = {
        order: OrderType;
    };
    type OrderType = {
        customerName: string;
        cardNumber: string;
        _id: number;
        expiryDate: string,
        cvv: string
    };
const Orders = () => {
    const [orders, setOrders] = useState<OrderType[]>([]);

    const sendGetRequest = async () => {
        try {
        const config = {
            headers: {
            'Content-Type': 'application/json',
            },
        };

        const response = await axios.get('/api/orders', config);

        setOrders(response.data.orders);
        console.log('aaa', response.data);
        } catch (err) {
        // Handle Error Here
        console.error(err);
        }
    };

    useEffect(() => {
        sendGetRequest();
    }, []);
    return (
        <div>
            <table className="w-full border-collapse border">
                <thead>
                <tr>
                    <th className="py-2 px-4 border">Order#</th>
                    <th className="py-2 px-4 border">Customer Name</th>
                </tr>
                </thead>
                {orders.length > 0 ? (
                    orders.map((order) => <Order order={order} key={order._id.toString()} />)
                ) : (
                    <div> No Order Found</div>
                )}
            </table>
        </div>
    );
};

const Order = ({ order }: PropsOrders) => {
    return (

            <tbody>
                <tr key={order._id}>
                <td className="py-2 px-4 border">{order._id}</td>
                <td className="py-2 px-4 border">{order.customerName}</td>
                </tr>
            </tbody>

    );
};
export default Orders;
