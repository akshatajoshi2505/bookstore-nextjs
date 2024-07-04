'use client';
import { useEffect, lazy, Suspense } from 'react';
import { useCart } from '@/app/lib/CartContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const CheckoutForm = lazy(() => import('@/app/ui/CheckoutForm'));

const CheckoutPage = () => {
    const { cart, updateQty, removeFromCart } = useCart();
    const router = useRouter();

    const calculateTotalPrice = () => {
        return cart.reduce((total, product) => total + (product.price * (product.qty || 1)), 0);
    };

    // Display cart items
    return (
        <main className="flex min-h-screen flex-col p-6 bg-teal-50">
            <h1 className="text-5xl font-extrabold text-teal-900 mb-8 text-center">Your Cart</h1>
            {cart.length === 0 ? (
                <p className="text-xl text-center text-gray-600">Your cart is empty.</p>
            ) : (
                <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-2xl">
                    <div className="grid gap-8 mb-8">
                        {cart.map((product) => (
                            <div key={product._id} className="flex items-center p-4 border border-teal-200 rounded-xl bg-teal-50 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                                <Image src={'/images' + (product.imageURL || '/No-image.jpg')} alt={product.title} width={120} height={120} className="object-cover rounded-md" />
                                <div className="ml-6 flex-grow">
                                    <h2 className="text-lg font-semibold text-teal-800">{product.title}</h2>
                                    <p className="text-sm text-gray-700">by {product.author}</p>
                                    <p className="text-md text-gray-700 mt-2">Price: <span className="font-medium">${product.price.toFixed(2)}</span></p>
                                    <p className="text-md text-gray-700 mt-1">Total: <span className="font-medium">${(product.price * (product.qty || 1)).toFixed(2)}</span></p>
                                </div>
                                <button
                                    onClick={() => removeFromCart(product._id)}
                                    className="ml-6 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                    <h2 className="text-3xl font-bold text-teal-900 mb-6 text-center">Total Price: ${calculateTotalPrice().toFixed(2)}</h2>
                    <div className="mt-8">
                        <Suspense fallback={<div className="text-center text-gray-500">Loading...</div>}>
                            <CheckoutForm />
                        </Suspense>
                    </div>
                </div>
            )}
        </main>
    );
};

export default CheckoutPage;
