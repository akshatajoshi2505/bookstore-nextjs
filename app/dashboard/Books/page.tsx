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
    imageURL: String;
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
            <div className="bg-white p-6 rounded shadow-lg w-1/2 relative">
                <button
                    className="absolute top-0 right-0 mt-4 mr-4 text-gray-500"
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
    const [editingBook, setEditingBook] = useState<Book | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [isBookModalOpen, setIsBookModalOpen] = useState<boolean>(false);

    useEffect(() => {
        fetchBooks();
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
                setEditingBook(null);
                setIsBookModalOpen(false);
            } catch (error) {
                console.error('Error saving book:', error);
            }
        }
    };

    const handleChangeBook = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        <div className="flex flex-col min-h-screen p-6">
            {/* Books management section */}
            <main className="flex-1 mb-8">
                <h2 className="text-2xl font-bold mb-4">Manage Books</h2>
                <div className="mb-4 flex justify-between">
                    <input
                        type="text"
                        placeholder="Search by title or author"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <button
                        onClick={handleAddBook}
                        className="ml-4 bg-blue-500 text-white py-2 px-4 rounded"
                    >
                        Add New Book
                    </button>
                </div>
                <table className="table-auto w-full border-collapse border border-gray-200 mb-4">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Title</th>
                            <th className="border px-4 py-2">Author</th>
                            <th className="border px-4 py-2">Price</th>
                            <th className="border px-4 py-2">Publication Date</th>
                            <th className="border px-4 py-2">ISBN</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBooks.map(book => (
                            <tr key={book._id}>
                                <td className="border px-4 py-2">{book.title}</td>
                                <td className="border px-4 py-2">{book.author}</td>
                                <td className="border px-4 py-2">${book.price}</td>
                                <td className="border px-4 py-2">{book.publicationDate}</td>
                                <td className="border px-4 py-2">{book.isbn}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        onClick={() => handleEditBook(book)}
                                        className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBook(book._id!)}
                                        className="bg-red-500 text-white py-1 px-2 rounded"
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
                <h3 className="text-xl font-bold mb-4">{editingBook?._id ? "Edit Book" : "Add New Book"}</h3>
                {editingBook && (
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={editingBook.title}
                                onChange={handleChangeBook}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
						 <div className="mb-4">
							<label className="block text-gray-700 mb-2">Description</label>
							<input
								type="text"
								name="description"
								value={editingBook.description}
								onChange={handleChangeBook}
								className="w-full p-2 border border-gray-300 rounded"
							/>
						</div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Author</label>
                            <input
                                type="text"
                                name="author"
                                value={editingBook.author}
                                onChange={handleChangeBook}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Price</label>
                            <input
                                type="number"
                                name="price"
                                value={editingBook.price}
                                onChange={handleChangeBook}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Publication Date</label>
                            <input
                                type="date"
                                name="publicationDate"
                                value={editingBook.publicationDate}
                                onChange={handleChangeBook}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">ISBN</label>
                            <input
                                type="text"
                                name="isbn"
                                value={editingBook.isbn}
                                onChange={handleChangeBook}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
						<div className="mb-4">
							<label className="block text-gray-700 mb-2">Upload Image</label>
							<input
								type="file"
								name="imageURL"
								accept="image/*"
								onChange={handleChangeBook}
								className="w-full p-2 border border-gray-300 rounded"
							/>
						</div>
                        <button
                            type="button"
                            onClick={handleSaveBook}
                            className="bg-green-500 text-white py-2 px-4 rounded"
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