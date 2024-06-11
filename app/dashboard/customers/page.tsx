"use client";

import { useState, ReactNode } from 'react';
import Link from 'next/link';

// Customer interface
interface Customer {
    id: number;
    name: string;
    email: string;
}

// Initial data for customers
const initialCustomers: Customer[] = [
    // Add initial customer data as needed
];

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

// CustomersPage component
const CustomersPage = () => {
    const storedCustomers = JSON.parse(localStorage.getItem('customers') || '[]');
    const [customers, setCustomers] = useState<Customer[]>(storedCustomers);
    const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const [isCustomerModalOpen, setIsCustomerModalOpen] = useState<boolean>(false);

    // Handlers for managing customers
    const handleDeleteCustomer = (id: number) => {
        // Delete the customer from the customers array
        setCustomers(prevCustomers =>
            prevCustomers.filter(customer => customer.id !== id)
        );
    
        // Delete the customer from localStorage
        const storedCustomers = JSON.parse(localStorage.getItem('customers') || '[]');
        const updatedStoredCustomers = storedCustomers.filter((customer: { id: number; }) => customer.id !== id);
        localStorage.setItem('customers', JSON.stringify(updatedStoredCustomers));
    };
    

    const handleEditCustomer = (customer: Customer) => {
        setEditingCustomer(customer);
        setIsCustomerModalOpen(true);
    };

    const handleAddCustomer = () => {
        setEditingCustomer({
            id: Date.now(),
            name: "",
            email: ""
        });
        setIsCustomerModalOpen(true);
    };

    const handleSaveCustomer = () => {
        if (editingCustomer) {
            // Update the customer in the customers array
            setCustomers(prevCustomers =>
                prevCustomers.map(customer =>
                    customer.id === editingCustomer.id ? editingCustomer : customer
                )
            );
    
            // Update the customer in localStorage
            const storedCustomers = JSON.parse(localStorage.getItem('customers') || '[]');
            const updatedStoredCustomers = storedCustomers.map((customer: { id: number; }) =>
                customer.id === editingCustomer.id ? editingCustomer : customer
            );
            localStorage.setItem('customers', JSON.stringify(updatedStoredCustomers));
        } else {
            // Add a new customer
            const newCustomer = { id: Date.now(), name: "", email: "" };
            setCustomers(prevCustomers => [...prevCustomers, newCustomer]);
    
            // Add the new customer to localStorage
            const storedCustomers = JSON.parse(localStorage.getItem('customers') || '[]');
            storedCustomers.push(newCustomer);
            localStorage.setItem('customers', JSON.stringify(storedCustomers));
        }
    
        setEditingCustomer(null);
        setIsCustomerModalOpen(false);
    };
    
    
    const handleChangeCustomer = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (editingCustomer) {
        setEditingCustomer({ ...editingCustomer, [name]: value });
    }
};
    // Handler for search functionality
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    // Filtered customers based on search term
    const filteredCustomers = customers.filter(customer => 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col min-h-screen p-6">
            {/* Customers management section */}
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
                    
                    <Link href="/dashboard/customers/addCustomer">
                    <button className="ml-4 bg-blue-500 text-white py-2 px-4 rounded">
                        Add New Customer
                    </button>
                    </Link>
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
                            <tr key={customer.id}>
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
                                        onClick={() => handleDeleteCustomer(customer.id)}
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

            {/* Customer Edit/Add Modal */}
            <Modal isOpen={isCustomerModalOpen} onClose={() => setIsCustomerModalOpen(false)}>
                <h3 className="text-xl font-bold mb-4">{editingCustomer?.id ? "Edit Customer" : "Add New Customer"}</h3>
                {editingCustomer && (
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={editingCustomer.name}
                                onChange={handleChangeCustomer}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={editingCustomer.email}
                                onChange={handleChangeCustomer}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                       
                        <button
                            type="button"
                            onClick={handleSaveCustomer}
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

export default CustomersPage;
