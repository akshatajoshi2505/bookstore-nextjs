'use client';
import { useEffect, useState } from 'react';

// Book interface
interface Book {
    _id?: string; // MongoDB assigns an _id field by default
    title: string;
    author: string;
    description: string;
    price: number;
    publicationDate: string;
    isbn: string;
    imageURL: string;
    category: string; // Add category field
}

// Category interface
interface Category {
    _id: string;
    name: string;
    books: string[];
}

// Modal component props interface
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

// Modal component
const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-1/2 relative">
                <button
                    className="absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-gray-800"
                    onClick={onClose}
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default function CategoriesTable() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [books, setBooks] = useState<Book[]>([]);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState<boolean>(false);

    useEffect(() => {
        fetchCategories();
        fetchBooks();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await fetch('/api/categories');
            const data = await res.json();
            if (data.success && Array.isArray(data.categories)) {
                setCategories(data.categories);
            } else {
                console.error('Failed to load categories:', data.message);
                setCategories([]);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
            setCategories([]);
        }
    };

    const fetchBooks = async () => {
        try {
            const res = await fetch('/api/books');
            const data = await res.json();
            if (data.success && Array.isArray(data.data)) {
                setBooks(data.data);
            } else {
                console.error('Failed to load books:', data.message);
                setBooks([]);
            }
        } catch (error) {
            console.error('Error fetching books:', error);
            setBooks([]);
        }
    };

    const handleDeleteCategory = async (id: string) => {
        try {
            await fetch(`/api/categories/${id}`, { method: 'DELETE' });
            fetchCategories();
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const handleEditCategory = (category: Category) => {
        setEditingCategory(category);
        setIsCategoryModalOpen(true);
    };

    const handleAddCategory = () => {
        setEditingCategory({
            _id: '',
            name: '',
            books: [],
        });
        setIsCategoryModalOpen(true);
    };

    const handleSaveCategory = async () => {
        if (editingCategory) {
            const method = editingCategory._id ? 'PUT' : 'POST';
            const url = editingCategory._id ? `/api/categories/${editingCategory._id}` : '/api/categories';

            try {
                await fetch(url, {
                    method,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(editingCategory),
                });
                fetchCategories();
                setEditingCategory(null);
                setIsCategoryModalOpen(false);
            } catch (error) {
                console.error('Error saving category:', error);
            }
        }
    };

    const handleChangeCategory = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (editingCategory) {
            setEditingCategory({ ...editingCategory, [name]: value });
        }
    };

    const handleBookSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedBookIds = Array.from(e.target.selectedOptions, option => option.value);
        if (editingCategory) {
            setEditingCategory({ ...editingCategory, books: selectedBookIds });
        }
    };

    return (
        <div className="w-full">
            <div className="mt-6 flow-root">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
                            <div className="flex justify-between mb-4">
                                <button
                                    onClick={handleAddCategory}
                                    className="ml-4 bg-teal-600 text-white py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-teal-700"
                                >
                                    Add New Category
                                </button>
                            </div>
                            <table className="min-w-full rounded-md text-gray-900 md:table">
                                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                                    <tr>
                                        <th scope="col" className="px-4 py-5 font-medium sm:pl-6">Title</th>
                                        <th scope="col" className="px-3 py-5 font-medium">Total (Books)</th>
                                        <th scope="col" className="px-3 py-5 font-medium">Books</th>
                                        <th scope="col" className="px-3 py-5 font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 text-gray-900">
                                    {categories.length === 0 ? (
                                        <tr><td colSpan={4}>No categories found</td></tr>
                                    ) : (
                                        categories.map((category) => (
                                            <tr key={category._id} className="group">
                                                <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                                                    {category.name}
                                                </td>
                                                <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                                                    {category.books ? category.books.length : 0}
                                                </td>
                                                <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                                                    <select className="form-select form-select-sm">
                                                        {category.books && category.books.map((bookId) => {
                                                            const book = books.find(b => b._id === bookId);
                                                            return (
                                                                <option key={bookId} value={bookId}>{book ? book.title : 'Unknown Book'}</option>
                                                            );
                                                        })}
                                                    </select>
                                                </td>
                                                <td className="whitespace-nowrap bg-white px-4 py-5 text-sm flex gap-3">
                                                    <button
                                                        onClick={() => handleEditCategory(category)}
                                                        className="bg-yellow-500 text-white py-2 px-4 rounded-lg shadow-sm hover:bg-yellow-600 transition-transform transform hover:scale-105 mr-2"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteCategory(category._id)}
                                                        className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-sm hover:bg-red-600 transition-transform transform hover:scale-105"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Edit/Add Modal */}
            <Modal isOpen={isCategoryModalOpen} onClose={() => setIsCategoryModalOpen(false)}>
                <h3 className="text-2xl font-bold mb-4 text-teal-700">{editingCategory?._id ? "Edit Category" : "Add New Category"}</h3>
                {editingCategory && (
                    <form>
                        <div className="mb-4">
                            <label className="block text-teal-700 mb-2">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={editingCategory.name}
                                onChange={handleChangeCategory}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-teal-700 mb-2">Books</label>
                            <select
                                multiple
                                name="books"
                                value={editingCategory.books.map(book => book.toString())} // Ensure the value is a string array
                                onChange={handleBookSelection}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            >
                                {books.map(book => (
                                    <option key={book._id} value={book._id}>{book.title}</option>
                                ))}
                            </select>
                        </div>
                        <button
                            type="button"
                            onClick={handleSaveCategory}
                            className="bg-green-500 text-white py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-green-600"
                        >
                            Save
                        </button>
                    </form>
                )}
            </Modal>
        </div>
    );
}
