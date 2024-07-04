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
    _id: string;
    expiryDate: string;
    cvv: string;
    orderStatus: string;
    isPaid: boolean;
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
        <div className="min-h-screen p-6 bg-gray-50 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-teal-800 mb-6">Orders</h2>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-teal-600 text-white">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            Order#
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            Customer Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            Is Paid
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            Order Status
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {orders.length > 0 ? (
                        orders.map((order) => <Order order={order} key={order._id.toString()} />)
                    ) : (
                        <tr>
                            <td colSpan={4} className="text-center py-4 text-gray-500">Loading Orders...</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

const Order = ({ order }: PropsOrders) => {
    return (
        <tr className="hover:bg-teal-50 transition duration-300 ease-in-out">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-teal-800">
                <Link href={`/orders/${order._id}`} className="hover:text-yellow-500" passHref>
                    {order._id}
                </Link>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.customerName}</td>
            <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                {order.isPaid ? (
                    <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-5 text-teal-800 bg-teal-100 rounded-full">
                        Paid
                    </span>
                ) : (
                    <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-5 text-red-800 bg-red-100 rounded-full">
                        Unpaid
                    </span>
                )}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.orderStatus}</td>
        </tr>
    );
};

export default Orders;
