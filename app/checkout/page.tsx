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
        <main className="flex min-h-screen flex-col p-6">
            <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
            {cart.length === 0? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="grid gap-6 m-auto">
                    {cart.map((product) => (
                        <div key={product.id} className="flex items-center border p-4 rounded">
                            <Image src={product.imageUrl} alt={product.name} width={100} height={100} />
                            <div className="ml-4">
                                <h2 className="text-xl">{product.name}</h2>
                                <p>Price: ${product.price}</p>
                                <p className="mt-2">Total: ${(product.price * (product.qty || 1)).toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <h2 className="text-2xl font-bold m-auto">Total Price: ${calculateTotalPrice().toFixed(2)}</h2>
            <Suspense fallback={<div>Loading...</div>}>
                <CheckoutForm />
            </Suspense>
        </main>
    );
};

export default CheckoutPage;
