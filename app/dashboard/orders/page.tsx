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
                        orders.map((order) => (
                            <Order key={order._id} order={order} onStatusChange={handleStatusChange} />
                        ))
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

        <tr key={order._id} className="hover:bg-gray-100">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order._id}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customerName}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <select name="orderStatus" value={order.orderStatus} onChange={(e) => handleStatusChange(e.target.value)} className="form-select block w-full mt-1">
                <option>Pending</option>
                <option>Shipped</option>
                <option>Delivered</option>
            </select>

            </td>
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
            {showConfirm && (
                <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                    Confirm Order Status Change
                                </h3>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Are you sure you want to change the order status?
                                    </p>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button type="button" onClick={() => setShowConfirm(false)} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                                    Cancel
                                </button>
                                <button type="button" onClick={() => confirmChange(order._id, newStatus)} className="...">
                                    Confirm
                                </button>


                            </div>
                        </div>
                    </div>
                </div>
            )}
        </tr>
    );
};
export default Orders;
