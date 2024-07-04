'use client';
import { useState, useEffect, SetStateAction } from 'react';
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

type OrderProps = {
    order: OrderType;
    onStatusChange: (orderId: string, newStatus: string) => Promise<void>;
};

const Orders = () => {
    const [orders, setOrders] = useState<OrderType[]>([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');

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

    const handleStatusChange = async (orderId: string, orderStatus: string) => {
        try {
            await axios.put(`/api/orders/${orderId}`, { orderStatus });
            sendGetRequest(); // Refresh orders after successful update
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen p-6 bg-gray-50 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-teal-800 mb-4">Orders</h2>
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
                        orders.map((order) => (
                            <Order key={order._id} order={order} onStatusChange={handleStatusChange} />
                        ))
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

const Order = ({ order, onStatusChange }: OrderProps) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const [newStatus, setNewStatus] = useState(order.orderStatus);

    const handleStatusChange = (newValue: string) => {
        setNewStatus(newValue);
        setShowConfirm(true);
    };

    const confirmChange = async (_id: string, newStatus: string) => {
        await onStatusChange(_id, newStatus);
        setShowConfirm(false); // Close the confirmation dialog
    };

    return (
        <>
            <tr className="hover:bg-gray-100 transition duration-300 ease-in-out">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-teal-700">{order._id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.customerName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-bold leading-5 rounded-full ${order.isPaid ? 'bg-teal-100 text-teal-800' : 'bg-red-100 text-red-800'}`}>
                        {order.isPaid ? 'Paid' : 'Unpaid'}
                    </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                    <select
                        name="orderStatus"
                        value={newStatus}
                        onChange={(e) => handleStatusChange(e.target.value)}
                        className="form-select block w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white text-gray-900 hover:bg-teal-50 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    >
                        <option value="Pending">Pending</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                    </select>
                </td>
            </tr>
            {showConfirm && (
                <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-lg transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-teal-600 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <h3 className="text-lg leading-6 font-medium text-white" id="modal-title">
                                    Confirm Order Status Change
                                </h3>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-200">
                                        Are you sure you want to change the order status?
                                    </p>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm(false)}
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={() => confirmChange(order._id, newStatus)}
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-600 text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:w-auto sm:text-sm"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Orders;
