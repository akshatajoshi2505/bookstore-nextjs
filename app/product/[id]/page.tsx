'use client';

import { useRouter } from 'next/router';
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
    //const router = useRouter(); // Use useRouter for accessing params
    const _id = useParams(); // Access id from router.query
    const { addToCart } = useCart();
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                console.log("_id : " + _id);
                // Ensure id is a string before using it in the URL
                const productId = window.location.pathname.split('/').pop();
                console.log("product : " + productId);
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
        <main className="flex min-h-screen flex-col p-6">
            <div className="flex flex-row p-4">
                {product && (
                    <>
                        <Image src={'/images' + (product.imageURL || '/No-image.jpg')} alt={product.title} width={500} height={500} />
                        <div className="flex flex-col p-24">
                            <h2 className="text-2xl font-bold p-4">{product.title}</h2>
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