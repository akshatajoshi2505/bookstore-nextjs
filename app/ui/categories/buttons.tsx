import { PencilIcon, PlusIcon, TrashIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function CreateCategory() {
  return (
    <Link
      href="/dashboard/categories/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Category</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function EditCategory({ id }: { id: string }) {
  return (
    <Link
    href={`/dashboard/categories/${id}/edit`}
      className="flex items-center rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteCategory({ id }: { id: string }) {
  return (
    <>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </>
  );
}

export function AddBookToCategory({ categoryId }: { categoryId: string }) {
  return (
    <Link
      href={`/dashboard/categories/${categoryId}/add-book`}
      className="flex items-center rounded-md border p-2 hover:bg-gray-100"
    >
      <PlusCircleIcon className="w-5" />
      <span className="ml-2 hidden sm:inline">Add Book</span>
    </Link>
  );
}
