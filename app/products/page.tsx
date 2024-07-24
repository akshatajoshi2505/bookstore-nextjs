'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import * as actions from '@/app/actions';
type PropsProducts = {
    product: ProductType;
};
type ProductType = {
    _id: string;
    title: string;
    author: string;
    price: number;
    publicationDate: string;
    isbn: string;
    imageURL: string;
};

const ProductsPage = () => {
    const { data: session, status } = useSession(); // Use useSession

    const [products, setProducts] = useState<ProductType[]>([]);
    useEffect(() => {
        if (status === 'loading') return; // Do nothing while loading
        if (!session?.user) {
            // Redirect to login if not authenticated
            console.log("Redirecting to login because user is not authenticated."); // Debugging log
            window.location.href = '/login';
        }
    }, [session, status]);

    const sendGetRequest = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const response = await axios.get('/api/books', config);

            setProducts(response.data.data);
            console.log('aaa', response.data);
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };

    useEffect(() => {
        sendGetRequest();
    }, []);

    return (
        <main className="min-h-screen flex flex-col p-8 bg-teal-50">
            <h1 className="text-4xl font-extrabold text-teal-900 mb-12 text-center">Explore Our Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.length > 0 ? (
                    products.map((product) => (
                        <Product product={product} key={product._id.toString()} />
                    ))
                ) : (
                    <div className="col-span-3 text-center text-gray-600">Loading...</div>
                )}
            </div>
        </main>
    );
};

const Product = ({ product }: PropsProducts) => {
    return (
        <Link
            href={`/product/${product._id}`}
            className="group relative bg-white border border-teal-200 rounded-lg shadow-md overflow-hidden flex flex-col"
        >
            <div className="relative h-72 w-full overflow-hidden rounded-t-lg">
                <Image
                    src={'/images' + (product.imageURL || '/No-image.jpg')}
                    alt={product.title}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="flex flex-col p-6 flex-grow">
                <h2 className="text-2xl font-bold text-teal-900 mb-2 group-hover:text-teal-700 transition-colors duration-300">{product.title}</h2>
                <p className="text-lg text-yellow-600 font-semibold mb-2">${product.price.toFixed(2)}</p>
                <p className="text-sm text-gray-700 mb-4">By {product.author}</p>
                <button
                    className="mt-auto bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    onClick={(e) => e.stopPropagation()}  // Prevent Link from triggering
                >
                    View Details
                </button>
            </div>
        </Link>
    );
};

export default ProductsPage;
