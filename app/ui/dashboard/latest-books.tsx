import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { lusitana } from '@/app/ui/fonts';
import { LatestInvoice } from '@/app/lib/definitions';

interface Book {
  _id: string;
  title: string;
  price: number;
  isbn: string;
  author: string;
}

interface LatestInvoicesProps {
  books: Book[];
}
export default function LatestBooks({ books }: { books: any[] }) {
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Latest Books
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
        {Array.isArray(books) && books.length > 0 ? (

          books.map((book) => (
            <div
              key={book._id}
              className={clsx('flex flex-row items-center justify-between py-4')}
            >
              <div className="flex items-center">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold md:text-base">
                    {book.title}
                  </p>
                  <p className="hidden text-sm text-gray-500 sm:block">
                    {book.author}
                  </p>
                </div>
              </div>
              <p className={`${lusitana.className} truncate text-sm font-medium md:text-base`}>
                {book.price}
              </p>
            </div>
            ))
          ) : (
            <p>No books available.</p>
          )}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
