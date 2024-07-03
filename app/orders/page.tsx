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
        <div className="min-h-screen p-4 bg-gray-100 rounded-lg shadow-md">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order#
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Is Paid
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order Status
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {orders.length > 0? (
                    orders.map((order) => <Order order={order} key={order._id.toString()} />)
                ) : (
                    <tr>
                        <td colSpan={4} className="text-center py-4">Loading Orders...</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

const Order = ({ order }: PropsOrders) => {
    return (

        <tr key={order._id} className="hover:bg-gray-100">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <Link href={`/orders/${order._id}`} className="hover:text-blue-500" passHref>
                    {order._id}
                </Link>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customerName}</td>
            <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                {order.isPaid? (
                    <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-5 text-green-800 bg-green-100 rounded-full">
                        Paid
                    </span>
                ) : (
                    <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-5 text-red-800 bg-red-100 rounded-full">
                        Unpaid
                    </span>
                )}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.orderStatus}</td>
        </tr>

    );
};
export default Orders;
