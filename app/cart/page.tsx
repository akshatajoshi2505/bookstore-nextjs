'use client';
import { useCart } from '@/app/lib/CartContext';

const Cart: React.FC = () => {
    const { cart, removeFromCart, updateQty } = useCart();

    return (
        <div className="p-6">
        <h1 className="text-3xl">Your Cart</h1>
        {cart.length === 0 ? (
            <p className="mt-4">Your cart is empty.</p>
        ) : (
            <ul className="mt-4 space-y-4">
            {cart.map((item) => (
                <li key={item.id} className="p-4 border border-gray-200 rounded-lg">
                <h2 className="text-xl">{item.name}</h2>
                <p className="text-gray-700">${item.price.toFixed(2)}</p>
                <p className="mt-2">Quantity: {item.qty}</p>
                <div className="mt-2 flex space-x-2">
                    <button
                    onClick={() => updateQty(item.id, (item.qty || 1) - 1)}
                    disabled={(item.qty || 1) <= 1}
                    className="rounded bg-gray-300 px-2 py-1"
                    >
                    -
                    </button>
                    <button
                    onClick={() => updateQty(item.id, (item.qty || 1) + 1)}
                    className="rounded bg-gray-300 px-2 py-1"
                    >
                    +
                    </button>
                    <button
                    onClick={() => removeFromCart(item.id)}
                    className="rounded bg-red-500 px-2 py-1 text-white"
                    >
                    Remove
                    </button>
                </div>
                </li>
            ))}
            </ul>
        )}
        </div>
    );
};

export default Cart;
