import Search from '@/app/ui/search';
import { CreateCategory } from '@/app/ui/categories/buttons';
import { lusitana } from '@/app/ui/fonts';
import CategoriesTable from '@/app/ui/categories/table';

export default async function Page() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl text-teal-700`}>Categories</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <div className="relative w-full">
          <Search placeholder="Search categories..." />
          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg className="h-5 w-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M21 16.5a5.5 5.5 0 01-9.9 3.3m-.1-6.3H3a5 5 0 005 5h14a5 5 0 005-5h-4.5m-6.4 6.3a5.48 5.48 0 01-5.1-5.3" />
            </svg>
          </span>
        </div>
      </div>
      <CategoriesTable></CategoriesTable>
      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </div>
  );
}
