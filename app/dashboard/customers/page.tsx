"use client";

import { useEffect, useState, ReactNode } from 'react';

interface Customer {
    _id: string;
    name: string;
    email: string;
}

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-11/12 max-w-md relative">
                <button
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                    onClick={onClose}
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

const CustomersPage = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [isCustomerModalOpen, setIsCustomerModalOpen] = useState<boolean>(false);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetch('/api/customers');
                const data = await response.json();
                if (data.success) {
                    setCustomers(data.customers);
                }
            } catch (error) {
                console.error('Failed to fetch customers', error);
            }
        };
        fetchCustomers();
    }, []);

    const handleDeleteCustomer = async (id: string) => {
        try {
            const response = await fetch('/api/customers', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });
            const data = await response.json();
            if (data.success) {
                setCustomers(prevCustomers =>
                    prevCustomers.filter(customer => customer._id !== id)
                );
            }
        } catch (error) {
            console.error('Failed to delete customer', error);
        }
    };

    const handleEditCustomer = (customer: Customer) => {
        setEditingCustomer(customer);
        setIsCustomerModalOpen(true);
    };

    const handleAddCustomer = () => {
        setEditingCustomer({ _id: '', name: '', email: '' });
        setIsCustomerModalOpen(true);
    };

    const handleSaveCustomer = async () => {
        if (editingCustomer) {
            try {
                const response = await fetch('/api/customers', {
                    method: editingCustomer._id ? 'PUT' : 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(editingCustomer),
                });
                const data = await response.json();
                if (data.success) {
                    setCustomers(prevCustomers => {
                        if (editingCustomer._id) {
                            return prevCustomers.map(customer =>
                                customer._id === editingCustomer._id ? data.customer : customer
                            );
                        } else {
                            return [...prevCustomers, data.customer];
                        }
                    });
                    setEditingCustomer(null);
                    setIsCustomerModalOpen(false);
                }
            } catch (error) {
                console.error('Failed to save customer', error);
            }
        }
    };

    const handleChangeCustomer = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (editingCustomer) {
            setEditingCustomer({ ...editingCustomer, [name]: value });
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col min-h-screen p-6 bg-teal-50">
            <main className="flex-1 mb-8">
                <h2 className="text-3xl font-bold mb-6 text-teal-800">Manage Customers</h2>
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:gap-6">
                    <input
                        type="text"
                        placeholder="Search by name or email"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="flex-1 p-3 border border-teal-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <button
                        onClick={handleAddCustomer}
                        className="bg-teal-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-teal-500 transition-colors"
                    >
                        Add New Customer
                    </button>
                </div>
                <table className="w-full border-collapse border border-teal-200 bg-white rounded-lg shadow-md overflow-hidden">
                    <thead className="bg-teal-600 text-white">
                        <tr>
                            <th className="border px-6 py-3 text-left">Name</th>
                            <th className="border px-6 py-3 text-left">Email</th>
                            <th className="border px-6 py-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCustomers.map(customer => (
                            <tr key={customer._id} className="hover:bg-teal-50">
                                <td className="border px-6 py-3">{customer.name}</td>
                                <td className="border px-6 py-3">{customer.email}</td>
                                <td className="border px-6 py-3 flex space-x-2">
                                    <button
                                        onClick={() => handleEditCustomer(customer)}
                                        className="bg-yellow-500 text-white py-1 px-3 rounded-lg shadow-md hover:bg-yellow-400 transition-colors"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteCustomer(customer._id)}
                                        className="bg-red-500 text-white py-1 px-3 rounded-lg shadow-md hover:bg-red-400 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
            <Modal isOpen={isCustomerModalOpen} onClose={() => setIsCustomerModalOpen(false)}>
                <h3 className="text-2xl font-bold mb-4 text-teal-800">{editingCustomer?._id ? 'Edit Customer' : 'Add Customer'}</h3>
                {editingCustomer && (
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={editingCustomer.name}
                                onChange={handleChangeCustomer}
                                className="w-full p-3 border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={editingCustomer.email}
                                onChange={handleChangeCustomer}
                                className="w-full p-3 border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={handleSaveCustomer}
                            className="bg-teal-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-teal-500 transition-colors"
                        >
                            Save
                        </button>
                    </form>
                )}
            </Modal>
        </div>
    );
};

export default CustomersPage;
