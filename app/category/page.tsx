'use client';
// Import necessary hooks and components
import { useEffect, useState } from 'react';
import Link from 'next/link';

type Category = {
    id: number;
    name: string;
};

const CategoryPage: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        async function fetchCategories() {
            const response = await fetch('/category.json');
            const data: Category[] = await response.json();
            setCategories(data);
        }

        fetchCategories();
    }, []);

    return (
        <main className="flex min-h-screen flex-col p-6 bg-gray-50">
            <h1 className="text-2xl font-bold text-teal-700 mb-4">Book Categories</h1>
            <ul>
                {categories.map((category) => (
                    <li key={category.id} className="my-2">
                        <Link href={`/category/${category.id}`}>
                            <p className="text-teal-600 hover:text-yellow-600 transition-colors duration-300">
                                {category.name}
                            </p>
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    );
};

export default CategoryPage;
