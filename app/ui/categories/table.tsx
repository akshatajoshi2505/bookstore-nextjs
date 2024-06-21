'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Category,Book } from '@/app/lib/definitions';
import { EditCategory, DeleteCategory, AddBookToCategory } from '@/app/ui/categories/buttons'; // Ensure these components are created


export default function CategoriesTable() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch('/api/categories');
      const json = await res.json();
      if (json.success && Array.isArray(json.categories)) {
          setCategories(json.categories);
      } else {
          console.error('Failed to load categories:', json.message);
          setCategories([]); // Ensures that categories is always an array.
      }
  };  
    
    fetchCategories();
  }, []);

  console.log('Categories:', categories);

  return (
    <div className="w-full">
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
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
                          {category.books.length} {/* Ensure you have a books array or similar in your category objects */}
                        </td>
                        <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                          <select className="form-select form-select-sm">
                            {category.books.map((book) => (
                              <option key={book._id} value={book._id}>{book.name}</option>
                            ))}
                          </select>
                        </td>
                        <td className="whitespace-nowrap bg-white px-4 py-5 text-sm flex gap-3">
                          <EditCategory id={category._id} />
                          <DeleteCategory id={category._id} />
                          <AddBookToCategory categoryId={category._id} />
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
    </div>
  );
}
