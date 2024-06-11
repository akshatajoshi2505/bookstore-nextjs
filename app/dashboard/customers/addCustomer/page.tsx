"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

const AddCustomerForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newCustomer = { id: Date.now(), name, email }; // Use current timestamp as a unique ID
        // Update localStorage with the new customer
        localStorage.setItem('customers', JSON.stringify([...JSON.parse(localStorage.getItem('customers') || '[]'), newCustomer]));
        setName('');
        setEmail('');
    };
    useEffect(() => {
        const storedCustomers = JSON.parse(localStorage.getItem('customers') || '[]');
        const customerData = storedCustomers.find((customer: { email: string; }) => customer.email === email);
        if (customerData) {
          setName(customerData.name);
          setEmail(customerData.email);
        }
      }, [email]);
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-lg mx-auto bg-white p-6 rounded shadow-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Customer</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                        Add Customer
                    </button>

                    </div>
                    <div className="mt-4">
                    <Link href="/dashboard/customers" passHref>
                        <button className="text-blue-500 hover:underline">
                        View All Customers
                        </button>
                    </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCustomerForm;
