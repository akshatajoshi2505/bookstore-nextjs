'use client';

import { useCart } from '@/app/lib/CartContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const CartPage = () => {
    const { cart, updateQty, removeFromCart } = useCart();
    const router = useRouter();

    const calculateTotalPrice = () => {
        return cart.reduce((total, product) => total + (product.price * (product.qty || 1)), 0);
    };

    const handleIncreaseQty = (productId: string) => {
        const product = cart.find((p) => p.id === productId);
        if (product) {
            updateQty(productId, (product.qty || 1) + 1);
        }
    };

    const handleDecreaseQty = (productId: string) => {
        const product = cart.find((p) => p.id === productId);
        if (product && product.qty && product.qty > 1) {
            updateQty(productId, product.qty - 1);
        }
    };

    const handleRemoveItem = (productId: string) => {
        removeFromCart(productId);
    };

    return (
        <main className="flex min-h-screen flex-col p-6">
            <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="grid gap-6">
                    {cart.map((product) => (
                        <div key={product.id} className="flex items-center border p-4 rounded">
                            <Image src={product.imageUrl} alt={product.name} width={100} height={100} />
                            <div className="ml-4">
                                <h2 className="text-xl">{product.name}</h2>
                                <p>Price: ${product.price}</p>
                                <div className="flex items-center">
                                    <button
                                        onClick={() => handleDecreaseQty(product.id)}
                                        className="bg-gray-300 text-gray-800 py-1 px-3 rounded-l"
                                    >-</button>
                                    <input
                                        type="number"
                                        readOnly
                                        value={product.qty || 1}
                                        className="border py-1 px-4 text-center w-16"
                                    />
                                    <button
                                        onClick={() => handleIncreaseQty(product.id)}
                                        className="bg-gray-300 text-gray-800 py-1 px-3 rounded-r"
                                    >+</button>
                                </div>
                                <button
                                    onClick={() => handleRemoveItem(product.id)}
                                    className="mt-2 bg-red-500 text-white py-1 px-3 rounded"
                                >
                                    Remove
                                </button>
                                <p className="mt-2">Total: ${(product.price * (product.qty || 1)).toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <h2 className="text-2xl font-bold mt-6">Total Price: ${calculateTotalPrice().toFixed(2)}</h2>
            {cart.length > 0 && (
                <button
                    onClick={() => router.push('/checkout')}
                    className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
                >
                    Checkout
                </button>
            )}
        </main>
    );
};

export default CartPage;
