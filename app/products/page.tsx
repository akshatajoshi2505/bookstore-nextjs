'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
}

const ProductsPage = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/products.json');
                const data: Product[] = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    if (products.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <main className="flex min-h-screen flex-col p-6">
            <h1 className="text-3xl font-bold mb-6">Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="p-4 border rounded shadow">
                        <Link href={`/product/${product.id}`}>
                            <Image src={product.imageUrl} alt={product.name} width={200} height={200} className="m-auto"/>
                            <h2 className="text-xl font-bold">{product.name}</h2>
                            <p className="text-lg">Price: ${product.price}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default ProductsPage;
