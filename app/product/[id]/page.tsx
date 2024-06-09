'use client';

import { useParams } from 'next/navigation';
import { useCart } from '@/app/lib/CartContext';
import { useEffect, useState } from 'react';

interface Product {
    id: string;
    name: string;
    price: number;
    qty?: number;
}

const ProductPage = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        if (id) {
            const fetchedProduct: Product = {
                id: id as string,
                name: `Product ${id}`,
                price: Math.floor(Math.random() * 100) + 1,
            };
            setProduct(fetchedProduct);
        }
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
        addToCart(product);
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <main className="flex min-h-screen flex-col p-6">
            <div className="p-4">
                <h2 className="text-2xl font-bold">{product.name}</h2>
                <p className="text-lg">Price: ${product.price}</p>
                <button
                    onClick={handleAddToCart}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                >
                    Add to Cart
                </button>
            </div>
        </main>
    );
};

export default ProductPage;
