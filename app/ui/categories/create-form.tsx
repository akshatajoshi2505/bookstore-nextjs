'use client'
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/app/ui/button';

export default function CreateCategoryForm() {
  const [name, setName] = useState('');

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const category = {
      name,
    };

    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(category),
      });

      if (response.ok) {
        alert('Category created successfully!');
        setName(''); // Reset the form or redirect the user
      } else {
        const errorData = await response.json();
        alert(`Failed to create category: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Failed to submit the category', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">Category Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter category name"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          />
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Link href="/dashboard/categories" className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">Cancel</Link>
          <Button type="submit">Create Category</Button>
        </div>
      </div>
    </form>
  );
}
