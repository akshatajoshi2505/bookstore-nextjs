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
        setEditingCustomer({ _id: '', name: "", email: "" });
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

    const handleChangeCustomer = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (editingCustomer) {
            setEditingCustomer({ ...editingCustomer, [name]: value });
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filteredCustomers = customers.filter(customer =>
        customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return (
        <div className="flex flex-col min-h-screen p-6">
            <main className="flex-1 mb-8">
                <h2 className="text-2xl font-bold mb-4">Manage Customers</h2>
                <div className="mb-4 flex justify-between">
                    <input
                        type="text"
                        placeholder="Search by name or email"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <button
                        onClick={handleAddCustomer}
                        className="ml-4 bg-blue-500 text-white py-2 px-4 rounded"
                    >
                        Add New Customer
                    </button>
                </div>
                <table className="table-auto w-full border-collapse border border-gray-200 mb-4">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Email</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCustomers.map(customer => (
                            <tr key={customer._id}>
                                <td className="border px-4 py-2">{customer.name}</td>
                                <td className="border px-4 py-2">{customer.email}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        onClick={() => handleEditCustomer(customer)}
                                        className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteCustomer(customer._id)}
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
            <Modal isOpen={isCustomerModalOpen} onClose={() => setIsCustomerModalOpen(false)}>
                <h3 className="text-lg font-bold mb-4">{editingCustomer?._id ? 'Edit Customer' : 'Add Customer'}</h3>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={editingCustomer?.name || ""}
                    onChange={handleChangeCustomer}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={editingCustomer?.email || ""}
                    onChange={handleChangeCustomer}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <button
                    onClick={handleSaveCustomer}
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                    Save
                </button>
            </Modal>
        </div>
    );
};

export default CustomersPage;
