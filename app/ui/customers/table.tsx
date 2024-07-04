import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import {
  CustomersTableType,
  FormattedCustomersTable,
} from '@/app/lib/definitions';

export default async function CustomersTable({
  customers,
}: {
  customers: FormattedCustomersTable[];
}) {
  return (
    <div className="w-full p-6 bg-teal-50">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl text-teal-800`}>
        Customers
      </h1>
      <Search placeholder="Search customers..." />
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-lg bg-white shadow-lg border border-gray-200 md:pt-0">
              <div className="md:hidden">
                {customers?.map((customer) => (
                  <div
                    key={customer.id}
                    className="mb-4 w-full rounded-lg bg-teal-100 p-4 shadow-md"
                  >
                    <div className="flex items-center justify-between border-b border-teal-200 pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <div className="flex items-center gap-3">
                            <Image
                              src={customer.image_url}
                              className="rounded-full border-2 border-teal-500"
                              alt={`${customer.name}'s profile picture`}
                              width={28}
                              height={28}
                            />
                            <p className="text-teal-800">{customer.name}</p>
                          </div>
                        </div>
                        <p className="text-sm text-teal-600">
                          {customer.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between border-b border-teal-200 py-4">
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs text-teal-600">Pending</p>
                        <p className="font-medium text-teal-800">{customer.total_pending}</p>
                      </div>
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs text-teal-600">Paid</p>
                        <p className="font-medium text-teal-800">{customer.total_paid}</p>
                      </div>
                    </div>
                    <div className="pt-4 text-sm text-teal-600">
                      <p>{customer.total_invoices} invoices</p>
                    </div>
                  </div>
                ))}
              </div>
              <table className="hidden min-w-full rounded-lg bg-white text-teal-800 shadow-md md:table">
                <thead className="bg-teal-600 text-left text-sm font-medium text-white">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Total Invoices
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Total Pending
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium">
                      Total Paid
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-sm">
                  {customers.map((customer) => (
                    <tr key={customer.id} className="group hover:bg-teal-50 transition-colors duration-200">
                      <td className="whitespace-nowrap py-5 pl-4 pr-3 text-teal-800 sm:pl-6">
                        <div className="flex items-center gap-3">
                          <Image
                            src={customer.image_url}
                            className="rounded-full border-2 border-teal-500"
                            alt={`${customer.name}'s profile picture`}
                            width={28}
                            height={28}
                          />
                          <p>{customer.name}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-5 text-teal-800">
                        {customer.email}
                      </td>
                      <td className="whitespace-nowrap px-4 py-5 text-teal-800">
                        {customer.total_invoices}
                      </td>
                      <td className="whitespace-nowrap px-4 py-5 text-teal-800">
                        {customer.total_pending}
                      </td>
                      <td className="whitespace-nowrap px-4 py-5 text-teal-800">
                        {customer.total_paid}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
