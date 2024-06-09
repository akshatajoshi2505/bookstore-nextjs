'use client';

import { useParams } from 'next/navigation';
import { useCart } from '@/app/lib/CartContext';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    qty?: number;
}

const ProductPage = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch('/products.json');
                const products: Product[] = await response.json();
                const foundProduct = products.find((p) => p.id === id);
                if (foundProduct) {
                    setProduct(foundProduct);
                }
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            addToCart({ ...product, qty: quantity });
        }
    };

    const increaseQuantity = () => setQuantity((prev) => prev + 1);
    const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    return (
        <main className="flex min-h-screen flex-col p-6">
            <div className="flex flex-row p-4">
                {product && (
                    <>
                        <Image src={product.imageUrl} alt={product.name} width={500} height={500} />
                        <div className="flex flex-col p-24">
                            <h2 className="text-2xl font-bold p-4">{product.name}</h2>
                            <p className="text-justify text-base p-4">{product.description}</p>
                            <p className="text-lg p-4">Price: ${product.price}</p>
                            <div className="flex items-center p-4">
                                <label htmlFor="quantity" className="mr-4">Quantity:</label>
                                <button
                                    onClick={decreaseQuantity}
                                    className="bg-gray-300 text-gray-800 py-1 px-3 rounded-l"
                                >-</button>
                                <input
                                    type="number"
                                    id="quantity"
                                    min="1"
                                    value={quantity}
                                    readOnly
                                    className="border py-1 px-4 text-center w-16"
                                />
                                <button
                                    onClick={increaseQuantity}
                                    className="bg-gray-300 text-gray-800 py-1 px-3 rounded-r"
                                >+</button>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </>
                )}
            </div>
        </main>
    );
};

export default ProductPage;
