'use client'

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface ProductInOrder {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
    quantity: number;
    pricePerItem: number;
}

interface OrderDetail {
    _id: string;
    customerName: string;
    orderStatus: string;
    isPaid: boolean;
    orderItems: ProductInOrder[];
}

const OrderDetailsPage = () => {
    const id = useParams();
    const [order, setOrder] = useState<OrderDetail | null>(null);

    useEffect(() => {
        const fetchOrder = async () => {

            const id = window.location.pathname.split('/').pop();
            if (!id) return;
            const orderResponse = await fetch(`/api/orders/${id}`);
           
            if (!orderResponse.ok) {
                throw new Error('Failed to load order');
            }
            let orderData = await orderResponse.json();
            console.log("orderData: ");
            console.log(orderData);
            orderData = orderData.data;
            // Assuming orderData contains the order details including orderItems
            // const orderItemsPromises = orderData.data.orderItems.map(async (item: { _id: any; }) => {
            //     const productResponse = await fetch(`/api/products/${item._id}`);
            //     if (!productResponse.ok) {
            //         throw new Error('Failed to load product');
            //     }
            //     const productData = await productResponse.json();
            //     return productData; // Return the product data
            // });

           // const productsData = await Promise.all(orderItemsPromises);
            const enrichedOrderData = {
               ...orderData,
                // orderItems: productsData.map((product) => ({
                //    ...product,
                //     quantity: orderData.orderItems.find((item: { _id: any; }) => item._id === product._id)?.quantity,
                // })),
            };

            setOrder(enrichedOrderData);
        };

        fetchOrder().catch(console.error);
    }, [id]);

    if (!order) {
        return <div>Loading...</div>;
    }

    return (
        <main className="flex flex-col justify-center items-start p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Order #{order._id}</h1>
            <div className="mb-4">
                <strong>Customer Name:</strong> {order.customerName}<br />
                <strong>Status:</strong> {order.orderStatus}<br />
                <strong>Paid:</strong> {order.isPaid? 'Yes' : 'No'}
            </div>

            <h2 className="text-2xl font-semibold mt-8">Products:</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* {order.orderItems.map((product) => (
                    <div key={product._id} className="rounded overflow-hidden shadow-lg">
                        <Image src={product.imageUrl} alt={product.title} width={500} height={500} layout="responsive" />
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{product.title}</div>
                            <p className="text-gray-700 text-base">{product.description}</p>
                        </div>
                        <div className="px-6 pt-4 pb-2">
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Qty: {product.quantity}</span>
                            <span className="inline-block bg-green-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">Price per item: ${product.pricePerItem}</span>
                        </div>
                    </div>
                ))} */}
            </div>
        </main>
    );
};

export default OrderDetailsPage;
