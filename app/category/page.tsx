'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Category = {
    _id: string;
    name: string;
    books: string[];
};

type Book = {
    _id: string;
    title: string;
    author: string;
    price: number;
    publicationDate: string;
    isbn: string;
    imageURL: string;
};

const CategoryPage: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [booksMap, setBooksMap] = useState<{ [key: string]: Book }>({});

    useEffect(() => {
        async function fetchCategoriesAndBooks() {
            try {
                const categoryResponse = await axios.get('/api/categories');
                const categoriesData: Category[] = categoryResponse.data.categories;

                // Fetch all books by their IDs and store in a map for quick lookup
                const bookIds = categoriesData.flatMap((category: Category) => category.books);
                const uniqueBookIds = Array.from(new Set(bookIds)); // Use Array.from to convert Set to array

                const booksResponse = await axios.post('/api/books/fetch', { ids: uniqueBookIds });
                const booksData = booksResponse.data.books.reduce((acc: { [key: string]: Book }, book: Book) => {
                    acc[book._id] = book;
                    return acc;
                }, {});

                setBooksMap(booksData);
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching categories and books:', error);
            }
        }

        fetchCategoriesAndBooks();
    }, []);

    return (
        <main className="flex min-h-screen flex-col p-6 bg-gray-50">
            <h1 className="text-4xl font-bold text-teal-700 mb-4 text-center">Book Categories</h1>
            {categories.map((category) => (
                <div key={category._id} className="mb-8">
                    <h2 className="text-2xl font-semibold text-yellow-600">{category.name}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        {category.books.map((bookId) => {
                            const book = booksMap[bookId];
                            if (!book) return null;
                            return (
                                <Link
                                    href={`/product/${book._id}`}
                                    key={book._id}
                                    className="group relative bg-white border border-teal-200 rounded-lg shadow-md overflow-hidden flex flex-col"
                                >
                                    <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                                        <Image
                                            src={'/images' + (book.imageURL || '/No-image.jpg')}
                                            alt={book.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col p-4">
                                        <h3 className="text-lg font-bold text-teal-900 mb-2 group-hover:text-teal-700 transition-colors duration-300">
                                            {book.title}
                                        </h3>
                                        <p className="text-sm text-yellow-600 font-semibold mb-2">${book.price.toFixed(2)}</p >
                                        <p className="text-xs text-gray-700 mb-4">By {book.author}</p >
                                        <button
                                            className="mt-auto bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                            onClick={(e) => e.stopPropagation()}  // Prevent Link from triggering
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            ))}
        </main>
    );
};

export default CategoryPage;