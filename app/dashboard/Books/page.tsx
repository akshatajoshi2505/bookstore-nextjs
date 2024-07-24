'use client';

import { useState, useEffect, ReactNode } from 'react';

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
}

// Modal component props interface
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
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

// AdminPage component
const AdminPage = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [editingBook, setEditingBook] = useState<Book | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [isBookModalOpen, setIsBookModalOpen] = useState<boolean>(false);

    useEffect(() => {
        fetchBooks();
        fetchCategories();
    }, []);

    const fetchBooks = async () => {
        try {
            const res = await fetch('/api/books');
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            setBooks(data.data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

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

    const handleDeleteBook = async (id: string) => {
        try {
            await fetch(`/api/books/${id}`, { method: 'DELETE' });
            fetchBooks();
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    const handleEditBook = (book: Book) => {
        setEditingBook(book);
        setIsBookModalOpen(true);
    };

    const handleAddBook = () => {
        setEditingBook({
            title: "",
            description: "",
            author: "",
            price: 0,
            publicationDate: "",
            isbn: "",
            imageURL: "",
            category: "", // Initialize category field
        });
        setIsBookModalOpen(true);
    };

    const handleSaveBook = async () => {
        if (editingBook) {
            const method = editingBook._id ? 'PUT' : 'POST';
            const url = editingBook._id ? `/api/books/${editingBook._id}` : '/api/books';

            try {
                await fetch(url, {
                    method,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(editingBook),
                });
                fetchBooks();
                fetchCategories();
                setEditingBook(null);
                setIsBookModalOpen(false);
            } catch (error) {
                console.error('Error saving book:', error);
            }
        }
    };

    const handleChangeBook = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (editingBook) {
            setEditingBook({ ...editingBook, [name]: value });
        }
    };

    // Handler for search functionality
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    // Filtered books based on search term
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col min-h-screen p-6 bg-gray-50">
            {/* Books management section */}
            <main className="flex-1 mb-8">
                <h2 className="text-3xl font-bold mb-4 text-teal-700">Manage Books</h2>
                <div className="mb-4 flex justify-between items-center">
                    <input
                        type="text"
                        placeholder="Search by title or author"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <button
                        onClick={handleAddBook}
                        className="ml-4 bg-teal-600 text-white py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-teal-700"
                    >
                        Add New Book
                    </button>
                </div>
                <table className="table-auto w-full border-collapse border border-gray-200 mb-4">
                    <thead>
                        <tr className="bg-teal-100">
                            <th className="border px-4 py-2 text-left text-teal-800">Title</th>
                            <th className="border px-4 py-2 text-left text-teal-800">Author</th>
                            <th className="border px-4 py-2 text-left text-teal-800">Price</th>
                            <th className="border px-4 py-2 text-left text-teal-800">Publication Date</th>
                            <th className="border px-4 py-2 text-left text-teal-800">ISBN</th>
                            <th className="border px-4 py-2 text-left text-teal-800">Category</th>
                            <th className="border px-4 py-2 text-left text-teal-800">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBooks.map(book => (
                            <tr key={book._id} className="bg-white hover:bg-teal-50">
                                <td className="border px-4 py-2">{book.title}</td>
                                <td className="border px-4 py-2">{book.author}</td>
                                <td className="border px-4 py-2">${book.price}</td>
                                <td className="border px-4 py-2">{book.publicationDate}</td>
                                <td className="border px-4 py-2">{book.isbn}</td>
                                <td className="border px-4 py-2">{categories.find(category => category._id === book.category)?.name || 'Unknown'}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        onClick={() => handleEditBook(book)}
                                        className="bg-yellow-500 text-white py-2 px-4 rounded-lg shadow-sm hover:bg-yellow-600 transition-transform transform hover:scale-105 mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBook(book._id!)}
                                        className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-sm hover:bg-red-600 transition-transform transform hover:scale-105"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>

            {/* Book Edit/Add Modal */}
            <Modal isOpen={isBookModalOpen} onClose={() => setIsBookModalOpen(false)}>
                <h3 className="text-2xl font-bold mb-4 text-teal-700">{editingBook?._id ? "Edit Book" : "Add New Book"}</h3>
                {editingBook && (
                    <form>
                        <div className="mb-4">
                            <label className="block text-teal-700 mb-2">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={editingBook.title}
                                onChange={handleChangeBook}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-teal-700 mb-2">Description</label>
                            <textarea
                                name="description"
                                value={editingBook.description}
                                onChange={handleChangeBook}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-teal-700 mb-2">Author</label>
                            <input
                                type="text"
                                name="author"
                                value={editingBook.author}
                                onChange={handleChangeBook}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-teal-700 mb-2">Price</label>
                            <input
                                type="number"
                                name="price"
                                value={editingBook.price}
                                onChange={handleChangeBook}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-teal-700 mb-2">Publication Date</label>
                            <input
                                type="date"
                                name="publicationDate"
                                value={editingBook.publicationDate}
                                onChange={handleChangeBook}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-teal-700 mb-2">ISBN</label>
                            <input
                                type="text"
                                name="isbn"
                                value={editingBook.isbn}
                                onChange={handleChangeBook}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-teal-700 mb-2">Category</label>
                            <select
                                name="category"
                                value={editingBook.category}
                                onChange={handleChangeBook}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            >
                                <option value="">Select Category</option>
                                {categories.map(category => (
                                    <option key={category._id} value={category._id}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-teal-700 mb-2">Upload Image</label>
                            <input
                                type="file"
                                name="imageURL"
                                accept="image/*"
                                onChange={handleChangeBook}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={handleSaveBook}
                            className="bg-green-500 text-white py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-green-600"
                        >
                            Save
                        </button>
                    </form>
                )}
            </Modal>
        </div>
    );
};

export default AdminPage;
