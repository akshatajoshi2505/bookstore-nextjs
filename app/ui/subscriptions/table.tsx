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

const SubscriptionsTable: React.FC<SubscriptionsTableProps> = ({ subscriptions, onDelete }) => {
  return (
    <div className="w-full">
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-lg shadow-md bg-white">
              <table className="min-w-full text-teal-900">
                <thead className="bg-teal-50 text-left text-sm font-semibold text-teal-800">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Duration (Months)
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Price ($)
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-4" colSpan={2}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-teal-100">
                  {subscriptions.map((subscription) => (
                    <tr key={subscription._id} className="group hover:bg-teal-50 transition duration-300 ease-in-out">
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                        <div className="flex items-center gap-3">
                          <p>{subscription.title}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm">
                        {subscription.duration}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm">
                        {subscription.amount}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm">
                        <span
                          className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium ${
                            subscription.status === 'active' ? 'bg-teal-100 text-teal-800' : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {subscription.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm">
                        <EditSubscription id={subscription._id} />
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm">
                        <button
                          onClick={() => onDelete(subscription._id)}
                          className="rounded-full p-2 text-teal-500 hover:bg-teal-100 transition duration-300 ease-in-out"
                        >
                          <span className="sr-only">Delete</span>
                          <TrashIcon className="w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {subscriptions.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-sm text-center text-teal-800">
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
