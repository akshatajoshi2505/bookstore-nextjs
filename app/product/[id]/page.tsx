'use client';

import { useParams } from 'next/navigation';
import { useCart } from '@/app/lib/CartContext';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Product {
    _id: string;
    title: string;
    description: string;
    author: string;
    price: number;
    publicationDate: string;
    isbn: string;
    imageURL: string;
    qty?: number;
}

const ProductPage = () => {
    const _id = useParams(); // Access id from router.query
    const { addToCart } = useCart();
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productId = window.location.pathname.split('/').pop();
                const response = await fetch(`/api/books/${productId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const productData = await response.json();
                setProduct(productData.data);
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        if (_id) {
            fetchProduct();
        }
    }, [_id]);

    const handleAddToCart = () => {
        if (product) {
            addToCart({ ...product, qty: quantity });
        }
    };

    const increaseQuantity = () => setQuantity((prev) => prev + 1);
    const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    return (
        <main className="min-h-screen flex flex-col p-8 bg-teal-50">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden flex flex-col lg:flex-row">
                <div className="relative h-96 w-full lg:w-1/2">
                    <Image
                        src={'/images' + (product?.imageURL || '/No-image.jpg')}
                        alt={product?.title || 'Product Image'}
                        fill
                        sizes="(max-width: 768px) 100vw, (min-width: 769px) 50vw"
                        className="object-cover rounded-t-lg lg:rounded-l-lg"
                    />
                </div>
                <div className="p-6 flex flex-col justify-between lg:w-1/2">
                    <div>
                        <h2 className="text-4xl font-bold text-teal-900 mb-4">{product?.title}</h2>
                        <p className="text-base text-gray-700 mb-6">{product?.description}</p>
                        <p className="text-xl font-semibold text-yellow-600 mb-8">Price: ${product?.price.toFixed(2)}</p>
                        <div className="flex items-center mb-8">
                            <label htmlFor="quantity" className="mr-4 text-lg font-medium text-gray-800">Quantity:</label>
                            <button
                                onClick={decreaseQuantity}
                                className="bg-teal-200 text-teal-800 py-2 px-4 rounded-l-lg hover:bg-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
                            >-</button>
                            <input
                                type="number"
                                id="quantity"
                                min="1"
                                value={quantity}
                                readOnly
                                className="border border-teal-300 py-2 px-4 text-center w-24 rounded-none"
                            />
                            <button
                                onClick={increaseQuantity}
                                className="bg-teal-200 text-teal-800 py-2 px-4 rounded-r-lg hover:bg-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
                            >+</button>
                        </div>
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className="bg-teal-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </main>
    );
};

export default ProductPage;
