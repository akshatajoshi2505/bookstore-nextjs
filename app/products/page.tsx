'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';


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

// interface Product {
//     id: string;
//     name: string;
//     price: number;
//     imageUrl: string;
// }

const ProductsPage = () => {
    const [products, setProducts] = useState<ProductType[]>([]);

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
        <main className="flex min-h-screen flex-col p-6">
            <h1 className="text-3xl font-bold mb-6">Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.length > 0 ? (
                        products.map((product) => <Product product={product} key={product._id.toString()} />)
                    ) : (
                        <div>Loading...</div>
                    )}
            </div>
        </main>
    );
};



const Product = ({ product }: PropsProducts) => {
    return (
        <div key={product._id} className="p-4 border rounded shadow">
            <Link href={`/product/${product._id}`}>
                <Image src={'/images' + (product.imageURL || '/No-image.jpg')} alt={product.title} width={200} height={200} className="m-auto"/>
                <h2 className="text-xl font-bold">{product.title}</h2>
                <p className="text-lg">Price: ${product.price}</p>
            </Link>
        </div>
    );
};


export default ProductsPage;
