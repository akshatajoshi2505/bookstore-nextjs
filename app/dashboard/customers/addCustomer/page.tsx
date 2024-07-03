"use client";

import { useState } from 'react';
import { useRouter } from 'next/router';

const AddCustomerPage = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const handleAddCustomer = async () => {
        try {
            const response = await fetch('/api/customers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email }),
            });
            const data = await response.json();
            // if (data.success) {
            //     router.push('/dashboard/customers');
            // }
        } catch (error) {
            console.error('Failed to add customer', error);
        }
    };

    return (
        <div className="flex flex-col min-h-screen p-6">
            <main className="flex-1 mb-8">
                <h2 className="text-2xl font-bold mb-4">Add New Customer</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                    />
                    <button
                        onClick={handleAddCustomer}
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                    >
                        Add Customer
                    </button>
                </div>
            </main>
        </div>
    );
};

export default AddCustomerPage;
