import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import { Button } from '@/app/ui/button';
import { EditSubscription } from '@/app/ui/subscriptions/buttons';
import { useEffect, useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';

interface Subscription {
  _id: string;
  title: string;
  duration: string;
  amount: string;
  status: string;
}


interface SubscriptionsTableProps {
  subscriptions: Subscription[];
  onDelete: (id: string) => void;
}
// Assuming this is where your SubscriptionsTable component is defined
const SubscriptionsTable: React.FC<SubscriptionsTableProps> = ({ subscriptions, onDelete }) => {
  return (
    <div className="w-full">
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <table className="min-w-full rounded-md text-gray-900">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium">
                      Title
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Duration (Months)
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Price ($)
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Status
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium" colSpan={2}>
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {subscriptions.map((subscription) => (
                    <tr key={subscription._id} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center gap-3">
                          <p>{subscription.title}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {subscription.duration}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      {subscription.amount}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {subscription.status}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        <EditSubscription id={subscription._id} />
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      <button onClick={() => onDelete(subscription._id)} className="rounded-md border p-2 hover:bg-gray-100">
                        <span className="sr-only">Delete</span>
                        <TrashIcon className="w-5" />
                      </button>

                      </td>
                    </tr>
                  ))}
                  {subscriptions.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-4 py-5 text-sm text-center">
                        No subscriptions found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionsTable;
